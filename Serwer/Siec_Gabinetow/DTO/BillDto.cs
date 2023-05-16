using Siec_Gabinetow.Models;

namespace Siec_Gabinetow.DTO
{
    public class BillDto
    {
        public int BillId { get; set; }
        public string Date { get; set; }
        public double Total { get; set; }
        public string Status { get; set; }
        public int PatientId { get; set; }
        public int ReceptionistId { get; set; }
    }

}