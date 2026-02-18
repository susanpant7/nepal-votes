using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.Candidates;

namespace NepalVotes.Infrastructure.Candidates;

public class CandidateSymbolConfiguration : IEntityTypeConfiguration<CandidateSymbol>
{
    public void Configure(EntityTypeBuilder<CandidateSymbol> builder)
    {
        builder.Property(u => u.CandidateSymbolNameEn)
            .HasMaxLength(100)
            .IsRequired();
        builder.Property(u => u.CandidateSymbolNameNp)
            .HasMaxLength(100)
            .IsRequired();
        
        // 1 candidate symbol has 1 media file, 1 media file has 1 candidate symbol,
        // FK (MediaFileId) in candidate symbol table, FK can not be null, restrict to delete
        builder.HasOne(c=> c.CandidateSymbolMediaFile)
            .WithOne()
            .HasForeignKey<CandidateSymbol>(c => c.CandidateSymbolMediaFileId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);
    }
}