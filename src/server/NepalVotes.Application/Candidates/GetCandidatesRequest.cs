namespace NepalVotes.Application.Candidates;

public class GetCandidatesRequest
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    public List<int>? ConstituencyIds { get; set; }
    public List<int>? PoliticalPartyIds { get; set; }
    public bool? IsIndependent { get; set; }
}
