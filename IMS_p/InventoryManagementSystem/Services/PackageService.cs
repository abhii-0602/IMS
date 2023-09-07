using InventoryManagementSystem.data_access;
using InventoryManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Services
{
    public class PackageService : IService<Package,int>
    {
        private readonly PackageDbContext ctx;

        public PackageService(PackageDbContext ctx)
        {
            this.ctx = ctx; 
        }

       async  Task<string> IService<Package, int>.CreateAsync(Package entity)
        {
            var result = await ctx.Package.AddAsync(entity);
            await ctx.SaveChangesAsync();
            return "done";
        }

       async  Task IService<Package, int>.DeleteAsync(int id)
        {
            var record = await ctx.Package.FindAsync(id);
            if (record == null) return;
            ctx.Package.Remove(record);
            await ctx.SaveChangesAsync();   
        }

        async Task<IEnumerable<Package>> IService<Package, int>.GetAsync()
        {
            return await ctx.Package.ToListAsync();
        }

        async Task<Package> IService<Package, int>.GetAsync(int id)
        {
            return await ctx.Package.FindAsync(id);
        }

        async Task<Package> IService<Package,int>.UpdateAsync(int id, Package entity)
        {
            var record = await ctx.Package.FindAsync(id);
            if (record == null) return null;

            record.TrackingId = entity.TrackingId;
            record.SenderName = entity.SenderName;
            record.RecieverName = entity.RecieverName;
            record.Date=entity.Date;
          
           
            await ctx.SaveChangesAsync();
            return record;

        }

        

        async Task<IEnumerable<Package>> IService<Package, int>.GetByReciever(string search)
        {
            //var resultSet =  ctx.Package.ToList();

            //var res = resultSet.Where(term => term.RecieverName.ToLower().Contains(paramValue.Trim().ToLower()));
            //return res;

           
                var trades = ctx.Package.Where(t =>
                    t.RecieverName.Contains(search) ||
                    t.SenderName.Contains(search) ||  
                    t.TrackingId.Contains(search)
                ).ToList();
                return trades;
            
        }

        public Task<Package> UpdateTeamAsync(Package entity)
        {
            throw new NotImplementedException();
        }
    }
}
