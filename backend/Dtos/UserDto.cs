namespace backend.Dtos
{
    public class UserDto
    {
        public string Email { get; set; } = default!;
        public string Token { get; set; } = default!;
        public bool IsAdmin { get; set; } = false;
    }
}
