using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Engine.Models;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Engine.Repositories;

public class GeographicDataLoadRepository (ApplicationDbContext context) : IGeographicDataLoadRepository
{
    public async Task SaveProvinceAsync(List<ProvinceJson> englishJsonObject, List<ProvinceJson> nepaliJsonObject)
    {
        await using var transaction = await context.Database.BeginTransactionAsync();

        foreach (var provinceJson in englishJsonObject)
        {
            var province = new Province
            {
                ProvinceNameEn = provinceJson.name,
                CreatedAt =  DateTimeOffset.UtcNow,
            };

            context.Provinces.Add(province);
            await context.SaveChangesAsync();

            foreach (var districtJson in provinceJson.districts.Values)
            {
                var district = new District
                {
                    DistrictNameEn = districtJson.name,
                    ProvinceId = province.ProvinceId,
                    CreatedAt =  DateTimeOffset.UtcNow,
                };

                context.Districts.Add(district);
                await context.SaveChangesAsync();

                foreach (var municipalityJson in districtJson.municipalities.Values)
                {
                    var municipality = new Municipality
                    {
                        MunicipalityNameEn = municipalityJson.name,
                        MunicipalityType = (MunicipalityType)municipalityJson.category_id,
                        DistrictId = district.DistrictId,
                        CreatedAt =  DateTimeOffset.UtcNow,
                    };

                    context.Municipalities.Add(municipality);
                    await context.SaveChangesAsync();

                    foreach (var wardNumber in municipalityJson.wards)
                    {
                        var ward = new Ward
                        {
                            WardNumber = wardNumber,
                            WardName = $"Ward Number {wardNumber}",
                            MunicipalityId = municipality.MunicipalityId,
                            CreatedAt = DateTimeOffset.UtcNow
                        };

                        context.Wards.Add(ward);
                    }
                    await context.SaveChangesAsync();
                }
            }
        }

        await context.SaveChangesAsync();
        await transaction.CommitAsync();
    }

}