using RestaurantSystem.API.Repositories;
using System.Threading.Tasks;

namespace RestaurantSystem.API.Services
{
    public class PedidoItemService
    {
        private readonly IPedidoItemRepository _pedidoItemRepository;
        private readonly IPedidoRepository _pedidoRepository;

        public PedidoItemService(IPedidoItemRepository pedidoItemRepository, IPedidoRepository pedidoRepository)
        {
            _pedidoItemRepository = pedidoItemRepository;
            _pedidoRepository = pedidoRepository;
        }

        // Atualizar o status de um item de pedido
        public async Task AtualizarStatusItemAsync(int itemId, string novoStatus)
        {
            // Atualizar o status do item
            await _pedidoItemRepository.AtualizarStatusItemAsync(itemId, novoStatus);

            // Buscar o item pelo id para verificar seu pedido
            var item = await _pedidoItemRepository.BuscarPorIdAsync(itemId);

            // Verificar se o item não é nulo
            if (item != null)
            {
                // Verificar se todos os itens estão entregues
                string? retornoStatus = await _pedidoItemRepository.VerificarStatusPedidoAsync(item.PedidoId);

                // Se todos os itens estiverem entregues, atualizar o status do pedido
                if (retornoStatus != null)
                {
                    await _pedidoRepository.AtualizarStatusAsync(item.PedidoId, retornoStatus);
                }
            }
        }
    }
}
