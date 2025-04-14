using RestaurantSystem.API.Models;

namespace RestaurantSystem.API.Repositories
{
    public interface IPedidoRepository
    {
        Task<Pedido> CriarPedidoAsync(Pedido pedido);
        Task<Pedido?> BuscarPorIdAsync(int id);
        Task AtualizarStatusAsync(int id, string novoStatus);
        Task<IEnumerable<Pedido>> ListarHistoricoComFiltrosAsync(int? usuarioId, string? setor);
    }
}
