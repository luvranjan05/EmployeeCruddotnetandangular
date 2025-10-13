
using employeeBackend.Data;
using employeeBackend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http; 
using System; 

namespace employeeBackend.Repositories
{
    public class EployeeRepository
    {
        private readonly AppDbContext db;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public EployeeRepository(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            this.db = dbContext;
            _httpContextAccessor = httpContextAccessor;
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
            var username = GetCurrentUsername();
            var now = DateTime.UtcNow; 

            emp.CreatedBy = username;
            emp.CreatedAt = now;
            emp.UpdatedBy = username;
            emp.UpdatedAt = now;

            await db.Employees.AddAsync(emp);
            await db.SaveChangesAsync();
            return emp;
        }

        // Update employee
        public async Task<Employee?> UpdateEmployee(Employee emp)
        {
            var existingEmployee = await db.Employees.FindAsync(emp.Id);
            if (existingEmployee == null) return null;

            var username = GetCurrentUsername(); 
            var now = DateTime.UtcNow; 

            existingEmployee.FirstName = emp.FirstName;
            existingEmployee.LastName = emp.LastName;
            existingEmployee.EmailId = emp.EmailId;
            existingEmployee.Age = emp.Age;
            existingEmployee.Salary = emp.Salary;
            existingEmployee.Status = emp.Status;

            existingEmployee.UpdatedBy = username;
            existingEmployee.UpdatedAt = now;

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

        private string GetCurrentUsername()
        {
           
            var username = _httpContextAccessor.HttpContext?.User?.Identity?.Name;
            return username ?? "SYSTEM"; 
        }
    }
}