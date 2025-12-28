using LoginDomain.Models;
using Microsoft.Identity.Client;
using ORMDomain.PGModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace LoginDomain.Helpers
{
    internal static class ReadUserHelper
    {
        internal static UserVerifyModel GetUser(string login, string password, MySplavContext dc)
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

            var user = dc.Users.Where(i => i.Email == login && i.Passwd == passwordHash).FirstOrDefault();

            var result = new UserVerifyModel();
            
            if (user != null)
            {
                result.IsVerify = true;
                result.UserId = user.Id;
            }
            else
            {
                result.IsVerify = false;
                result.UserId = 0;
                result.Message = "Неправильный логин или пароль";
            }

            return result;
        }
    }
}
