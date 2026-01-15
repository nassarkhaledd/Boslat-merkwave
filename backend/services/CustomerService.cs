using backend.Data;
using backend.Dtos;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.services
{
    public class CustomerService(AppDbContext _context) : ICustomerService
    {
        public async Task<Customer> CreateAsync(CreateCustomerDto dto, string userId, string? photoPath)
        {
            var customer = new Customer
            {
                CompanyName = dto.CompanyName,
                Person1Name = dto.Person1Name,
                Person1Phone = dto.Person1Phone,
                Person1Job = dto.Person1Job,
                Person1Email = dto.Person1Email,

                Person2Name = dto.Person2Name,
                Person2Phone = dto.Person2Phone,
                Person2Job = dto.Person2Job,
                Person2Email = dto.Person2Email,

                Country = dto.Country,
                City = dto.City,
                Block = dto.Block,

                Industry = dto.Industry,
                Products = dto.Products,
                Notes = dto.Notes,
                CustomerType = dto.CustomerType,

                CreatedByUserId = userId,
                PhotoPath = photoPath,
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        public async Task<IEnumerable<CustomerDto>> GetAllAsync()
        {
            return await _context.Customers
                .Select(c => new CustomerDto
                {
                    Id = c.Id,
                    CompanyName = c.CompanyName,
                    Person1Name = c.Person1Name,
                    Contacted = c.Contacted,
                    CreatedByName = c.CreatedByUser.UserName 
                })
                .ToListAsync();
        }

        public async Task<Customer> UpdateAsync(
                CreateCustomerDto dto,
                string userId,
                string? photoPath)
        {
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Id == dto.Id);

            if (customer == null)
                throw new Exception("Customer not found");


            customer.CompanyName = dto.CompanyName;

            customer.Person1Name = dto.Person1Name;
            customer.Person1Phone = dto.Person1Phone;
            customer.Person1Job = dto.Person1Job;
            customer.Person1Email = dto.Person1Email;

            customer.Person2Name = dto.Person2Name;
            customer.Person2Phone = dto.Person2Phone;
            customer.Person2Job = dto.Person2Job;
            customer.Person2Email = dto.Person2Email;

            customer.Country = dto.Country;
            customer.City = dto.City;
            customer.Block = dto.Block;

            customer.Industry = dto.Industry;
            customer.Products = dto.Products;
            customer.Notes = dto.Notes;
            customer.CustomerType = dto.CustomerType;
            customer.Contacted = dto.Contacted ?? false;

            if (!string.IsNullOrEmpty(photoPath))
                customer.PhotoPath = photoPath;

            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task<SpecificUserDto?> GetByIdAsync(int id)
        {


            var customer = await _context.Customers
                .Include(c => c.CreatedByUser)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null)
                return null;

            return new SpecificUserDto
            {
                CompanyName = customer.CompanyName,
                Person1Name = customer.Person1Name,
                Person1Phone = customer.Person1Phone,
                Person1Job = customer.Person1Job,
                Person1Email = customer.Person1Email,
                Person2Name = customer.Person2Name,
                Person2Phone = customer.Person2Phone,
                Person2Job = customer.Person2Job,
                Person2Email = customer.Person2Email,
                Country = customer.Country,
                City = customer.City,
                Block = customer.Block,
                Industry = customer.Industry,
                Products = customer.Products,
                Notes = customer.Notes,
                CustomerType = customer.CustomerType,
                CreatedAt = customer.CreatedAt,
                CreatedBy = customer.CreatedByUser.UserName, 
                PhotoPath = customer.PhotoPath,
                Contacted = customer.Contacted
            };
        }


    }
}
