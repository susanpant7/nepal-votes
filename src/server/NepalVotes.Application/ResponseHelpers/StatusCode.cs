namespace NepalVotes.Application.ResponseHelpers;

public static class StatusCode
{
    // --- 1xx Informational ---
    /// <summary> 100: The server has received the request headers and the client should proceed to send the body. </summary>
    public const int Continue = 100;
    /// <summary> 101: The requester has asked the server to switch protocols. </summary>
    public const int SwitchingProtocols = 101;
    /// <summary> 102: The server has received and is processing the request, but no response is available yet. </summary>
    public const int Processing = 102;
    /// <summary> 103: Used to return some response headers before final HTTP message. </summary>
    public const int EarlyHints = 103;

    // --- 2xx Success ---
    /// <summary> 200: Standard response for successful HTTP requests. </summary>
    public const int Ok = 200;
    /// <summary> 201: The request has been fulfilled, resulting in the creation of a new resource. </summary>
    public const int Created = 201;
    /// <summary> 202: The request has been accepted for processing, but the processing has not been completed. </summary>
    public const int Accepted = 202;
    /// <summary> 203: The server is a transforming proxy that received a 200 OK from its origin but is returning a modified version. </summary>
    public const int NonAuthoritative = 203;
    /// <summary> 204: The server successfully processed the request and is not returning any content. </summary>
    public const int NoContent = 204;
    /// <summary> 205: The server successfully processed the request and requires that the requester reset the document view. </summary>
    public const int ResetContent = 205;
    /// <summary> 206: The server is delivering only part of the resource due to a range header sent by the client. </summary>
    public const int PartialContent = 206;
    /// <summary> 207: Conveys information about multiple resources (WebDAV). </summary>
    public const int MultiStatus = 207;
    /// <summary> 208: The members of a DAV binding have already been enumerated in a preceding part of the response. </summary>
    public const int AlreadyReported = 208;
    /// <summary> 226: The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance. </summary>
    public const int ImUsed = 226;

    // --- 3xx Redirection ---
    /// <summary> 300: Indicates multiple options for the resource from which the client may choose. </summary>
    public const int MultipleChoices = 300;
    /// <summary> 301: This and all future requests should be directed to the given URI. </summary>
    public const int MovedPermanently = 301;
    /// <summary> 302: Tells the client to look at (browse to) another URL temporarily. </summary>
    public const int Found = 302;
    /// <summary> 303: The response to the request can be found under another URI using the GET method. </summary>
    public const int SeeOther = 303;
    /// <summary> 304: Indicates that the resource has not been modified since the version specified by the request headers. </summary>
    public const int NotModified = 304;
    /// <summary> 305: The requested resource is available only through a proxy, the address for which is provided in the response. </summary>
    public const int UseProxy = 305;
    /// <summary> 306: No longer used. Originally meant "Subsequent requests should use the specified proxy." </summary>
    public const int SwitchProxy = 306;
    /// <summary> 307: The request should be repeated with another URI; however, future requests should still use the original URI. </summary>
    public const int TemporaryRedirect = 307;
    /// <summary> 308: The request and all future requests should be repeated using another URI. </summary>
    public const int PermanentRedirect = 308;

    // --- 4xx Client Errors ---
    /// <summary> 400: The server cannot or will not process the request due to an apparent client error. </summary>
    public const int BadRequest = 400;
    /// <summary> 401: Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. </summary>
    public const int Unauthorized = 401;
    /// <summary> 402: Reserved for future use. Originally intended for digital payment systems. </summary>
    public const int PaymentRequired = 402;
    /// <summary> 403: The user might be logged in but does not have the necessary permissions for the resource. </summary>
    public const int Forbidden = 403;
    /// <summary> 404: The requested resource could not be found but may be available in the future. </summary>
    public const int NotFound = 404;
    /// <summary> 405: A request method is not supported for the requested resource. </summary>
    public const int MethodNotAllowed = 405;
    /// <summary> 406: The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request. </summary>
    public const int NotAcceptable = 406;
    /// <summary> 407: The client must first authenticate itself with the proxy. </summary>
    public const int ProxyAuthRequired = 407;
    /// <summary> 408: The server timed out waiting for the request. </summary>
    public const int RequestTimeout = 408;
    /// <summary> 409: Indicates that the request could not be processed because of conflict in the current state of the resource. </summary>
    public const int Conflict = 409;
    /// <summary> 410: Indicates that the resource requested is no longer available and will not be available again. </summary>
    public const int Gone = 410;
    /// <summary> 411: The request did not specify the length of its content, which is required by the requested resource. </summary>
    public const int LengthRequired = 411;
    /// <summary> 412: The server does not meet one of the preconditions that the requester put on the request headers. </summary>
    public const int PreconditionFailed = 412;
    /// <summary> 413: The request is larger than the server is willing or able to process. </summary>
    public const int PayloadTooLarge = 413;
    /// <summary> 414: The URI provided was too long for the server to process. </summary>
    public const int UriTooLong = 414;
    /// <summary> 415: The request entity has a media type which the server or resource does not support. </summary>
    public const int UnsupportedMedia = 415;
    /// <summary> 416: The client has asked for a portion of the file, but the server cannot supply that portion. </summary>
    public const int RangeNotSatisfiable = 416;
    /// <summary> 417: The server cannot meet the requirements of the Expect request-header field. </summary>
    public const int ExpectationFailed = 417;
    /// <summary> 418: Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". </summary>
    public const int ImATeapot = 418;
    /// <summary> 419: Not a standard RFC code. Typically used to indicate an expired session. </summary>
    public const int AuthenticationTimeout = 419;
    /// <summary> 421: The request was directed at a server that is not able to produce a response. </summary>
    public const int MisdirectedRequest = 421;
    /// <summary> 422: The request was well-formed but was unable to be followed due to semantic errors. </summary>
    public const int Unprocessable = 422;
    /// <summary> 423: The resource that is being accessed is locked. </summary>
    public const int Locked = 423;
    /// <summary> 424: The request failed due to failure of a previous request. </summary>
    public const int FailedDependency = 424;
    /// <summary> 426: The client should switch to a different protocol such as TLS/1.0. </summary>
    public const int UpgradeRequired = 426;
    /// <summary> 428: The origin server requires the request to be conditional. </summary>
    public const int PreconditionRequired = 428;
    /// <summary> 429: The user has sent too many requests in a given amount of time. </summary>
    public const int TooManyRequests = 429;
    /// <summary> 431: The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large. </summary>
    public const int HeaderFieldsTooLarge = 431;
    /// <summary> 451: A server operator has received a legal demand to deny access to a resource or to a set of resources. </summary>
    public const int LegalUnavailable = 451;
    /// <summary> 499: Client closed the connection before the server could send the response. </summary>
    public const int ClientClosedRequest = 499;

    // --- 5xx Server Errors ---
    /// <summary> 500: A generic error message, given when an unexpected condition was encountered. </summary>
    public const int InternalError = 500;
    /// <summary> 501: The server either does not recognize the request method, or it lacks the ability to fulfill the request. </summary>
    public const int NotImplemented = 501;
    /// <summary> 502: The server was acting as a gateway or proxy and received an invalid response from the upstream server. </summary>
    public const int BadGateway = 502;
    /// <summary> 503: The server is currently unavailable (because it is overloaded or down for maintenance). </summary>
    public const int ServiceUnavailable = 503;
    /// <summary> 504: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server. </summary>
    public const int GatewayTimeout = 504;
    /// <summary> 505: The server does not support the HTTP protocol version used in the request. </summary>
    public const int VersionNotSupported = 505;
    /// <summary> 506: Transparent content negotiation for the request results in a circular reference. </summary>
    public const int VariantAlsoNegotiates = 506;
    /// <summary> 507: The server is unable to store the representation needed to complete the request. </summary>
    public const int InsufficientStorage = 507;
    /// <summary> 508: The server detected an infinite loop while processing the request. </summary>
    public const int LoopDetected = 508;
    /// <summary> 510: Further extensions to the request are required for the server to fulfill it. </summary>
    public const int NotExtended = 510;
    /// <summary> 511: The client needs to authenticate to gain network access. </summary>
    public const int NetworkAuthRequired = 511;
}