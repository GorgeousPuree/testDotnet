﻿using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using testDotnetBackend.Web.Infrastructure.Models;
using testDotnetBackend.Web.Infrastructure.Responses;

namespace testDotnetBackend.Web.Abstractions.Services
{
    public interface ITransactionService
    {
        Task<OperationResult> ImportTransactionsAsync(IFormFile formFile);
        Task<OperationDataResult<string>> ExportTransactionsAsync(TransactionFiltersModel transactionFiltersModel);
        Task<OperationResult> UpdateTransactionStatusAsync(int id, string status);
        Task<OperationResult> DeleteTransactionAsync(int id);
        Task<OperationDataResult<List<TransactionModel>>> GetTransactionsPageAsync(GetTransactionsPageModel getTransactionsPageModel);
        Task<OperationDataResult<int>> GetTransactionsCountAsync(TransactionFiltersModel transactionFiltersModel);
    }
}
