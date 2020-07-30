using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Text;
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

        [HttpGet("export")]
        public async Task<IActionResult> ExportTransactions()
        {
            var result = await _transactionService.ExportTransactionsAsync();
            return File(Encoding.UTF8.GetBytes(result.Model), "text/csv", "data.csv");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransactionStatus(int id, [FromBody, RegularExpression("(Completed|Pending|Cancelled)")] string status)
        {
            var result = await _transactionService.UpdateTransactionStatusAsync(id, status);
            return result.Success ? (IActionResult)Ok() : BadRequest(result.Message);
        }
    }
}