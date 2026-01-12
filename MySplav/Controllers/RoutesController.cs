using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySplav.Models;
using ORMDomain.PGModels;
using RoutesDomain.Models;
using System.Diagnostics;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MySplav.Controllers
{
    [Authorize]
    public class RoutesController : Controller
    {

        private readonly MySplavContext _dc;

        public RoutesController(MySplavContext context)
        {
            _dc = context;
        }

        public IActionResult List()
        {
            return View();
        }

        public IActionResult Add()
        {
            return View("List");
        }

        public IActionResult Change()
        {
            return View("List");
        }

        [HttpPost]
        public async Task<IActionResult> AddRoute([FromBody] RouteModel model)
        {
            if (User.HasClaim("Permission", "AddRoutes"))
            {
                string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                int id = 0;
                if (Int32.TryParse(userId, out id))
                {
                    model.UserId = id;
                    var result = await RoutesDomain.API.AddRoute(model, _dc);
                    return Ok(result);
                }
                else {
                    return BadRequest("Неизвестная ошибка");
                }
            }

            return Unauthorized();
        }


        [HttpPost]
        public async Task<IActionResult> ChangeRoute([FromBody] RouteModel model)
        {
            if (User.HasClaim("Permission", "AddRoutes"))
            {
                string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                int id = 0;
                if (Int32.TryParse(userId, out id))
                {
                    model.UserId = id;
                    var result = await RoutesDomain.API.ChangeRoute(model, _dc);
                    return Ok(result);
                }
                else
                {
                    return BadRequest("Неизвестная ошибка");
                }
            }

            return Unauthorized();
        }


        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            if (User.HasClaim("Permission", "AddRoutes"))
            {
                string user = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                int userId = 0;
                if (Int32.TryParse(user, out userId))
                {
                    var result = await RoutesDomain.API.GetListRoute(userId, _dc);
                    return Ok(result);
                }
                else
                {
                    return BadRequest("Неизвестная ошибка");
                }
            }

            return Unauthorized();
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            if (User.HasClaim("Permission", "AddRoutes"))
            {
                string user = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                int userId = 0;
                if (Int32.TryParse(user, out userId))
                {
                    var result = await RoutesDomain.API.GetRoute(id, userId, _dc);
                    return Ok(result);
                }
                else
                {
                    return BadRequest("Неизвестная ошибка");
                }
            }

            return Unauthorized();
        }
    }
}
