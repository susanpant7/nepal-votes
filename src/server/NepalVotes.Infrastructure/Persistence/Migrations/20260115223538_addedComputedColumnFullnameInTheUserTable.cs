using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedComputedColumnFullnameInTheUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_FullName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Users");
        }
    }
}
