using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using testDotnetBackend.Web.Infrastructure.Database.Entities;
using testDotnetBackend.Web.Infrastructure.Models;

namespace testDotnetBackend.Web.Infrastructure.Extensions
{
    public static class DbSetExtensions
    {
        private const int transactionSegmentCount = 50;
        public static async IAsyncEnumerable<List<TransactionModel>> ToChunks(this DbSet<Transaction> transactions)
        {
            int lastTransactionId = default;
            int count = transactions.Count();

            for (int i = 0; i < count; i += transactionSegmentCount)
            {
                var transactionModels = await transactions
                    .Where(transaction => transaction.Id > lastTransactionId)
                    .Select(transaction => new TransactionModel
                    {
                        TransactionId = transaction.Id,
                        Status = transaction.Status,
                        Type = transaction.Type,
                        ClientName = transaction.Client.Name,
                        Amount = transaction.Amount
                    })
                    .OrderBy(transactionModel => transactionModel.TransactionId)
                    .Take(transactionSegmentCount)
                    .ToListAsync();

                lastTransactionId = transactionModels.Last().TransactionId;
                yield return transactionModels;
            }
        }
    }
}
