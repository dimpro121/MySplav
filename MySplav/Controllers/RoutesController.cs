using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySplav.Models;
using ORMDomain.PGModels;
using RoutesDomain.Models;
using System.Diagnostics;
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

        [HttpPost]
        public async Task<IActionResult> AddRoute([FromBody] RouteModel model)
        {
            if (User.HasClaim("Permission", "AddRoutes"))
            {
                var result = await RoutesDomain.API.AddRoute(model, _dc);
                return Ok(result);
            }

            return Unauthorized();
        }

    }
}
