using System.ComponentModel.DataAnnotations;

namespace CampusEats.Api.Dtos;

// Input DTO — client does not send Id as it is assigned by the server
public record CreateMenuItemDto(
    [Required, StringLength(80)] string Name,
    [Range(0, 100000)] decimal Price,
    [Required, StringLength(40)] string Category
);
