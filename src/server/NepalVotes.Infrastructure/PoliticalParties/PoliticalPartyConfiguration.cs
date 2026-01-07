using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.PoliticalParties;

namespace NepalVotes.Infrastructure.PoliticalParties;

public class PoliticalPartyConfiguration : IEntityTypeConfiguration<PoliticalParty>
{
    public void Configure(EntityTypeBuilder<PoliticalParty> builder)
    {
        builder.Property(p=>p.PoliticalPartyName).HasMaxLength(100).IsRequired();
        builder.HasOne(p=>p.PartyLeader)
            .WithOne()
            .HasForeignKey<PoliticalParty>(p => p.PartyLeaderId)
            .OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(p=>p.SymbolMediaFile)
            .WithOne()
            .HasForeignKey<PoliticalParty>(p=>p.SymbolMediaFileId)
            .OnDelete(DeleteBehavior.Restrict); 
    }
}