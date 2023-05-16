using Microsoft.EntityFrameworkCore;
using Siec_Gabinetow.Models;

namespace Siec_Gabinetow.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Bill> Bills { get; set; } = null!;
        public DbSet<Clinic> Clinics { get; set; } = null!;
        public DbSet<Doctor> Doctors { get; set; } = null!;
        public DbSet<Manager> Managers { get; set; } = null!;
        public DbSet<Patient> Patients { get; set; } = null!;
        public DbSet<Receptionist> Receptionists { get; set; } = null!;
        public DbSet<Prescription> Prescriptions { get; set; } = null!;
        public DbSet<Equipment> Equipments { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Worker> Workers { get; set; } = null!;
        public DbSet<Appointment> Appointments { get; set; } = null!;
        public DbSet<Result> Results { get; set; } = null!;
        public DbSet<Role> Roles { get; set; } = null!;
        public DbSet<Duty> Duties { get; set; } = null!;
        public DbSet<Rental> Rentals { get; set; } = null!;
        public DbSet<Payment> Payments { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Patient>().ToTable("Patient");
            modelBuilder.Entity<Doctor>().ToTable("Doctor");
            modelBuilder.Entity<Manager>().ToTable("Manager");
            modelBuilder.Entity<Receptionist>().ToTable("Receptionist");
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Worker>().ToTable("Worker");
        }

    }
}