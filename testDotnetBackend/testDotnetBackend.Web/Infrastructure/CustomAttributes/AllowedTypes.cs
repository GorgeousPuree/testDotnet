using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using testDotnetBackend.Web.Infrastructure.Const;

namespace testDotnetBackend.Web.Infrastructure.CustomAttributes
{
    public class AllowedTypes : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            List<string> types = value as List<string>;
            if (types == null) return true;

            foreach (var type in types)
                if (!TransactionTypes.ALL.Contains(type)) return false;

            return true;
        }
    }
}
