using System;
using System.Collections.Generic;

namespace ORMDomain.PGModels;

public partial class UserClaim
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
