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
        internal static UserVerifyModel VerifyUser(string email, string password, MySplavContext dc)
        {
            var user = dc.Users.Where(i => i.Email == email).FirstOrDefault();

            var result = new UserVerifyModel();
            bool isValid = false;            

            if (user != null)
            {
                isValid = BCrypt.Net.BCrypt.Verify(password, user.Passwd);
            }

            if (isValid)
            {
                result.User = GetUser(user);
            }
            else
            {
                result.Message = "Неправильный логин или пароль";
            }

            return result;
        }

        internal static UserModel GetUser(User user)
        {
            var result = new UserModel();
            if (user == null) { return result; }
            
            result.Email = user.Email;
            result.Id = user.Id;
            foreach (var item in user.UserRoles)
            {
                result.Claims.AddRange(item.UserClaims.Select(i => i.Name));
            }

            return result;
        }
    }
}
