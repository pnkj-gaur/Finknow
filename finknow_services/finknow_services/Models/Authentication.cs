using System;
using System.Collections.Generic;

#nullable disable

namespace finknow_services.Models
{
    public partial class Authentication
    {
        public string Username { get; set; }
        public string Token { get; set; }

        public virtual User UsernameNavigation { get; set; }
    }
}
