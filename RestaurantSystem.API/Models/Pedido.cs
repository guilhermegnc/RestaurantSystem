using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantSystem.API.Models
{
    public class Pedido
    {
        public int Id { get; set; }
        [Column("nome_cliente")]
        public string NomeCliente { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        [Column("tipo_pedido")]
        public string TipoPedido { get; set; } = string.Empty; // 'local' ou 'viagem'
        [Column("mesa_numero")]
        public int? MesaNumero { get; set; }
        [Column("data_pedido")]
        public DateTime DataPedido { get; set; }
        public string Status { get; set; } = string.Empty; // 'em preparo', 'pronto', 'entregue'
        [Column("usuario_id")]
        public int? UsuarioId { get; set; } 

        public Usuario? Usuario { get; set; }
        [Column("informacoes_adicionais")]
        public string? InformacoesAdicionais { get; set; }

        // Navegação
        public Mesa Mesa { get; set; }
        public ICollection<PedidoItem> PedidoItens { get; set; }
    }
}
