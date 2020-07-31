using System.ComponentModel.DataAnnotations;

namespace testDotnetBackend.Web.Infrastructure.Models
{
    public class GetTransactionsPageModel
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "PageNumber has to be bigger than {1}")]
        public int PageNumber { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "NumberOfItemsPerPage has to be bigger than {1}")]
        public int NumberOfItemsPerPage { get; set; }

        [Required]
        public TransactionFiltersModel TransactionFilters { get; set; }
    }
}
