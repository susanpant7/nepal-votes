using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addedDobInUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "DateOfBirth",
                table: "Users",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1994, 1, 6));

            migrationBuilder.AddColumn<DateOnly>(
                name: "DateOfBirth",
                table: "UserRegistrations",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1994, 1, 6));

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Users",
                type: "int",
                nullable: false,
                computedColumnSql: "DATEDIFF(hour, [DateOfBirth], GETDATE()) / 8766",
                stored: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "UserRegistrations");
        }
    }
}
