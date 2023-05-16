using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Siec_Gabinetow.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/receptionist")]
    [ApiController]
    [Authorize(Roles = "Receptionist, Manager")]
    public class ReceptionistController : ControllerBase
    {
        private readonly DataContext _context;

        public ReceptionistController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Receptionist>> GetAllReceptionists()
        {

            return _context.Receptionists.Include(w => w.Worker).ToList();
        }

        [HttpGet("user/{id}")]
        public ActionResult<IEnumerable<Prescription>> GetReceptionistByUserId(int id)
        {
            var receptionist = _context.Receptionists
            .Include(r => r.Worker.User)
            .FirstOrDefault(u => u.Worker.UserId == id);
            if (receptionist == null)
            {
                return NotFound();
            }
            return Ok(receptionist);
        }

    }
}