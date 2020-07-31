using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading.Tasks;
using testDotnetBackend.Web.Abstractions.Services;
using testDotnetBackend.Web.Infrastructure.Models;

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

        [HttpGet("page")]
        public async Task<IActionResult> GetTransactionsPage(GetTransactionsPageModel getTransactionsPageModel)
        {
            var result = await _transactionService.GetTransactionsPageAsync(getTransactionsPageModel);
            return result.Success ? (IActionResult)Ok(result.Model) : BadRequest(result.Message);
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetTransactionsCount(TransactionFiltersModel transactionFiltersModel)
        {
            var result = await _transactionService.GetTransactionsCountAsync(transactionFiltersModel);
            return result.Success ? (IActionResult)Ok(result.Model) : StatusCode(500);
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportTransactions([FromForm(Name = "file")] IFormFile formFile)
        {
            var result = await _transactionService.ImportTransactionsAsync(formFile);
            return result.Success ? (IActionResult)Ok() : BadRequest(result.Message);
        }

        [HttpGet("export")]
        public async Task<IActionResult> ExportTransactions(TransactionFiltersModel transactionFiltersModel)
        {
            var result = await _transactionService.ExportTransactionsAsync(transactionFiltersModel);
            return result.Success ? File(Encoding.UTF8.GetBytes(result.Model), "text/csv", "data.csv") : (IActionResult)StatusCode(500);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransactionStatus(int id, [FromBody, RegularExpression("(Completed|Pending|Cancelled)")] string status)
        {
            var result = await _transactionService.UpdateTransactionStatusAsync(id, status);
            return result.Success ? (IActionResult)Ok() : BadRequest(result.Message);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var result = await _transactionService.DeleteTransactionAsync(id);
            return result.Success ? (IActionResult)Ok() : BadRequest(result.Message);
        }
    }
}