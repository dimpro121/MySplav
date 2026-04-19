using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Domain.PGModels;

public partial class MySplavContext : DbContext
{
    public MySplavContext(DbContextOptions<MySplavContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Route> Routes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserClaim> UserClaims { get; set; }

    public virtual DbSet<UserRole> UserRoles { get; set; }

    public virtual DbSet<Waters> Waters { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Route>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Routes_pkey");

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);

            entity.HasOne(d => d.User).WithMany(p => p.Routes)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("RoutesUser_fk");

            entity.HasMany(d => d.Rivers).WithMany(p => p.Routes)
                .UsingEntity<Dictionary<string, object>>(
                    "RouteWater",
                    r => r.HasOne<Waters>().WithMany()
                        .HasForeignKey("RiverId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fk_RouteWater_Waters"),
                    l => l.HasOne<Route>().WithMany()
                        .HasForeignKey("RouteId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fk_RouteWater_Routes"),
                    j =>
                    {
                        j.HasKey("RouteId", "RiverId").HasName("RouteRivers_pkey");
                        j.ToTable("RouteWater");
                        j.HasIndex(new[] { "RiverId" }, "fki_fk_RouteRivers_Rivers");
                        j.HasIndex(new[] { "RouteId" }, "fki_fk_RouteRivers_Routes");
                    });
        });

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

        modelBuilder.Entity<Waters>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Rivers_pkey");

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
