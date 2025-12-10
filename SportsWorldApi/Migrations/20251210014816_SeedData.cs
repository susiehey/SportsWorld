using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportsWorldApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Athletes",
                columns: new[] { "Id", "Gender", "Image", "Name", "Price", "PurchaseStatus" },
                values: new object[] { 1, "Female", "valentina_shevchenko.png", "Valentina Shevchenko", 1000000, false });

            migrationBuilder.InsertData(
                table: "Finances",
                columns: new[] { "Id", "MoneyLeft", "MoneySpent", "NumberOfPurchases" },
                values: new object[] { 1, 10000, 0, 0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Athletes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Finances",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
