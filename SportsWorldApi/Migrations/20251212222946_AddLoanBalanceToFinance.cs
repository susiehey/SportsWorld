using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportsWorldApi.Migrations
{
    /// <inheritdoc />
    public partial class AddLoanBalanceToFinance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LoanBalance",
                table: "Finances",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LoanBalance",
                table: "Finances");
        }
    }
}
