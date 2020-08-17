using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using testDotnetBackend.Web.Infrastructure.CustomAttributes;

namespace testDotnetBackend.Web.Infrastructure.Models
{
    public class GetTransactionsPageModel
    {
        [FromRoute]
        [Range(1, int.MaxValue, ErrorMessage = "PageNumber has to be bigger than {1}")]
        public int PageNumber { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "NumberOfItemsPerPage has to be bigger than {1}")]
        public int NumberOfItemsPerPage { get; set; }

        [AllowedStatuses(ErrorMessage = "Unknown transaction status.")]
        [FromQuery(Name = "statuses[]")]
        public List<string> Statuses { get; set; }

        [AllowedTypes(ErrorMessage = "Unknown transaction type.")]
        [FromQuery(Name = "types[]")]
        public List<string> Types { get; set; }
    }
}
