using InventoryManagementSystem.data_access;
using InventoryManagementSystem.Models;
using InventoryManagementSystem.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddScoped<IService<Package, int>, PackageService>();
builder.Services.AddScoped<IService<Team, int>, TeamService>();
builder.Services.AddScoped<IService<Category, int>, CategoryService>();
//dependency injection for Dbcontext

builder.Services.AddDbContext<PackageDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Connection")));
//registering the service class


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
