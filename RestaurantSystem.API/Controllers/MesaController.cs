using Microsoft.AspNetCore.Mvc;
using RestaurantSystem.API.Services;

namespace RestaurantSystem.API.Controllers
{
    [ApiController]
    [Route("api/mesas")]
    public class MesasController : ControllerBase
    {
        private readonly MesaService _service;

        public MesasController(MesaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var mesas = await _service.ListarMesasAsync();
            return Ok(mesas);
        }
    }

}