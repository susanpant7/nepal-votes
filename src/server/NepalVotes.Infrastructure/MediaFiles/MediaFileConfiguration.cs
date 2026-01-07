using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NepalVotes.Domain.MediaFiles;

namespace NepalVotes.Infrastructure.MediaFiles;

public class MediaFileConfiguration : IEntityTypeConfiguration<MediaFile>
{
    public void Configure(EntityTypeBuilder<MediaFile> builder)
    {
        builder.Property(m => m.ContentType).IsRequired();
        builder.Property(m => m.FileName).IsRequired();
        builder.Property(m => m.Content).IsRequired();
    }
}