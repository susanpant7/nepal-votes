using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class madeUserInPoliticalPartyNotRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PoliticalParties_PartyLeaderId",
                table: "PoliticalParties");

            migrationBuilder.AlterColumn<int>(
                name: "PartyLeaderId",
                table: "PoliticalParties",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_PoliticalParties_PartyLeaderId",
                table: "PoliticalParties",
                column: "PartyLeaderId",
                unique: true,
                filter: "[PartyLeaderId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PoliticalParties_PartyLeaderId",
                table: "PoliticalParties");

            migrationBuilder.AlterColumn<int>(
                name: "PartyLeaderId",
                table: "PoliticalParties",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PoliticalParties_PartyLeaderId",
                table: "PoliticalParties",
                column: "PartyLeaderId",
                unique: true);
        }
    }
}
