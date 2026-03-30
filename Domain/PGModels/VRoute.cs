using System;
using System.Collections.Generic;

namespace ORMDomain.PGModels;

public partial class VRoute
{
    public int? Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? UserId { get; set; }

    public bool? IsDeleted { get; set; }
}
