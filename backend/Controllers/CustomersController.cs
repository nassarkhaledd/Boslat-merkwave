using backend.Dtos;
using backend.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] 
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrUpdate([FromForm] CreateCustomerDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            string? photoPath = null;

            if (dto.Photo != null)
            {
                var uploadsFolder = Path.Combine("wwwroot", "customers");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Photo.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await dto.Photo.CopyToAsync(stream);

                photoPath = $"/customers/{fileName}";
            }

            var customer = dto.Id.HasValue && dto.Id > 0
                ? await _customerService.UpdateAsync(dto, userId, photoPath)
                : await _customerService.CreateAsync(dto, userId, photoPath);

            return Ok(customer);
        }
        [HttpGet("all")]
        [Authorize(Roles = "Admin")] 
        public async Task<IActionResult> GetAll()
        {
            var customers = await _customerService.GetAllAsync();
            return Ok(customers);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById(int id)
        {
            var customer = await _customerService.GetByIdAsync(id);
            if (customer == null) return NotFound();
            return Ok(customer);
        }



    }
}
