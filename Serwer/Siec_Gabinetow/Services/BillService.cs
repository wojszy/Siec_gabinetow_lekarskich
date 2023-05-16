using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Siec_Gabinetow.Data;
using Siec_Gabinetow.DTO;
using Siec_Gabinetow.Exceptions;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Siec_Gabinetow.Services
{
    public interface IBillService
    {
        List<BillDto> GetAllBills();
        Bill GetBill(int id);
        List<BillDto> GetUserBills(int id);
        void AddBill(BillDto billDto);
        Bill UpdateStatus(int id, [FromBody] JsonPatchDocument<Bill> patchEntity);
    }
    public class BillService : IBillService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public BillService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<BillDto> GetAllBills()
        {
            var bills = _context.Bills.ToList();
            var billsDto = _mapper.Map<List<BillDto>>(bills);
            return billsDto;

        }


        public Bill GetBill(int id)
        {

            var bill = _context.Bills.FirstOrDefault(r => r.BillId == id);
            if (bill == null)
            {
                throw new NotFoundException("Nie znaleziono Faktury");
            }
            return bill;
        }


        public List<BillDto> GetUserBills(int id)
        {
            var userBills = _context.Bills.Where(b => b.Patient.UserId == id).ToList();
            var billsDto = _mapper.Map<List<BillDto>>(userBills);

            return billsDto;
        }


        public void AddBill(BillDto billDto)
        {
            var newBill = new Bill
            {
                Date = billDto.Date,
                PatientId = billDto.PatientId,
                ReceptionistId = billDto.ReceptionistId,
                Status = billDto.Status,
                Total = billDto.Total,

            };
            _context.Bills.Add(newBill);
            _context.SaveChanges();
        }

        public Bill UpdateStatus(int id, [FromBody] JsonPatchDocument<Bill> patchEntity)
        {

            var bill = _context.Bills.FirstOrDefault(w => w.BillId == id);

            if (bill == null)
            {
                throw new NotFoundException("Nie znaleziono faktury");

            }

            patchEntity.ApplyTo(bill); // Must have Microsoft.AspNetCore.Mvc.NewtonsoftJson installed
            _context.SaveChanges();

            return bill;
        }
    }
}
