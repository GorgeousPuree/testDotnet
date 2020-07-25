using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using testDotnetBackend.Web.Abstractions.Services;
using testDotnetBackend.Web.Infrastructure.Builders;
using testDotnetBackend.Web.Infrastructure.Database;
using testDotnetBackend.Web.Infrastructure.Database.Entities;
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

        public async Task<OperationResult> ImportTransactionsAsync(IFormFile formFile)
        {
            var result = await ReadTransactionsCsvFile(formFile);
            if (!result.Success) return result;

            #region update if exists, insert if not
            // kind of upsert implementation

            foreach (var transactionModel in result.Model)
            {
                var client = await _applicationContext.Clients.FirstOrDefaultAsync(c => c.Name == transactionModel.ClientName);
                if (client == null)
                {
                    client = new Client { Name = transactionModel.ClientName };
                    _applicationContext.Clients.Add(client);
                }

                var transaction = await _applicationContext.Transactions.FirstOrDefaultAsync(t => t.Id == transactionModel.Id);
                if (transaction == null)
                {
                    transaction = new Transaction { Id = transactionModel.Id };
                    _applicationContext.Transactions.Add(transaction);
                }

                transaction.Status = transactionModel.Status;
                transaction.Type = transactionModel.Type;
                transaction.Amount = transactionModel.Amount;
                transaction.Client = client;
            }
            await _applicationContext.SaveChangesAsync();
            #endregion

            return new OperationResult(true);
        }

        private async Task<OperationDataResult<List<TransactionModel>>> ReadTransactionsCsvFile(IFormFile formFile)
        {
            TransactionModelBuilder transactionModelBuilder = new TransactionModelBuilder(new TransactionModelValidator());
            List<TransactionModel> transactionModels = new List<TransactionModel>();

            #region filling transactionModels
            using (var reader = new StreamReader(formFile.OpenReadStream()))
            {
                await reader.ReadLineAsync(); // skip headers
                int currentLine = 1;

                while (reader.Peek() >= 0)
                {
                    var lineElements = reader.ReadLineAsync().Result.Split(",");

                    var transactionModelBuilderResult = transactionModelBuilder.BuildFromStrings(lineElements);
                    if (!transactionModelBuilderResult.Success)
                        return new OperationDataResult<List<TransactionModel>>(
                            false,
                            transactionModelBuilderResult.Message + $" Failed at line {currentLine}.");

                    transactionModels.Add(transactionModelBuilderResult.Model);
                    currentLine++;
                }
            }
            #endregion

            return new OperationDataResult<List<TransactionModel>>(true, transactionModels);
        }
    }
}

