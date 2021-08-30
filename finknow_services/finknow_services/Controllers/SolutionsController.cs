using finknow_services.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace finknow_services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolutionsController : ControllerBase
    {
        private readonly QDoubtContext _context;

        public SolutionsController(QDoubtContext context)
        {
            _context = context;
        }
        
        // GET: api/Solutions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Solution>>> GetSolutions()
        {
            return await _context.Solutions.ToListAsync();
        }
        
        // Getting the solution based on query Id.
        [HttpGet("ByQuery/{id}")]
        public dynamic GetSolnByQuery(decimal id)
        {
            var innerJoin = (from sol in _context.Solutions
                             join qry in _context.Queries
                             on sol.QueryId equals qry.QueryId
                             where qry.QueryId == id
                             select new
                             {
                                 Id = sol.SolId,
                                 Solution = sol.Solution1,
                                 Author = sol.Username,
                                 QueryId = sol.QueryId
                             }).ToList();

            return innerJoin;
        }
        // Getting the solution based on solution Id
        // GET: api/Solutions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Solution>> GetSolution(decimal id)
        {
            var solution = await _context.Solutions.FindAsync(id);

            if (solution == null)
            {
                return NotFound();
            }

            return solution;
        }

        // PUT: api/Solutions/5
        // Updating the solution based on the solution Id.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSolution(decimal id, Solution solution)
        {
            
            if (id != solution.SolId)
            {
                
                return BadRequest();
            }

            _context.Entry(solution).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SolutionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Solutions
        // Adding a new solution to any query
        [HttpPost]
        public async Task<ActionResult<Solution>> PostSolution(Solution solution)
        {
            _context.Solutions.Add(solution);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SolutionExists(solution.SolId))
                {
                    return Conflict(); // Solution is already given by the user
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSolution", new { id = solution.SolId }, solution);
        }
        
        // DELETE: api/Solutions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolution(decimal id)
        {
            var solution = await _context.Solutions.FindAsync(id);
            if (solution == null)
            {
                return NotFound();
            }

            _context.Solutions.Remove(solution);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        private bool SolutionExists(decimal id)
        {
            return _context.Solutions.Any(e => e.SolId == id);
        }
    }
}
