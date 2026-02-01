using NepalVotes.Domain.Attributes;
using NepalVotes.Domain.Users;

namespace NepalVotes.Domain.Extensions;

public static class UserDocumentTypeExtensions
{
    public static DocumentMetadataAttribute GetMetadata(this UserDocumentType docType)
    {
        var field = docType.GetType().GetField(docType.ToString());
        return (DocumentMetadataAttribute)Attribute.GetCustomAttribute(field, typeof(DocumentMetadataAttribute));
    }
}