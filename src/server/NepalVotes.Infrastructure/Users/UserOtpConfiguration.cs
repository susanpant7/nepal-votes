using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.Users;

namespace NepalVotes.Infrastructure.Users;

public class UserOtpConfiguration : IEntityTypeConfiguration<UserOtp>
{
    public void Configure(EntityTypeBuilder<UserOtp> builder)
    {
        builder.Property(x => x.HashedOtpCode)
            .IsRequired()
            .HasMaxLength(256); // PasswordHasher output is usually ~100 chars

        builder.Property(x => x.ExpiryDate)
            .IsRequired();

        builder.Property(x => x.IsUsed)
            .HasDefaultValue(false);

        builder.Property(x => x.AttemptCount)
            .HasDefaultValue(0);
        
        builder.Property(x => x.UserOtpType)
            .IsRequired()
            .HasDefaultValue(UserOtpType.Login)
            .HasSentinel(0); // Tells EF: If value is 0, use the DB default (Login)

        // One-to-Many Relationship (User -> many UserOtps)
        builder.HasOne(x => x.User)
            .WithMany(u => u.UserOtps)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade); // user delete -> otps delete
    }
}