using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
                .HasForeignKey(t => t.ClientId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Client>()
                .HasIndex(c => c.Name)
                .IsUnique();

        }

        public static readonly Microsoft.Extensions.Logging.LoggerFactory _myLoggerFactory =
            new LoggerFactory(new[] {
                new Microsoft.Extensions.Logging.Debug.DebugLoggerProvider()
            });

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory(_myLoggerFactory);
        }
    }
}
