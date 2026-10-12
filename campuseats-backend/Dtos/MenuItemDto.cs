using System.ComponentModel.DataAnnotations;

namespace CampusEats.Api.Dtos;

// Output DTO — the public API contract returned to clients
public record MenuItemDto(
    int Id, 
    string Name, 
    decimal Price,
    string Category, 
    bool Available
);