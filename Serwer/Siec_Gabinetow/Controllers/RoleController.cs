using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Siec_Gabinetow.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/uprawnienia")]
    [ApiController]
    [Authorize(Roles = "Manager")]
    public class RoleController : ControllerBase
    {
        private DataContext _context;
        public RoleController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Role>> GetAllRoles()
        {
            return _context.Roles.ToList();
        }
        [HttpGet("{id}")]
        public ActionResult<Role> GetRole(int id)
        {
            var roles = _context.Roles.Find(id);

            if (roles == null)
            {
                return NotFound();
            }

            return roles;

        }
    }
}