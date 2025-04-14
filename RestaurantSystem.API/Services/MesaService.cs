using RestaurantSystem.API.DTOs;
using RestaurantSystem.API.Repositories;

namespace RestaurantSystem.API.Services
{
    public class MesaService
    {
        private readonly IMesaRepository _repo;

        public MesaService(IMesaRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<MesaDto>> ListarMesasAsync()
        {
            var mesas = await _repo.ListarMesasAsync();
            return mesas.Select(m => new MesaDto
            {
                Numero = m.Numero
            });
        }
    }

}