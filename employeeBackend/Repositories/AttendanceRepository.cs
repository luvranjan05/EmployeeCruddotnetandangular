using employeeBackend.Data;
using employeeBackend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;

namespace employeeBackend.Repositories
{
    public class AttendanceRepository
    {
        private readonly AppDbContext _db;

        public AttendanceRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<bool> CheckIn(string username)
        {
            var today = DateTime.Today;
            var existing = await _db.Attendance
                .FirstOrDefaultAsync(a => a.UserName == username && a.Date == today);

            if (existing != null && existing.CheckIn.HasValue)
                return false;

            var attendance = new Attendance
            {
                UserName = username,
                Date = today,
                CheckIn = DateTime.Now,
                IsPresent = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _db.Attendance.Add(attendance);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CheckOut(string username)
        {
            var today = DateTime.Today;
            var attendance = await _db.Attendance

                .FirstOrDefaultAsync(a => a.UserName == username && a.Date == today);

            if (attendance == null || !attendance.CheckIn.HasValue || attendance.CheckOut.HasValue)
                return false;

            attendance.CheckOut = DateTime.Now;
            attendance.WorkDuration = attendance.CheckOut - attendance.CheckIn;
            attendance.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return true;
        }




        public async Task<List<Attendance>> GetUserAttendance(string username, int month, int year)
        {
            return await _db.Attendance
                .Where(a => a.UserName == username && a.Date.Month == month && a.Date.Year == year)
                .OrderByDescending(a => a.Date)
                .ToListAsync();
        }

        public async Task<List<Attendance>> GetAllAttendance(int month, int year)
        {
            return await _db.Attendance
                .Where(a => a.Date.Month == month && a.Date.Year == year)
                .OrderByDescending(a => a.Date)
                .ThenBy(a => a.UserName)
                .ToListAsync();
        }

        public async Task<Attendance?> GetTodayAttendance(string username)
        {
            var today = DateTime.Today;
            return await _db.Attendance
                .FirstOrDefaultAsync(a => a.UserName == username && a.Date == today);
        }
    }
}