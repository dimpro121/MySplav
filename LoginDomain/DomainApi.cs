using BCrypt.Net;
using LoginDomain.Helpers;
using LoginDomain.Models;
using ORMDomain.PGModels;

namespace LoginDomain
{
    public static class DomainApi
    {
        public static UserVerifyModel VerifyUser(string login, string password, MySplavContext dc)
        {
            return ReadUserHelper.GetUser(login, password, dc);
        }
    }
}
