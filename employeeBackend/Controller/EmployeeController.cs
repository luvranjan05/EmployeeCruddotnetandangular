using employeeBackend.Model;
using employeeBackend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace employeeBackend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EployeeRepository emp;
        public EmployeeController(EployeeRepository eployeeRepository)
        {
            this.emp = eployeeRepository;
        }

        [HttpGet]
        public async Task<ActionResult> EmployeeList()
        {
            var allEmployees = await emp.GetAllEmployees();
            return Ok(allEmployees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployee(int id)
        {
            var employee = await emp.GetEmployeeById(id);
            if (employee == null) return NotFound();
            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult> AddEmployee(Employee vm)
        {
            var newEmployee = await emp.SaveEmployee(vm);
            return Ok(newEmployee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEmployee(int id, Employee vm)
        {
            if (id != vm.Id) return BadRequest();
            var updatedEmployee = await emp.UpdateEmployee(vm);
            if (updatedEmployee == null) return NotFound();
            return Ok(updatedEmployee);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var result = await emp.DeleteEmployee(id);
            if (!result) return NotFound();
            return Ok(new { message = "Employee deleted successfully" });
        }
    }
}