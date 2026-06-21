using Domain.Models.Routes;
using Domain.PGModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Models.Routes
{
    public class RouteModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }

        public string Country { get; set; }

        public string Region { get; set; }

        public List<WaterModel> Waters { get; set; }

        public RouteModel() { }

        public RouteModel(Route route)
        {
            Id = route.Id;
            Name = route.Name;
            Description = route.Description;
            UserId = route.UserId;
            Country = route.Country;
            Region = route.Region;

            Waters = route.Water.Select(i => new WaterModel(i)).ToList();
        }
    }
}
