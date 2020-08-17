using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using testDotnetBackend.Web.Infrastructure.Const;

namespace testDotnetBackend.Web.Infrastructure.CustomAttributes
{
    public class AllowedStatuses : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            List<string> statuses = value as List<string>;
            if (statuses == null) return true;

            foreach (var status in statuses)
                if (!TransactionStatuses.ALL.Contains(status)) return false;

            return true;
        }
    }
}
