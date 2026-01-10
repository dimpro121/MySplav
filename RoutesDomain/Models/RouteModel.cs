using ORMDomain.PGModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace RoutesDomain.Models
{
    public class RouteModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }

        public RouteModel() { }

        public RouteModel(Route route)
        {
            Id = route.Id;
            Name = route.Name;
            Description = route.Description;
            UserId = route.UserId;
        }
    }
}
