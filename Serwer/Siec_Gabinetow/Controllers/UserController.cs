using System.Collections.Generic;
using Siec_Gabinetow.Models;
using Microsoft.AspNetCore.Mvc;
using Siec_Gabinetow.Data;
using System.Linq;
using Siec_Gabinetow.DTO;
using AutoMapper;
using Siec_Gabinetow.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.JsonPatch;

namespace Siec_Gabinetow.Controllers
{
    [EnableCors]
    [Route("api/user")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {

            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = "Manager")]
        public ActionResult<IEnumerable<UserDto>> GetAllUsers()
        {

            return Ok(_userService.GetAllUsers());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Manager")]
        public ActionResult<UserDto> GetUser(int id)
        {

            return Ok(_userService.GetUser(id));
        }


        [HttpPost("register")]
        [AllowAnonymous]
        public ActionResult<User> RegisterUser([FromBody] RegisterUserDto dto)
        {
            var user = _userService.RegisterUser(dto);

            if (user != null)
            {
                return Ok(user);
            }
            return BadRequest();

        }

        [HttpPost("google-login")]
        [AllowAnonymous]
        public ActionResult<User> GoogleLogin([FromBody] AuthenticateRequest googleToken)
        {
            string token = _userService.GoogleLogin(googleToken.IdToken);
            return Ok(token);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public ActionResult Login([FromBody] LoginDto dto)
        {
            string token = _userService.VerifyLogin(dto);
            return Ok(token);
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "Manager, Receptionist")]
        public ActionResult UpdateUser(int id, [FromBody] JsonPatchDocument<User> patchEntity)
        {

            return Ok(_userService.UpdateUser(id, patchEntity));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager")]
        public ActionResult DeleteUser(int id)
        {
            return Ok(_userService.DeleteUser(id));
        }

    }
}