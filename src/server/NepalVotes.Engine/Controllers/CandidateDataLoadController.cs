using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace NepalVotes.Engine.Controllers;

public class Candidate
{
    public Guid id { get; set; }
    public string name_np { get; set; }
    public string name_en { get; set; }
    public Guid party_id { get; set; }
    public Guid constituency_id { get; set; }
    public Guid election_id { get; set; }
    public string ecn_url { get; set; }
    public string photo_url { get; set; }
    public DateTime created_at { get; set; }
    public string gender_en { get; set; }
    public int age_years { get; set; }
    public int total_vote_received { get; set; }
}

[ApiController]
[Route("api/candidate-data-load")]
public class CandidateDataLoadController: ControllerBase
{
    [HttpPost]
    public async Task<bool> GetCandidates()
    {
        using HttpClient client = new HttpClient();
        List<Candidate> allCandidates = new List<Candidate>();
        
        int limit = 500;
        int offset = 0;
        bool hasMoreData = true;

        // Base URL including the Province filters
        string baseUrl = "https://www.matdata.xyz/api/v1/candidates?province=Bagmati+Province&province=Gandaki+Province&province=Karnali+Province&province=Koshi+Province&province=Lumbini+Province&province=Madhesh+Province";

        try
        {
            while (hasMoreData)
            {
                // 1. Build the paginated URL
                string requestUrl = $"{baseUrl}&limit={limit}&offset={offset}";

                // 2. Fetch and Deserialize
                var response = await client.GetFromJsonAsync<List<Candidate>>(requestUrl);

                if (response != null && response.Count > 0)
                {
                    allCandidates.AddRange(response);
                    
                    // 3. Increment offset for the next batch
                    offset += limit;
                    Console.WriteLine($"Fetched batch starting at {offset - limit}. Total gathered: {allCandidates.Count}");
                }
                else
                {
                    // Stop when no more candidates are returned
                    hasMoreData = false;
                }
            }

            // 4. Save to File
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "candidates_data.json");
            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonOutput = JsonSerializer.Serialize(allCandidates, options);
            
            await System.IO.File.WriteAllTextAsync(filePath, jsonOutput);            
            Console.WriteLine($"Success! Data saved to: {filePath}");
            return true;
        }
        catch (HttpRequestException httpEx)
        {
            Console.WriteLine($"Network error: {httpEx.Message}");
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An unexpected error occurred: {ex.Message}");
            return false;
        }
    }
    
}