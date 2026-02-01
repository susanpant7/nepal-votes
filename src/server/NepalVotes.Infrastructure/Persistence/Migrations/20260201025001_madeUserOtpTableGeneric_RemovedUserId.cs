using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class madeUserOtpTableGeneric_RemovedUserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserOtps_Users_UserId",
                table: "UserOtps");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "UserOtps",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "IpAddress",
                table: "UserOtps",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MobileNumber",
                table: "UserOtps",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_UserOtps_MobileNumber_UserOtpType_IsUsed",
                table: "UserOtps",
                columns: new[] { "MobileNumber", "UserOtpType", "IsUsed" });

            migrationBuilder.CreateIndex(
                name: "IX_UserOtps_MobileNumber_UserOtpType_IsUsed_ExpiryDate",
                table: "UserOtps",
                columns: new[] { "MobileNumber", "UserOtpType", "IsUsed", "ExpiryDate" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserOtps_Users_UserId",
                table: "UserOtps",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserOtps_Users_UserId",
                table: "UserOtps");

            migrationBuilder.DropIndex(
                name: "IX_UserOtps_MobileNumber_UserOtpType_IsUsed",
                table: "UserOtps");

            migrationBuilder.DropIndex(
                name: "IX_UserOtps_MobileNumber_UserOtpType_IsUsed_ExpiryDate",
                table: "UserOtps");

            migrationBuilder.DropColumn(
                name: "IpAddress",
                table: "UserOtps");

            migrationBuilder.DropColumn(
                name: "MobileNumber",
                table: "UserOtps");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "UserOtps",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserOtps_Users_UserId",
                table: "UserOtps",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
