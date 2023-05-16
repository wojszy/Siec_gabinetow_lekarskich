using Siec_Gabinetow.Models;

namespace Siec_Gabinetow.DTO
{
    public class PatientDto
    {
        public int PatientId { get; set; }
        public string Pesel { get; set; }
        public virtual User User {get; set;}
    }

}