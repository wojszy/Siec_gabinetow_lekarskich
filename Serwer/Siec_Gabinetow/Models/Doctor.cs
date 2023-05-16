using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Siec_Gabinetow.Models
{
    public class Doctor
    {
        //[Key]
        public int DoctorId { get; set; }
        public int WorkerId { get; set; }
        [ForeignKey("WorkerId")]
        public virtual Worker Worker { get; set; }

    }
}