using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ORMDomain.PGModels;

public partial class MySplavContext : DbContext
{
    public MySplavContext()
    {
    }

    public MySplavContext(DbContextOptions<MySplavContext> options)
        : base(options)
    {
    }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserClaim> UserClaims { get; set; }

    public virtual DbSet<UserRole> UserRoles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=MySplav;Username=postgres;Password=qwerty123;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Users_pkey");

            entity.HasIndex(e => e.Email, "Users_Email_key").IsUnique();

            entity.HasIndex(e => e.Passwd, "Users_Passwd_key").IsUnique();

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
        });

        modelBuilder.Entity<UserClaim>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("UserClaims_pkey");

            entity.HasIndex(e => e.Name, "UserClaims_Name_key").IsUnique();

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();

            entity.HasMany(d => d.UserRoles).WithMany(p => p.UserClaims)
                .UsingEntity<Dictionary<string, object>>(
                    "UserClaimsConnectionRole",
                    r => r.HasOne<UserRole>().WithMany()
                        .HasForeignKey("UserRoleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("UserClaimsConnectionRoles_UserId"),
                    l => l.HasOne<UserClaim>().WithMany()
                        .HasForeignKey("UserClaimId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("UserClaimsConnectionRoles_UserClaims"),
                    j =>
                    {
                        j.HasKey("UserClaimId", "UserRoleId").HasName("UserClaimsConnectionRoles_pkey");
                        j.ToTable("UserClaimsConnectionRoles");
                    });
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("UserRoles_pkey");

            entity.HasIndex(e => e.Name, "UserRoles_Name_key").IsUnique();

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();

            entity.HasMany(d => d.Users).WithMany(p => p.UserRoles)
                .UsingEntity<Dictionary<string, object>>(
                    "UserRolesConnectionUser",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("UserRolesConnectionUsers_Users"),
                    l => l.HasOne<UserRole>().WithMany()
                        .HasForeignKey("UserRoleId")
                        .HasConstraintName("UserRolesConnectionUsers_UserRoles"),
                    j =>
                    {
                        j.HasKey("UserRoleId", "UserId").HasName("UserRolesConnectionUsers_pkey");
                        j.ToTable("UserRolesConnectionUsers");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
