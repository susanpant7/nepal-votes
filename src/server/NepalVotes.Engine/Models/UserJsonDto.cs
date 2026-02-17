using System.Text.Json.Serialization;

namespace NepalVotes.Engine.Models;

public class UserJsonDto
{
    [JsonPropertyName("FirstNameEn")]
    public string FirstNameEn { get; set; } = null!;

    [JsonPropertyName("MiddleNameEn")]
    public string? MiddleNameEn { get; set; }

    [JsonPropertyName("LastNameEn")]
    public string LastNameEn { get; set; } = null!;

    [JsonPropertyName("FirstNameNp")]
    public string FirstNameNp { get; set; } = null!;

    [JsonPropertyName("MiddleNameNp")]
    public string? MiddleNameNp { get; set; }

    [JsonPropertyName("LastNameNp")]
    public string LastNameNp { get; set; } = null!;

    /// <summary>Date of birth in Bikram Sambat (BS) format: "YYYY-MM-DD"</summary>
    [JsonPropertyName("DateOfBirth")]
    public string DateOfBirth { get; set; }

    [JsonPropertyName("MobileNumber")]
    public string MobileNumber { get; set; }

    [JsonPropertyName("NationalIdNumber")]
    public string NationalIdNumber { get; set; }

    [JsonPropertyName("VoterIdNumber")]
    public string VoterIdNumber { get; set; }

    [JsonPropertyName("Status")]
    public int Status { get; set; }

    [JsonPropertyName("WardId")]
    public int WardId { get; set; }

}