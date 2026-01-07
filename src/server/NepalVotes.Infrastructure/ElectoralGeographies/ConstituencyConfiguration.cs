using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class ConstituencyConfiguration : IEntityTypeConfiguration<Constituency>
{
    public void Configure(EntityTypeBuilder<Constituency> builder)
    {
        builder.Property(p=>p.ConstituencyName)
            .HasMaxLength(50)
            .IsRequired();
        
        // ConstituencyName should be unique
        builder.HasIndex(m => new {m.ConstituencyName})
            .IsUnique();
    }
}