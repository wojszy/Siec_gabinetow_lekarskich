using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Siec_Gabinetow.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Siec_Gabinetow.Services;
using Siec_Gabinetow.DTO;
using Microsoft.AspNetCore.JsonPatch;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/bill")]
    [ApiController]
    [Authorize]
    public class BillController : ControllerBase
    {
        private readonly IBillService _billService;
        public BillController(IBillService billService)
        {
            _billService = billService;
        }


        [HttpGet]
        [Authorize(Roles = "Receptionist")]
        public ActionResult<IEnumerable<BillDto>> GetAllBills()
        {
            return Ok(_billService.GetAllBills());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Receptionist, Patient")]
        public ActionResult<Bill> GetBill(int id)
        {
            var bill = _billService.GetBill(id);

            if (bill == null)
            {
                return NotFound();
            }

            return bill;
        }

        [HttpGet("user/{id}")]
        [Authorize(Roles = "Receptionist, Patient")]
        public ActionResult<Bill> GetUserBills(int id)
        {
            var bill = _billService.GetUserBills(id);

            if (bill == null)
            {
                return NotFound();
            }

            return Ok(bill);
        }

        [HttpPost]
        [Authorize(Roles = "Receptionist")]
        public ActionResult<Bill> AddBill(BillDto bill)
        {
            _billService.AddBill(bill);
            return CreatedAtAction(nameof(GetBill), new { id = bill.BillId }, bill);
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "Receptionist")]
        public ActionResult UpdateStatus(int id, [FromBody] JsonPatchDocument<Bill> patchEntity)
        {

            return Ok(_billService.UpdateStatus(id, patchEntity));
        }
    }
}