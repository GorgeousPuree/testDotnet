using System.Collections.Generic;

namespace testDotnetBackend.Web.Infrastructure.Const
{
    public static class TransactionTypes
    {
        public const string REFILL = "Refill";
        public const string WITHDRAWAL = "Withdrawal";

        public static List<string> ALL
        {
            get
            {
                return new List<string> { REFILL, WITHDRAWAL };
            }
        }
    }
}
