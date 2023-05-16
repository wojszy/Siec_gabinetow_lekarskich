using System.ComponentModel.DataAnnotations.Schema;

namespace Siec_Gabinetow.Models
{
    public class Manager
    {
        public int ManagerId { get; set; }
        public int WorkerId { get; set; }
        [ForeignKey("WorkerId")]
        public virtual Worker Worker { get; set; }
    }
}