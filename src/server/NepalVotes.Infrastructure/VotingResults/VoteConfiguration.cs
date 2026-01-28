using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.VotingResults;

namespace NepalVotes.Infrastructure.VotingResults;

public class VoteConfiguration : IEntityTypeConfiguration<Vote>
{
    public void Configure(EntityTypeBuilder<Vote> builder)
    {
        builder.Property(v=>v.VotedFromLocation).HasMaxLength(100).IsRequired();
        builder.HasOne(v=>v.Candidate)
            .WithMany()
            .HasForeignKey(v=>v.CandidateId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(v=>v.Constituency)
            .WithMany()
            .HasForeignKey(v=>v.ConstituencyId)
            .OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(v=>v.PoliticalParty)
            .WithMany()
            .HasForeignKey(v=>v.PoliticalPartyId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);
    }
}