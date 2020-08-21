using testDotnetBackend.Web.Infrastructure.CustomAttributes;

namespace testDotnetBackend.Web.Infrastructure.Models
{
    public class TransactionModel
    {
        public int Id { get; set; }

        [AllowedStatuses]
        public string Status { get; set; }

        [AllowedTypes]
        public string Type { get; set; }
        public string ClientName { get; set; }
        public decimal Amount { get; set; }
    }
}
