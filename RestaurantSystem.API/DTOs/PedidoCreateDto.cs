using System.Collections.Generic;

namespace RestaurantSystem.API.DTOs
{
    public class PedidoCreateDto
    {
        public string NomeCliente { get; set; }= string.Empty;
        public string Telefone { get; set; }= string.Empty;
        public string TipoPedido { get; set; } = string.Empty;// 'local' ou 'viagem'
        public int? MesaNumero { get; set; }
        public int? UsuarioId { get; set; }
        public List<PedidoItemDto> Itens { get; set; } = new List<PedidoItemDto>();
    }
}
