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
    [Route("api/worker")]
    [ApiController]
    [Authorize(Roles = "Manager")]
    public class WorkerController : ControllerBase
    {
        private readonly DataContext _context;


        public WorkerController(DataContext context)
        {
            _context = context;

        }
        [HttpGet]
        public ActionResult<IEnumerable<Worker>> GetAllWorkers()
        {
            var workers = _context.Workers

            .Include(u => u.User)
            .Include(r => r.User.Role).ToList();
            return workers;
        }

        [HttpPatch("{id}")]
        public ActionResult UpdateSalary(int id, [FromBody] JsonPatchDocument<Worker> patchEntity)
        {

            var entity = _context.Workers.FirstOrDefault(w => w.WorkerId == id);

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