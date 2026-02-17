using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class renamedfullnametoen : Migration
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

            migrationBuilder.AddColumn<string>(
                name: "FullNameEn",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                computedColumnSql: "([FirstNameEn] + ' ' + ISNULL([MiddleNameEn], '') + ' ' + [LastNameEn])",
                stored: true);
            
            migrationBuilder.CreateIndex(
                name: "IX_User_FullNameEn",
                table: "Users",
                column: "FullNameEn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_FullNameEn",
                table: "Users");
            
            migrationBuilder.DropColumn(
                name: "FullNameEn",
                table: "Users");
            
            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                computedColumnSql: "([FirstName] + ' ' + ISNULL([MiddleName], '') + ' ' + [LastName])",
                stored: true);
            
            migrationBuilder.CreateIndex(
                name: "IX_User_FullName",
                table: "Users",
                column: "FullName");
        }
    }
}
