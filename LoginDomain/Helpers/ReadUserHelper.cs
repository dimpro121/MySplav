using LoginDomain.Models;
using Microsoft.EntityFrameworkCore;
using ORMDomain.PGModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LoginDomain.Helpers
{
    internal static class ReadUserHelper
    {
        internal static async Task<UserVerifyModel> VerifyUserAsync(string email, string password, MySplavContext dc)
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
                result.User = await GetUserAsync(user, dc);
            }
            else
            {
                result.Message = "Неправильный логин или пароль";
            }

            return result;
        }

        internal static async Task<UserModel> GetUserAsync(User user, MySplavContext dc)
        {
            if (user == null) { return null; }

            var result = new UserModel();
            result.Email = user.Email;
            result.Id = user.Id;

            var claims =
                    await dc.Database
                        .SqlQueryRaw<string>(@"SELECT uc.""Name""
	                                            FROM public.""Users"" as u
                                            left join public.""UserRolesConnectionUsers"" as urcu on urcu.""UserId"" = u.""Id""
                                            left join public.""UserClaimsConnectionRoles"" as uccr on urcu.""UserRoleId"" = uccr.""UserRoleId"" 
                                            left join public.""UserClaims"" as uc on uc.""Id"" = uccr.""UserClaimId""
	                                            where u.""Id"" = {0}", user.Id).ToListAsync();

            if (claims.Any())
            {
                result.Claims = claims;
            }

            return result;
        }
    }
}
