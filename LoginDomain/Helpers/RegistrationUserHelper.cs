using LoginDomain.Models;
using ORMDomain.PGModels;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Text;

namespace LoginDomain.Helpers
{
    internal static class RegistrationUserHelper
    {
        internal static int DefaultRoleId = 1;

        internal static UserVerifyModel RegistrationUser(string email, string password, MySplavContext dc)
        {
            var result = new UserVerifyModel();

            var user = dc.Users.Where(i => i.Email == email).FirstOrDefault();
            if (user != null)
            {
                result.Message = "Логин не уникален";
                return result;
            }

            var hashPasswrd = BCrypt.Net.BCrypt.HashPassword(password);
            var newUser = new User() 
            { 
                Email = email,
                Passwd = hashPasswrd,
            };

            var userRole = dc.UserRoles.Where(i => i.Id == DefaultRoleId).FirstOrDefault();
            if (userRole == null) {
                throw new Exception("Ошибка в определении DefaultRoleId");
            }

            newUser.UserRoles.Add(userRole);
            dc.Users.Add(newUser);
            dc.SaveChanges();

            result.User = ReadUserHelper.GetUser(newUser);

            return result;
        }
    }
}
