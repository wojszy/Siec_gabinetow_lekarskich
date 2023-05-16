using System;
using Xunit;
using Moq;
using Siec_Gabinetow.Services;
using Siec_Gabinetow.DTO;
using Siec_Gabinetow.Models;
using Siec_Gabinetow.Controllers;
using Siec_Gabinetow.Exceptions;
using Microsoft.AspNetCore.Mvc;
using FluentAssertions;
using Xunit.Abstractions;


namespace Siec_Gabinetow_Test
{
    public class UserControllerTest
    {

        private readonly Mock<IUserService> serviceStub = new();
        private readonly ITestOutputHelper output;
        private readonly Random random = new Random();

        public UserControllerTest(ITestOutputHelper output)
        {
            this.output = output;

        }
        [Fact]
        public void GetUser_WithUnexistingUser_ThrowsNotFound()
        {
            // Arange
            serviceStub.Setup(service => service.GetUser(It.IsAny<int>()))
            .Throws(new NotFoundException(""));

            var controller = new UserController(serviceStub.Object);

            // Act & Assert
            Assert.Throws<NotFoundException>(() => controller.GetUser(random.Next(100)));
        }

        [Fact]
        public void RegisterUser_WithValidCredensials_OkObjectResult()
        {
            //Arange
            var RegisterUserDto = CreateRegisterUserDto();
            var expectedUserDto = CreateRandomUserDto();
            serviceStub.Setup(service => service.RegisterUser(RegisterUserDto)).Returns(expectedUserDto);
            var controller = new UserController(serviceStub.Object);

            //Act
            var result = controller.RegisterUser(RegisterUserDto);

            //Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public void RegisterUser_WithInvalidCredensials_BadRequest()
        {
            //Arange
            var registerUserDto = CreateRegisterUserDto();

            serviceStub.Setup(service => service.RegisterUser(registerUserDto));


            var controller = new UserController(serviceStub.Object);

            //Act
            var result = controller.RegisterUser(registerUserDto);

            //Assert
            Assert.IsType<BadRequestResult>(result.Result);
        }


        private RegisterUserDto CreateRegisterUserDto()
        {
            return new RegisterUserDto()
            {
                Email = "123",
                Haslo = "",
                IdUprawnien = 1,
                Imie = "",
                Nazwisko = "",
            };
        }


        private UserDto CreateRandomUserDto()
        {
            return new UserDto()
            {
                Email = "123",
                Name = "",
                RoleId = 1,
                Surname = "",
                Role = new Role() { Name = "Patient", RoleId = 1 }
            };


        }

    }
}
