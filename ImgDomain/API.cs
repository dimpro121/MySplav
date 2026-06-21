
using Domain.PGModels;

namespace ImgDomain
{
    public static class API
    {
        public static async Task<string> GetImgByIdRoute(int id, MySplavContext dc)
        {
            return await GetImgHelper.GetImg(id, dc);
        }
    }
}
