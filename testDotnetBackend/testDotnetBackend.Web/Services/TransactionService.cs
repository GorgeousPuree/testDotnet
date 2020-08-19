using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using testDotnetBackend.Web.Abstractions.Services;
using testDotnetBackend.Web.Infrastructure.Builders;
using testDotnetBackend.Web.Infrastructure.Database;
using testDotnetBackend.Web.Infrastructure.Database.Entities;
using testDotnetBackend.Web.Infrastructure.Extensions;
using testDotnetBackend.Web.Infrastructure.Models;
using testDotnetBackend.Web.Infrastructure.Responses;
using testDotnetBackend.Web.Infrastructure.Validators;

namespace testDotnetBackend.Web.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ApplicationContext _applicationContext;
        public TransactionService(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public async Task<OperationDataResult<int>> GetTransactionsCountAsync(TransactionFiltersModel transactionFiltersModel)
        {
            var transactionsCount = await _applicationContext.Transactions
                .Where(transaction =>
                    (transactionFiltersModel.Statuses == null ? true :
                    transactionFiltersModel.Statuses.Contains(transaction.Status)) &&
                    (transactionFiltersModel.Types == null ? true :
                    transactionFiltersModel.Types.Contains(transaction.Type)))
                .CountAsync();

            return new OperationDataResult<int>(true, transactionsCount);
        }

        public async Task<OperationDataResult<List<TransactionModel>>> GetTransactionsPageAsync(GetTransactionsPageModel getTransactionsPageModel)
        {
            // TODO: refactor
            var transactionsPage = await _applicationContext.Transactions
                .Where(transaction =>
                      (getTransactionsPageModel.Statuses == null) ? true
                      : getTransactionsPageModel.Statuses.Contains(transaction.Status))
                .Where(transaction =>
                      (getTransactionsPageModel.Types == null) ? true
                      : getTransactionsPageModel.Types.Contains(transaction.Type))
                .OrderBy(transaction => transaction.Id)
                .Skip((getTransactionsPageModel.PageNumber - 1) * getTransactionsPageModel.NumberOfItemsPerPage)
                .Take(getTransactionsPageModel.NumberOfItemsPerPage)
                .Select(transaction => new TransactionModel
                {
                    Id = transaction.Id,
                    Status = transaction.Status,
                    Type = transaction.Type,
                    ClientName = transaction.Client.Name,
                    Amount = transaction.Amount
                })
                .ToListAsync();

            return new OperationDataResult<List<TransactionModel>>(true, transactionsPage);
        }

        public async Task<OperationResult> ImportTransactionsAsync(IFormFile formFile)
        {
            var result = await ReadTransactionsCsvFile(formFile);
            if (!result.Success) return result;

            #region update if exists, insert if not
            // kind of upsert implementation

            var transactionsToAdd = new List<Transaction>();
            foreach (var pendingTransaction in result.Model)
            {
                var foundTransaction = await _applicationContext.Transactions
                    .Select(transaction => new Transaction { Id = transaction.Id, Status = transaction.Status })
                    .FirstOrDefaultAsync(transaction => transaction.Id == pendingTransaction.Id);

                if (foundTransaction == null) transactionsToAdd.Add(pendingTransaction);
                else
                {
                    _applicationContext.Attach(foundTransaction);
                    foundTransaction.Status = pendingTransaction.Status;
                }
            }
            await _applicationContext.Transactions.AddRangeAsync(transactionsToAdd);
            await _applicationContext.SaveChangesAsync();

            #endregion

            return new OperationResult(true);
        }

        public async Task<OperationDataResult<string>> ExportTransactionsAsync(TransactionFiltersModel transactionFiltersModel)
        {
            var builder = new StringBuilder();
            builder.AppendLine("TransactionId,Status,Type,ClientName,Amount");

            await foreach (var transactionChunk in _applicationContext.Transactions.ToChunks(transactionFiltersModel))
                foreach (var transaction in transactionChunk)
                    builder.AppendLine($"{transaction.Id},{transaction.Status},{transaction.Type},{transaction.ClientName},${transaction.Amount}");

            return new OperationDataResult<string>(true, model: builder.ToString());
        }

        public async Task<OperationResult> UpdateTransactionStatusAsync(int id, string status)
        {
            var foundTransaction = await _applicationContext.Transactions
                .Select(transaction => new Transaction { Id = transaction.Id, Status = transaction.Status })
                .FirstOrDefaultAsync(transaction => transaction.Id == id);

            if (foundTransaction == null) return new OperationResult(false, "Cannot find transaction with such id.");

            if (foundTransaction.Status != status)
            {
                _applicationContext.Transactions.Attach(foundTransaction);
                foundTransaction.Status = status;
            }

            await _applicationContext.SaveChangesAsync();
            return new OperationResult(true);
        }

        public async Task<OperationResult> DeleteTransactionAsync(int id)
        {
            var foundTransaction = await _applicationContext.Transactions
                .Select(transaction => new Transaction { Id = transaction.Id })
                .FirstOrDefaultAsync(transaction => transaction.Id == id);

            if (foundTransaction == null) return new OperationResult(false, "Cannot find transaction with such id.");

            _applicationContext.Transactions.Remove(foundTransaction);
            await _applicationContext.SaveChangesAsync();

            return new OperationResult(true);
        }

        private async Task<OperationDataResult<List<Transaction>>> ReadTransactionsCsvFile(IFormFile formFile)
        {
            TransactionBuilder transactionBuilder = new TransactionBuilder(new TransactionModelValidator());
            List<Transaction> transactions = new List<Transaction>();

            #region reading transactions

            try
            {
                using (var reader = new StreamReader(formFile?.OpenReadStream()))
                {
                    await reader.ReadLineAsync(); // skip headers
                    int currentLine = 1;

                    while (reader.Peek() >= 0)
                    {
                        var lineElements = reader.ReadLineAsync().Result.Split(",");

                        var transactionModelBuilderResult = transactionBuilder.BuildFromStrings(lineElements);
                        if (!transactionModelBuilderResult.Success)
                            return new OperationDataResult<List<Transaction>>(
                                false,
                                transactionModelBuilderResult.Message + $" Failed at line {currentLine}.");

                        transactions.Add(transactionModelBuilderResult.Model);
                        currentLine++;
                    }
                }
            }
            catch { return new OperationDataResult<List<Transaction>>(false, "Cannot read uploaded file."); }
            #endregion

            return new OperationDataResult<List<Transaction>>(true, transactions);
        }
    }
}