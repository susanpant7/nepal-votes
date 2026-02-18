using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mediafilenotrequiredincandidatesymbol : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CandidateSymbols_CandidateSymbolMediaFileId",
                table: "CandidateSymbols");

            migrationBuilder.AlterColumn<int>(
                name: "CandidateSymbolMediaFileId",
                table: "CandidateSymbols",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_CandidateSymbols_CandidateSymbolMediaFileId",
                table: "CandidateSymbols",
                column: "CandidateSymbolMediaFileId",
                unique: true,
                filter: "[CandidateSymbolMediaFileId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CandidateSymbols_CandidateSymbolMediaFileId",
                table: "CandidateSymbols");

            migrationBuilder.AlterColumn<int>(
                name: "CandidateSymbolMediaFileId",
                table: "CandidateSymbols",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CandidateSymbols_CandidateSymbolMediaFileId",
                table: "CandidateSymbols",
                column: "CandidateSymbolMediaFileId",
                unique: true);
        }
    }
}
