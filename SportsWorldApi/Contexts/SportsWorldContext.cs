using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Models;

namespace SportsWorldApi.Contexts;

public class SportsWorldContext(DbContextOptions<SportsWorldContext> options) : DbContext(options)
{
    public DbSet<Finance> Finances { get; set; }
    public DbSet<Athlete> Athletes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Finance>().HasData(new Finance
        {
            Id = 1,
            MoneyLeft = 10000,
            NumberOfPurchases = 0,
            MoneySpent = 0
        });

        modelBuilder.Entity<Athlete>().HasData(
            new Athlete { Id = 1, Name = "Valentina Shevchenko", Gender = "Female", Price = 1000000, Image = "valentina_shevchenko.png", PurchaseStatus = false }
        );
    }

}