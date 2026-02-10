using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class updatedNameColumnToNameEn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProvinceName",
                table: "Provinces",
                newName: "ProvinceNameEn");

            migrationBuilder.RenameColumn(
                name: "MunicipalityName",
                table: "Municipalities",
                newName: "MunicipalityNameEn");

            migrationBuilder.RenameIndex(
                name: "IX_Municipalities_DistrictId_MunicipalityName",
                table: "Municipalities",
                newName: "IX_Municipalities_DistrictId_MunicipalityNameEn");

            migrationBuilder.RenameColumn(
                name: "DistrictName",
                table: "Districts",
                newName: "DistrictNameEn");

            migrationBuilder.RenameIndex(
                name: "IX_Districts_DistrictName",
                table: "Districts",
                newName: "IX_Districts_DistrictNameEn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProvinceNameEn",
                table: "Provinces",
                newName: "ProvinceName");

            migrationBuilder.RenameColumn(
                name: "MunicipalityNameEn",
                table: "Municipalities",
                newName: "MunicipalityName");

            migrationBuilder.RenameIndex(
                name: "IX_Municipalities_DistrictId_MunicipalityNameEn",
                table: "Municipalities",
                newName: "IX_Municipalities_DistrictId_MunicipalityName");

            migrationBuilder.RenameColumn(
                name: "DistrictNameEn",
                table: "Districts",
                newName: "DistrictName");

            migrationBuilder.RenameIndex(
                name: "IX_Districts_DistrictNameEn",
                table: "Districts",
                newName: "IX_Districts_DistrictName");
        }
    }
}
