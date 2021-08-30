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
    public class UsersController : ControllerBase
    {
        private readonly QDoubtContext _context;

        public UsersController(QDoubtContext context)
        {
            _context = context;
        }

        // GET: api/Users
        // Getting all the users from the database
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        
        // GET: api/Users/5
        // Getting user based on the user Id
        
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        
        // Getting the profile details based on the username
        [HttpGet("Profile/{username}")]
        public dynamic GetUserDetails(string username)
        {
            //getting the name and email from user table
            var x = (
                from usr in _context.Users
                where usr.Username == username
                select new
                {
                    name = usr.Name,
                    email = usr.Email
                }
                ).ToList();
            // if the user is not present then the x list will be empty then no user no other details  
            if (x.Count == 0)
            {
                return "Username not found";
            }
            var name = x[0].name;
            var email = x[0].email;

            // getting the no of queries asked by the username
            var y = (
                from qry in _context.Queries
                where qry.Username == username
                select new
                {
                    query = qry.Description
                }
                ).ToList();
            var NoOfQueries = y.Count;

            // getting the no of solution asked by the username
            var z = (
                from sol in _context.Solutions
                where sol.Username == username
                select new
                {
                    solution = sol.Solution1
                }
                ).ToList();
            var NoOfSolution = z.Count;
            //putting all the data in one place 
            var result = new
            {
                Name = name,
                Email = email,
                NumberOfQuery = NoOfQueries,
                NumberOfSolution = NoOfSolution
            };
            return result;
        }

        // For user authentication while Login
        // Passing email and password as input and will get boolean result and username as response

        [HttpPost("/log")]
        public dynamic checkTblUser(User tblUser)
        {

           
            var x = (from u in _context.Users
                     where u.Email == tblUser.Email && u.Password == tblUser.Password
                     select new
                     {

                         username = u.Username,
                         auth = "true"

                     }).ToList();
            if (x.Count == 0)
            {
                return new[] { new { auth = "false" } }.ToList();
            }
            else
            {
                return x;
            }
        }
        //return new[] { new {name=x[0].name,email=x[0].email,nquery=y.Count,nsol=z.Count} }.ToList();

        // PUT: api/Users/5
        
        // Updating the user details based on the userId
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.Username)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.Username }, user);
        }

        // POST: api/Users
        // Checking for the user incase of forgot user details
        [HttpPost("/check")]
        public dynamic CheckforgotUser(User user)
        {

            var x = (from u in _context.Users
                     where u.Email == user.Email && u.Name == user.Name
                     select new
                     {

                         username = u.Username,
                         auth = "true"

                     }).ToList();
            if (x.Count == 0)
            {

                string auth;
                return new[] { auth = "false" }.ToList();
            }
            else
            {
                return x;
            }

        }
        // Adding a new user
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {

            Random r = new Random();
            user.Username = user.Name + r.Next(1000).ToString();

            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.Username }, user);
        }
        
        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Username == id);
        }


        // Getting the asked query list of the user by username

        [HttpGet("querylist/{username}")]
        public dynamic GetQueryList(string username)
        {
            var querylist = (from qry in _context.Queries
                             where qry.Username == username
                             select new
                             {
                                 queryId = qry.QueryId,
                                 title = qry.Title,
                                 description = qry.Description,
                                 Category = qry.Category

                             }
                           ).ToList();
            return querylist;

        }

        // Getting the query list for which the user have provided the solution
        [HttpGet("solutionlist/{username}")]
        public dynamic GetSolutionList(string username)
        {
            var solutionList = (
                from soln in _context.Solutions
                join qry in _context.Queries
                on soln.QueryId equals qry.QueryId
                where soln.Username == username
                select new
                {
                    queryId = qry.QueryId,
                    title = qry.Title,
                    description = qry.Description,
                    Category = qry.Category
                }
                ).ToList();
            return solutionList;
        }

    }
}
