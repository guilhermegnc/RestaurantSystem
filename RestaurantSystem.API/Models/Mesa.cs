namespace RestaurantSystem.API.Models
{
    public class Mesa
    {
        public int Numero { get; set; } // Primary Key

        // Navegação
        public ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
    }
}
