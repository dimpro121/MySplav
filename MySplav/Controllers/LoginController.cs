using LoginDomain.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using MySplav.Models;
using ORMDomain.PGModels;
using System.Diagnostics;
using System.Security.Claims;

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
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var result = await LoginDomain.DomainApi.VerifyUserAsync(model.Email, model.Password, _dc);
            if (result.User != null)
            {
                await SignInUser(result.User);
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Registration([FromBody] LoginModel model) 
        {
            var result = await LoginDomain.DomainApi.RegistrationUserAsync(model.Email, model.Password, _dc);
            if (result.User != null)
            {
                await SignInUser(result.User);
            }

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                return Ok(new { message = "Logged out successfully" });
            }
            catch
            {
                return StatusCode(500, new { error = "Internal server error" });
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private async Task SignInUser(UserModel user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            claims.AddRange(user.Claims.Select(i => new Claim("Claim", i)).ToList());
            

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(365)
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);
        }
    }
}
