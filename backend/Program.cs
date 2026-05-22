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
            .AllowAnyOrigin()
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

app.UseCors(reactOrigins);

app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/", () => "MapaCafe API online");

app.MapGet("/health/db", async (MapaCafeContext db) =>
{
    try
    {
        var canConnect = await db.Database.CanConnectAsync();
        return Results.Ok(new { database = canConnect ? "conectado" : "nao conectado" });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapControllers();

app.Run();