using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace testDotnetBackend.Web.Infrastructure.Models
{
    public class GetTransactionsPageModel
    {
        [FromRoute]
        [Range(1, int.MaxValue, ErrorMessage = "PageNumber has to be bigger than {1}")]
        public int PageNumber { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "NumberOfItemsPerPage has to be bigger than {1}")]
        public int NumberOfItemsPerPage { get; set; }

        [RegularExpression("(Completed|Pending|Cancelled)")]
        public string Status { get; set; }

        [RegularExpression("(Refill|Withdrawal)")]
        public string Type { get; set; }
    }
}
