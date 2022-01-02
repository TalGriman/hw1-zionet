using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace hw1.Models
{
    public class Calculator
    {
        public double FirstNumber { get; set; }
        public char MathematicalAction { get; set; }
        public double SecondNumber { get; set; }

        public Calculator()
        {
        }

        public Calculator(int firstNumber, char mathematicalAction, int secondNumber)
        {
            FirstNumber = firstNumber;
            MathematicalAction = mathematicalAction;
            SecondNumber = secondNumber;
        }
    }
}