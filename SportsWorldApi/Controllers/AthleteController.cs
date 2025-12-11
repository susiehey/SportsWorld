using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AthleteController(SportsWorldContext _SportsWorldContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            List<Athlete> athletes = await _MMAContext.Athletes.ToListAsync();
            return Ok(athletes);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Athlete>> Get(int id)
    {
        try
        {
            Athlete? athlete = await _MMAContext.Athletes.FindAsync(id);

            if(athlete != null)
            {
                return Ok(athlete); //200
            }
            else
            {
                return NotFound(); //404
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpGet]
    [Route("[action]/{name}")]
    public async Task<ActionResult<List<Athlete>>> GetByName(string name)
    {
        try
        {
            List<Athlete> athletes = await _MMAContext.Athletes.Where(
                a => a.Name.Contains(name)
            ).ToListAsync();

            return Ok(athletes);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPost]
    public async Task<ActionResult> Post(Athlete newAthlete)
    {
        try
        {
            _MMAContext.Athletes.Add(newAthlete);
            await _MMAContext.SaveChangesAsync();
            return Created();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put(Athlete editedAthlete)
    {
        try
        {
            _MMAContext.Athletes.Entry(editedAthlete).State = EntityState.Modified;
            await _MMAContext.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }

}