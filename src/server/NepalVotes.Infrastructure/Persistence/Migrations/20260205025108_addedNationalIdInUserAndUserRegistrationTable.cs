using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedNationalIdInUserAndUserRegistrationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NationalIdNumber",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);
            
            migrationBuilder.Sql("UPDATE Users SET NationalIdNumber = CAST(MobileNumber AS NVARCHAR(20))");
            
            migrationBuilder.AlterColumn<string>(
                name: "NationalIdNumber",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false);
            
            migrationBuilder.AddColumn<string>(
                name: "NationalIdNumber",
                table: "UserRegistrations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Users_MobileNumber",
                table: "Users",
                column: "MobileNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_NationalIdNumber",
                table: "Users",
                column: "NationalIdNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_MobileNumber",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_NationalIdNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NationalIdNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NationalIdNumber",
                table: "UserRegistrations");
        }
    }
}
