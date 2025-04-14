using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantSystem.API.Data;
using RestaurantSystem.API.DTOs;

namespace RestaurantSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProdutosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/produtos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProdutoDto>>> GetProdutos([FromQuery] string? categoria)
        {
            var query = _context.Produtos.AsQueryable();

            if (!string.IsNullOrEmpty(categoria))
            {
                query = query.Where(p => p.Categoria == categoria);
            }

            var produtos = await query
                .Select(p => new ProdutoDto
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Descricao = p.Descricao,
                    Preco = p.Preco,
                    Imagem = p.Imagem,
                    Categoria = p.Categoria
                })
                .ToListAsync();

            return Ok(produtos);
        }
    }
}
