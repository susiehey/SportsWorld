using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinanceController(SportsWorldContext _SportsWorldContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Finance>> Get()
    {
        var finance = await _SportsWorldContext.Finances.FirstOrDefaultAsync();
        return finance is null ? NotFound() : Ok(finance);
    }

    public sealed class LoanDto
    {
        public int Amount { get; set; }
    }

    [HttpPost("increaseMoney")]
    public async Task<ActionResult<Finance>> IncreaseMoney([FromBody] LoanDto dto)
    {
        if (dto.Amount <= 0) return BadRequest("Amount must be greater than zero.");

        var finance = await _SportsWorldContext.Finances.FirstOrDefaultAsync();
        if (finance is null)
        {
            finance = new Finance
            {
              MoneyLeft = 0,
              MoneySpent = 0,
              NumberOfPurchases = 0  
            };
            _SportsWorldContext.Finances.Add(finance);
        }
        finance.MoneyLeft += dto.Amount;
        await _SportsWorldContext.SaveChangesAsync();
        return Ok(finance);
    }

    public sealed class PurchaseDto
    {
        public int AthleteId { get; set; }
    }


    [HttpPost("purchase")]
    public async Task<ActionResult<Finance>> Purchase([FromBody] PurchaseDto dto)
    {
        if (dto.AthleteId <= 0) return BadRequest("Invalid AthleteId");

        var finance = await _SportsWorldContext.Finances.FirstOrDefaultAsync();
        if (finance is null) return NotFound("Finance not found");

        var athlete = await _SportsWorldContext.Athletes.FirstOrDefaultAsync(a => a.Id == dto.AthleteId);
        if (athlete is null) return NotFound("Athlete not found");
        if (athlete.PurchaseStatus) return BadRequest("Athlete already purchased");
        if (finance.MoneyLeft < athlete.Price) return BadRequest("Not enough money");

        // Oppdaterer finansinformasjon
        finance.MoneyLeft -= athlete.Price;
        finance.MoneySpent += athlete.Price;
        finance.NumberOfPurchases += 1;
        athlete.PurchaseStatus = true;

        await _SportsWorldContext.SaveChangesAsync();
        return Ok(finance);

    }
}

