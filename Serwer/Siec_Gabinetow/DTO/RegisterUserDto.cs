
using System.ComponentModel.DataAnnotations;
using Siec_Gabinetow.Models;

namespace Siec_Gabinetow.DTO
{
    public class RegisterUserDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Haslo { get; set; }
        public double? Salary { get; set; }
        public string Imie { get; set; }
        public string Nazwisko { get; set; }
        [Range(1, 5,
ErrorMessage = "Wartosc {0} musi znajdować się w przedziale między {1} i {2}.")]
        public int IdUprawnien { get; set; } = 1;

    }

}