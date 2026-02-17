using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class renamedtoencolumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_FullName",
                table: "Users");
            
            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Users");
            
            migrationBuilder.RenameColumn(
                name: "MiddleName",
                table: "Users",
                newName: "MiddleNameEn");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Users",
                newName: "LastNameEn");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Users",
                newName: "FirstNameEn");
            
            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                computedColumnSql: "([FirstNameEn] + ' ' + ISNULL([MiddleNameEn], '') + ' ' + [LastNameEn])",
                stored: true);
            
            migrationBuilder.CreateIndex(
                name: "IX_User_FullName",
                table: "Users",
                column: "FullName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_FullName",
                table: "Users");
            
            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Users");
            
            migrationBuilder.RenameColumn(
                name: "MiddleNameEn",
                table: "Users",
                newName: "MiddleName");

            migrationBuilder.RenameColumn(
                name: "LastNameEn",
                table: "Users",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "FirstNameEn",
                table: "Users",
                newName: "FirstName");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                computedColumnSql: "([FirstName] + ' ' + ISNULL([MiddleName], '') + ' ' + [LastName])",
                stored: true);
            
            migrationBuilder.CreateIndex(
                name: "IX_Users_FullName",
                table: "Users",
                column: "FullName");
        }
    }
}
