using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace testDotnetBackend.Web.Infrastructure.Database.Entities
{
    public class Client : BaseEntity
    {
        [Required]
        [StringLength(150)]
        public string Name { get; set; }

        public List<Transaction> Transactions { get; set; }
    }
}
