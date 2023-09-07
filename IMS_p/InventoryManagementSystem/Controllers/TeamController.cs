//using InventoryManagementSystem.Models;
//using InventoryManagementSystem.Services;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace InventoryManagementSystem.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class TeamController : ControllerBase
//    {
//        private readonly IService<Team, int> teamServ;
//        public TeamController(IService<Team,int> serv)
//        {
//            teamServ = serv;
//        }

//        [HttpGet]
//        public async Task<IActionResult> Get()
//        {
//            var response = await teamServ.GetAsync();
//            return Ok(response);  

//        }
//        [HttpPost]
//        public async Task<IActionResult> Post(Team team)
//        {
//            try
//            {
//                var resposne = await teamServ.CreateAsync(team);
//                return Ok(resposne);    

//            }
//            catch (Exception ex)
//            {
//                return Conflict(ex.Message);
//            }
//        }
//    }
//}

using InventoryManagementSystem.Models;
using InventoryManagementSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



namespace InventoryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly IService<Team, int> teamServ;
        public TeamController(IService<Team, int> serv)
        {
            teamServ = serv;
        }



        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await teamServ.GetAsync();
            return Ok(response);



        }



        [HttpGet("{id}")]
        [ActionName("getTeamById")]
        public async Task<IActionResult> Get(int id)
        {
            var response = await teamServ.GetAsync(id);
            return Ok(response);
        }



        [HttpPost]
        public async Task<IActionResult> Post(Team team)
        {
            try
            {
                var resposne = await teamServ.CreateAsync(team);
                return Ok(resposne);



            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }
        [HttpPut("{TeamID}")]
        public async Task<IActionResult> Put(int TeamID, Team team)
        {
            try
            {
                var response = await teamServ.UpdateAsync(TeamID, team);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }
    }
}


