using System;
using System.Collections.Generic;

#nullable disable

namespace finknow_services.Models
{
    public partial class Readlater
    {
        public string Username { get; set; }
        public decimal QueryId { get; set; }
        public decimal RlId { get; set; }

        public virtual Query Query { get; set; }
        public virtual User UsernameNavigation { get; set; }
    }
}
