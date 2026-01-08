using System;
using System.Collections.Generic;

namespace ORMDomain.PGModels;

public partial class Route
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;
}
