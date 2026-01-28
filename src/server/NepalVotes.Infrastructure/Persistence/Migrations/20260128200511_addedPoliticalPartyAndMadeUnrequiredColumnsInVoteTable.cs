using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedPoliticalPartyAndMadeUnrequiredColumnsInVoteTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CandidateId",
                table: "Votes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "PoliticalPartyId",
                table: "Votes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Votes_PoliticalPartyId",
                table: "Votes",
                column: "PoliticalPartyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Votes_PoliticalParties_PoliticalPartyId",
                table: "Votes",
                column: "PoliticalPartyId",
                principalTable: "PoliticalParties",
                principalColumn: "PoliticalPartyId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Votes_PoliticalParties_PoliticalPartyId",
                table: "Votes");

            migrationBuilder.DropIndex(
                name: "IX_Votes_PoliticalPartyId",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "PoliticalPartyId",
                table: "Votes");

            migrationBuilder.AlterColumn<int>(
                name: "CandidateId",
                table: "Votes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
