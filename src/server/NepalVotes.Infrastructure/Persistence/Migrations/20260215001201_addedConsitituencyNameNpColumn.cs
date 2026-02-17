using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedConsitituencyNameNpColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConstituencyNameNp",
                table: "Constituencies",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Constituencies_ConstituencyNameNp",
                table: "Constituencies",
                column: "ConstituencyNameNp",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Constituencies_ConstituencyNameNp",
                table: "Constituencies");

            migrationBuilder.DropColumn(
                name: "ConstituencyNameNp",
                table: "Constituencies");
        }
    }
}
