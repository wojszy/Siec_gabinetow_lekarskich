using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Siec_Gabinetow.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Siec_Gabinetow.DTO;
using AutoMapper;
using Siec_Gabinetow.Exceptions;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/appointment")]
    [ApiController]
    [Authorize]
    public class AppointmentController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AppointmentController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Patient, Doctor")]
        public ActionResult<IEnumerable<AppointmentDto>> GetAllAppointments()
        {
            var appointments = _context.Appointments
            .Include(p => p.Patient.User)
            .Include(d => d.Doctor.Worker.User)
            .Include(c => c.Clinic).ToList();
            var appointmentsDto = _mapper.Map<List<AppointmentDto>>(appointments);
            return appointmentsDto;
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Patient, Doctor")]
        public ActionResult<AppointmentDto> GetAppointment(int id)
        {
            var appointment = _context.Appointments
            .Include(p => p.Patient.User)
            .Include(d => d.Doctor.Worker.User)
            .Include(c => c.Clinic)
            .FirstOrDefault(w => w.AppointmentId == id);

            if (appointment == null)
            {
                return NotFound();
            }
            var appointmentDto = _mapper.Map<AppointmentDto>(appointment);
            return appointmentDto;
        }

        [HttpGet("Patient/{id}")]
        [Authorize(Roles = "Patient")]
        public ActionResult<IEnumerable<AppointmentDto>> GetPatientsAppointments(int id)
        {
            var appointments = _context.Appointments.Where(w => w.Patient.UserId == id)
            .Include(p => p.Patient.User)
            .Include(d => d.Doctor.Worker.User)
            .Include(c => c.Clinic).ToList();
            var appointmentsDto = _mapper.Map<List<AppointmentDto>>(appointments);
            return appointmentsDto;
        }

        [HttpGet("Doctor/{id}")]
        [Authorize(Roles = "Doctor")]
        public ActionResult<IEnumerable<AppointmentDto>> GetDoctorsAppointments(int id)
        {
            var appointments = _context.Appointments.Where(w => w.Doctor.Worker.UserId == id)
            .Include(p => p.Patient.User)
            .Include(d => d.Doctor.Worker.User)
            .Include(c => c.Clinic).ToList();
            var appointmentsDto = _mapper.Map<List<AppointmentDto>>(appointments);
            return appointmentsDto;
        }

        [HttpPost]
        [Authorize(Roles = "Receptionist")]
        public ActionResult<AddAppointmentDto> AddAppointment(AddAppointmentDto dto)
        {
            Patient patient = _context.Patients.Where(p => p.PatientId == dto.PatientId).FirstOrDefault();
            if (patient == null)
            {
                throw new BadRequestException("Nie znaleziono pacjenta o podanym ID");
            }
            Doctor doctor = _context.Doctors.Where(p => p.DoctorId == dto.DoctorId).FirstOrDefault();
            if (doctor == null)
            {
                throw new BadRequestException("Nie znaleziono lekarza o podanym ID");
            }
            Clinic clinic = _context.Clinics.Where(p => p.ClinicId == dto.ClinicId).FirstOrDefault();
            if (clinic == null)
            {
                throw new BadRequestException("Nie znaleziono gabinetu o podanym ID");
            }

            var newAppointment = new Appointment
            {
                Date = dto.Date,
                Price = dto.Price,
                ClinicId = dto.ClinicId,
                DoctorId = dto.DoctorId,
                PatientId = dto.PatientId,
            };
            _context.Appointments.Add(newAppointment);
            _context.SaveChanges();
            return Ok();

        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "Patient,Doctor")]
        public ActionResult UpdateDescription(int id, [FromBody] JsonPatchDocument<Appointment> patchEntity)
        {

            var entity = _context.Appointments.FirstOrDefault(w => w.AppointmentId == id);

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