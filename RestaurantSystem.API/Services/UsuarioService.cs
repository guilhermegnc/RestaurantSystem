using RestaurantSystem.API.DTOs;
using RestaurantSystem.API.Models;
using RestaurantSystem.API.Repositories;

namespace RestaurantSystem.API.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<UsuarioDto?> LoginAsync(UsuarioLoginDto dto)
        {
            var usuario = await _usuarioRepository.ObterPorNomeAsync(dto.NomeUsuario);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.Senha))
            {
                return null;
            }

            return new UsuarioDto
            {
                Id = usuario.Id,
                NomeUsuario = usuario.NomeUsuario,
                TipoUsuario = usuario.TipoUsuario
            };
        }

        public async Task<UsuarioDto?> CadastrarAsync(UsuarioCadastroDto dto)
        {
            var existente = await _usuarioRepository.ObterPorNomeAsync(dto.NomeUsuario);
            if (existente != null)
            {
                return null; // Já existe
            }

            var senhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha);

            var novoUsuario = new Usuario
            {
                NomeUsuario = dto.NomeUsuario,
                Senha = senhaHash,
                TipoUsuario = "cliente"
            };

            var usuarioCriado = await _usuarioRepository.CriarAsync(novoUsuario);

            return new UsuarioDto
            {
                Id = usuarioCriado.Id,
                NomeUsuario = usuarioCriado.NomeUsuario,
                TipoUsuario = usuarioCriado.TipoUsuario
            };
        }
    }
}