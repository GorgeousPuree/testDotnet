using testDotnetBackend.Web.Infrastructure.Responses;

namespace testDotnetBackend.Web.Abstractions.Validators
{
    public interface ITransactionModelValidator
    {
        public OperationResult IsValid(string[] lineElements, out int transactionId, out decimal amount);
    }
}
