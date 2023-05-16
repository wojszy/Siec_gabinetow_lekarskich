using Siec_Gabinetow.Models;

namespace Siec_Gabinetow.DTO
{
    public class PrescriptionDto
    {
        public int PrescriptionId { get; set; }
        public string Medicine { get; set; }
        public int PatientId { get; set; }
        public virtual Patient Patient { get; set; }
        public int DoctorId { get; set; }
    }

}