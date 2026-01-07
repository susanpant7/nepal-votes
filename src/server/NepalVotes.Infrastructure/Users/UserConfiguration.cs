using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.Users;

namespace NepalVotes.Infrastructure.Users;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
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

        builder.Property(u => u.MobileNumber)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(u => u.Status)
            .HasConversion<int>() // store enum as int
            .IsRequired();

        builder.Property(u => u.RequestDate)
            .IsRequired();

        builder.Property(u => u.ApprovedDate)
            .IsRequired(false); // nullable
        
        builder.HasOne(u => u.VotingPlace)
            .WithMany()
            .HasForeignKey(u => u.VotingPlaceId)
            .OnDelete(DeleteBehavior.Restrict); 
        
        builder.HasOne(u => u.ApprovedByUser)
            .WithMany()
            .HasForeignKey(u => u.ApprovedByUserId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasMany(u => u.Roles)
            .WithMany(r => r.Users)
            .UsingEntity(j => j.ToTable("UserRoles"));
    }
}