using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class renamepolicitalpartynamecolumntoenglish : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PoliticalPartyName",
                table: "PoliticalParties",
                newName: "PoliticalPartyNameEn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PoliticalPartyNameEn",
                table: "PoliticalParties",
                newName: "PoliticalPartyName");
        }
    }
}
