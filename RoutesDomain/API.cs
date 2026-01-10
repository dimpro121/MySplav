using ORMDomain.PGModels;
using RoutesDomain.Helpers;
using RoutesDomain.Models;
using System.Threading.Tasks;

namespace RoutesDomain
{
    public static class API
    {
        public static void GetRoutes()
        {

        }

        public static async Task<RouteModel> AddRoute(RouteModel model, MySplavContext dc) 
        {
            var result = await ChangeRouteHelper.AddRoute(model, dc);
            return result;
        }
    }
}
