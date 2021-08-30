using System;
using System.Collections.Generic;

#nullable disable

namespace finknow_services.Models
{
    public partial class Query
    {
        public Query()
        {
            Readlaters = new HashSet<Readlater>();
            Solutions = new HashSet<Solution>();
        }

        public decimal QueryId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Username { get; set; }
        public string Category { get; set; }

        public virtual User UsernameNavigation { get; set; }
        public virtual ICollection<Readlater> Readlaters { get; set; }
        public virtual ICollection<Solution> Solutions { get; set; }
    }
}
