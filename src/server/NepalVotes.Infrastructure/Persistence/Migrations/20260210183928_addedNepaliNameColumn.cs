using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedNepaliNameColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProvinceNameNp",
                table: "Provinces",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MunicipalityNameNp",
                table: "Municipalities",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DistrictNameNp",
                table: "Districts",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Municipalities_DistrictId_MunicipalityNameNp",
                table: "Municipalities",
                columns: new[] { "DistrictId", "MunicipalityNameNp" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Districts_DistrictNameNp",
                table: "Districts",
                column: "DistrictNameNp",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Municipalities_DistrictId_MunicipalityNameNp",
                table: "Municipalities");

            migrationBuilder.DropIndex(
                name: "IX_Districts_DistrictNameNp",
                table: "Districts");

            migrationBuilder.DropColumn(
                name: "ProvinceNameNp",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "MunicipalityNameNp",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "DistrictNameNp",
                table: "Districts");
        }
    }
}
