using System.Text.Json;
using NepalVotes.Application.Utilities;
using NepalVotes.Domain.Users;
using NepalVotes.Engine.Models;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Engine.Repositories;

public class UserDataLoadRepository(ILogger<UserDataLoadRepository> logger,
    ApplicationDbContext context) : IUserDataLoadRepository
{
    private const int BatchSize = 500;
    
    public async Task<bool> ImportUsersFromJsonAsync(string jsonFilePath)
    {
        try
        {
            var jsonContent = await File.ReadAllTextAsync(jsonFilePath);
            return await ImportUsersFromJsonStringAsync(jsonContent);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to read JSON file: {FilePath}", jsonFilePath);
            return false;
        }
    }

    private async Task<bool> ImportUsersFromJsonStringAsync(string jsonContent)
    {
        var dtos = JsonSerializer.Deserialize<List<UserJsonDto>>(jsonContent);
        logger.LogInformation("Loaded {Count} records from JSON", dtos?.Count);

        if (dtos is { Count: 0 })
        {
            logger.LogError("No records found in JSON");
            return false;
        }

        var (users, skipped) = MapToEntities(dtos!);
        logger.LogInformation(
            $"Mapped users : {skipped}");

        await BulkInsertAsync(users);

        logger.LogInformation("User seeding finished.");
        return true;

    }
    
    private (List<User> users, bool skipped) MapToEntities(List<UserJsonDto> dtos)
    {
        var users   = new List<User>(dtos.Count);

        for (var i = 0; i < dtos.Count; i++)
        {
            var dto = dtos[i];
            try
            {
                var dobAd = ConvertDob(dto.DateOfBirth, i);

                if (dobAd == null)
                {
                    logger.LogError($"Could not convert dob date {dto.DateOfBirth} to dob date");
                    return ([], false);
                }
                users.Add(new User
                {
                    FirstNameEn      = dto.FirstNameEn,
                    MiddleNameEn     = NullIfBlank(dto.MiddleNameEn),
                    LastNameEn       = dto.LastNameEn,
                    FirstNameNp      = dto.FirstNameNp,
                    MiddleNameNp     = NullIfBlank(dto.MiddleNameNp),
                    LastNameNp       = dto.LastNameNp,
                    DateOfBirth      = (DateOnly)dobAd,
                    MobileNumber     = dto.MobileNumber,
                    NationalIdNumber = dto.NationalIdNumber,
                    VoterIdNumber    = dto.VoterIdNumber,
                    Status           = (UserStatus)dto.Status,
                    WardId           = dto.WardId
                });
            }
            catch (Exception ex)
            {
                logger.LogWarning(
                    "Skipping record [{Index}] {Name} — DOB: {Dob} — Error: {Error}",
                    i,
                    $"{dto.FirstNameEn} {dto.LastNameEn}",
                    dto.DateOfBirth,
                    ex.Message);
                return ([],false);
            }
        }

        return (users, true);
    }
    
    private static string? NullIfBlank(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value;

    private DateOnly? ConvertDob(string? bsDateStr, int recordIndex)
    {
        if (string.IsNullOrWhiteSpace(bsDateStr))
        {
            logger.LogWarning("Record [{Index}] has a null/blank DateOfBirth — storing as null", recordIndex);
            return null;
        }

        try
        {
            var adDate = NepaliEnglishDateConverter.ConvertToAd(bsDateStr);
            logger.LogDebug("Record [{Index}] DOB: {Bs} (BS) → {Ad} (AD)", recordIndex, bsDateStr, adDate);
            return adDate;
        }
        catch (Exception ex)
        {
            throw new ArgumentException(
                $"Failed to convert BS date '{bsDateStr}' at record index {recordIndex}", ex);
        }
    }

    private async Task BulkInsertAsync(IEnumerable<User> users)
    {
        await using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            context.ChangeTracker.AutoDetectChangesEnabled = false;

            var batch = new List<User>(BatchSize);
            int batchNumber = 0;
            int totalInserted = 0;

            foreach (var user in users)
            {
                batch.Add(user);

                if (batch.Count >= BatchSize)
                {
                    await SaveBatchAsync(batch, ++batchNumber);
                    totalInserted += batch.Count;
                    batch.Clear();
                }
            }

            if (batch.Count > 0)
            {
                await SaveBatchAsync(batch, ++batchNumber);
                totalInserted += batch.Count;
            }

            await transaction.CommitAsync();

            logger.LogInformation("BulkInsert complete. Total users inserted: {Total}", totalInserted);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            logger.LogError(ex, "BulkInsert failed. Transaction rolled back.");
            throw;
        }
        finally
        {
            context.ChangeTracker.AutoDetectChangesEnabled = true;
        }
    }

    private async Task SaveBatchAsync(List<User> batch, int batchNumber)
    {
        await context.Users.AddRangeAsync(batch);
        await context.SaveChangesAsync();

        context.ChangeTracker.Clear();

        logger.LogInformation("Saved batch {BatchNumber} ({Count} records)", batchNumber, batch.Count);
    }
}