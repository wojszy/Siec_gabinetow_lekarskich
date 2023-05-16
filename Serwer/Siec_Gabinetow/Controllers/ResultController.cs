using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Siec_Gabinetow.Data;
using System.Linq;
using Siec_Gabinetow.Exceptions;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/result")]
    [ApiController]
    [Authorize]
    public class ResultController : ControllerBase
    {
        private readonly DataContext _context;

        public ResultController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Manager, Doctor")]
        public ActionResult<IEnumerable<Result>> GetAllResults()
        {
            return _context.Results.ToList();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Manager, Doctor")]
        public ActionResult<Result> GetResult(int id)
        {
            var result = _context.Results.FirstOrDefault(w => w.ResultId == id);
            if (result == null)
            {
                return NotFound();
            }
            return result;

        }

        [HttpGet("Patient/{id}")]
        [Authorize(Roles = "Manager, Doctor, Patient")]
        public ActionResult<IEnumerable<Result>> GetPatientsResults(int id)
        {
            var result = _context.Results.Where(k => k.Patient.UserId == id).ToList();


            if (result == null)
            {
                return NotFound();
            }
            return result;
        }

        [Authorize(Roles = "Doctor")]
        [HttpPost]
        public ActionResult<Result> AddResult(Result result)
        {
            Patient patient = _context.Patients.Where(p => p.PatientId == result.PatientId).FirstOrDefault();
            if (patient == null)
            {
                throw new BadRequestException("Nie znaleziono pacjenta o podanym ID");
            }
            result.Patient = patient;
            _context.Results.Add(result);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetResult), new { id = result.ResultId }, result);

        }

    }
}