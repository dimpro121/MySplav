using System;
using System.Collections.Generic;

namespace Domain.PGModels;

public partial class River
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Route> Routes { get; set; } = new List<Route>();
}
