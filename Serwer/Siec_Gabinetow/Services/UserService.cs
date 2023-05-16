using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Siec_Gabinetow.Data;
using Siec_Gabinetow.DTO;
using Siec_Gabinetow.Exceptions;
using Siec_Gabinetow.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Siec_Gabinetow.Authentication;
using System;
using System.IdentityModel.Tokens.Jwt;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.JsonPatch;

namespace Siec_Gabinetow.Services
{
    public interface IUserService
    {
        List<UserDto> GetAllUsers();
        UserDto GetUser(int id);

        UserDto RegisterUser(RegisterUserDto dto);

        string VerifyLogin(LoginDto dto);
        string GenerateJwt(User user);
        string GoogleLogin(string token);
        User DeleteUser(int id);
        User UpdateUser(int id, [FromBody] JsonPatchDocument<User> patchEntity);
    }
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IConfiguration _config;
        public UserService(DataContext context, IMapper mapper, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings, IConfiguration config)
        {
            _context = context;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
            _config = config;
        }


        public List<UserDto> GetAllUsers()
        {
            var users = _context.Users.Include(u => u.Role).ToList();
            var userDto = _mapper.Map<List<UserDto>>(users);
            return userDto;
        }
        public UserDto GetUser(int id)
        {
            var user = _context
                .Users
                .Include(u => u.Role)
                .FirstOrDefault(u => u.UserId == id);
            if (user is null)
                throw new NotFoundException("Nie znaleziono użytkownika");

            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public User UpdateUser(int id, [FromBody] JsonPatchDocument<User> patchEntity)
        {

            var user = _context.Users.FirstOrDefault(w => w.UserId == id);

            if (user == null)
            {
                throw new NotFoundException("Nie znaleziono użytkownika");

            }

            patchEntity.ApplyTo(user); // Must have Microsoft.AspNetCore.Mvc.NewtonsoftJson installed
            _context.SaveChanges();

            return user;
        }

        public string GoogleLogin(string token)
        {
            GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();

            settings.Audience = new List<string>() { _config["Authentication:Google:ClientId"] };

            GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(token, settings).Result;

            var user = _context.Users.
            Include(u => u.Role).
            FirstOrDefault(u => u.Email == payload.Email);
            if (user == null)
            {
                var newUser = new User
                {
                    Email = payload.Email,
                    Name = payload.GivenName,
                    Surname = payload.FamilyName,
                    RoleId = 1
                };

                var newPatient = new Patient
                {
                    User = newUser
                };
                _context.Users.Add(newUser);
                _context.Patients.Add(newPatient);
                _context.SaveChanges();

                user = _context.Users.
            Include(u => u.Role).
            FirstOrDefault(u => u.Email == payload.Email);

            }
            token = GenerateJwt(user);
            return token;

        }
        public UserDto RegisterUser(RegisterUserDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user != null)
            {
                throw new BadRequestException("Podany e-Email jest już w użyciu");
            }
            else
            {

                var newUser = new User
                {
                    Email = dto.Email,
                    Name = dto.Imie,
                    Surname = dto.Nazwisko,
                    RoleId = dto.IdUprawnien
                };
                var hashedPassword = _passwordHasher.HashPassword(newUser, dto.Haslo);
                newUser.PasswordHash = hashedPassword;
                _context.Users.Add(newUser);

                if (dto.IdUprawnien == 1)
                {
                    var newPatient = new Patient
                    {
                        User = newUser
                    };
                    _context.Patients.Add(newPatient);
                }
                else if (dto.IdUprawnien != 1)
                {
                    var newWorker = new Worker
                    {
                        Salary = dto.Salary,
                        User = newUser
                    };
                    _context.Workers.Add(newWorker);

                    if (dto.IdUprawnien == 2)
                    {
                        var newReceptionist = new Receptionist
                        {
                            Worker = newWorker
                        };
                        _context.Receptionists.Add(newReceptionist);
                    }
                    else if (dto.IdUprawnien == 3)
                    {
                        var newDoctor = new Doctor
                        {
                            Worker = newWorker
                        };
                        _context.Doctors.Add(newDoctor);
                    }
                    else if (dto.IdUprawnien == 4)
                    {
                        var newManager = new Manager
                        {
                            Worker = newWorker
                        };
                        _context.Managers.Add(newManager);
                    }

                }

                _context.SaveChanges();
                user = _context.Users.
        Include(u => u.Role).
        FirstOrDefault(u => u.Email == dto.Email);
                var userDto = _mapper.Map<UserDto>(user);
                return userDto;
            }
        }

        public string VerifyLogin(LoginDto dto)
        {
            var user = _context.Users.
           Include(u => u.Role).
           FirstOrDefault(u => u.Email == dto.Email);
            if (user is null)
            {
                throw new BadRequestException("Niepoprawny login lub haslo");
            }

            if (user.PasswordHash == null)
            {
                throw new BadRequestException("Niepoprawny login lub haslo");
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Haslo);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Niepoprawny login lub haslo");
            }

            var token = GenerateJwt(user);
            return token;

        }
        public string GenerateJwt(User user)
        {

            var claims = new List<Claim>()
           {
               new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
               new Claim(ClaimTypes.Name, $"{user.Name} {user.Surname}"),
               new Claim(ClaimTypes.Role, $"{user.Role.Name}")
           };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(_authenticationSettings.JwtIssure, _authenticationSettings.JwtIssure, claims, expires: expires, signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }



        public User DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == id);
            if (user == null)
            {
                throw new NotFoundException("Nie znaleziono uzytkownika");
            }
            _context.Users.Remove(user);
            _context.SaveChangesAsync();
            return user;

        }


    }
}