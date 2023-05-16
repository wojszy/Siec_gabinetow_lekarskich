namespace Siec_Gabinetow.DTO
{
    public class AddAppointmentDto
    {
        public string Date { get; set; }
        public double Price { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public int ClinicId { get; set; }
    }
}