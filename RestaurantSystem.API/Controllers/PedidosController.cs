using Microsoft.AspNetCore.Mvc;
using RestaurantSystem.API.DTOs;
using RestaurantSystem.API.Models;
using RestaurantSystem.API.Services;

namespace RestaurantSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidosController : ControllerBase
    {
        private readonly PedidoService _pedidoService;

        // Injetando o PedidoService
        public PedidosController(PedidoService pedidoService)
        {
            _pedidoService = pedidoService;
        }

        // POST: api/pedidos
        [HttpPost]
        public async Task<IActionResult> CriarPedido([FromBody] PedidoCreateDto dto)
        {
            var pedido = await _pedidoService.CriarPedidoAsync(dto);
            return CreatedAtAction(nameof(GetPedido), new { id = pedido.Id }, pedido);
        }

        // GET: api/pedidos/historico
        [HttpGet("historico")]
        public async Task<ActionResult<IEnumerable<PedidoHistoricoDto>>> GetHistorico(
            [FromQuery] int? usuarioId,
            [FromQuery] string? setor)
        {
            var historicoDto = await _pedidoService.ListarHistoricoComFiltrosAsync(usuarioId, setor);
            return Ok(historicoDto);
        }

        // GET: api/pedidos/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Pedido>> GetPedido(int id)
        {
            var pedido = await _pedidoService.BuscarPorIdAsync(id);
            if (pedido == null)
                return NotFound();

            return Ok(pedido);
        }

        // PUT: api/pedidos/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> AtualizarStatus(int id, [FromBody] string novoStatus)
        {
            var pedido = await _pedidoService.BuscarPorIdAsync(id);
            if (pedido == null)
                return NotFound();

            await _pedidoService.AtualizarStatusAsync(id, novoStatus);
            return NoContent();
        }
    }
}
