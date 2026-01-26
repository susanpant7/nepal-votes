namespace NepalVotes.Domain.Candidates;

public interface ICandidateRepository
{
    Task<IEnumerable<Candidate>> GetAllAsync();
    Task<Candidate?> GetByIdAsync(int id);
    Task AddAsync(Candidate candidate);
    Task DeleteAsync(Candidate candidate);
}