using BCrypt.Net;
using LoginDomain.Helpers;
using LoginDomain.Models;
using ORMDomain.PGModels;

namespace LoginDomain
{
    public static class DomainApi
    {
        public static UserVerifyModel VerifyUser(string email, string password, MySplavContext dc)
        {
            return ReadUserHelper.VerifyUser(email, password, dc);
        }

        public static UserVerifyModel RegistrationUser(string email, string password, MySplavContext dc)
        {
            return RegistrationUserHelper.RegistrationUser(email, password, dc);
        }
    }
}
