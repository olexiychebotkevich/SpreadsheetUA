using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SpreadsheetUA.Entities
{
    public class Advert
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }

        public DbUser User { get; set; }

        public DateTime Dateofpublish { get; set; }

        public string ImagePath { get; set; }
    }
}
