using backend.Dtos;
using backend.Entities;

namespace backend.services
{
    public interface IAuthService
    {
        public Task<UserDto?> LoginAsync(LoginDto loginDto);
        public Task<UserDto?> RegisterAsync(SignupDto registerDto);

    }
}
