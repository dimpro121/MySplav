using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MySplav.Models;

namespace MySplav.Controllers
{
    public class RoutesController : Controller
    {
        public IActionResult List()
        {
            return View();
        }
        public IActionResult Add()
        {
            return View("List");
        }
    }
}
