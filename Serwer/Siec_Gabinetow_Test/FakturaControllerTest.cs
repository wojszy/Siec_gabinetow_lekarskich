using System;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Siec_Gabinetow.Controllers;
using Siec_Gabinetow.Data;
using Siec_Gabinetow.Services;
using Siec_Gabinetow.Models;
using Xunit;
using Xunit.Abstractions;
using System.Net;
using Siec_Gabinetow.DTO;

namespace Siec_Gabinetow_Test
{
    public class BillControllerTest
    {
        private readonly Mock<IBillService> serviceStub = new();
        private readonly ITestOutputHelper output;
        private readonly Random random = new Random();

        public BillControllerTest(ITestOutputHelper output)
        {
            // this.output = output;

        }

        [Fact]
        public void GetBill_WithUnexistingItem_ReturnsNotFound()
        {
            // Arange
            serviceStub.Setup(service => service.GetBill(It.IsAny<int>())).
            Returns((Bill)null);


            var controller = new BillController(serviceStub.Object);

            // Act
            var result = controller.GetBill(random.Next(100));

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);

        }

        [Fact]
        public void GetBill_WithExistingItem_ReturnsExpectedItem()
        {
            // Arange
            var expectedItem = CreateRandomBill();
            serviceStub.Setup(service => service.GetBill(It.IsAny<int>())).
             Returns(expectedItem);

            var controller = new BillController(serviceStub.Object);

            // Act
            var result = controller.GetBill(1);

            // Assert
            Assert.IsType<Bill>(result.Value);

        }
        [Fact]
        public void AddBill_ReturnsCreatedAtActionResult()
        {
            // Arange
            var BillDto = CreateRandomBillDto();
            var controller = new BillController(serviceStub.Object);


            //Act 
            var result = controller.AddBill(BillDto);

            //Assert
            Assert.Equal(BillDto, (result.Result as CreatedAtActionResult).Value);

        }

        private Bill CreateRandomBill()
        {
            return new Bill()
            {
                Date = "",
                BillId = 1,
                PatientId = 1,
                Status = "",
                ReceptionistId=1,
                Total=1.0,
        };
    }

           private BillDto CreateRandomBillDto()
        {
            return new BillDto()
            {
                Date = "",
                BillId = 1,
                PatientId = 1,
                Status = "",
                ReceptionistId=1,
                Total=1.0,
        };
    }




}

}
