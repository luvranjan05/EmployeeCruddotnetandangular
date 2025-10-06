using employeeBackend.Data;
using employeeBackend.Model;
using Microsoft.EntityFrameworkCore;

namespace employeeBackend.Repositories
{
    public class EployeeRepository
    {
        private readonly AppDbContext db;
        public EployeeRepository(AppDbContext dbContext)
        {
            this.db = dbContext;
        }

        // Get all employees
        public async Task<List<Employee>> GetAllEmployees()
        {
            return await db.Employees.ToListAsync();
        }

        // Get employee by ID
        public async Task<Employee?> GetEmployeeById(int id)
        {
            return await db.Employees.FindAsync(id);
        }

        // Add employee
        public async Task<Employee> SaveEmployee(Employee emp)
        {
            await db.Employees.AddAsync(emp);
            await db.SaveChangesAsync();
            return emp;
        }

        // Update employee
        public async Task<Employee?> UpdateEmployee(Employee emp)
        {
            var existingEmployee = await db.Employees.FindAsync(emp.Id);
            if (existingEmployee == null) return null;

            existingEmployee.FirstName = emp.FirstName;
            existingEmployee.LastName = emp.LastName;
            existingEmployee.EmailId = emp.EmailId;
            existingEmployee.Age = emp.Age;
            existingEmployee.Salary = emp.Salary;
            existingEmployee.Status = emp.Status;

            await db.SaveChangesAsync();
            return existingEmployee;
        }

        // Delete employee
        public async Task<bool> DeleteEmployee(int id)
        {
            var employee = await db.Employees.FindAsync(id);
            if (employee == null) return false;

            db.Employees.Remove(employee);
            await db.SaveChangesAsync();
            return true;
        }
    }
}