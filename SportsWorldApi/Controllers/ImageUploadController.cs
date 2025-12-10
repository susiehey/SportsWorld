using Microsoft.AspNetCore.Mvc;

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageUploadController(IWebHostEnvironment webHostEnvironment) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(IFormFile file)
    {
        try
        {
            //Husk!: Sjekk om filen er null med if()
            string webRootPath = webHostEnvironment.WebRootPath;
            string absolutePath = Path.Combine(webRootPath, "images", file.FileName); 

            using(var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Created();
        }
        catch
        {
            return StatusCode(500);
        }
    }
}