using Siec_Gabinetow.Models;

namespace Siec_Gabinetow.DTO
{
    public class DoctorDto
    {
        public int DoctorId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int UserId {get; set;}
        public int WorkerId {get; set;}
        public virtual Worker Worker {get; set;}
    }

}