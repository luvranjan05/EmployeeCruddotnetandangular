using System.ComponentModel.DataAnnotations;

namespace employeeBackend.Model
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string EmailId { get; set; }
        public int Age { get; set; }
        public decimal Salary { get; set; }
        public bool Status { get; set; }
    }
}