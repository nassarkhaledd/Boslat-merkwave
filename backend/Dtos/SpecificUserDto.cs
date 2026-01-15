using backend.Entities;

namespace backend.Dtos
{
    public class SpecificUserDto
    {
        public string? CompanyName { get; set; }

        // Person 1
        public string? Person1Name { get; set; }
        public string? Person1Phone { get; set; }
        public string? Person1Job { get; set; }
        public string? Person1Email { get; set; }

        // Person 2
        public string? Person2Name { get; set; }
        public string? Person2Phone { get; set; }
        public string? Person2Job { get; set; }
        public string? Person2Email { get; set; }

        // Address
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? Block { get; set; }

        // Interests
        public string? Industry { get; set; }
        public string? Products { get; set; }

        public string? Notes { get; set; }
        public string? CustomerType { get; set; }

        // Tracking
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = default!; 
        public string? PhotoPath { get; set; }
        public bool Contacted { get; set; } = false;
    }
}
