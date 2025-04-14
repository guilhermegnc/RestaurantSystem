using Microsoft.EntityFrameworkCore;
using RestaurantSystem.API.Data;
using RestaurantSystem.API.Models;

namespace RestaurantSystem.API.Repositories {
    public class MesaRepository : IMesaRepository
    {
        private readonly AppDbContext _context;

        public MesaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Mesa>> ListarMesasAsync()
        {
            return await _context.Mesas.OrderBy(m => m.Numero).ToListAsync();
        }
    }
}