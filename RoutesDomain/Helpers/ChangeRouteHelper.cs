using Domain.Models.Routes;
using Microsoft.EntityFrameworkCore;
using Domain.PGModels;
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
            ChangeWaterHelper.ChangeWater(route, model.Waters, dc);

            await dc.SaveChangesAsync();

            return new RouteModel(route);
        }

        internal static async Task<RouteModel> ChangeRoute(RouteModel model, MySplavContext dc)
        {
            var route = await dc.Routes
                .Where(i => i.Id == model.Id && i.UserId == model.UserId)
                .Include(i => i.Rivers)
                .FirstOrDefaultAsync();
            
            if (route == null)
            {
                throw new Exception("Неизвестная ошибка");
            }

            route.Name = model.Name;
            route.Description = model.Description;
            ChangeWaterHelper.ChangeWater(route, model.Waters, dc);

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
