using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NepalVotes.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class middlenamenpNotRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Drop the Index first (if it exists)
            migrationBuilder.Sql("DROP INDEX IF EXISTS [IX_User_FullNameNp] ON [Users]");

            // 2. Drop the dependent computed column
            migrationBuilder.DropColumn(
                name: "FullNameNp",
                table: "Users");

            // 3. Now you can safely Alter the base columns
            migrationBuilder.AlterColumn<string>(
                name: "MiddleNameNp",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "LastNameNp",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FirstNameNp",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            // 4. Re-add the computed column
            migrationBuilder.AddColumn<string>(
                name: "FullNameNp",
                table: "Users",
                type: "nvarchar(450)", // Or your specific length
                nullable: false,
                computedColumnSql: "([FirstNameNp] + ' ' + ISNULL([MiddleNameNp], '') + ' ' + [LastNameNp])",
                stored: true);

            // 5. Re-add the Index
            migrationBuilder.CreateIndex(
                name: "IX_User_FullNameNp",
                table: "Users",
                column: "FullNameNp");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // 1. Drop the Index first (Clean the top of the dependency chain)
            migrationBuilder.Sql("DROP INDEX IF EXISTS [IX_User_FullNameNp] ON [Users]");

            // 2. Drop the Computed Column (Free the base columns for modification)
            migrationBuilder.DropColumn(
                name: "FullNameNp",
                table: "Users");

            // 3. Revert base columns back to nvarchar(max) and original nullability
            migrationBuilder.AlterColumn<string>(
                name: "MiddleNameNp",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false, // Reverting to original state (change to true if it was nullable)
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastNameNp",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "FirstNameNp",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            // 4. Re-create the Computed Column using the old (reverted) columns
            migrationBuilder.AddColumn<string>(
                name: "FullNameNp",
                table: "Users",
                type: "nvarchar(max)", // Reverting type to max
                nullable: false,
                computedColumnSql: "([FirstNameNp] + ' ' + ISNULL([MiddleNameNp], '') + ' ' + [LastNameNp])",
                stored: true);

            // 5. Restore the Index
            migrationBuilder.CreateIndex(
                name: "IX_User_FullNameNp",
                table: "Users",
                column: "FullNameNp");
        }
    }
}
