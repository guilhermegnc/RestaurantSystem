using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantSystem.API.Models
{
    [Table("pedido_itens")]
    public class PedidoItem
    {
        public int Id { get; set; }
        [Column("pedido_id")]
        public int PedidoId { get; set; }
        [Column("produto_id")]
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }

        [Column("status")]
        public string Status { get; set; } = "em preparo";

        // Navegação
        public Pedido Pedido { get; set; }
        public Produto Produto { get; set; } 
    }
}
