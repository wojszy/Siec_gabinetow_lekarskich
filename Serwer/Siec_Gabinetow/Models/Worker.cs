using System.ComponentModel.DataAnnotations.Schema;

namespace Siec_Gabinetow.Models
{
    public class Worker
    {
        public int WorkerId { get; set; }
        public double? Salary { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

    }
}