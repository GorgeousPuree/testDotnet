using testDotnetBackend.Web.Abstractions.Validators;
using testDotnetBackend.Web.Infrastructure.Models;
using testDotnetBackend.Web.Infrastructure.Responses;

namespace testDotnetBackend.Web.Infrastructure.Builders
{
    public class TransactionModelBuilder
    {
        private ITransactionModelValidator _transactionModelValidator;
        public TransactionModelBuilder(ITransactionModelValidator transactionValidator)
        {
            _transactionModelValidator = transactionValidator;
        }

        public OperationDataResult<TransactionModel> BuildFromStrings(string[] lineElements)
        {
            int transactionId;
            decimal amount;

            var validationResult = _transactionModelValidator.IsValid(lineElements, out transactionId, out amount);
            if (validationResult.Success)
            {
                var transactionModel = new TransactionModel
                {
                    Id = transactionId,
                    Status = lineElements[1],
                    Type = lineElements[2],
                    ClientName = lineElements[3],
                    Amount = amount
                };
                return new OperationDataResult<TransactionModel>(true, transactionModel);
            }
            else return new OperationDataResult<TransactionModel>(false, validationResult.Message);
        }
    }
}
