namespace NepalVotes.Domain.Candidates;

public interface ICandidateRepository
{
    public Task<IEnumerable<Candidate>> GetAllByConstituencyIdAsync(int? constituencyId = null);
    Task<Candidate?> GetByIdAsync(int id);
    Task AddAsync(Candidate candidate);
    Task UpdateAsync(Candidate candidate);
    Task DeleteAsync(Candidate candidate);
}