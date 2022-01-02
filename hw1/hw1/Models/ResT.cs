using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace hw1.Models
{
    public class ResT<T>
    {
        public T Result { get; set; }
        public string Message { get; set; }
        public int Status { get; set; }

        public ResT(T result, string message, int status)
        {
            Result = result;
            Message = message;
            Status = status;
        }
    }
}