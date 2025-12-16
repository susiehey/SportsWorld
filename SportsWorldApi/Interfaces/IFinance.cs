namespace SportsWorldApi.Interfaces;

interface IFinance
{
    int Id { get; set; }
    int MoneyLeft { get; set; }
    int NumberOfPurchases { get; set; }
    int MoneySpent { get; set; }
    int LoanBalance { get; set; }
}