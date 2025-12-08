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
            List<Athlete> athletes = await _SportsWorldContext.Athletes.ToListAsync();
            return Ok(athletes);
        }
        catch
        {
            return StatusCode(500, "Server side error when getting athletes");
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
            return StatusCode(500);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Athlete>> Get(int id)
    {
        try
        {
            Athlete? athlete = await _SportsWorldContext.Athletes.FindAsync(id);

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
            return StatusCode(500);
        }
    }

}