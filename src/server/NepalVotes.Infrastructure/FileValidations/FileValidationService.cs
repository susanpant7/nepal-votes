using NepalVotes.Application.FileValidations;
using NepalVotes.Domain.Extensions;
using NepalVotes.Domain.Users;

namespace NepalVotes.Infrastructure.FileValidations;

public class FileValidationService : IFileValidationService
{
    public FileValidationResponse Validate(string fileName, long fileLength, UserDocumentType documentType)
    {
        var metadata = documentType.GetMetadata();
        
        if (fileLength > metadata.MaxSizeInBytes)
            return new FileValidationResponse(false, $"{fileName} exceeds maximum size of ${metadata.MaxSizeInBytes/(1024*1024)}MB.");

        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        var allowed = metadata.AllowedExtensions;

        return !allowed.Contains(extension) 
            ? new FileValidationResponse(false, $"{fileName} has invalid extension. Allowed: {string.Join(", ", allowed)}") 
            : new FileValidationResponse(true, string.Empty);
    }
}