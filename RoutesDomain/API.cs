using ORMDomain.PGModels;
using RoutesDomain.Helpers;
using RoutesDomain.Models;
using System.Threading.Tasks;

namespace RoutesDomain
{
    public static class API
    {
        public static async Task<RouteModel> GetRoute(int id, int userId, MySplavContext dc)
        {
            var result = await GetRouteHelper.GetRoute(id, userId, dc);
            return result;
        }

        public static async Task<List<RouteModel>> GetListRoute(int userId, MySplavContext dc)
        {
            var result = await GetRouteHelper.GetListRoute(userId, dc);
            return result;
        }

        public static async Task<RouteModel> AddRoute(RouteModel model, MySplavContext dc) 
        {
            var result = await ChangeRouteHelper.AddRoute(model, dc);
            return result;
        }

        public static async Task<RouteModel> ChangeRoute(RouteModel model, MySplavContext dc)
        {
            var result = await ChangeRouteHelper.ChangeRoute(model, dc);
            return result;
        }
    }
}
