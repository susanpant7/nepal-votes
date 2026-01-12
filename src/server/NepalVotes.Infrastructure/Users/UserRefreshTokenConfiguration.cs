using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.Users;

namespace NepalVotes.Infrastructure.Users;

public class UserRefreshTokenConfiguration : IEntityTypeConfiguration<UserRefreshToken>
{
    public void Configure(EntityTypeBuilder<UserRefreshToken> builder)
    {
        builder.Property(e => e.RefreshToken)
            .IsRequired()
            .HasMaxLength(256);
        
        builder.HasOne(u => u.User)
            .WithOne(r => r.UserRefreshToken)
            .HasForeignKey<UserRefreshToken>(u => u.UserId)
            .OnDelete(DeleteBehavior.Cascade); 
    }
}