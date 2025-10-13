using employeeBackend.Data;
using employeeBackend.Model;
using employeeBackend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace employeeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtTokenService _tokenService;
        private readonly AppDbContext _db;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthController(JwtTokenService tokenService, AppDbContext db)
        {
            _tokenService = tokenService;
            _db = db;
            _passwordHasher = new PasswordHasher<User>();
        }

      
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.UserName == userDto.UserName);
            if (existingUser != null)
            {
                return Conflict(new { message = "Username already exists" });
            }

            var tempUser = new User { UserName = userDto.UserName };
            var hashedPassword = _passwordHasher.HashPassword(tempUser, userDto.Password);

            var user = new User
            {
                UserName = userDto.UserName,
                Password = hashedPassword,
                Role = "USER" 
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new { message = "User registered successfully" });
        }

        
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto userDto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.UserName == userDto.UserName);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, userDto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            var token = _tokenService.GenerateToken(user.UserName, user.Role);
            return Ok(new
            {
                token,
                username = user.UserName,
                role = user.Role 
            });
        }
    }
}
