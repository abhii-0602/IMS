namespace InventoryManagementSystem.Services
{
    public interface IService<TEntity,in TPk> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAsync(); //getting all data
        Task<TEntity> GetAsync(TPk id); //getting by id 

        Task<string> CreateAsync(TEntity entity); //for posting the pacakge details
        Task<TEntity> UpdateAsync(TPk id, TEntity entity);  //updating details

        Task DeleteAsync(TPk id); //deleteing package details 

        Task<IEnumerable<TEntity>> GetByReciever(string name); //search by anything

        Task<TEntity> UpdateTeamAsync(TEntity entity);


    }

   
}
