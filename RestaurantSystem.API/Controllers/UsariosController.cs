using Microsoft.AspNetCore.Mvc;
using RestaurantSystem.API.DTOs;
using RestaurantSystem.API.Services;

namespace RestaurantSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuariosController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost("cadastro")]
        public async Task<IActionResult> Cadastrar([FromBody] UsuarioCadastroDto dto)
        {
            var usuario = await _usuarioService.CadastrarAsync(dto);
            if (usuario == null)
                return BadRequest("Nome de usuário já em uso.");

            return Ok(usuario);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLoginDto dto)
        {
            var usuario = await _usuarioService.LoginAsync(dto);
            if (usuario == null)
                return Unauthorized("Usuário ou senha inválidos.");

            return Ok(usuario);
        }
    }
}
