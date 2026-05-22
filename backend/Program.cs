using System.Text.Json.Serialization;
using MapaCafe.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

var reactOrigins = "_reactOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: reactOrigins, policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:3000",
                "http://localhost",
                "http://frontend",
                "https://seudominio.vercel.app"
            )
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MapaCafeContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        opts.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

    app.UseSwagger();
    app.UseSwaggerUI();


app.UseCors(reactOrigins);

app.UseHttpsRedirection();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MapaCafeContext>();
    db.Database.EnsureCreated();
}

app.Run();
