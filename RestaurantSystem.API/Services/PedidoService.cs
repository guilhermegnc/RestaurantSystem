using RestaurantSystem.API.DTOs;
using RestaurantSystem.API.Models;
using RestaurantSystem.API.Repositories;

namespace RestaurantSystem.API.Services
{
    public class PedidoService
    {
        private readonly IPedidoRepository _repository;

        public PedidoService(IPedidoRepository repository)
        {
            _repository = repository;
        }

        public async Task<Pedido> CriarPedidoAsync(PedidoCreateDto dto)
        {
            var pedido = new Pedido
            {
                NomeCliente = dto.NomeCliente,
                Telefone = dto.Telefone,
                TipoPedido = dto.TipoPedido,
                MesaNumero = dto.MesaNumero,
                DataPedido = DateTime.Now,
                Status = "em preparo",
                UsuarioId = dto.UsuarioId,
                InformacoesAdicionais = dto.InformacoesAdicionais,
                PedidoItens = dto.Itens.Select(i => new PedidoItem
                {
                    ProdutoId = i.ProdutoId,
                    Quantidade = i.Quantidade
                }).ToList()
            };

            return await _repository.CriarPedidoAsync(pedido);
        }

        public async Task<IEnumerable<PedidoHistoricoDto>> ListarHistoricoComFiltrosAsync(int? usuarioId, string? setor)
        {
            // Recupera os pedidos com os filtros aplicados
            var pedidos = await _repository.ListarHistoricoComFiltrosAsync(usuarioId, setor);

            // Verifique se pedidos é null ou vazio
            if (pedidos == null || !pedidos.Any())
            {
                return new List<PedidoHistoricoDto>();
            }

            var historicoDto = pedidos.Select(p => new PedidoHistoricoDto
            {
                Id = p.Id,
                NomeCliente = p.NomeCliente,
                MesaNumero = p.MesaNumero,
                DataPedido = p.DataPedido,
                Status = p.Status,
                Itens = p.PedidoItens
                    .Where(i => i.Produto != null && (string.IsNullOrEmpty(setor) || i.Produto.Categoria == setor)) // Filtra os itens
                    .Select(i => new PedidoItemDto
                    {
                        ProdutoId = i.ProdutoId,
                        Quantidade = i.Quantidade,
                        NomeProduto = i.Produto?.Nome
                    }).ToList()
            }).ToList();

            return historicoDto;
        }

        public Task<Pedido?> BuscarPorIdAsync(int id) =>
            _repository.BuscarPorIdAsync(id);

        public Task AtualizarStatusAsync(int id, string novoStatus) =>
            _repository.AtualizarStatusAsync(id, novoStatus);
    }
}
