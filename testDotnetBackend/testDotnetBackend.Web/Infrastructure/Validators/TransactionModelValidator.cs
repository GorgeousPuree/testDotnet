using System.Linq;
using testDotnetBackend.Web.Abstractions.Validators;
using testDotnetBackend.Web.Infrastructure.Const;
using testDotnetBackend.Web.Infrastructure.Responses;

namespace testDotnetBackend.Web.Infrastructure.Validators
{
    public class TransactionModelValidator : ITransactionModelValidator
    {
        public OperationResult IsValid(string[] lineElements, out int transactionId, out decimal amount)
        {
            transactionId = default;
            amount = default;

            if (!int.TryParse(lineElements[0], out transactionId))
                return new OperationResult(false, "Cannot parse transaction id.");

            if (!TransactionStatuses.ALL.Contains(lineElements[1]))
                return new OperationResult(false, "Unknown transaction status.");

            if (!TransactionTypes.ALL.Contains(lineElements[2]))
                return new OperationResult(false, "Unknown transaction type.");

            if (lineElements[3].Length > 150)
                return new OperationResult(false, "Client name is too long.");

            if (!decimal.TryParse(lineElements[4].Replace("$", "").Replace(".", ","), out amount))
                return new OperationResult(false, "Cannot parse transaction amount.");

            return new OperationResult(true);
        }
    }
}
