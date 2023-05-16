using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Siec_Gabinetow.Models;

namespace Siec_Gabinetow.Data
{
    public class ClinicSeeder
    {
        private readonly DataContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        public ClinicSeeder(DataContext context, IPasswordHasher<User> passwordHasher)
        {
            _passwordHasher = passwordHasher;
            _context = context;
        }

        public void Seed()
        {
            if (_context.Database.CanConnect())
            {
                if (!_context.Roles.Any())
                {
                    var role = GetRole();
                    _context.Roles.AddRange(role);
                    _context.SaveChanges();
                }
                if (!_context.Users.Any())
                {
                    var user = GetUser();
                    _context.Users.AddRange(user);
                    _context.SaveChanges();
                }
                if (!_context.Clinics.Any())
                {
                    var clinic = GetClinic();
                    _context.Clinics.AddRange(clinic);
                    _context.SaveChanges();
                }
            }
        }

        private IEnumerable<Role> GetRole()
        {
            var roles = new List<Role>()
            {
                new Role()
                {
                    Name = "Patient"
                },
                new Role()
                {
                    Name = "Receptionist"
                },
                new Role()
                {
                    Name = "Doctor"
                },
                new Role()
                {
                    Name = "Manager"
                },

            };
            return roles;
        }

        private User GetUser()
        {

            var user = new User()
            {
                Name = "Manager",
                Surname = "Manager",
                Email = "Manager",
                RoleId = 4
            };

            var hashedPassword = _passwordHasher.HashPassword(user, "Manager");
            user.PasswordHash = hashedPassword;

            var newWorker = new Worker
            {
                Salary = 1234,
                User = user
            };
            _context.Workers.Add(newWorker);

            var newManager = new Manager
            {
                Worker = newWorker
            };
            _context.Managers.Add(newManager);

            return user;
        }

        private IEnumerable<Clinic> GetClinic()
        {
            var clinics = new List<Clinic>()
            {
               new Clinic
               {
                   ClinicType ="Okulistyczny",
                   ReservationStatus = true,
                   ClinicNumber = 1
               },
                new Clinic
               {
                   ClinicType ="Kardiologiczny",
                   ReservationStatus = true,
                   ClinicNumber = 2
               },
                new Clinic
               {
                   ClinicType ="Zabiegowy",
                   ReservationStatus = true,
                   ClinicNumber = 3
               },
               new Clinic
               {
                   ClinicType ="Stomotologiczny",
                   ReservationStatus = true,
                   ClinicNumber = 4
               }

            };
            return clinics;
        }
    }
}