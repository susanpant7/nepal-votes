using Microsoft.EntityFrameworkCore;
using NepalVotes.Engine.Repositories;
using NepalVotes.Engine.Services;
using NepalVotes.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<AuditInterceptor>();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddControllers();


builder.Services.AddScoped<IDataLoadService, DataLoadService>();
builder.Services.AddScoped<IGeographicDataLoadRepository, GeographicDataLoadRepository>();

builder.Services.AddHttpClient();
builder.Services.AddScoped<IPoliticalPartyDataLoadRepository, PoliticalPartyDataLoadRepository>();

builder.Services.AddScoped<IConstituencyDataLoadRepository, ConstituencyDataLoadRepository>();

builder.Services.AddScoped<IUserDataLoadRepository, UserDataLoadRepository>();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();