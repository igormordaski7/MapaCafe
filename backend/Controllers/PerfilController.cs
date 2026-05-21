using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using MapaCafe.Data;
using MapaCafe.Models;
namespace MapaCafe.Controllers

{
    [ApiController]
    [Route("api/[controller]")]

    public class PerfilController : ControllerBase
{
    private readonly MapaCafeContext _context;

    public PerfilController (MapaCafeContext context)
    {
        _context = context;
    }

    [HttpGet]

    public async Task<ActionResult<IEnumerable<PerfilUsuario>>> GetPerfil()
    {
        return await _context.Perfis.ToListAsync();
    }

    [HttpGet("{id}")]

    public async Task<ActionResult<PerfilUsuario>> GetPerfil(int id)
    {
        var perfil = await _context.Perfis.FindAsync(id);

        if (perfil == null)
        {
            return NotFound();
        }
        return perfil;
    }

    [HttpPost]

    public async Task<ActionResult<PerfilUsuario>> PostPerfil(PerfilUsuario perfil)
    {
        _context.Perfis.Add(perfil);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPerfil), new {id = perfil.Id}, perfil);
    }

    [HttpPut("{id}")]

    public async Task<IActionResult> PutPerfil(int id, PerfilUsuario perfil)
    {
        if (id != perfil.Id)
        {
            return BadRequest();
        }

        _context.Entry(perfil).State = EntityState.Modified;

        try
        {
            {
                await _context.SaveChangesAsync();
            }    
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Perfis.Any(e => e.Id == id))
            {
                return  NotFound();
            }
            throw;
        }
        
        return NoContent();
        
    }

    [HttpDelete("{id}")]
    
    
    public async Task<IActionResult> DeletePerfil(int id)
    {
        var perfil = await _context.Perfis.FindAsync(id);
        if (perfil == null)
        {
            return NotFound();
        }

        _context.Perfis.Remove(perfil);
        await _context.SaveChangesAsync();

        return NoContent();

    }
    

}
}