using Siec_Gabinetow.Models;

namespace Siec_Gabinetow.DTO
{
    public class AddPrescriptionDto
    {
        public int PrescriptionId { get; set; }
        public string Medicine { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }


    }

}