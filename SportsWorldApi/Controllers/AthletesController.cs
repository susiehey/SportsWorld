using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AthletesController(SportsWorldContext _SportsWorldContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            List<Athlete> athletes = await _SportsWorldContext.Athletes.ToListAsync();
            return Ok(athletes);
        }
        catch
        {
            return StatusCode(500, "Search failed.");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Athlete>> GetById(int id)
    {
        try
        {
            Athlete? athlete = await _SportsWorldContext.Athletes.FindAsync(id);

            if(athlete != null)
            {
                return Ok(athlete);
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500, "Search failed.");
        }
    }

    [HttpGet]
    [Route("[action]/{name}")]
    public async Task<ActionResult<List<Athlete>>> GetByName(string name)
    {
        try
        {
            List<Athlete> athletes = await _SportsWorldContext.Athletes.Where(
                a => a.Name.ToLower().Contains(name.ToLower())
            ).ToListAsync();
            return Ok(athletes);
        }
        catch
        {
            return StatusCode(500, "Search failed.");
        }
    }

    [HttpPost]
    public async Task<ActionResult> Post(Athlete newAthlete)
    {
        try
        {
            _SportsWorldContext.Athletes.Add(newAthlete);
            await _SportsWorldContext.SaveChangesAsync();
            return Created();
        }
        catch
        {
            return StatusCode(500, "Create failed.");
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put(Athlete editedAthlete)
    {
        try
        {
            _SportsWorldContext.Athletes.Entry(editedAthlete).State = EntityState.Modified;
            await _SportsWorldContext.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "Update failed.");
        }
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var athlete = await _SportsWorldContext.Athletes.FindAsync(id);
            if(athlete == null) return NotFound();
            
            _SportsWorldContext.Athletes.Remove(athlete);
            await _SportsWorldContext.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500, "Delete failed.");
        }
    }

}