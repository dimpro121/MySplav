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

        public List<RiverModel> Rivers { get; set; }

        public RouteModel() { }

        public RouteModel(Route route)
        {
            Id = route.Id;
            Name = route.Name;
            Description = route.Description;
            UserId = route.UserId;

            Rivers = route.Rivers.Select(i => new RiverModel(i)).ToList();
        }
    }
}
