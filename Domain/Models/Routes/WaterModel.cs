using Domain.PGModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Models.Routes
{
    public class WaterModel
    {
        public int Id { get; set; } = 0;

        public string Name { get; set; } = string.Empty;

        public WaterModel() { }
        
        public WaterModel(Waters model)
        {
            Id = model.Id;
            Name = model.Name;
        }
    }
}
