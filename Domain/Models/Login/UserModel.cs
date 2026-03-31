using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Models.Login
{
    public class UserModel
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public List<string> Claims {  get; set; }
    }
}
