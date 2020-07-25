namespace testDotnetBackend.Web.Infrastructure.Const
{
    public static class TransactionTypes
    {
        public const string REFILL = "Refill";
        public const string WITHDRAWAL = "Withdrawal";

        public static string[] ALL
        {
            get
            {
                return new string[] { REFILL, WITHDRAWAL };
            }
        }
    }
}
