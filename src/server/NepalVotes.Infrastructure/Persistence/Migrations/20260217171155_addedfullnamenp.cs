using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedfullnamenp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameIndex(
                name: "IX_User_FullNameEn",
                table: "Users",
                newName: "IX_User_FullNameNp");

            migrationBuilder.AddColumn<string>(
                name: "FirstNameNp",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastNameNp",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MiddleNameNp",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FullNameNp",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                computedColumnSql: "([FirstNameNp] + ' ' + ISNULL([MiddleNameNp], '') + ' ' + [LastNameNp])",
                stored: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullNameNp",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FirstNameNp",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastNameNp",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MiddleNameNp",
                table: "Users");

            migrationBuilder.RenameIndex(
                name: "IX_User_FullNameNp",
                table: "Users",
                newName: "IX_User_FullNameEn");
        }
    }
}
