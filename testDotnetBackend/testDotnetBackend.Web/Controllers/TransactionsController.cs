using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using testDotnetBackend.Web.Abstractions.Services;

namespace testDotnetBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionsController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }


        [HttpPost("import")]
        public async Task<IActionResult> ImportTransactions([FromForm(Name = "file")] IFormFile formFile)
        {
            var result = await _transactionService.ImportTransactionsAsync(formFile);
            return result.Success ? (IActionResult)Ok() : BadRequest(result.Message);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransactionStatus(int id, [FromBody, RegularExpression("(Completed|Pending|Cancelled)")] string status)
        {
            var result = await _transactionService.UpdateTransactionStatusAsync(id, status);
            return result.Success ? (IActionResult)Ok() : BadRequest(result.Message);
        }
    }
}