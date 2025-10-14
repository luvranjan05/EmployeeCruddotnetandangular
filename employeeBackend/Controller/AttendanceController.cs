using employeeBackend.Model;
using employeeBackend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace employeeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AttendanceController : ControllerBase
    {
        private readonly AttendanceRepository _attendanceRepo;

        public AttendanceController(AttendanceRepository attendanceRepo)
        {
            _attendanceRepo = attendanceRepo;
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn()
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
                return Unauthorized();

            var result = await _attendanceRepo.CheckIn(username);
            if (!result)
                return BadRequest(new { message = "Already checked in for today" });

            return Ok(new { message = "Checked in successfully" });
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> CheckOut()
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
                return Unauthorized();

            var result = await _attendanceRepo.CheckOut(username);
            if (!result)
                return BadRequest(new { message = "No active check-in found for today" });

            return Ok(new { message = "Checked out successfully" });
        }

        [HttpGet("my-attendance")]
        public async Task<IActionResult> GetMyAttendance([FromQuery] int month, [FromQuery] int year)
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
                return Unauthorized();

            var attendance = await _attendanceRepo.GetUserAttendance(username, month, year);
            return Ok(attendance);
        }

        [HttpGet("user/{username}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetUserAttendance(string username, [FromQuery] int month, [FromQuery] int year)
        {
            var attendance = await _attendanceRepo.GetUserAttendance(username, month, year);
            return Ok(attendance);
        }

        [HttpGet("all")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAllAttendance([FromQuery] int month, [FromQuery] int year)
        {
            var attendance = await _attendanceRepo.GetAllAttendance(month, year);
            return Ok(attendance);
        }

        [HttpGet("today")]
        public async Task<IActionResult> GetTodayAttendance()
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
                return Unauthorized();

            var attendance = await _attendanceRepo.GetTodayAttendance(username);
            return Ok(attendance);
        }
    }
}