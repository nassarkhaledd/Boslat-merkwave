using backend.Dtos;
using backend.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AuthController:ControllerBase
    {
        private readonly IAuthService _authService;

        // Constructor injection
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        //login
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> login(LoginDto loginDto)
        {
            var user=await  _authService.LoginAsync(loginDto);
            if (user == null) { 
                return Unauthorized();
            }
            return Ok(user);
        }


        //register
        [Authorize(Roles = "Admin")]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> register(SignupDto signupDto)
        {
            var user = await _authService.RegisterAsync(signupDto);
            if (user == null)
            {
                return BadRequest();
            }
            return Ok(user);
        }
    }
}
