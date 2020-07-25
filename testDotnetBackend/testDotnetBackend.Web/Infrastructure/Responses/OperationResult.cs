﻿namespace testDotnetBackend.Web.Infrastructure.Responses
{
    public class OperationResult
    {
        public OperationResult(bool success)
        {
            Success = success;
            Message = success ? "Success" : "RequestError";
        }

        public OperationResult(bool success, string message)
        {
            Success = success;
            Message = message;
        }

        public bool Success { get; }
        public string Message { get; }
    }
}
