using Microsoft.AspNetCore.Mvc;
using Siec_Gabinetow.Services;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;


        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]

        public ActionResult CreateChekoutSession(int amount, int BillId)
        {
            return _paymentService.CreateChekoutSession(amount, BillId);
        }

        [HttpPost("fulfill")]
        public ActionResult FulfillPayment()
        {
            _paymentService.FulfillPayment();
            return Ok();
        }


    }

}