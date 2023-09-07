using InventoryManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.data_access
{
    public class PackageDbContext:DbContext 
    {
        public PackageDbContext(DbContextOptions<PackageDbContext> options) : base(options)
        {

        }

        public DbSet<Package> Package { get; set; }
        public DbSet<Team> Team { get; set; }
        public DbSet<Category> Category { get; set; }
        //public DbSet< Member> Member {get; set;}
    }
}
