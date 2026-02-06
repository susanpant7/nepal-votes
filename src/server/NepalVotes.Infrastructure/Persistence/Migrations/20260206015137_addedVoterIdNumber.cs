using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedVoterIdNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VoterIdNumber",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);
            
            migrationBuilder.Sql("UPDATE Users SET VoterIdNumber = CAST(MobileNumber AS NVARCHAR(20))");
            
            migrationBuilder.AlterColumn<string>(
                name: "VoterIdNumber",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "VoterIdNumber",
                table: "UserRegistrations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Users_VoterIdNumber",
                table: "Users",
                column: "VoterIdNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_VoterIdNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "VoterIdNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "VoterIdNumber",
                table: "UserRegistrations");
        }
    }
}
