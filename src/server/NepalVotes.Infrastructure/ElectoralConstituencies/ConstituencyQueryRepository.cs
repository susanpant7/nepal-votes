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
    
    public async Task<List<ProvinceWithUnassignedWards>> GetUnassignedWardsGroupedAsync()
    {
        return await context.Wards
            .Where(w => w.ConstituencyId == null)
            .Select(w => new
            {
                w.WardId,
                w.WardNumber,
                w.WardName,
                MunicipalityId = w.Municipality.MunicipalityId,
                MunicipalityName = w.Municipality.MunicipalityName,
                DistrictId = w.Municipality.District.DistrictId,
                DistrictName = w.Municipality.District.DistrictName,
                ProvinceId = w.Municipality.District.Province.ProvinceId,
                ProvinceName = w.Municipality.District.Province.ProvinceName
            })
            .GroupBy(x => new { x.ProvinceId, x.ProvinceName })
            .Select(p => new ProvinceWithUnassignedWards
            {
                ProvinceId = p.Key.ProvinceId,
                ProvinceName = p.Key.ProvinceName,
                Districts = p
                    .GroupBy(d => new { d.DistrictId, d.DistrictName })
                    .Select(d => new DistrictWithUnassignedWards
                    {
                        DistrictId = d.Key.DistrictId,
                        DistrictName = d.Key.DistrictName,
                        Municipalities = d
                            .GroupBy(m => new { m.MunicipalityId, m.MunicipalityName })
                            .Select(m => new MunicipalityWithUnassignedWards
                            {
                                MunicipalityId = m.Key.MunicipalityId,
                                MunicipalityName = m.Key.MunicipalityName,
                                Wards = m
                                    .Select(w => new UnassignedWard
                                    {
                                        WardId = w.WardId,
                                        WardNumber = w.WardNumber,
                                        WardName = w.WardName
                                    })
                                    .OrderBy(w => w.WardNumber)
                                    .ToList()
                            })
                            .OrderBy(m => m.MunicipalityName)
                            .ToList()
                    })
                    .OrderBy(d => d.DistrictName)
                    .ToList()
            })
            .OrderBy(p => p.ProvinceName)
            .ToListAsync();

    }
}
