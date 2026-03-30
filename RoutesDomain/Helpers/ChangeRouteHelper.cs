using Microsoft.EntityFrameworkCore;
using ORMDomain.PGModels;
using RoutesDomain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RoutesDomain.Helpers
{
    internal static class ChangeRouteHelper
    {
        internal static async Task<RouteModel> AddRoute(RouteModel model, MySplavContext dc)
        {
            Route route = new Route()
            {
                Name = model.Name,
                UserId = model.UserId,
                Description = model.Description,
            };

            dc.Routes.Add(route);
            await dc.SaveChangesAsync();
            return new RouteModel(route);
        }

        internal static async Task<RouteModel> ChangeRoute(RouteModel model, MySplavContext dc)
        {
            var route = await dc.Routes.Where(i => i.Id == model.Id && i.UserId == model.UserId).FirstOrDefaultAsync();
            
            if (route == null)
            {
                throw new Exception("Неизвестная ошибка");
            }

            route.Name = model.Name;
            route.Description = model.Description;
            
            await dc.SaveChangesAsync();
            return new RouteModel(route);
        }

        internal static async Task DeleteRoute(int id, int userId, MySplavContext dc)
        {
            var route = await dc.Routes.Where(i => i.Id == id && i.UserId == userId).FirstOrDefaultAsync();
            if (route == null)
            {
                throw new Exception("Ошибка авторизации");
            }
            route.IsDeleted = true;

            await dc.SaveChangesAsync();
        }
    }
}
