using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantSystem.API.Models
{
    [Table("usuario")]
    public class Usuario
    {
        public int Id { get; set; }
        [Column("nome_usuario")]
        public string NomeUsuario { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        [Column("tipo_usuario")]
        public string TipoUsuario { get; set; } = string.Empty; // cliente, copa, cozinha

        public ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
    }
}
