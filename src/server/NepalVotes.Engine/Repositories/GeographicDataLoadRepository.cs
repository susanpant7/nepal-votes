using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Engine.Models;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Engine.Repositories;

public class GeographicDataLoadRepository (ApplicationDbContext context) : IGeographicDataLoadRepository
{
public async Task SaveProvinceAsync(List<ProvinceEn> englishJsonObject, List<ProvinceNp> nepaliJsonObject)
{
    await using var transaction = await context.Database.BeginTransactionAsync();

    try
    {
        foreach (var enProv in englishJsonObject)
        {
            var npProv = nepaliJsonObject.FirstOrDefault(x => x.id == enProv.id);

            var province = new Province
            {
                ProvinceNameEn = enProv.name,
                ProvinceNameNp = npProv?.name ?? enProv.name,
                CreatedAt = DateTimeOffset.UtcNow,
            };

            context.Provinces.Add(province);
            await context.SaveChangesAsync();

            foreach (var distEntry in enProv.districts)
            {
                var distKey = distEntry.Key;
                var enDist = distEntry.Value;
                
                var npDist = npProv?.districts?.GetValueOrDefault(distKey);

                var district = new District
                {
                    DistrictNameEn = enDist.name,
                    DistrictNameNp = npDist?.name ?? enDist.name,
                    ProvinceId = province.ProvinceId,
                    CreatedAt = DateTimeOffset.UtcNow,
                };

                context.Districts.Add(district);
                await context.SaveChangesAsync();

                foreach (var munEntry in enDist.municipalities)
                {
                    var enMun = munEntry.Value;

                    var npMun = npDist?.municipalities.Values
                        .FirstOrDefault(m => m.id == enMun.id && m.district_id==enMun.district_id);

                    var municipality = new Municipality
                    {
                        MunicipalityNameEn = enMun.name,
                        MunicipalityNameNp = npMun?.name ?? enMun.name,
                        MunicipalityType = (MunicipalityType)enMun.category_id,
                        DistrictId = district.DistrictId,
                        CreatedAt = DateTimeOffset.UtcNow,
                    };

                    context.Municipalities.Add(municipality);
                    await context.SaveChangesAsync();

                    // 4. Handle Wards (Mapping int to Nepali string by index)
                    if (enMun.wards != null)
                    {
                        for (int i = 0; i < enMun.wards.Count; i++)
                        {
                            int wardNum = enMun.wards[i];

                            context.Wards.Add(new Ward
                            {
                                WardNumber = wardNum,
                                WardName = $"Ward No. {wardNum}",
                                MunicipalityId = municipality.MunicipalityId,
                                CreatedAt = DateTimeOffset.UtcNow
                            });
                        }
                    }
                }
                await context.SaveChangesAsync();
            }
        }

        await transaction.CommitAsync();
    }
    catch (Exception)
    {
        await transaction.RollbackAsync();
        throw;
    }
}}