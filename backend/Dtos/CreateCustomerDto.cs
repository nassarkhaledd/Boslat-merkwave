namespace backend.Dtos
{
    public class CreateCustomerDto
    {
        public int? Id { get; set; }
        public string? CompanyName { get; set; } = default!;

        public string? Person1Name { get; set; }
        public string? Person1Phone { get; set; }
        public string? Person1Job { get; set; }
        public string? Person1Email { get; set; }

        public string? Person2Name { get; set; }
        public string? Person2Phone { get; set; }
        public string? Person2Job { get; set; }
        public string? Person2Email { get; set; }

        public string? Country { get; set; }
        public string? City { get; set; }
        public string? Block { get; set; }

        public string? Industry { get; set; }
        public string? Products { get; set; }

        public string? Notes { get; set; }
        public string? CustomerType { get; set; }
        public IFormFile? Photo { get; set; }
        public bool? Contacted { get; set; } = false;
    }
}
