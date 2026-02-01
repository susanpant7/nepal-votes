namespace NepalVotes.Domain.Attributes;

[AttributeUsage(AttributeTargets.Field)]
public class DocumentMetadataAttribute(long maxSizeInBytes, params string[] allowedExtensions) : Attribute
{
    public long MaxSizeInBytes { get; } = maxSizeInBytes;
    public string[] AllowedExtensions { get; } = allowedExtensions;
}