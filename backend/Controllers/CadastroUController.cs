using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using MapaCafe.Data;
using MapaCafe.Models;
namespace MapaCafe.Controllers

{
    [ApiController]
    [Route("api/[controller]")]

    public class CadastroUController : ControllerBase
{
    private readonly MapaCafeContext _context;

    public CadastroUController (MapaCafeContext context)
    {
        _context = context;
    }

    [HttpGet]

    public async Task<ActionResult<IEnumerable<CadastroUsuario>>> GetUsuario()
    {
        return await _context.Usuarios.ToListAsync();
    }

    [HttpGet("{id}")]

    public async Task<ActionResult<CadastroUsuario>> GetUsuario(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);

        if (usuario == null)
        {
            return NotFound();
        }
        return usuario;
    }

    [HttpPost]

    public async Task<ActionResult<CadastroUsuario>> PostUsuario(CadastroUsuario usuario)
    {
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUsuario), new {id = usuario.Id}, usuario);
    }

    [HttpPut("{id}")]

    public async Task<IActionResult> PutUsuario(int id, CadastroUsuario usuario)
    {
        if (id != usuario.Id)
        {
            return BadRequest();
        }

        _context.Entry(usuario).State = EntityState.Modified;

        try
        {
            {
                await _context.SaveChangesAsync();
            }    
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Usuarios.Any(e => e.Id == id))
            {
                return  NotFound();
            }
            throw;
        }
        
        return NoContent();
        
    }

    [HttpDelete("{id}")]
    
    
    public async Task<IActionResult> DeleteUsuario(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario == null)
        {
            return NotFound();
        }

        _context.Usuarios.Remove(usuario);
        await _context.SaveChangesAsync();

        return NoContent();

    }
    

}
}