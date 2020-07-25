using System.ComponentModel.DataAnnotations;

namespace testDotnetBackend.Web.Infrastructure.Database.Entities
{
    public class Transaction : BaseEntity
    {
        [Required]
        public string Status { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public decimal Amount { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }
    }
}
