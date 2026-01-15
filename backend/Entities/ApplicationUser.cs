using Microsoft.AspNetCore.Identity;

namespace backend.Entities
{
    public class ApplicationUser:IdentityUser
    {
        public string DisplayName { get; set; } = default!;
    }
}
