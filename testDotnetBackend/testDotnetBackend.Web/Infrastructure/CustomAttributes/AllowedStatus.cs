using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using testDotnetBackend.Web.Infrastructure.Const;

namespace testDotnetBackend.Web.Infrastructure.CustomAttributes
{
    public class AllowedStatus : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            string status = value as string;
            if (status == null) return false;

            if (!TransactionStatuses.ALL.Contains(status)) return false;

            return true;
        }
    }
}
