using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

[ApiController]
[Route("api/[controller]")]
public class FinanceController(SportsWorldContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Finance>> Get()
    {
        var finance = await db.Finances.FirstOrDefaultAsync();
        return finance is null ? NotFound() : Ok(finance);
    }
}

