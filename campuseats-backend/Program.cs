using System.Text;
using CampusEats.Api.Data;
using CampusEats.Api.Models;
using CampusEats.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// ── CORS Policy for Deployed Frontend (Lab 11 Task 03) ───────
builder.Services.AddCors(o => o.AddPolicy("Frontend", p =>
    p.WithOrigins(
        "https://campuseats-web.vercel.app",
        "https://campuseats-it24102414.vercel.app",
        "http://localhost:5173"
    )
    .AllowAnyHeader()
    .AllowAnyMethod()));

// ── Swagger + JWT Authorize button ──────────────────────────
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "Paste ONLY the token - no 'Bearer ' prefix."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// ── EF Core + PostgreSQL (ConnectionStrings__Default in Cloud) ─
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddScoped<IMenuService, MenuService>();

// ── JWT Authentication (Jwt__Key in Cloud) ───────────────────
var jwt = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwt["Key"] ?? "DevelopmentFallbackSecretKeyThatIsAtLeast32BytesLong!");

builder.Services
  .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(opt => opt.TokenValidationParameters = new()
  {
      ValidateIssuer = true,
      ValidIssuer = jwt["Issuer"] ?? "CampusEats",
      ValidateAudience = true,
      ValidAudience = jwt["Audience"] ?? "CampusEatsUsers",
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = new SymmetricSecurityKey(key),
      ValidateLifetime = true
  });
builder.Services.AddAuthorization();

var app = builder.Build();

// ── Automatic EF Core Migrations & Seed Data ─────────────────
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        db.Database.Migrate();
        if (!db.MenuItems.Any())
        {
            db.MenuItems.AddRange(
                new MenuItem { Name = "Kottu Roti", Price = 750m, Category = "Mains" },
                new MenuItem { Name = "Fried Rice", Price = 850m, Category = "Mains" },
                new MenuItem { Name = "Watalappan", Price = 350m, Category = "Dessert" });
            db.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database initialization note: {ex.Message}");
    }
}

// ── Swagger UI enabled for API exploration & testing ─────────
app.UseSwagger();
app.UseSwaggerUI();

// ── CORS middleware (Must come before MapControllers) ────────
app.UseCors("Frontend");

app.UseAuthentication();   // who are you?  (validates JWT)
app.UseAuthorization();    // may you?      (checks roles)

app.MapControllers();

// Automatically redirect root URL to Swagger UI
app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();
