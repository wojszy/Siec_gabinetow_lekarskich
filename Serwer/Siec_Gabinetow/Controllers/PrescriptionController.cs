using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Siec_Gabinetow.Data;
using System.Linq;
using Siec_Gabinetow.DTO;
using Microsoft.EntityFrameworkCore;
using Siec_Gabinetow.Exceptions;
using AutoMapper;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/prescription")]
    [ApiController]
    [Authorize]
    public class PrescriptionController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PrescriptionController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Receptionist, Doctor")]
        public ActionResult<IEnumerable<PrescriptionDto>> GetAllPresciptions()
        {
            var prescriptions = _context.Prescriptions.Include(p => p.Patient.User).ToList();
            var prescriptionsDto = _mapper.Map<List<PrescriptionDto>>(prescriptions);
            return prescriptionsDto;
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Receptionist, Doctor")]

        public ActionResult<Prescription> GetPrescription(int id)
        {
            var prescription = _context.Prescriptions.FirstOrDefault(r => r.PrescriptionId == id);
            if (prescription == null)
            {
                return NotFound();
            }
            return prescription;
        }

        [HttpGet("Patient/{id}")]
        [Authorize(Roles = "Receptionist, Doctor, Patient")]
        public ActionResult<IEnumerable<Prescription>> GetPatientsPrescriptions(int id)
        {
            return _context.Prescriptions.Where(r => r.Patient.UserId == id).Include(l => l.Doctor).Include(p => p.Patient.User).ToList();
        }

        [HttpPost]
        [Authorize(Roles = "Doctor")]
        public ActionResult<AddPrescriptionDto> AddPrescription(AddPrescriptionDto dto)
        {
            Patient patient = _context.Patients.Where(p => p.PatientId == dto.PatientId).FirstOrDefault();
            if (patient == null)
            {
                throw new BadRequestException("Nie znaleziono pacjenta o podanym ID");
            }
            Doctor doctor = _context.Doctors.Where(l => l.DoctorId == dto.DoctorId).FirstOrDefault();
            if (doctor == null)
            {
                throw new BadRequestException("Nie znaleziono lekarza o podanym ID");
            }
            var newPrescription = new Prescription
            {
                DoctorId = dto.DoctorId,
                PatientId = dto.PatientId,
                Medicine = dto.Medicine,
                Doctor = _context.Doctors.FirstOrDefault(l => l.DoctorId == dto.DoctorId),
                Patient = _context.Patients.FirstOrDefault(p => p.PatientId == dto.PatientId)
            };
            _context.Prescriptions.Add(newPrescription);
            _context.SaveChanges();
            return Ok();

        }

    }
}