using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Application.Users;
using NepalVotes.Domain.Users;
using NepalVotes.Api.ResponseExtensions;

namespace NepalVotes.Api.Users;

[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[ApiController]
[Route("api/admin/users")]
public class AdminUsersController(IUserService userService) : ControllerBase
{
    [HttpPost("search")]
    public async Task<IActionResult> GetUsers([FromBody] UserSearchRequest request)
    {
        var response = await userService.GetUsersAsync(
            request.UserId, 
            request.MobileNumber, 
            request.NationalId, 
            request.VoterId, 
            request.ProvinceId, 
            request.DistrictId, 
            request.MunicipalityId, 
            request.Role,
            request.RoleId,
            request.Status,
            request.Page, 
            request.PageSize);
        return response.ToActionResult();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var response = await userService.GetUserAsync(id);
        return response.ToActionResult();
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> AddUser([FromForm] AddUserApiRequest apiRequest)
    {
        var request = MapToRequest(apiRequest);
        var response = await userService.AddUserAsync(request, User.IsInRole(RoleName.SuperAdmin));
        return response.ToActionResult();
    }

    [HttpPut("{id}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UpdateUser(int id, [FromForm] AddUserApiRequest apiRequest)
    {
        var request = MapToRequest(apiRequest);
        var response = await userService.UpdateUserAsync(id, request, User.IsInRole(RoleName.SuperAdmin));
        return response.ToActionResult();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var response = await userService.DeleteUserAsync(id);
        return response.ToActionResult();
    }

    [HttpGet("roles")]
    public async Task<IActionResult> GetRoles()
    {
        var response = await userService.GetRolesAsync();
        return response.ToActionResult();
    }

    private AddUserRequest MapToRequest(AddUserApiRequest apiRequest)
    {
        var request = new AddUserRequest
        {
            FirstNameEn = apiRequest.FirstNameEn,
            MiddleNameEn = apiRequest.MiddleNameEn ?? string.Empty,
            LastNameEn = apiRequest.LastNameEn,
            FirstNameNp = apiRequest.FirstNameNp,
            MiddleNameNp = apiRequest.MiddleNameNp ?? string.Empty,
            LastNameNp = apiRequest.LastNameNp,
            DateOfBirth = DateOnly.Parse(apiRequest.DateOfBirth),
            MobileNumber = apiRequest.MobileNumber,
            NationalIdNumber = apiRequest.NationalIdNumber,
            VoterIdNumber = apiRequest.VoterIdNumber,
            WardId = apiRequest.WardId,
            Roles = apiRequest.Roles,
            Status = apiRequest.Status,
            Documents = new List<DocumentUploadRequest>()
        };

        if (apiRequest.NationalIdCardFile != null)
        {
            request.Documents.Add(MapFileToDocument(apiRequest.NationalIdCardFile, UserDocumentType.NationalIdentity));
        }

        if (apiRequest.VoterCardFile != null)
        {
            request.Documents.Add(MapFileToDocument(apiRequest.VoterCardFile, UserDocumentType.VoterIdentity));
        }

        if (apiRequest.PassportFile != null)
        {
            request.Documents.Add(MapFileToDocument(apiRequest.PassportFile, UserDocumentType.Passport));
        }

        return request;
    }

    private DocumentUploadRequest MapFileToDocument(IFormFile file, UserDocumentType type)
    {
        using var ms = new MemoryStream();
        file.CopyTo(ms);
        return new DocumentUploadRequest
        {
            FileName = file.FileName,
            ContentType = file.ContentType,
            FileLength = file.Length,
            Content = ms.ToArray(),
            DocumentType = type
        };
    }
}
