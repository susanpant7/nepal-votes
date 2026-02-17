using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class votingPlaceUpdatedByWard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRegistrations_VotingPlaces_VotingPlaceId",
                table: "UserRegistrations");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_VotingPlaces_VotingPlaceId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "VotingPlaceId",
                table: "Users",
                newName: "WardId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_VotingPlaceId",
                table: "Users",
                newName: "IX_Users_WardId");

            migrationBuilder.RenameColumn(
                name: "VotingPlaceId",
                table: "UserRegistrations",
                newName: "WardId");

            migrationBuilder.RenameIndex(
                name: "IX_UserRegistrations_VotingPlaceId",
                table: "UserRegistrations",
                newName: "IX_UserRegistrations_WardId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRegistrations_Wards_WardId",
                table: "UserRegistrations",
                column: "WardId",
                principalTable: "Wards",
                principalColumn: "WardId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Wards_WardId",
                table: "Users",
                column: "WardId",
                principalTable: "Wards",
                principalColumn: "WardId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRegistrations_Wards_WardId",
                table: "UserRegistrations");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Wards_WardId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "WardId",
                table: "Users",
                newName: "VotingPlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_WardId",
                table: "Users",
                newName: "IX_Users_VotingPlaceId");

            migrationBuilder.RenameColumn(
                name: "WardId",
                table: "UserRegistrations",
                newName: "VotingPlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_UserRegistrations_WardId",
                table: "UserRegistrations",
                newName: "IX_UserRegistrations_VotingPlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRegistrations_VotingPlaces_VotingPlaceId",
                table: "UserRegistrations",
                column: "VotingPlaceId",
                principalTable: "VotingPlaces",
                principalColumn: "VotingPlaceId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_VotingPlaces_VotingPlaceId",
                table: "Users",
                column: "VotingPlaceId",
                principalTable: "VotingPlaces",
                principalColumn: "VotingPlaceId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
