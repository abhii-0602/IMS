
using InventoryManagementSystem.data_access;
using InventoryManagementSystem.Models;
using Microsoft.EntityFrameworkCore;



namespace InventoryManagementSystem.Services
{
    public class TeamService : IService<Team, int>
    {
        private readonly PackageDbContext ctx;



        public TeamService(PackageDbContext ctx)
        {
            this.ctx = ctx;
        }

        public class CustomException : Exception
        {
            public int StatusCode { get; }

            public CustomException(int statusCode, string message) : base(message)
            {
                StatusCode = statusCode;
            }
        }
        // Create a new team asynchronously
        async Task<string> IService<Team, int>.CreateAsync(Team entity)
        {
            var teams = await ctx.Team.ToListAsync(); // Get all teams from the database
            var exists = teams.Any(c => c.TeamName == entity.TeamName); // Check if the team with the same name already exists
            if (exists)
            {
                throw new CustomException(409, "Team already exists");
            }
            var result = await ctx.Team.AddAsync(entity); // Add the new team to the context
            await ctx.SaveChangesAsync(); // Save changes to the database
            return "Team Added";
        }



        // Delete a team asynchronously based on its ID
        Task IService<Team, int>.DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }



        // Get all teams asynchronously
        async Task<IEnumerable<Team>> IService<Team, int>.GetAsync()
        {
            return await ctx.Team.ToListAsync(); // Return a list of all teams from the database
        }



        // Get a team asynchronously based on its ID
        async Task<Team> IService<Team, int>.GetAsync(int id)
        {
            var result = await ctx.Team.FindAsync(id);
            return result ?? null;
        }



        // Get teams asynchronously based on the receiver's name or other search terms
        Task<IEnumerable<Team>> IService<Team, int>.GetByReciever(string name)
        {
            throw new NotImplementedException();
        }



        // Update a team asynchronously based on its ID
        public async Task<Team> UpdateAsync(int id, Team entity)
        {

            var existingTeamName = await ctx.Team.SingleOrDefaultAsync(t => t.TeamName == entity.TeamName);

            // Check if a team with the same name already exists
            if (existingTeamName != null && existingTeamName.TeamID != id)
            {
                throw new Exception("Team name already exists.");
            }
            var record = await ctx.Team.FindAsync(id);
            if (record == null) return null;

            record.TeamName = entity.TeamName;
            record.ManagerName = entity.ManagerName;
            record.ManagerEmailID = entity.ManagerEmailID;
            record.ManagerGID = entity.ManagerGID;
            await ctx.SaveChangesAsync();
            return record;
        }




        async Task<Team> IService<Team, int>.UpdateTeamAsync(Team entity)
        {
            try
            {
                var result = ctx.Team.Update(entity); // Update the team in the context
                                                      //var result = ctx.Team.Where(team => team.TeamName.Equals(entity.TeamName));
                                                      //if(result != null)
                                                      //{



                //}
                await ctx.SaveChangesAsync(); // Save changes to the database
                return result.Entity;
            }
            catch (Exception ex)
            {
                // Handle any exceptions here
                Console.WriteLine($"An error occurred while updating the team: {ex.Message}");
                throw; // Rethrow the exception or handle it accordingly
            }
        }
    }
}
