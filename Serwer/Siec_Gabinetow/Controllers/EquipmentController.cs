using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Siec_Gabinetow.Data;
using System.Linq;

namespace Siec_Gabinetow.Controllers
{
    [Route("api/equipment")]
    [ApiController]
    [Authorize(Roles = "Receptionist, Manager")]
    public class EquipmentController : ControllerBase
    {
        private readonly DataContext _context;

        public EquipmentController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public ActionResult<IEnumerable<Equipment>> GetAllEquipment()
        {
            return _context.Equipments.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Equipment> GetEquipment(int id)
        {
            var equipment = _context.Equipments.FirstOrDefault(s => s.EquipmentId == id);
            if (equipment == null)
            {
                return NotFound();
            }
            return equipment;
        }
        [HttpPost]
        public ActionResult<Equipment> AddEquipment(Equipment equipment)
        {
            _context.Equipments.Add(equipment);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetEquipment), new { id = equipment.EquipmentId }, equipment);
        }



    }
}