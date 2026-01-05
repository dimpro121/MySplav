using BCrypt.Net;
using LoginDomain.Helpers;
using LoginDomain.Models;
using ORMDomain.PGModels;

namespace LoginDomain
{
    public static class DomainApi
    {
        public static async Task<UserVerifyModel> VerifyUserAsync(string email, string password, MySplavContext dc)
        {
            return await ReadUserHelper.VerifyUserAsync(email, password, dc);
        }

        public static async Task<UserVerifyModel> RegistrationUserAsync(string email, string password, MySplavContext dc)
        {
            return await RegistrationUserHelper.RegistrationUserAsync(email, password, dc);
        }
    }
}
