using Microsoft.EntityFrameworkCore;
using RestaurantSystem.API.Data;
using RestaurantSystem.API.Models;

namespace RestaurantSystem.API.Repositories {
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _context;

        public UsuarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario?> ObterPorNomeAsync(string nomeUsuario)
        {
            return await _context.Usuario.FirstOrDefaultAsync(u => u.NomeUsuario == nomeUsuario);
        }

        public async Task<Usuario> CriarAsync(Usuario usuario)
        {
            _context.Usuario.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }
    }
}