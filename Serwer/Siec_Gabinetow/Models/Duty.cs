using System.ComponentModel.DataAnnotations.Schema;
namespace Siec_Gabinetow.Models
{
    public class Duty
    {
        public int DutyId { get; set; }
        public string Date { get; set; }
        public int WorkerId { get; set; }
        [ForeignKey("WorkerId")]
        public virtual Worker Worker { get; set; }
        public int ManagerId { get; set; }
        [ForeignKey("ManagerId")]
        public virtual Manager Manager { get; set; }
    }
}