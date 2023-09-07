using InventoryManagementSystem.Models;
using InventoryManagementSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementSystem.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PackageController : ControllerBase
    {
        private readonly IService<Package, int> pserv;
        public PackageController(IService<Package,int> serv)
        {
            pserv = serv;
        }

        [HttpGet]
        [ActionName("getAllPackages")]
        public async Task<IActionResult> Get()
        {
            var response = await pserv.GetAsync();
            return Ok(response);    
        }

        [HttpGet("{id}")]
        [ActionName("getPackagesById")]
        public async Task<IActionResult> Get(int id)
        {
            var response = await pserv.GetAsync(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Package package)
        {
            var response = await pserv.CreateAsync(package);
            return Ok(response);    
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await pserv.DeleteAsync(id);
            return Ok("Record is Deleted");
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Package package)
        {
            var response=await pserv.UpdateAsync(id, package);
            return Ok(response);
        }

        [HttpGet]
        [ActionName("searchByReceiver")]
        public IActionResult Get(string name)
        {
            var result = pserv.GetByReciever(name);
            return Ok(result.Result);
        }

    }
}
