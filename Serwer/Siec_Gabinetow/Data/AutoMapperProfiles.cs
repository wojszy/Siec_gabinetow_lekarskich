using AutoMapper;
using Siec_Gabinetow.DTO;
using Siec_Gabinetow.Models;

namespace Siec_Gabinetow.Data
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<Patient, PatientDto>();
            CreateMap<Doctor, DoctorDto>();
            CreateMap<Appointment, AppointmentDto>();
            CreateMap<Bill, BillDto>();
            CreateMap<Prescription, PrescriptionDto>();
            CreateMap<Duty, AddDutyDto>();

        }
    }
}