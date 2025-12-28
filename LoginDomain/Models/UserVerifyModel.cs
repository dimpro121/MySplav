using System;
using System.Collections.Generic;
using System.Text;

namespace LoginDomain.Models
{
    public class UserVerifyModel
    {
        public int UserId { get; set; }

        public bool IsVerify { get; set; }

        public string Message { get; set; }

        public string[] Claims { get; set; }
    }
}
