using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Siec_Gabinetow.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        [JsonIgnore]
        public string Email { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }

    }

}