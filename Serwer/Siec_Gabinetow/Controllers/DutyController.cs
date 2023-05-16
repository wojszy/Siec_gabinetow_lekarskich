using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Siec_Gabinetow.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Siec_Gabinetow.Services;
using Siec_Gabinetow.DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Siec_Gabinetow.Exceptions;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/duty")]
    [ApiController]
    [Authorize(Roles = "Manager")]
    public class DutyController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DutyController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Duty>> GetAllDuties()
        {
            var duties = _context.Duties
            .Include(w => w.Worker.User)
            .Include(m => m.Manager.Worker.User).ToList();
            return duties;
        }

        [HttpGet("{id}")]
        public ActionResult<Duty> GetDuty(int id)
        {
            var duty = _context.Duties
            .Include(w => w.Worker.User)
            .Include(m => m.Manager.Worker.User)
            .FirstOrDefault(w => w.DutyId == id);

            if (duty == null)
            {
                return NotFound();
            }
            return duty;
        }

        [HttpPost]
        public ActionResult<AddDutyDto> AddDuty(AddDutyDto dto)
        {
            Worker worker = _context.Workers.Where(w => w.WorkerId == dto.WorkerId).FirstOrDefault();
            if (worker == null)
            {
                throw new BadRequestException("Nie znaleziono pracownika o podanym ID");
            }
            Manager manager = _context.Managers.Where(m => m.ManagerId == dto.ManagerId).FirstOrDefault();
            if (manager == null)
            {
                throw new BadRequestException("Nie znaleziono managera o podanym ID");
            }

            var newDuty = new Duty
            {
                Date = dto.Date,
                WorkerId = dto.WorkerId,
                ManagerId = dto.ManagerId,
                Manager = manager,
                Worker = worker
            };


            _context.Duties.Add(newDuty);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetDuty), new { id = dto.DutyId }, dto);
            //return Ok();
        }
    }
}