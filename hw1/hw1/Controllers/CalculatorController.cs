using hw1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace hw1.Controllers
{
    public class CalculatorController : ApiController
    {

        [HttpPost]
        [Route("api/Calculator/CalculatorResult")]
        public IHttpActionResult CalculatorResult([FromBody] Calculator details)
        {
            try
            {
                if (details == null) // check if we got details
                {
                    throw new NullReferenceException("The value is null");
                }

                double result;

                switch (details.MathematicalAction) // switch case for the action options
                {
                    case '+':
                        result = details.FirstNumber + details.SecondNumber;
                        return Ok(new ResT<double>(result, "Send Result Succeeded", (int)Status.SendResultSuccess));
                    case '-':
                        result = details.FirstNumber - details.SecondNumber;
                        return Ok(new ResT<double>(result, "Send Result Succeeded", (int)Status.SendResultSuccess));
                    case '/':
                        if(details.SecondNumber == 0) 
                            return Ok(new ResT<string>("Cannot divide by zero", "Send Result Succeeded", (int)Status.SendResultSuccess));
                        result = details.FirstNumber / details.SecondNumber;
                        return Ok(new ResT<double>(result, "Send Result Succeeded", (int)Status.SendResultSuccess));
                    case '*':
                        result = details.FirstNumber * details.SecondNumber;
                        return Ok(new ResT<double>(result, "Send Result Succeeded", (int)Status.SendResultSuccess));
                    default:
                        return Ok(new ResT<string>("This action does not exists at this moment!", "Send Result Succeeded", (int)Status.SendResultSuccess));
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
