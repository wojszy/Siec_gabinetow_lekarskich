using System.ComponentModel.DataAnnotations.Schema;

namespace Siec_Gabinetow.Models
{
    public class Prescription
    {
        public int PrescriptionId { get; set; }
        public string Medicine { get; set; }
        public int PatientId { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
        public int DoctorId { get; set; }
        [ForeignKey("DoctorId")]
        public virtual Doctor Doctor { get; set; }

    }
}