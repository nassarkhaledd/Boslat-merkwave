using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Customer
    {
        public int Id { get; set; }

        public string? CompanyName { get; set; } = default!;

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
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string CreatedByUserId { get; set; } = default!;
        public ApplicationUser CreatedByUser { get; set; } = default!;
        public string? PhotoPath { get; set; }
        public bool Contacted { get; set; } = false;

    }
}
