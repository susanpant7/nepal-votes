using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class userRegistrationTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReviewComment",
                table: "UserDocuments");

            migrationBuilder.CreateTable(
                name: "UserRegistrations",
                columns: table => new
                {
                    UserRegistrationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MiddleName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MobileNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    RequestDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    ReviewComment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HashedOtpCode = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    OtpCreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    OtpExpiryDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    IsOtpUsed = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    AttemptCount = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    VotingPlaceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRegistrations", x => x.UserRegistrationId);
                    table.ForeignKey(
                        name: "FK_UserRegistrations_VotingPlaces_VotingPlaceId",
                        column: x => x.VotingPlaceId,
                        principalTable: "VotingPlaces",
                        principalColumn: "VotingPlaceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserRegistrationDocuments",
                columns: table => new
                {
                    UserRegistrationDocumentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DocumentType = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Size = table.Column<long>(type: "bigint", nullable: false),
                    UserRegistrationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRegistrationDocuments", x => x.UserRegistrationDocumentId);
                    table.ForeignKey(
                        name: "FK_UserRegistrationDocuments_UserRegistrations_UserRegistrationId",
                        column: x => x.UserRegistrationId,
                        principalTable: "UserRegistrations",
                        principalColumn: "UserRegistrationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserRegistrationDocuments_UserRegistrationId",
                table: "UserRegistrationDocuments",
                column: "UserRegistrationId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRegistrations_VotingPlaceId",
                table: "UserRegistrations",
                column: "VotingPlaceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserRegistrationDocuments");

            migrationBuilder.DropTable(
                name: "UserRegistrations");

            migrationBuilder.AddColumn<string>(
                name: "ReviewComment",
                table: "UserDocuments",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
