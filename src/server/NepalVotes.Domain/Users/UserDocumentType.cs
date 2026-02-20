using NepalVotes.Domain.Attributes;

namespace NepalVotes.Domain.Users;

public enum UserDocumentType
{
    [DocumentMetadata(3145728, ".jpg", ".jpeg", ".png")] // 3*1024*1024  = 3 MB
    CitizenshipFront = 1,
    [DocumentMetadata(3145728, ".jpg", ".jpeg", ".png")]
    CitizenshipBack = 2,
    [DocumentMetadata(3145728, ".jpg", ".jpeg", ".png")]
    Passport = 3,
    [DocumentMetadata(3145728, ".jpg", ".jpeg", ".png")]
    NationalIdentity = 4,
    [DocumentMetadata(3145728, ".jpg", ".jpeg", ".png")]
    VoterIdentity = 5,
}