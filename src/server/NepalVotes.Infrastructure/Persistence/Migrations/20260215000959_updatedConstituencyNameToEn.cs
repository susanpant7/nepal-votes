using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class updatedConstituencyNameToEn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ConstituencyName",
                table: "Constituencies",
                newName: "ConstituencyNameEn");

            migrationBuilder.RenameIndex(
                name: "IX_Constituencies_ConstituencyName",
                table: "Constituencies",
                newName: "IX_Constituencies_ConstituencyNameEn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ConstituencyNameEn",
                table: "Constituencies",
                newName: "ConstituencyName");

            migrationBuilder.RenameIndex(
                name: "IX_Constituencies_ConstituencyNameEn",
                table: "Constituencies",
                newName: "IX_Constituencies_ConstituencyName");
        }
    }
}
