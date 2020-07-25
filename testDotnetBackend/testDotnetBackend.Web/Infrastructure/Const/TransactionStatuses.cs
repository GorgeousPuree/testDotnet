namespace testDotnetBackend.Web.Infrastructure.Const
{
    public static class TransactionStatuses
    {
        public const string PENDING = "Pending";
        public const string COMPLETED = "Completed";
        public const string CANCELLED = "Cancelled";

        public static string[] ALL
        {
            get
            {
                return new string[] { PENDING, COMPLETED, CANCELLED };
            }
        }
    }
}
