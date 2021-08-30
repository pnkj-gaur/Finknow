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
    public class CommentsController : ControllerBase
    {
        private readonly QDoubtContext _context;

        public CommentsController(QDoubtContext context)
        {
            _context = context;
        }
        
        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }
        
        
        // GET: api/Comments/5
        //Get the comment by Id
        
        [HttpGet("{id}")]
        public dynamic GetComment(decimal id)
        {
            var comment = (from c in _context.Comments
                          where c.SolId==id
                          select c).ToList();

            if (comment.Count==0)
            {
                return new[] { new { commentId="null"} };
            }

            return comment;
        }
        
        // PUT: api/Comments/5
        // Editing the comments
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(decimal id, Comment comment)
        {
            if (id != comment.CommentId)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
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

        // POST: api/Comments
        // Adding the new comment to the database
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {

            _context.Comments.Add(comment);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CommentExists(comment.CommentId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetComment", new { id = comment.CommentId }, comment);
        }
        
        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(decimal id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        private bool CommentExists(decimal id)
        {
            return _context.Comments.Any(e => e.CommentId == id);
        }
    }
}
