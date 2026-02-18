namespace NepalVotes.Engine.Models;

public class CandidateJsonDto
{
    public int    CandidateId              { get; set; }
    public string CandidateNameEn          { get; set; } = null!;
    public string CandidateNameNp          { get; set; } = null!;
    public string PoliticalPartyNameEn     { get; set; } = null!;
    public string PoliticalPartyNameNp     { get; set; } = null!;
    public string DistrictNameEn           { get; set; } = null!;
    public string DistrictNameNp           { get; set; } = null!;
    public int    ConstituencyNumber        { get; set; }
    public int    Age                      { get; set; }
    public string DOB                      { get; set; } = null!;
    public string CandidateSymbolNameNp    { get; set; } = null!;
    public string CandidateSymbolNameEn    { get; set; } = null!;
}