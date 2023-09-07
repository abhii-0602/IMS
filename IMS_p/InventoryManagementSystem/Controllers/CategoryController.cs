using InventoryManagementSystem.Models;
using InventoryManagementSystem.Services;
using Microsoft.AspNetCore.Mvc;
using static InventoryManagementSystem.Services.CategoryService;

namespace InventoryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IService<Category, int> categoryServ;
        public CategoryController(IService<Category, int> serv)
        {
            categoryServ = serv;
        }
        //[HttpPost]
        //public async Task<IActionResult> Post(Category category)
        //{
        //    try
        //    {
        //        var response = await categoryServ.CreateAsync(category);
        //        return Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Conflict(ex.Message);
        //    }
        //}

        [HttpPost]
        public async Task<IActionResult> Post(Category category)
        {
            try
            {
                var response = await categoryServ.CreateAsync(category);
                return Ok(response);
            }
            catch (CustomException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing the request");
            }
        }
        [HttpPut("{ID}")]
        public async Task<IActionResult> Put(int ID, Category category)
        {
            try
            {
                var response = await categoryServ.UpdateAsync(ID, category);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await categoryServ.GetAsync();
            return Ok(response);
        }
         [HttpGet("{id}")]
        [ActionName("getCategoryById")]
        public async Task<IActionResult> Get(int id)
        {
            var response = await categoryServ.GetAsync(id);
            return Ok(response);
        }
    }

}
