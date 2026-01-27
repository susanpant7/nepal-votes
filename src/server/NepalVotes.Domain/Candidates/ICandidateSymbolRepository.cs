using NepalVotes.Domain.Common;

namespace NepalVotes.Domain.Candidates;

public interface ICandidateSymbolRepository
{
    Task<(List<CandidateSymbol> items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize);
    Task AddAsync(CandidateSymbol candidateSymbol);
    Task<bool> IsInUseAsync(int candidateSymbolId);
    Task<CandidateSymbol?> GetByIdAsync(int id);
    void Delete(CandidateSymbol candidateSymbol);
}