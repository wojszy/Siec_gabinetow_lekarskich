using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Siec_Gabinetow.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Siec_Gabinetow.DTO;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/doctor")]
    [ApiController]
    [Authorize]
    public class DoctorController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DoctorController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet]
        [Authorize(Roles = "Receptionist, Manager")]
        public ActionResult<IEnumerable<DoctorDto>> GetAllDoctors()
        {
            var doctors = _context.Doctors.Include(u => u.Worker.User).ToList();
            var doctorsDto = _mapper.Map<List<DoctorDto>>(doctors);

            return doctorsDto;

        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Receptionist, Manager")]
        public ActionResult<DoctorDto> GetDoctor(int id)
        {
            var doctor = _context
               .Doctors.Include(u => u.Worker.User)
               .FirstOrDefault(u => u.DoctorId == id);


            if (doctor == null)
            {
                return NotFound();
            }
            var doctorDto = _mapper.Map<DoctorDto>(doctor);

            return doctorDto;
        }

        [HttpGet("user/{id}")]
        [Authorize(Roles = "Receptionist, Manager,Doctor")]
        public ActionResult<DoctorDto> GetDoctorByDoctorId(int id)
        {
            var doctor = _context.Doctors
            .Include(u => u.Worker.User)
            .FirstOrDefault(u => u.Worker.UserId == id);


            if (doctor == null)
            {
                return NotFound();
            }
            var doctorDto = _mapper.Map<DoctorDto>(doctor);

            return doctorDto;
        }

    }

}
