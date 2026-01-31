using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.UserRegistrations;

namespace NepalVotes.Infrastructure.UserRegistrations;

public class UserRegistrationDocumentConfiguration : IEntityTypeConfiguration<UserRegistrationDocument>
{
    public void Configure(EntityTypeBuilder<UserRegistrationDocument> builder)
    {
        builder.Property(ud => ud.DocumentType).IsRequired();
        builder.Property(m => m.ContentType).IsRequired();
        builder.Property(m => m.FileName).IsRequired();
        builder.Property(m => m.Content).IsRequired();
        
        // 1 URD has 1 UR, 1 UR has many URD, FK URId, delete mode restrict
        builder.HasOne(urd => urd.UserRegistration)
            .WithMany(ur=> ur.UserRegistrationDocuments)
            .HasForeignKey(ud => ud.UserRegistrationId)
            .OnDelete(DeleteBehavior.Cascade); // if UR is deleted, delete URDs also
    }
}