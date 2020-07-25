using Microsoft.EntityFrameworkCore;
using testDotnetBackend.Web.Infrastructure.Database.Entities;
using Transaction = testDotnetBackend.Web.Infrastructure.Database.Entities.Transaction;

namespace testDotnetBackend.Web.Infrastructure.Database
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Transactions)
                .WithOne(t => t.Client)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
