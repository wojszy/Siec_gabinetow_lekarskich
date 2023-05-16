using Siec_Gabinetow.Models;

namespace Siec_Gabinetow.DTO
{
    public class AddDutyDto
    {
        public int DutyId { get; set; }
        public string Date { get; set; }
        public int WorkerId { get; set; }
        // public virtual Worker Worker { get; set; }
        public int ManagerId { get; set; }
        // public virtual Manager Manager { get; set; }
    }

}