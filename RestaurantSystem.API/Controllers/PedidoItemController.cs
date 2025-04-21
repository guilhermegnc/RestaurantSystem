using Microsoft.AspNetCore.Mvc;
using RestaurantSystem.API.DTOs;
using RestaurantSystem.API.Models;
using RestaurantSystem.API.Services;

namespace RestaurantSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class PedidoItemController : ControllerBase {
        private readonly PedidoItemService _pedidoItemService;

        public PedidoItemController(PedidoItemService pedidoItemService)
        {
            _pedidoItemService = pedidoItemService;
        }

        // PUT: api/p{id}/status
        [HttpPut("{itemId}/status")]
        public async Task<IActionResult> AtualizarStatusItem(int itemId, [FromBody] string novoStatus)
        {
            try
            {
                await _pedidoItemService.AtualizarStatusItemAsync(itemId, novoStatus);
                return NoContent();  // Retorna sem conteúdo, indicando sucesso
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);  // Retorna um erro se ocorrer
            }
        }
    }

}