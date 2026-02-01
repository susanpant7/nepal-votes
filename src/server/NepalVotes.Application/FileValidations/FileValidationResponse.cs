namespace NepalVotes.Application.FileValidations;

public class FileValidationResponse(bool isValid, string message)
{
    public bool IsValid { get; set; } = isValid;
    public string Message { get; set; } = message;
}