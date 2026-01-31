using NepalVotes.Domain.Users;

namespace NepalVotes.Domain.UserRegistrations;

public class UserRegistrationDocument
{
    public int UserRegistrationDocumentId { get; set; }
    public UserDocumentType DocumentType { get; set; }
    
    // document file fields
    public byte[] Content { get; set; }
    public string ContentType { get; set; } 
    public string FileName { get; set; }
    public long Size { get; set; }
    
    public int UserRegistrationId { get; set; }
    public UserRegistration UserRegistration { get; set; }
}