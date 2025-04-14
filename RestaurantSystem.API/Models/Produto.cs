namespace RestaurantSystem.API.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public string Imagem { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty; // 'comida' ou 'bebida'

        // Navegação
        public ICollection<PedidoItem> PedidoItens { get; set; } = new List<PedidoItem>();
    }
}
