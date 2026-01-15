using backend.Dtos;
using backend.Entities;

namespace backend.services
{
    public interface ICustomerService
    {
        Task<Customer> CreateAsync(CreateCustomerDto dto, string userId, string? photoPath);
        Task<Customer> UpdateAsync(CreateCustomerDto dto, string userId, string? photoPath);
        Task<IEnumerable<CustomerDto>> GetAllAsync();
        Task<SpecificUserDto?> GetByIdAsync(int id);

    }
}
