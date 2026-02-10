using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class DistrictConfiguration : IEntityTypeConfiguration<District>
{
    public void Configure(EntityTypeBuilder<District> builder)
    {
        builder.Property(p=>p.DistrictNameEn)
            .HasMaxLength(50)
            .IsRequired();
        
        // district name should be unique
        builder.HasIndex(d => d.DistrictNameEn)
            .IsUnique();
        
        // if uniqueness required per province
        // builder.HasIndex(d => new { d.ProvinceId, d.DistrictName }).IsUnique();
        
        // 1 district 1 province
        // 1 province n districts
        // fk - province id
        builder.HasOne(p => p.Province)
            .WithMany(p => p.Districts)
            .HasForeignKey(f=>f.ProvinceId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}