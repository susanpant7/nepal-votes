using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.Users;

namespace NepalVotes.Infrastructure.Users;

public class UserDocumentConfiguration : IEntityTypeConfiguration<UserDocument>
{
    public void Configure(EntityTypeBuilder<UserDocument> builder)
    {
        builder.Property(ud => ud.DocumentType).IsRequired();
        builder.HasOne(ud => ud.User)
            .WithMany(u => u.UserDocuments)
            .HasForeignKey(ud => ud.UserId)
            .OnDelete(DeleteBehavior.Restrict); 
        builder.HasOne(ud => ud.UserDocumentMediaFile)
            .WithOne()
            .HasForeignKey<UserDocument>(ud => ud.UserDocumentMediaFileId)
            .OnDelete(DeleteBehavior.Restrict); 
    }
}