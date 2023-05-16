using System.ComponentModel.DataAnnotations.Schema;

namespace Siec_Gabinetow.Models
{
    public class Rental
    {
        public int RentalId { get; set; }
        public string RentTo { get; set; }
        public int ReceptionistId { get; set; }
        [ForeignKey("ReceptionistId")]
        public virtual Receptionist Receptionist { get; set; }
        public int EquipmentId { get; set; }
        [ForeignKey("EquipmentId")]
        public virtual Equipment Equipment { get; set; }


    }
}