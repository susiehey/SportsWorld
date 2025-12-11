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
            MoneyLeft = 100000000,
            NumberOfPurchases = 0,
            MoneySpent = 0
        });

       /* modelBuilder.Entity<Athlete>().HasData(
        
        // Kvinner 
        new Athlete { Id = 1, Name = "Valentina Shevchenko", Gender = "Female", Price = 1800000, Image = "valentina_shevchenko.png", PurchaseStatus = false },
        new Athlete { Id = 2, Name = "Zhang Weili", Gender = "Female", Price = 1700000, Image = "zhang_weili.png", PurchaseStatus = true },
        new Athlete { Id = 3, Name = "Rose Namajunas", Gender = "Female", Price = 1200000, Image = "rose_namajunas.png", PurchaseStatus = false },
        new Athlete { Id = 4, Name = "Amanda Nunes", Gender = "Female", Price = 2000000, Image = "amanda_nunes.png", PurchaseStatus = true },
        new Athlete { Id = 5, Name = "Holly Holm", Gender = "Female", Price = 900000, Image = "holly_holm.png", PurchaseStatus = false },
        new Athlete { Id = 6, Name = "Julianna Peña", Gender = "Female", Price = 1100000, Image = "julianna_pena.png", PurchaseStatus = true },
        new Athlete { Id = 7, Name = "Alexa Grasso", Gender = "Female", Price = 1500000, Image = "alexa_grasso.png", PurchaseStatus = false },
        new Athlete { Id = 8, Name = "Tatiana Suarez", Gender = "Female", Price = 1300000, Image = "tatiana_suarez.png", PurchaseStatus = true },
        new Athlete { Id = 9, Name = "Erin Blanchfield", Gender = "Female", Price = 950000, Image = "erin_blanchfield.png", PurchaseStatus = false },
        new Athlete { Id = 10, Name = "Raquel Pennington", Gender = "Female", Price = 800000, Image = "raquel_pennington.png", PurchaseStatus = true },

        // Menn
        new Athlete { Id = 11, Name = "Conor McGregor", Gender = "Male", Price = 2000000, Image = "conor_mcgregor.png", PurchaseStatus = false },
        new Athlete { Id = 12, Name = "Jon Jones", Gender = "Male", Price = 2200000, Image = "jon_jones.png", PurchaseStatus = true },
        new Athlete { Id = 13, Name = "Israel Adesanya", Gender = "Male", Price = 1600000, Image = "israel_adesanya.png", PurchaseStatus = false },
        new Athlete { Id = 14, Name = "Alexander Volkanovski", Gender = "Male", Price = 1500000, Image = "alexander_volkanovski.png", PurchaseStatus = true },
        new Athlete { Id = 15, Name = "Khabib Nurmagomedov", Gender = "Male", Price = 2100000, Image = "khabib_nurmagomedov.png", PurchaseStatus = false },
        new Athlete { Id = 16, Name = "Leon Edwards", Gender = "Male", Price = 1400000, Image = "leon_edwards.png", PurchaseStatus = true },
        new Athlete { Id = 17, Name = "Sean O’Malley", Gender = "Male", Price = 1300000, Image = "sean_omalley.png", PurchaseStatus = false },
        new Athlete { Id = 18, Name = "Max Holloway", Gender = "Male", Price = 1200000, Image = "max_holloway.png", PurchaseStatus = true },
        new Athlete { Id = 19, Name = "Charles Oliveira", Gender = "Male", Price = 1900000, Image = "charles_oliveira.png", PurchaseStatus = false },
        new Athlete { Id = 20, Name = "Justin Gaethje", Gender = "Male", Price = 1000000, Image = "justin_gaethje.png", PurchaseStatus = true }
        ); */
        
    }

}