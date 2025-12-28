using System;
using System.Collections.Generic;

namespace ORMDomain.PGModels;

public partial class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Login { get; set; } = null!;

    public string Passwd { get; set; } = null!;

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
