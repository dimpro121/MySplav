using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MySplav.Models;
using ORMDomain.PGModels;

namespace MySplav.Controllers
{
    public class LoginController : Controller
    {
        private readonly MySplavContext _dc;

        public LoginController(MySplavContext context)
        {
            _dc = context;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginModel model)
        {
            var result = LoginDomain.DomainApi.VerifyUser(model.Email, model.Password, _dc);

            return Ok(result);
        }

        [HttpPost]
        public IActionResult Registration([FromBody] LoginModel model) 
        {
            var result = LoginDomain.DomainApi.RegistrationUser(model.Email, model.Password, _dc);

            return Ok(result);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
