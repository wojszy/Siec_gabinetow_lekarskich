using System.ComponentModel.DataAnnotations.Schema;

namespace Siec_Gabinetow.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }

        public long Amount { get; set; }
        public int BillId { get; set; }
        [ForeignKey("BillId")]
        public virtual Bill Bill { get; set; }

    }
}