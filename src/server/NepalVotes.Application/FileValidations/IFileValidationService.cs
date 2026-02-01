using NepalVotes.Domain.Users;

namespace NepalVotes.Application.FileValidations;

public interface IFileValidationService
{
    FileValidationResponse Validate(string fileName, long fileLength, UserDocumentType documentType);
}