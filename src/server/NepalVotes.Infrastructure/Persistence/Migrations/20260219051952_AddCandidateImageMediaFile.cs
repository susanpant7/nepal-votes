using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCandidateImageMediaFile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CandidateImageMediaFileId",
                table: "Candidates",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_CandidateImageMediaFileId",
                table: "Candidates",
                column: "CandidateImageMediaFileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_MediaFiles_CandidateImageMediaFileId",
                table: "Candidates",
                column: "CandidateImageMediaFileId",
                principalTable: "MediaFiles",
                principalColumn: "MediaFileId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_MediaFiles_CandidateImageMediaFileId",
                table: "Candidates");

            migrationBuilder.DropIndex(
                name: "IX_Candidates_CandidateImageMediaFileId",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "CandidateImageMediaFileId",
                table: "Candidates");
        }
    }
}
