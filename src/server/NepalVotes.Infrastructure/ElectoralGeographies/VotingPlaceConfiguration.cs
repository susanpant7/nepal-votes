using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class VotingPlaceConfiguration : IEntityTypeConfiguration<VotingPlace>
{
    public void Configure(EntityTypeBuilder<VotingPlace> builder)
    {
        builder.Property(p=>p.VotingPlaceAddress)
            .HasMaxLength(100)
            .IsRequired();
        
        // VotingPlaceAddress should be unique per ward
        builder.HasIndex(m => new { m.WardId, m.VotingPlaceAddress})
            .IsUnique();

        builder.HasOne(p => p.Ward)
            .WithMany(p => p.VotingPlaces)
            .HasForeignKey(f=>f.WardId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}