using System.ComponentModel.DataAnnotations;

namespace employeeBackend.Model
{
    public class Attendance
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public DateTime Date { get; set; }

        public DateTime? CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }

        public TimeSpan? WorkDuration { get; set; }
        public bool IsPresent { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class AttendanceDto
    {
        public DateTime? CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }
    }
}