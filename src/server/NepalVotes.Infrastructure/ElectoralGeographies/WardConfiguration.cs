using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class WardConfiguration : IEntityTypeConfiguration<Ward>
{
    public void Configure(EntityTypeBuilder<Ward> builder)
    {
        builder.Property(p=>p.WardName)
            .HasMaxLength(50)
            .IsRequired();
        
        // ward name should be unique per municipality
        builder.HasIndex(m => new { m.MunicipalityId, m.WardName})
            .IsUnique();
        
        // ward number should be unique per municipality
        builder.HasIndex(m => new { m.MunicipalityId, m.WardNumber})
            .IsUnique();
         
        // 1 ward 1 mun
        // 1 mun n wards
        // fk - mun id
        builder.HasOne(p => p.Municipality)
            .WithMany(p => p.Wards)
            .HasForeignKey(f=>f.MunicipalityId)
            .OnDelete(DeleteBehavior.Restrict);
        
        // 1 ward 1 constituency
        // 1 constituency n wards
        // fk constituency id
        builder.HasOne(p => p.Constituency)
            .WithMany(p => p.Wards)
            .HasForeignKey(f=>f.ConstituencyId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);
    }
}