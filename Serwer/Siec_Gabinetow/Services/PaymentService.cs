using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Siec_Gabinetow.Data;
using Siec_Gabinetow.Exceptions;
using Siec_Gabinetow.Models;
using Stripe;
using Stripe.Checkout;

namespace Siec_Gabinetow.Services
{
    public interface IPaymentService
    {

        public ActionResult CreateChekoutSession(int amount,int BillId);
        public void FulfillPayment();
    }
    public class PaymentService : IPaymentService
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public static int newBillId{get; set;}
        public PaymentService(DataContext context, IConfiguration config, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;

            _config = config;

            _httpContextAccessor = httpContextAccessor;
        }

        public ActionResult CreateChekoutSession(int amount,int BillId)
        {
            var domain = "http://localhost:3000";
            newBillId = BillId;
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                   // Price = "price_1KvoyzCx65kVmn5Pk8z7wbr5",
                   Amount = amount*100,
                   Currency= "PLN",
                   Name = "Wizyta",
                   Quantity = 1,
                  },
                },
                Mode = "payment",
                SuccessUrl = domain + "/success=true",
                CancelUrl = domain + "/success=false",
            };
            var service = new SessionService();
            Session session = service.Create(options);

            _httpContextAccessor.HttpContext.Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
        }

        public async void FulfillPayment()
        {
            var json = await new StreamReader(_httpContextAccessor.HttpContext.Request.Body).ReadToEndAsync();
            const string endpointSecret = "whsec_f0d4ba9eefa8d24be5f24bc7bc9d56f59d902f0924f7b7ce400cfe475dba350c";
            try
            {
                var stripeEvent = EventUtility.ParseEvent(json);
                var signatureHeader = _httpContextAccessor.HttpContext.Request.Headers["Stripe-Signature"];

                stripeEvent = EventUtility.ConstructEvent(json,
                        signatureHeader, endpointSecret);

                if (stripeEvent.Type == Events.PaymentIntentSucceeded)
                {
                    var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    Console.WriteLine("A successful payment for {0} was made.", paymentIntent.Amount);
                    var newPayment = new Payment
                    {
                        Amount = paymentIntent.Amount,
                        BillId = newBillId
                    };
                    var bill = _context.Bills.FirstOrDefault(b=>b.BillId ==newBillId);
                    bill.Status = "oplacona";
                    _context.Update(bill);
                    _context.Add(newPayment);
                    _context.SaveChanges();
                }
                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }
                return;
            }
            catch (StripeException e)
            {
                Console.WriteLine("Error: {0}", e.Message);
                throw new BadRequestException("Cos poszło nie tak: ");
            }
            catch (Exception e)
            {
                Console.WriteLine("Error: {0}", e.Message);
                throw new BadRequestException("Cos poszło nie tak: ");
            }
        }


    }
}



