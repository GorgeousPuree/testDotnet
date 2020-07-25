using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

            if (result.Success) return Ok();
            return BadRequest(result.Message);
        }
    }
}