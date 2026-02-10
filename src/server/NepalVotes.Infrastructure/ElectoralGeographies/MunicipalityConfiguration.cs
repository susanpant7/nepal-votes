using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class MunicipalityConfiguration : IEntityTypeConfiguration<Municipality>
{
    public void Configure(EntityTypeBuilder<Municipality> builder)
    {
        builder.Property(p=>p.MunicipalityNameEn)
            .HasMaxLength(50)
            .IsRequired();
        
        // municipality name should be unique per district
        builder.HasIndex(m => new { m.DistrictId, MunicipalityName = m.MunicipalityNameEn})
            .IsUnique();
         
        // 1 mun 1 dis
        // 1 dis n mun
        // fk - district id
        builder.HasOne(p => p.District)
            .WithMany(p => p.Municipalities)
            .HasForeignKey(f=>f.DistrictId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}