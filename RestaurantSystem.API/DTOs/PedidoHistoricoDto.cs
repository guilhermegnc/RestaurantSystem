using System;

namespace RestaurantSystem.API.DTOs
{
    public class PedidoHistoricoDto
    {
        public int Id { get; set; }
        public string NomeCliente { get; set; } = string.Empty;
        public int? MesaNumero { get; set; }
        public DateTime DataPedido { get; set; }
        public string Status { get; set; } = string.Empty;

        public List<PedidoItemDto> Itens { get; set; } = new List<PedidoItemDto>();
    }
}
