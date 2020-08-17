using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using testDotnetBackend.Web.Infrastructure.CustomAttributes;

namespace testDotnetBackend.Web.Infrastructure.Models
{
    public class TransactionFiltersModel
    {
        //[RegularExpression("(Completed|Pending|Cancelled)")]
        [AllowedStatuses(ErrorMessage = "Unknown transaction status.")]
        [FromQuery(Name = "statuses[]")]
        public List<string> Statuses { get; set; }
        //[RegularExpression("(Refill|Withdrawal)")]
        [AllowedTypes(ErrorMessage = "Unknown transaction type.")]
        [FromQuery(Name = "types[]")]
        public List<string> Types { get; set; }
    }
}
