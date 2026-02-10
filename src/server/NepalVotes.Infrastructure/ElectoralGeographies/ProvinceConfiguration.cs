using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class ProvinceConfiguration : IEntityTypeConfiguration<Province>
{
    public void Configure(EntityTypeBuilder<Province> builder)
    {
        builder.Property(p=>p.ProvinceNameEn).HasMaxLength(50).IsRequired();
    }
}