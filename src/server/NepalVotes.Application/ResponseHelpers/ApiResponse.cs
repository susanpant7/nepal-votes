namespace NepalVotes.Application.ResponseHelpers;

public class ApiResponse<T>
{
    /// <summary>
    /// Indicates whether the request was successful
    /// </summary>
    public bool Success { get; set; }

    /// <summary>
    /// Message for client (success/info/error)
    /// </summary>
    public string? Message { get; set; }

    /// <summary>
    /// HTTP status code or custom status identifier
    /// </summary>
    public int Status { get; set; }

    /// <summary>
    /// Collection of error messages or validation errors
    /// </summary>
    public IEnumerable<string>? Errors { get; set; }

    /// <summary>
    /// The main payload (data)
    /// </summary>
    public T? Data { get; set; }

    /// <summary>
    /// Optional metadata (paging, etc.)
    /// </summary>
    public object? Meta { get; set; }

    /// <summary>
    /// Timestamp of the response
    /// </summary>
    public DateTimeOffset Timestamp { get; set; } = DateTimeOffset.UtcNow;

    // Convenience constructors
    public ApiResponse() { }

    public ApiResponse(T data, bool success = true, string? message = null, int status = 200, IEnumerable<string>? errors = null, object? meta = null)
    {
        Data = data;
        Success = success;
        Message = message;
        Status = status;
        Errors = errors;
        Meta = meta;
    }

    // Static helpers
    public static ApiResponse<T> SuccessResponse(T data, string message = "Api Request Success", int status = 200, object? meta = null)
        => new ApiResponse<T>(data, true, message, status, null, meta);

    public static ApiResponse<T> ErrorResponse(string message, int status = 400, IEnumerable<string>? errors = null, object? meta = null)
        => new ApiResponse<T>(default!, false, message, status, errors, meta);
}