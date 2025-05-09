namespace RestaurantSystem.API.DTOs
{
    public class PedidoItemDto
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public string? NomeProduto { get; set; }
        public string Status { get; set; } = "em preparo";
    }
}
