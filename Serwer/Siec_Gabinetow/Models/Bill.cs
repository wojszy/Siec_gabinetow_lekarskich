using System.ComponentModel.DataAnnotations.Schema;
namespace Siec_Gabinetow.Models
{
    public class Bill
    {
        public int BillId { get; set; }
        public string Date { get; set; }
        public double Total { get; set; }
        public string Status { get; set; }
        public int PatientId { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
        public int ReceptionistId { get; set; }
        [ForeignKey("ReceptionistId")]
        public virtual Receptionist Receptionist { get; set; }
    }
}