﻿using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using testDotnetBackend.Web.Abstractions.Services;
using testDotnetBackend.Web.Infrastructure.Builders;
using testDotnetBackend.Web.Infrastructure.Database;
using testDotnetBackend.Web.Infrastructure.Database.Entities;
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

            var transactionsToAdd = new List<Transaction>();
            foreach (var pendingTransaction in result.Model)
            {
                var foundTransaction = await _applicationContext.Transactions
                    .Select(transaction => new Transaction { Id = transaction.Id, Status = transaction.Status })
                    .Where(transaction => transaction.Id == pendingTransaction.Id)
                    .FirstOrDefaultAsync();

                if (foundTransaction == null) transactionsToAdd.Add(pendingTransaction);
                else
                {
                    if (foundTransaction.Status != pendingTransaction.Status)
                    {
                        _applicationContext.Transactions.Attach(foundTransaction);
                        foundTransaction.Status = pendingTransaction.Status;
                        _applicationContext.Entry(foundTransaction).Property(transaction => transaction.Status).IsModified = true;
                    }
                }
            }
            await _applicationContext.Transactions.AddRangeAsync(transactionsToAdd);
            await _applicationContext.SaveChangesAsync();

            #endregion

            return new OperationResult(true);
        }

        private async Task<OperationDataResult<List<Transaction>>> ReadTransactionsCsvFile(IFormFile formFile)
        {
            TransactionBuilder transactionBuilder = new TransactionBuilder(new TransactionModelValidator());
            List<Transaction> transactions = new List<Transaction>();

            #region reading transactions
            using (var reader = new StreamReader(formFile.OpenReadStream()))
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
            #endregion

            return new OperationDataResult<List<Transaction>>(true, transactions);
        }
    }
}
