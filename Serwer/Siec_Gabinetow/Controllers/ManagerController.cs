using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Siec_Gabinetow.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/manager")]
    [ApiController]
    [Authorize(Roles = "Manager")]
    public class ManagerController : ControllerBase
    {

        private readonly DataContext _context;

        public ManagerController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Manager>> GetAllManagers()
        {
            return _context.Managers.ToList();
        }

        [HttpGet("user/{id}")]
        public ActionResult<Manager> GetManagerByUserId(int id)
        {
            var manager = _context.Managers
            .Include(u => u.Worker.User)
            .FirstOrDefault(u => u.Worker.UserId == id);


            if (manager == null)
            {
                return NotFound();
            }

            return manager;
        }


    }
}