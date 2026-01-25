namespace NepalVotes.Application.ElectoralConstituencies;

public interface IConstituencyQueryRepository
{
    Task<List<ConstituencyListItem>> GetByDistrictAsync(int districtId);
}
