using employeeBackend.Model;
using Microsoft.EntityFrameworkCore;

namespace employeeBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FirstName)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.Property(e => e.LastName)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.Property(e => e.EmailId)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.Property(e => e.Salary)
                      .HasColumnType("decimal(18,2)"); // Fix the decimal warning
                entity.Property(e => e.Age);
                entity.Property(e => e.Status);
            });
        }
    }
}