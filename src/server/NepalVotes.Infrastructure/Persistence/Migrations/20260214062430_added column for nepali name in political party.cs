using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedcolumnfornepalinameinpoliticalparty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PoliticalPartyNameNp",
                table: "PoliticalParties",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PoliticalPartyNameNp",
                table: "PoliticalParties");
        }
    }
}
