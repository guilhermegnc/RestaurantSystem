using Microsoft.EntityFrameworkCore;
using RestaurantSystem.API.Models;

namespace RestaurantSystem.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSets (tabelas)
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Mesa> Mesas { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<PedidoItem> PedidoItens { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Chave primária personalizada para Mesa
            modelBuilder.Entity<Mesa>()
                .HasKey(m => m.Numero);

            // Relacionamento Pedido x Mesa
            modelBuilder.Entity<Pedido>()
                .HasOne(p => p.Mesa)
                .WithMany(m => m.Pedidos)
                .HasForeignKey(p => p.MesaNumero)
                .OnDelete(DeleteBehavior.Restrict);

            // Relacionamento PedidoItem x Pedido
            modelBuilder.Entity<PedidoItem>()
                .HasOne(pi => pi.Pedido)
                .WithMany(p => p.PedidoItens)
                .HasForeignKey(pi => pi.PedidoId);

            // Relacionamento PedidoItem x Produto
            modelBuilder.Entity<PedidoItem>()
                .HasOne(pi => pi.Produto)
                .WithMany(p => p.PedidoItens)
                .HasForeignKey(pi => pi.ProdutoId);
            
            modelBuilder.Entity<Pedido>()
                .HasOne(p => p.Usuario)
                .WithMany(u => u.Pedidos)
                .HasForeignKey(p => p.UsuarioId)
                .OnDelete(DeleteBehavior.SetNull); // caso o usuário seja deletado, o pedido continua
        }
    }
}
