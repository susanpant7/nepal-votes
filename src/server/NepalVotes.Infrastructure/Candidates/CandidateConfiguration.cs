using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.Candidates;

namespace NepalVotes.Infrastructure.Candidates;

public class CandidateConfiguration : IEntityTypeConfiguration<Candidate>
{
    public void Configure(EntityTypeBuilder<Candidate> builder)
    {
        builder.HasOne(e => e.User) // one candidate has one user
            .WithOne() // one user has one candidate
            .HasForeignKey<Candidate>(e => e.UserId) // foreign key
            .OnDelete(DeleteBehavior.Restrict); // if FK exist, its parent cant be deleted
        
        builder.HasOne(e => e.PoliticalParty)
            .WithMany(p => p.Candidates)
            .HasForeignKey(e => e.PoliticalPartyId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne(e => e.CandidateSymbolMediaFile)
            .WithOne()
            .HasForeignKey<Candidate>(e => e.CandidateSymbolMediaFileId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne(e => e.Constituency)
            .WithMany(p => p.Candidates)
            .HasForeignKey(e => e.ConstituencyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}