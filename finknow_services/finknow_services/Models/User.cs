using System;
using System.Collections.Generic;

#nullable disable

namespace finknow_services.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
            Queries = new HashSet<Query>();
            Readlaters = new HashSet<Readlater>();
            Solutions = new HashSet<Solution>();
        }

        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Query> Queries { get; set; }
        public virtual ICollection<Readlater> Readlaters { get; set; }
        public virtual ICollection<Solution> Solutions { get; set; }
    }
}
