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
    }
}
