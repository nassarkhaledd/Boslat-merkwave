using backend.Dtos;
using backend.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.services
{
    public class AuthService(UserManager<ApplicationUser> _usermnager, RoleManager<IdentityRole> _roleManager, IConfiguration _conf) : IAuthService
    {
        public async Task<UserDto?> LoginAsync(LoginDto loginDto)
        {
            var User=await _usermnager.FindByEmailAsync(loginDto.Email);
            if (User == null) {
                return null;
            }
            var IsPAssValid = await _usermnager.CheckPasswordAsync(User, loginDto.Password);
            if (!IsPAssValid) {
                return null;
            }
            var roles = await _usermnager.GetRolesAsync(User);
            bool isAdmin = roles.Contains("Admin", StringComparer.OrdinalIgnoreCase);


            return new UserDto
            {
                Email = loginDto.Email,
                Token = await CreateTokenAsync(User),
                IsAdmin = isAdmin
            };

        }

        public async Task<UserDto?> RegisterAsync(SignupDto registerDto)
        {
            var user = new ApplicationUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Email,
                DisplayName = registerDto.DisplayName
            };

            var result = await _usermnager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
                return null;

            var role = string.IsNullOrEmpty(registerDto.Role) ? "User" : registerDto.Role;

            var roleExists = await _roleManager.RoleExistsAsync(role);
            if (!roleExists)
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }

            await _usermnager.AddToRoleAsync(user, role);

            bool isAdmin = string.Equals(role, "Admin", StringComparison.OrdinalIgnoreCase);

            return new UserDto
            {
                Email = user.Email,
                Token = await CreateTokenAsync(user),
                IsAdmin = isAdmin 
            };
        }

        private async Task<string> CreateTokenAsync(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Name,user.DisplayName),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };
            var roles = await _usermnager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var secKey = _conf.GetSection("Jwt")["SecretKey"];
            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secKey));
            var creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _conf.GetSection("Jwt")["Issuer"],
                audience: _conf.GetSection("Jwt")["Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(24),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
