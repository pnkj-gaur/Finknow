using System;
using System.Collections.Generic;

#nullable disable

namespace finknow_services.Models
{
    public partial class Comment
    {
        public string Comment1 { get; set; }
        public decimal SolId { get; set; }
        public decimal CommentId { get; set; }
        public string Username { get; set; }

        public virtual Solution Sol { get; set; }
        public virtual User UsernameNavigation { get; set; }
    }
}
