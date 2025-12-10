using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SportsWorldApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Athletes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Gender = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<int>(type: "INTEGER", nullable: false),
                    Image = table.Column<string>(type: "TEXT", nullable: false),
                    PurchaseStatus = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Athletes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Finances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MoneyLeft = table.Column<int>(type: "INTEGER", nullable: false),
                    NumberOfPurchases = table.Column<int>(type: "INTEGER", nullable: false),
                    MoneySpent = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Finances", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Athletes",
                columns: new[] { "Id", "Gender", "Image", "Name", "Price", "PurchaseStatus" },
                values: new object[,]
                {
                    { 1, "Female", "valentina_shevchenko.png", "Valentina Shevchenko", 1800000, false },
                    { 2, "Female", "zhang_weili.png", "Zhang Weili", 1700000, true },
                    { 3, "Female", "rose_namajunas.png", "Rose Namajunas", 1200000, false },
                    { 4, "Female", "amanda_nunes.png", "Amanda Nunes", 2000000, true },
                    { 5, "Female", "holly_holm.png", "Holly Holm", 900000, false },
                    { 6, "Female", "julianna_pena.png", "Julianna Peña", 1100000, true },
                    { 7, "Female", "alexa_grasso.png", "Alexa Grasso", 1500000, false },
                    { 8, "Female", "tatiana_suarez.png", "Tatiana Suarez", 1300000, true },
                    { 9, "Female", "erin_blanchfield.png", "Erin Blanchfield", 950000, false },
                    { 10, "Female", "raquel_pennington.png", "Raquel Pennington", 800000, true },
                    { 11, "Male", "conor_mcgregor.png", "Conor McGregor", 2000000, false },
                    { 12, "Male", "jon_jones.png", "Jon Jones", 2200000, true },
                    { 13, "Male", "israel_adesanya.png", "Israel Adesanya", 1600000, false },
                    { 14, "Male", "alexander_volkanovski.png", "Alexander Volkanovski", 1500000, true },
                    { 15, "Male", "khabib_nurmagomedov.png", "Khabib Nurmagomedov", 2100000, false },
                    { 16, "Male", "leon_edwards.png", "Leon Edwards", 1400000, true },
                    { 17, "Male", "sean_omalley.png", "Sean O’Malley", 1300000, false },
                    { 18, "Male", "max_holloway.png", "Max Holloway", 1200000, true },
                    { 19, "Male", "charles_oliveira.png", "Charles Oliveira", 1900000, false },
                    { 20, "Male", "justin_gaethje.png", "Justin Gaethje", 1000000, true }
                });

            migrationBuilder.InsertData(
                table: "Finances",
                columns: new[] { "Id", "MoneyLeft", "MoneySpent", "NumberOfPurchases" },
                values: new object[] { 1, 100000000, 0, 0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Athletes");

            migrationBuilder.DropTable(
                name: "Finances");
        }
    }
}
