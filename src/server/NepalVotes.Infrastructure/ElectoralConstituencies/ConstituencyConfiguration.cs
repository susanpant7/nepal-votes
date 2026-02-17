using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.ElectoralConstituencies;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Infrastructure.ElectoralConstituencies;

public class ConstituencyConfiguration : IEntityTypeConfiguration<Constituency>
{
    public void Configure(EntityTypeBuilder<Constituency> builder)
    {
        builder.Property(p=>p.ConstituencyNameEn)
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(p=>p.ConstituencyNameNp)
            .HasMaxLength(50)
            .IsRequired();
        
        // ConstituencyName should be unique
        builder.HasIndex(m => new { ConstituencyName = m.ConstituencyNameEn})
            .IsUnique();
        builder.HasIndex(m => new { ConstituencyName = m.ConstituencyNameNp})
            .IsUnique();
    }
}