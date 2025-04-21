using Microsoft.EntityFrameworkCore;
using RestaurantSystem.API.Data;
using RestaurantSystem.API.Models;

namespace RestaurantSystem.API.Repositories
{
    public class PedidoItemRepository : IPedidoItemRepository
    {
        private readonly AppDbContext _context;

        public PedidoItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AtualizarStatusItemAsync(int itemId, string novoStatus)
        {
            var item = await _context.PedidoItens.FindAsync(itemId);
            if (item != null)
            {
                item.Status = novoStatus;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<string?> VerificarStatusPedidoAsync(int pedidoId)
        {
            // Pega todos os status dos itens vinculados a esse pedido
            var itens = await _context.PedidoItens
                .Where(pi => pi.PedidoId == pedidoId)
                .Select(pi => pi.Status.ToLower())
                .ToListAsync();

            // Se todos estiverem entregues, o status do pedido pode ir pra "entregue"
            if (itens.All(s => s == "entregue"))
                return "entregue";
            else if (itens.All(s => s == "pronto")) // Se todos estiverem prontos, muda o status do pedido pra "pronto"
                return "pronto";
            
            return null; // mantém o status atual
        }

        public async Task<PedidoItem?> BuscarPorIdAsync(int itemId)
        {
            return await _context.PedidoItens
                .FirstOrDefaultAsync(pi => pi.Id == itemId);
        }
    }
}
