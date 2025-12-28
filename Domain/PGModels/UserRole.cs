using System;
using System.Collections.Generic;

namespace ORMDomain.PGModels;

public partial class UserRole
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<UserClaim> UserClaims { get; set; } = new List<UserClaim>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
