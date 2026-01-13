namespace NepalVotes.Domain.Exceptions;

public class UserNotAuthenticatedException : Exception
{
    public UserNotAuthenticatedException() 
        : base("User identification claim is missing or invalid.") 
    {
    }

    public UserNotAuthenticatedException(string message) 
        : base(message) 
    {
    }
}