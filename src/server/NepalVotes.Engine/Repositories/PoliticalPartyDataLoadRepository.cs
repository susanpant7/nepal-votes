using System.Text.Json;
using Microsoft.EntityFrameworkCore.Storage;
using NepalVotes.Domain.MediaFiles;
using NepalVotes.Domain.PoliticalParties;
using NepalVotes.Engine.Models;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Engine.Repositories;

public class PoliticalPartyDataLoadRepository (ApplicationDbContext context, IHttpClientFactory httpClientFactory,
    ILogger<PoliticalPartyDataLoadRepository> logger) : IPoliticalPartyDataLoadRepository
{
    public async Task<bool> ImportPartiesFromJsonAsync(string jsonFilePath)
    {
        try
        {
            var jsonContent = await File.ReadAllTextAsync(jsonFilePath);
            return await ImportPartiesFromJsonStringAsync(jsonContent);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to read JSON file: {FilePath}", jsonFilePath);
            return false;
        }

        return true;
    }

    private async Task<bool> ImportPartiesFromJsonStringAsync(string jsonContent)
    {
        IDbContextTransaction? transaction = null;

        try
        {
            // Deserialize JSON
            var partyDtos = JsonSerializer.Deserialize<List<PoliticalPartyJson>>(jsonContent);
            
            if (partyDtos == null || !partyDtos.Any())
            {
                return false;
            }

            transaction = await context.Database.BeginTransactionAsync();

            foreach (var dto in partyDtos)
            {
                try
                {
                    await ProcessPartyAsync(dto);
                }
                catch (Exception ex)
                {
                    var errorMsg = $"Failed to process party '{dto.political_party_name_np}': {ex.Message}";
                    logger.LogError(ex, errorMsg);
                }
            }

            // Commit transaction
            await context.SaveChangesAsync();
            await transaction.CommitAsync();

            return true;
        }
        catch (Exception ex)
        {
            if (transaction != null)
            {
                await transaction.RollbackAsync();
            }

            logger.LogError(ex, "Transaction failed during party import");
           
            return false;
        }
        finally
        {
            transaction?.Dispose();
        }
    }
    
    private async Task ProcessPartyAsync(PoliticalPartyJson dto)
    {
        // Validate DTO
        if (string.IsNullOrWhiteSpace(dto.political_party_name_np))
        {
            return;
        }
        
        // Download symbol image
        MediaFile symbolMediaFile;
        try
        {
            symbolMediaFile = await DownloadSymbolImageAsync(dto.political_party_symbol_image_url, dto.political_party_name_en);
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Failed to download symbol for {PartyName}, using placeholder", dto.political_party_name_np);
            symbolMediaFile = CreatePlaceholderImage(dto.political_party_name_en);
        }

        // Add media file to database
        await context.MediaFiles.AddAsync(symbolMediaFile);
        await context.SaveChangesAsync(); // Save to get MediaFileId

        // Create political party entity
        var party = new PoliticalParty
        {
            PoliticalPartyNameEn = dto.political_party_name_en,
            PoliticalPartyNameNp = dto.political_party_name_np,
            SymbolMediaFileId = symbolMediaFile.MediaFileId,
            SymbolMediaFile = symbolMediaFile
        };

        // Add party to database
        await context.PoliticalParties.AddAsync(party);
        
        logger.LogInformation("Successfully imported party: {PartyName}", dto.political_party_name_np);
    }

    private async Task<MediaFile> DownloadSymbolImageAsync(string imageUrl, string partyNameEn)
    {
        var httpClient = httpClientFactory.CreateClient();
        httpClient.Timeout = TimeSpan.FromSeconds(30);

        var response = await httpClient.GetAsync(imageUrl);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsByteArrayAsync();
        var contentType = response.Content.Headers.ContentType?.MediaType ?? "image/png";
        
        // Extract file extension from URL or content type
        var extension = GetFileExtension(imageUrl, contentType);
        var fileName = $"{SanitizeFileName(partyNameEn)}_symbol{extension}";

        return new MediaFile
        {
            Content = content,
            ContentType = contentType,
            FileName = fileName,
            Size = content.Length
        };
    }

    private MediaFile CreatePlaceholderImage(string partyNameEn)
    {
        // Create a minimal 1x1 transparent PNG as placeholder
        byte[] placeholderPng =
        [
            0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
            0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
            0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
            0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
            0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
            0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
        ];

        return new MediaFile
        {
            Content = placeholderPng,
            ContentType = "image/png",
            FileName = $"{SanitizeFileName(partyNameEn)}_placeholder.png",
            Size = placeholderPng.Length
        };
    }

    private string GetFileExtension(string url, string contentType)
    {
        // Try to get extension from URL
        var urlExtension = Path.GetExtension(new Uri(url).LocalPath);
        if (!string.IsNullOrEmpty(urlExtension))
        {
            return urlExtension;
        }

        // Fallback to content type
        return contentType switch
        {
            "image/png" => ".png",
            "image/jpeg" => ".jpg",
            "image/jpg" => ".jpg",
            "image/gif" => ".gif",
            "image/webp" => ".webp",
            _ => ".png"
        };
    }

    private string SanitizeFileName(string fileName)
    {
        var invalidChars = Path.GetInvalidFileNameChars();
        var sanitized = string.Join("_", fileName.Split(invalidChars, StringSplitOptions.RemoveEmptyEntries));
        return sanitized.Length > 50 ? sanitized.Substring(0, 50) : sanitized;
    }
}