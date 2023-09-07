using InventoryManagementSystem.data_access;
using InventoryManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Services
{
    public class CategoryService:IService<Category, int>
    {
        private readonly PackageDbContext ctx;
        public CategoryService(PackageDbContext ctx)
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
public async Task<string> CreateAsync(Category entity)
{
    try
    {
        var category = await ctx.Category.ToListAsync();
        var exists = category.Any(c => c.CategoryName.ToLower() == entity.CategoryName.ToLower());
        
        if (exists)
        {
            throw new CustomException(409, "Category already exists");
        }

        var existingCategory = category.FirstOrDefault(c => c.Id == entity.Id);
        
        if (existingCategory != null && existingCategory.CategoryName.ToLower() == entity.CategoryName.ToLower())
        {
            throw new CustomException(409, "Cannot update to the same category name");
        }

        var result = await ctx.Category.AddAsync(entity);
        await ctx.SaveChangesAsync();

        return "Category Added";
    }
    catch (CustomException)
    {
        throw;
    }
    catch (Exception ex)
    {
        throw new CustomException(500, "An error occurred while processing the request");
    }
}

        // public async Task<string> CreateAsync(Category entity)
        // {
        //     try
        //     {
        //         var category = await ctx.Category.ToListAsync();
        //         var exists = category.Any(c => c.CategoryName.ToLower() == entity.CategoryName.ToLower());
        //         if (exists)
        //         {
        //             throw new CustomException(409, "Category already exists");
        //         }

        //         var result = await ctx.Category.AddAsync(entity);
        //         await ctx.SaveChangesAsync();

        //         return "Category Added";
        //     }
        //     catch (CustomException)
        //     {
        //         throw; 
        //     }
        //     catch (Exception ex)
        //     {
        //         throw new CustomException(500, "An error occurred while processing the request");
        //     }
        // }


        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Category>> GetAsync()
        {
            return await ctx.Category.ToListAsync();
        }
         async Task<Category> IService<Category, int>.GetAsync(int id)
        {
            var result = await ctx.Category.FindAsync(id);
            return result ?? null;
        }
        // public Task<Category> GetAsync(int id)
        // {
        //     throw new NotImplementedException();
        // }

        public Task<IEnumerable<Category>> GetByReciever(string name)
        {
            throw new NotImplementedException();
        }
 public async Task<Category> UpdateAsync(int id, Category entity)
        {
             var record = await ctx.Category.FindAsync(id);
            if (record == null) return null;

            record.CategoryName = entity.CategoryName;
            
            await ctx.SaveChangesAsync();
            return record;
            throw new NotImplementedException();
        }
        // public Task<Category> UpdateAsync(int id, Category entity)
        // {
        //     throw new NotImplementedException();
        // }

        public Task<Category> UpdateTeamAsync(Category entity)
        {
            throw new NotImplementedException();
        }
    }
}
