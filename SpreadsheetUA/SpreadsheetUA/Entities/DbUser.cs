using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace SpreadsheetUA.Entities
{
    public class DbUser : IdentityUser<int>
    {
        public ICollection<DbUserRole> UserRoles { get; set; }

        public ICollection<Advert> Adverts { get; set; }
    }
}