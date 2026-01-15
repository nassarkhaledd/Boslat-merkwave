namespace backend.Dtos
{
    public class SignupDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string Role { get; set; } = "User"; // default to normal user
    }

}
