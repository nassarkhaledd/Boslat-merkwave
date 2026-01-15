namespace backend.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; } = default!;
        public string Person1Name { get; set; } = default!;
        public bool Contacted { get; set; }
        public string CreatedByName { get; set; } = default!;
    }
}
