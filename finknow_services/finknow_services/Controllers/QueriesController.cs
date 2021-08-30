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
    public class QueriesController : ControllerBase
    {
        private readonly QDoubtContext _context;

        public QueriesController(QDoubtContext context)
        {
            _context = context;
        }



        // GET: api/Queries
        //Getting all the queries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Query>>> GetQueries()
        {
           

            return await _context.Queries.ToListAsync();
        }

        // Gettng the query based on query Id
        // GET: api/Queries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Query>> GetQuery(decimal id)
        {
            var query = await _context.Queries.FindAsync(id);

            if (query == null)
            {
                return NotFound();
            }

            return query;
        }
        // Updating the query based on query Id
        // PUT: api/Queries/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuery(decimal id, Query query)
        {
            if (id != query.QueryId)
            {
                return BadRequest();
            }

            _context.Entry(query).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QueryExists(id))
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

     

        // POST: api/Queries
        // Adding a new query to the database
        [HttpPost]
        public async Task<ActionResult<Query>> PostQuery(Query query)
        {
            _context.Queries.Add(query);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (QueryExists(query.QueryId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetQuery", new { id = query.QueryId }, query);
        }
        // Getting the query based on the catagory
        [HttpGet("catagory/{catagory}")]
        public dynamic GetQuery(string catagory)
        {
            var Catagory = from c in _context.Queries
                           where c.Category == catagory
                           select c;

            return Catagory;
        }
        // Getting all queries
        [HttpGet("/all")]
        public dynamic GetallQuery()
        {
            var Catagory = from c in _context.Queries

                           select c;

            return Catagory;
        }

        //Getting the top rated queries

        [HttpGet("GetGroupBy")]
        public dynamic GetSolutionGroup()
        {
            // Getting the count(solution for any query) and queryId in descing order of count.
            var queryInfo = (
                from soln in _context.Solutions
                group soln by soln.QueryId into res
                orderby res.Count() descending
                select new
                {
                    queryId = res.Key,
                    count = res.Count()
                }
                ).ToList();
            // Getting the query details of the query based on the descreasing number of solution
            var topRatedQuery = (
                from qi in queryInfo
                join qry in _context.Queries
                on qi.queryId equals qry.QueryId
                select new
                {
                    queryId = qry.QueryId,
                    title = qry.Title,
                    description = qry.Description,
                    Category = qry.Category

                }
                ).ToList();

            return topRatedQuery;
        }
        // Searching the query based on the query title
        [HttpGet("/SearchByTitle/{title}")]
        public dynamic SearchQuery(string title)
       
        {
              
            var search = (from s in _context.Queries
                          where s.Title.Contains(title)
                          select s).ToList();


            if (search.Count == 0)
            {

               
                return new[] { new { title = "null" } }.ToList();
            }
            else
            {
                return search;
            }
        }
        
            // DELETE: api/Queries/5
            [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuery(decimal id)
        {
            var query = await _context.Queries.FindAsync(id);
            if (query == null)
            {
                return NotFound();
            }

            _context.Queries.Remove(query);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        

            private bool QueryExists(decimal id)
        {
            return _context.Queries.Any(e => e.QueryId == id);
        }
    }
}
