using Microsoft.EntityFrameworkCore;
using MapaCafe.Models;

namespace MapaCafe.Data
{
    public class MapaCafeContext : DbContext
    {
        public MapaCafeContext(DbContextOptions<MapaCafeContext> options)
            : base(options)
        {
        }

        public DbSet<CadastroCafeteria> Cafeterias { get; set; }
        public DbSet<CadastroUsuario> Usuarios { get; set; }
        public DbSet<PerfilUsuario> Perfis { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<DadosUsuario>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<CadastroUsuario>()
                .HasBaseType<DadosUsuario>();

            modelBuilder.Entity<PerfilUsuario>()
                .HasBaseType<DadosUsuario>();

        }
    }
}
