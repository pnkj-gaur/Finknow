using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using finknow_services.Models;

namespace finknow_services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReadlatersController : ControllerBase
    {
        private readonly QDoubtContext _context;

        public ReadlatersController(QDoubtContext context)
        {
            _context = context;
        }

        // GET: api/readlater/{username}
        // Getting saved query details (readlater) by username
        [HttpGet("readlater/{username}")]
        public dynamic GetAllSavedQuery(string username)
        {
            var result = (
                from rl in _context.Readlaters
                join qry in _context.Queries
                on rl.QueryId equals qry.QueryId
                where rl.Username == username
                select new
                {
                    queryId=qry.QueryId,
                    title = qry.Title,
                    description = qry.Description,
                    date=qry.Date,
                    username=qry.Username,
                    category=qry.Category,
                    archiveid=rl.RlId
                }
                ).ToList();

            return result;
        }

        

        
// Adding readlater data to the database
[HttpPost("SaveQuery")]
public async Task<ActionResult<Readlater>> CheckForDoublicate(Readlater obj)
{
   var x = (
       from rl in _context.Readlaters
       where rl.Username == obj.Username && rl.QueryId == obj.QueryId
       select new
       {
           result = "present already"
       }
       ).ToList();
   Readlater tmp = new Readlater();
   if (x.Count != 0)
   {
       tmp.QueryId = -1;
       return tmp;
   }
   else
   {

       _context.Readlaters.Add(obj);
       try
       {
           await _context.SaveChangesAsync();
           tmp.QueryId = 1;
           return tmp;
       }
       catch
       {
           Console.WriteLine("The data added failed");
           tmp.QueryId = 0;
           return tmp;
       }
   }

}

        // posting the news read later request to the database

        [HttpPost("{query}")]
        public async void AddQueryToReadLater(Readlater rl)
        {
            _context.Readlaters.Add(rl);
            try
            {
                await _context.SaveChangesAsync();
                
            }
            catch
            {
                
                Console.WriteLine("The data added failed");
            }

        }

            // GET: api/Readlaters
            
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Readlater>>> GetReadlaters()
        {
            return await _context.Readlaters.ToListAsync();
        }

        // GET: api/Readlaters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Readlater>> GetReadlater(decimal id)
        {
            var readlater = await _context.Readlaters.FindAsync(id);

            if (readlater == null)
            {
                return NotFound();
            }

            return readlater;
        }

        
            
        // PUT: api/Readlaters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutReadlater(decimal id, Readlater readlater)
        //{
        //    if (id != readlater.RlId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(readlater).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ReadlaterExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}
            

        // POST: api/Readlaters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        

        // DELETE: api/Readlaters/5
        [HttpDelete("{id}/{username}")]
        public async Task<IActionResult> DeleteReadlater(decimal id,string username)
        {
            var readlater = (from aremove in _context.Readlaters
                             where aremove.QueryId == id
                                && aremove.Username == username
                             select aremove).FirstOrDefault();
            if (readlater == null)
            {
                return NotFound();
            }

            _context.Readlaters.Remove(readlater);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReadlaterExists(decimal id)
        {
            return _context.Readlaters.Any(e => e.RlId == id);
        }
    }
}
