namespace NepalVotes.Domain.Candidates;

public interface ICandidateRepository
{
    Task<(IEnumerable<Candidate> Items, int TotalCount)> GetAllAsync(int page = 1, int pageSize = 20, List<int>? constituencyIds = null, List<int>? politicalPartyIds = null, bool? isIndependent = null);
    Task<Candidate?> GetByIdAsync(int id);
    Task AddAsync(Candidate candidate);
    Task UpdateAsync(Candidate candidate);
    Task DeleteAsync(Candidate candidate);
    Task<bool> ExistsByUserIdAsync(int userId, int? excludeCandidateId = null);
    Task<string?> GetConstituencyNameByUserIdAsync(int userId, int? excludeId = null);
    Task<bool> IsPartyTakenInConstituencyAsync(int constituencyId, int partyId, int? excludeCandidateId = null);
    Task<bool> IsSymbolTakenInConstituencyAsync(int constituencyId, int symbolId, int? excludeCandidateId = null);
    /// <summary>Looks up the symbol media file for the political party whose name contains "independent" (case-insensitive).</summary>
    Task<(byte[]? Content, string? ContentType)?> GetIndependentPartySymbolAsync();
}