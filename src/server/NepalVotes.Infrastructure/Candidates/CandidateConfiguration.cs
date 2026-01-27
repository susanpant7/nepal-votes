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
        
        // builder.HasOne(e => e.CandidateSymbolMediaFile)
        //     .WithOne()
        //     .HasForeignKey<Candidate>(e => e.CandidateSymbolMediaFileId)
        //     .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne(e => e.Constituency)
            .WithMany(p => p.Candidates)
            .HasForeignKey(e => e.ConstituencyId)
            .OnDelete(DeleteBehavior.Restrict);
        
        // moved the candidate symbols link to media file table from a new table instead of linking to media file directly
        // 1 candidate has 1 candidate symbol , 1 candidate symbol has many candidates, FK (CandidateSymbolId) in candidate table, FK can be null, restrict to delete
        builder.HasOne(e => e.CandidateSymbol)
            .WithMany(p => p.Candidates)
            .HasForeignKey(e => e.CandidateSymbolId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);
        
        // One User = One Candidacy
        // This ensures a User cannot exist in the Candidate table more than once.
        builder.HasIndex(e => e.UserId)
            .IsUnique();
        
        // One Party per Constituency
        // Prevents: Party 'Raswopa' having two different candidates in 'Constituency Chitwan-1'.
        builder.HasIndex(e => new { e.ConstituencyId, e.PoliticalPartyId })
            .IsUnique()
            .HasFilter("[PoliticalPartyId] IS NOT NULL");
        
        // One Symbol per Constituency
        builder.HasIndex(e => new { e.ConstituencyId, e.CandidateSymbolId })
            .IsUnique()
            .HasFilter("[CandidateSymbolId] IS NOT NULL");
    }
}