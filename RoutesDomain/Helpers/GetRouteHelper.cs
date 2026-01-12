using Microsoft.EntityFrameworkCore;
using ORMDomain.PGModels;
using RoutesDomain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RoutesDomain.Helpers
{
    internal static class GetRouteHelper
    {
        internal static async Task<RouteModel> GetRoute(int id, int userId, MySplavContext dc)
        {
            var route = await dc.Routes.Where(i => i.Id == id && i.UserId == userId).FirstOrDefaultAsync();
            if (route == null) {
                throw new Exception("Нет прав");
            }

            return new RouteModel(route);
        }

        internal static async Task<List<RouteModel>> GetListRoute(int userId, MySplavContext dc)
        {
            var routes = 
                await dc.Routes
                        .Where(i => i.UserId == userId)
                        .OrderByDescending(i => i.Id)
                        .Select(i => new RouteModel(i))
                        .ToListAsync();

            return routes;
        }
    }
}
