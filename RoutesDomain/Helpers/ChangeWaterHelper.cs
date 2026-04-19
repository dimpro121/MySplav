using Domain.Models.Routes;
using Domain.PGModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace RoutesDomain.Helpers
{
    internal static class ChangeWaterHelper
    {
        internal static void ChangeWater(Route route, List<WaterModel> waterModels, MySplavContext dc)
        {
            DeleteWaters(route, waterModels);

            foreach (var model in waterModels) { 
                if (model.Id == 0)
                {
                    var nameWater = model.Name.Trim().ToLower();
                    var water = dc.Waters.Where(i => i.Name.ToLower() == nameWater.ToLower()).FirstOrDefault();
                    if (water == null)
                    {
                        water = new Waters() 
                        {
                            Name = model.Name,
                        };

                        water.Routes.Add(route);
                        dc.Add(water);
                    } else
                    {
                        water.Routes.Add(route);
                    }

                } else if (!route.Water.Where(i => i.Id == model.Id).Any())
                {
                    var water = dc.Waters.Where(i => i.Id == model.Id).FirstOrDefault();

                    route.Water.Add(water);
                }
            }
        }

        /// <summary>
        /// Метод, добавляющий в контекст информацию про удаляемые водоёмы
        /// </summary>
        /// <param name="route"></param>
        /// <param name="waterModels">Cписок актуальных водоёмов</param>
        internal static void DeleteWaters(Route route, List<WaterModel> waterModels)
        {
            if (route.Id > 0)
            {
                List<Waters> toDelete = new List<Waters>(route.Water.Count());
                foreach (var water in route.Water)
                {
                    var nameWater = water.Name.ToLower();
                    
                    if (!waterModels.Where(i=> i.Name.ToLower() == nameWater).Any())
                    {
                        toDelete.Add(water);
                    }
                }

                foreach (var item in toDelete)
                {
                    route.Water.Remove(item);
                }
            }
        }
    }
}
