using Microsoft.EntityFrameworkCore;
using RestaurantSystem.API.Data;
using RestaurantSystem.API.Models;

namespace RestaurantSystem.API.Repositories
{
    public class PedidoRepository : IPedidoRepository
    {
        private readonly AppDbContext _context;

        public PedidoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Pedido> CriarPedidoAsync(Pedido pedido)
        {
            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();
            return pedido;
        }

        public async Task<Pedido?> BuscarPorIdAsync(int id)
        {
            // Busca o pedido pelo ID, incluindo os itens e os produtos de cada item
            return await _context.Pedidos
                .Include(p => p.PedidoItens)
                .ThenInclude(pi => pi.Produto)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Pedido>> ListarHistoricoComFiltrosAsync(int? usuarioId, string? setor)
        {
            // Começa a query incluindo os itens do pedido e seus produtos
            var query = _context.Pedidos
                .Include(p => p.PedidoItens)
                    .ThenInclude(pi => pi.Produto)
                .AsQueryable();

            // Aplica filtro por usuário, se fornecido
            if (usuarioId.HasValue)
            {
                query = query.Where(p => p.UsuarioId == usuarioId.Value);
            }

            // Aplica filtro por setor (categoria do produto), se fornecido
            if (!string.IsNullOrEmpty(setor))
            {
                query = query.Where(p =>
                    p.PedidoItens.Any(i => i.Produto != null && i.Produto.Categoria == setor)
                );
            }

            return await query
                .OrderByDescending(p => p.DataPedido)
                .ToListAsync();
        }


        public async Task AtualizarStatusAsync(int id, string novoStatus)
        {
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido != null)
            {
                pedido.Status = novoStatus;
                await _context.SaveChangesAsync();
            }
        }
    }
}
