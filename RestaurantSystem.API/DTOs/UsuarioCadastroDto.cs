namespace RestaurantSystem.API.DTOs
{
    public class UsuarioCadastroDto
    {
        public string NomeUsuario { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string? TipoUsuario { get; set; }
    }
}

