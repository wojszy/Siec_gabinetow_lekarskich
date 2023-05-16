using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Siec_Gabinetow.Data;
using System.Linq;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/clinic")]
    [ApiController]
    [Authorize]
    public class ClinicController : ControllerBase
    {
        private readonly DataContext _context;

        public ClinicController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Clinic>> GetAllClinics()
        {
            return _context.Clinics.ToList();

        }

        [HttpGet("{id}")]
        public ActionResult<Clinic> GetClinic(int id)
        {
            var clinic = _context.Clinics.FirstOrDefault(g => g.ClinicId == id);
            if (clinic == null)
            {
                return NotFound();
            }
            return clinic;
        }

        [HttpPost]
        [Authorize(Roles = "Manager, Receptionist")]
        public ActionResult<Clinic> AddClinic(Clinic clinic)
        {
            _context.Clinics.Add(clinic);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetClinic), new { id = clinic.ClinicId }, clinic);

        }
    }
}