using Microsoft.EntityFrameworkCore;
using NepalVotes.Application.ElectoralConstituencies;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.ElectoralConstituencies;

public class ConstituencyQueryRepository(ApplicationDbContext context) : IConstituencyQueryRepository
{
    public async Task<List<ConstituencyListItem>>
        GetByDistrictAsync(int districtId)
    {
        return await context.Constituencies
            .AsNoTracking()
            .Where(c =>
                c.Wards.Any(w =>
                    w.Municipality.District.DistrictId == districtId))
            .Select(c => new ConstituencyListItem
            {
                ConstituencyId = c.ConstituencyId,
                ConstituencyName = c.ConstituencyName,
                DistrictId = districtId,
                TotalWards = c.Wards.Count(),
                MunicipalityNameAndWardNumbers = c.Wards
                    .GroupBy(w => w.Municipality.MunicipalityName)
                    .Select(g => new MunicipalityNameAndWardNumbers
                    {
                        MunicipalityName = g.Key,
                        WardNumbers = string.Join(
                            ", ",
                            g.OrderBy(w => w.WardNumber)
                                .Select(w => w.WardNumber))
                    })
                    .ToList()
            })
            .ToListAsync();
    }
}
