namespace NepalVotes.Domain.Candidates;

public interface ICandidateRepository
{
    public Task<IEnumerable<Candidate>> GetAllByConstituencyIdAsync(int? constituencyId = null);
    Task<Candidate?> GetByIdAsync(int id);
    Task AddAsync(Candidate candidate);
    Task UpdateAsync(Candidate candidate);
    Task DeleteAsync(Candidate candidate);
    Task<bool> ExistsByUserIdAsync(int userId, int? excludeCandidateId = null);
    Task<string?> GetConstituencyNameByUserIdAsync(int userId, int? excludeId = null);
    Task<bool> IsPartyTakenInConstituencyAsync(int constituencyId, int partyId, int? excludeCandidateId = null);
    Task<bool> IsSymbolTakenInConstituencyAsync(int constituencyId, int symbolId, int? excludeCandidateId = null);
}