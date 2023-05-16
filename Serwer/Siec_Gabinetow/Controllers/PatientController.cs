using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Siec_Gabinetow.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Siec_Gabinetow.DTO;
using Microsoft.AspNetCore.JsonPatch;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/patient")]
    [ApiController]
    [Authorize]
    public class PatientController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PatientController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpGet]
        [Authorize(Roles = "Receptionist, Doctor, Manager")]
        public ActionResult<IEnumerable<PatientDto>> GetAllPatients()
        {
            var patients = _context.Patients.Include(u => u.User).ToList();
            var patientsDto = _mapper.Map<List<PatientDto>>(patients);
            return patientsDto;

        }
        [HttpGet("{id}")]
        [Authorize(Roles = "Receptionist, Doctor, Manager")]
        public ActionResult<PatientDto> GetPatient(int id)
        {

            var patient = _context
                .Patients.Include(u => u.User)
                .FirstOrDefault(u => u.PatientId == id);

            if (patient == null)
            {
                return NotFound();
            }


            var patientDto = _mapper.Map<PatientDto>(patient);
            return patientDto;
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "Receptionist")]
        public ActionResult UpdateData(int id, [FromBody] JsonPatchDocument<Patient> patchEntity)
        {

            var entity = _context.Patients.FirstOrDefault(w => w.PatientId == id);

            if (entity == null)
            {
                return NotFound();
            }

            patchEntity.ApplyTo(entity, ModelState); // Must have Microsoft.AspNetCore.Mvc.NewtonsoftJson installed
            _context.SaveChanges();
            return Ok(entity);
        }

    }
}