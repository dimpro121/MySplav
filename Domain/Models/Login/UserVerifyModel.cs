using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Models.Login
{
    public class UserVerifyModel
    {
        public string Message { get; set; }

        public UserModel User { get; set; }
    }
}
