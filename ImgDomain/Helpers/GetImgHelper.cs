using Domain.Models;
using Domain.PGModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ImgDomain.Helpers
{
    internal static class GetImgHelper
    {
        internal static async Task<string> GetImgByIdRoute(int id, MySplavContext dc)
        {
            var result = await dc.Routes.Where(i => i.Id == id).FirstOrDefaultAsync();
            return "result";
        }
    }
}
