namespace RestaurantSystem.API.DTOs
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string NomeUsuario { get; set; } = string.Empty;
        public string TipoUsuario { get; set; } = string.Empty;
    }
}
