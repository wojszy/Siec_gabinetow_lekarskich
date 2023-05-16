using Siec_Gabinetow.Models;

namespace Siec_Gabinetow.DTO
{
    public class AppointmentDto
    {
        public int AppointmentId { get; set; }
        public string Date { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }
        public int ClinicId { get; set; }
        public virtual Doctor Doctor{get; set;}
        public virtual PatientDto PatientDto {get; set;}
        public virtual Clinic Clinic {get; set;}
    }

}