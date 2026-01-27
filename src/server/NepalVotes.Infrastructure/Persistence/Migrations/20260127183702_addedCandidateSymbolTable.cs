using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedCandidateSymbolTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_MediaFiles_CandidateSymbolMediaFileId",
                table: "Candidates");

            migrationBuilder.DropIndex(
                name: "IX_Candidates_CandidateSymbolMediaFileId",
                table: "Candidates");

            migrationBuilder.DropIndex(
                name: "IX_Candidates_ConstituencyId",
                table: "Candidates");

            migrationBuilder.RenameColumn(
                name: "CandidateSymbolMediaFileId",
                table: "Candidates",
                newName: "CandidateSymbolId");

            migrationBuilder.CreateTable(
                name: "CandidateSymbols",
                columns: table => new
                {
                    CandidateSymbolId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CandidateSymbolMediaFileId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CandidateSymbols", x => x.CandidateSymbolId);
                    table.ForeignKey(
                        name: "FK_CandidateSymbols_MediaFiles_CandidateSymbolMediaFileId",
                        column: x => x.CandidateSymbolMediaFileId,
                        principalTable: "MediaFiles",
                        principalColumn: "MediaFileId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_CandidateSymbolId",
                table: "Candidates",
                column: "CandidateSymbolId");

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_ConstituencyId_CandidateSymbolId",
                table: "Candidates",
                columns: new[] { "ConstituencyId", "CandidateSymbolId" },
                unique: true,
                filter: "[CandidateSymbolId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_ConstituencyId_PoliticalPartyId",
                table: "Candidates",
                columns: new[] { "ConstituencyId", "PoliticalPartyId" },
                unique: true,
                filter: "[PoliticalPartyId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CandidateSymbols_CandidateSymbolMediaFileId",
                table: "CandidateSymbols",
                column: "CandidateSymbolMediaFileId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_CandidateSymbols_CandidateSymbolId",
                table: "Candidates",
                column: "CandidateSymbolId",
                principalTable: "CandidateSymbols",
                principalColumn: "CandidateSymbolId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_CandidateSymbols_CandidateSymbolId",
                table: "Candidates");

            migrationBuilder.DropTable(
                name: "CandidateSymbols");

            migrationBuilder.DropIndex(
                name: "IX_Candidates_CandidateSymbolId",
                table: "Candidates");

            migrationBuilder.DropIndex(
                name: "IX_Candidates_ConstituencyId_CandidateSymbolId",
                table: "Candidates");

            migrationBuilder.DropIndex(
                name: "IX_Candidates_ConstituencyId_PoliticalPartyId",
                table: "Candidates");

            migrationBuilder.RenameColumn(
                name: "CandidateSymbolId",
                table: "Candidates",
                newName: "CandidateSymbolMediaFileId");

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_CandidateSymbolMediaFileId",
                table: "Candidates",
                column: "CandidateSymbolMediaFileId",
                unique: true,
                filter: "[CandidateSymbolMediaFileId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_ConstituencyId",
                table: "Candidates",
                column: "ConstituencyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_MediaFiles_CandidateSymbolMediaFileId",
                table: "Candidates",
                column: "CandidateSymbolMediaFileId",
                principalTable: "MediaFiles",
                principalColumn: "MediaFileId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
