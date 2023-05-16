using System.ComponentModel.DataAnnotations.Schema;
namespace Siec_Gabinetow.Models
{
    public class Result
    {
        public int ResultId { get; set; }
        public string Date { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public int PatientId { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
    }
}