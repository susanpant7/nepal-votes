using NepalVotes.Api.Configuration;
using NepalVotes.Application.Configuration;
using NepalVotes.Infrastructure.Configuration;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

services.AddApiConfig(configuration);
services.AddApplicationConfig();
services.AddInfrastructureConfig(builder.Configuration);

var app = builder.Build();

app.UseApiConfig();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

}

app.Run();