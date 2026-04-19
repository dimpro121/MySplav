using System;
using System.Collections.Generic;

namespace Domain.PGModels;

public partial class Route
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int UserId { get; set; }

    public bool? IsDeleted { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual ICollection<Waters> Water { get; set; } = new List<Waters>();
}
