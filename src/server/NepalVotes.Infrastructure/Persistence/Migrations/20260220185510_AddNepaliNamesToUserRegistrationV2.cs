using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddNepaliNamesToUserRegistrationV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "UserRegistrations",
                newName: "FirstNameEn");

            migrationBuilder.RenameColumn(
                name: "MiddleName",
                table: "UserRegistrations",
                newName: "MiddleNameEn");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "UserRegistrations",
                newName: "LastNameEn");

            migrationBuilder.AddColumn<string>(
                name: "FirstNameNp",
                table: "UserRegistrations",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MiddleNameNp",
                table: "UserRegistrations",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastNameNp",
                table: "UserRegistrations",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstNameNp",
                table: "UserRegistrations");

            migrationBuilder.DropColumn(
                name: "MiddleNameNp",
                table: "UserRegistrations");

            migrationBuilder.DropColumn(
                name: "LastNameNp",
                table: "UserRegistrations");

            migrationBuilder.RenameColumn(
                name: "FirstNameEn",
                table: "UserRegistrations",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "MiddleNameEn",
                table: "UserRegistrations",
                newName: "MiddleName");

            migrationBuilder.RenameColumn(
                name: "LastNameEn",
                table: "UserRegistrations",
                newName: "LastName");
        }
    }
}
