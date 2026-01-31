using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.Candidates;
using NepalVotes.Domain.ElectoralConstituencies;
using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Domain.MediaFiles;
using NepalVotes.Domain.PoliticalParties;
using NepalVotes.Domain.UserRegistrations;
using NepalVotes.Domain.Users;
using NepalVotes.Domain.VotingResults;

namespace NepalVotes.Infrastructure.Persistence;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options,
        AuditInterceptor auditInterceptor) : DbContext(options)
{
    public DbSet<Candidate> Candidates { get; set; }
    public DbSet<CandidateSymbol> CandidateSymbols { get; set; }
    
    public DbSet<Constituency> Constituencies { get; set; }
    public DbSet<District> Districts { get; set; }
    public DbSet<Municipality> Municipalities { get; set; }
    public DbSet<Province> Provinces { get; set; }
    public DbSet<VotingPlace> VotingPlaces { get; set; }
    public DbSet<Ward> Wards { get; set; }
    
    public DbSet<MediaFile> MediaFiles { get; set; }
    
    public DbSet<PoliticalParty> PoliticalParties { get; set; }
    
    public DbSet<Role> Roles { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<UserDocument> UserDocuments { get; set; }
    public DbSet<UserOtp> UserOtps { get; set; }
    public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }
    
    public DbSet<Vote> Votes { get; set; }
    
    public DbSet<UserRegistration> UserRegistrations { get; set; }
    public DbSet<UserRegistrationDocument> UserRegistrationDocuments { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(auditInterceptor);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}