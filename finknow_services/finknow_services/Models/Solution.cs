using System;
using System.Collections.Generic;

#nullable disable

namespace finknow_services.Models
{
    public partial class Solution
    {
        public Solution()
        {
            Comments = new HashSet<Comment>();
        }

        public decimal SolId { get; set; }
        public string Solution1 { get; set; }
        public string Username { get; set; }
        public decimal QueryId { get; set; }

        public virtual Query Query { get; set; }
        public virtual User UsernameNavigation { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
