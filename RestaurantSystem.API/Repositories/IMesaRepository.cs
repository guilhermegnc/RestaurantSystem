using RestaurantSystem.API.Models;

namespace RestaurantSystem.API.Repositories
{
    public interface IMesaRepository
    {
    Task<IEnumerable<Mesa>> ListarMesasAsync();
    }
}