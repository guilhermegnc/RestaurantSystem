using Microsoft.EntityFrameworkCore;
using RestaurantSystem.API.Services;
using RestaurantSystem.API.Repositories;
using RestaurantSystem.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Conexão com o MySQL via EF Core
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 36)),
        mysqlOptions => mysqlOptions.EnableRetryOnFailure()
    )
);
builder.Services.AddScoped<PedidoService>();

builder.Services.AddScoped<IPedidoRepository, PedidoRepository>();

builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<UsuarioService>();

builder.Services.AddScoped<IMesaRepository, MesaRepository>();
builder.Services.AddScoped<MesaService>();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Configura para preservar referências e evitar ciclos
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
