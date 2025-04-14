using RestaurantSystem.API.Models;

namespace RestaurantSystem.API.Repositories
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> ObterPorNomeAsync(string nomeUsuario);
        Task<Usuario> CriarAsync(Usuario usuario);
    }
}

