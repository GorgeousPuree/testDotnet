using System.ComponentModel.DataAnnotations;

namespace testDotnetBackend.Web.Infrastructure.Models
{
    public class TransactionFiltersModel
    {
        [RegularExpression("(Completed|Pending|Cancelled)")]
        public string Status { get; set; }
        [RegularExpression("(Refill|Withdrawal)")]
        public string Type { get; set; }
    }
}
