﻿using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using testDotnetBackend.Web.Infrastructure.Database.Entities;
using testDotnetBackend.Web.Infrastructure.Models;

namespace testDotnetBackend.Web.Infrastructure.Extensions
{
    public static class DbSetExtensions
    {
        private const int transactionSegmentCount = 50;
        public static async IAsyncEnumerable<List<TransactionModel>> ToChunks(this DbSet<Transaction> transactions, TransactionFiltersModel transactionFiltersModel)
        {
            int count = transactions.Count();

            for (int i = 0; i < count; i += transactionSegmentCount)
            {
                var transactionModels = await transactions
                    .Where(transaction =>
                          (transactionFiltersModel.Statuses == null) ? true
                                : transactionFiltersModel.Statuses.Contains(transaction.Status))
                    .Where(transaction =>
                          (transactionFiltersModel.Types == null) ? true
                                : transactionFiltersModel.Types.Contains(transaction.Type))
                    .AsNoTracking()
                    .OrderBy(transaction => transaction.Id)
                    .Skip(i)
                    .Select(transaction => new TransactionModel
                    {
                        Id = transaction.Id,
                        Status = transaction.Status,
                        Type = transaction.Type,
                        ClientName = transaction.Client.Name,
                        Amount = transaction.Amount
                    })
                    .Take(transactionSegmentCount)
                    .ToListAsync();

                yield return transactionModels;
            }
        }
    }
}
