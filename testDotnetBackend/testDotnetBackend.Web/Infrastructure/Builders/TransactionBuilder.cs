using testDotnetBackend.Web.Abstractions.Validators;
using testDotnetBackend.Web.Infrastructure.Database.Entities;
using testDotnetBackend.Web.Infrastructure.Responses;

namespace testDotnetBackend.Web.Infrastructure.Builders
{
    public class TransactionBuilder
    {
        private ITransactionModelValidator _transactionModelValidator;
        public TransactionBuilder(ITransactionModelValidator transactionModelValidator)
        {
            _transactionModelValidator = transactionModelValidator;
        }

        public OperationDataResult<Transaction> BuildFromStrings(string[] lineElements)
        {
            int transactionId;
            decimal amount;

            var validationResult = _transactionModelValidator.IsValid(lineElements, out transactionId, out amount);
            if (validationResult.Success)
                return new OperationDataResult<Transaction>(true, new Transaction
                {
                    Id = transactionId,
                    Status = lineElements[1],
                    Type = lineElements[2],
                    Client = new Client { Name = lineElements[3] },
                    Amount = amount
                });
            else return new OperationDataResult<Transaction>(false, validationResult.Message);
        }
    }
}
