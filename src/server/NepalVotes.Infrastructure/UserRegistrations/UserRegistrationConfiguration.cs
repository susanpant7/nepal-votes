using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.UserRegistrations;

namespace NepalVotes.Infrastructure.UserRegistrations;

public class UserRegistrationConfiguration : IEntityTypeConfiguration<UserRegistration>
{
    public void Configure(EntityTypeBuilder<UserRegistration> builder)
    {
        builder.Property(u => u.FirstName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(u => u.MiddleName)
            .HasMaxLength(100)
            .IsRequired(false); // optional

        builder.Property(u => u.LastName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(u => u.DateOfBirth)
            .IsRequired();
        
        builder.Property(u => u.MobileNumber)
            .HasMaxLength(20)
            .IsRequired();
        
        builder.Property(u => u.VoterIdNumber)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(u => u.Status)
            .HasConversion<int>() // store enum as int
            .IsRequired();
        
        builder.Property(u => u.RequestDate)
            .IsRequired();

        builder.Property(u => u.ReviewComment)
            .IsRequired(false);
        
        builder.Property(x => x.HashedOtpCode)
            .IsRequired()
            .HasMaxLength(256); // PasswordHasher output is usually ~100 chars

        builder.Property(x => x.OtpExpiryDate)
            .IsRequired();

        builder.Property(x => x.IsOtpUsed)
            .HasDefaultValue(false);

        builder.Property(x => x.AttemptCount)
            .HasDefaultValue(0);
   
        // 1 user registration has 1 voting place, fk voting place id, if voting place deleted, delete user registration as well
        builder.HasOne(ur=>ur.Ward)
            .WithMany()
            .HasForeignKey(ur=>ur.WardId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}