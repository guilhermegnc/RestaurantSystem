using RestaurantSystem.API.Models;
using System.Threading.Tasks;

namespace RestaurantSystem.API.Repositories
{
    public interface IPedidoItemRepository
    {
        Task AtualizarStatusItemAsync(int itemId, string novoStatus);
        Task<string?> VerificarStatusPedidoAsync(int pedidoId);
        Task<PedidoItem?> BuscarPorIdAsync(int itemId);
    }
}