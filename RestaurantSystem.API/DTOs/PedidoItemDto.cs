namespace RestaurantSystem.API.DTOs
{
    public class PedidoItemDto
    {
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public string? NomeProduto { get; set; }
    }
}
