
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
        public DbSet<User> Users { get; set; }
        public DbSet<Attendance> Attendance { get; set; }

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
                      .HasColumnType("decimal(18,2)");
                entity.Property(e => e.Age);
                entity.Property(e => e.Status);

                entity.Property(e => e.CreatedBy)
                     .IsRequired()
                     .HasMaxLength(100);
                entity.Property(e => e.CreatedAt)
                      .IsRequired();
                entity.Property(e => e.UpdatedBy)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.Property(e => e.UpdatedAt)
                      .IsRequired();
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.UserName)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.Property(u => u.Password)
                      .IsRequired();
                entity.HasIndex(u => u.UserName).IsUnique(); 
            });

            modelBuilder.Entity<Attendance>(entity =>
            {
                entity.HasKey(a => a.Id);
                entity.Property(a => a.UserName).IsRequired().HasMaxLength(100);
                entity.Property(a => a.Date).IsRequired();
                entity.HasIndex(a => new { a.UserName, a.Date }).IsUnique();
            });
        }
    }
}