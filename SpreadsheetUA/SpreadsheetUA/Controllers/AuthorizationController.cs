﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SpreadsheetUA.Entities;
using SpreadsheetUA.Helpers;
using SpreadsheetUA.ViewModels;

namespace SpreadsheetUA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly AppSettings _appSettings;


        public AuthorizationController(UserManager<DbUser> userManager, IOptions<AppSettings> appSettings)
        {
            this._userManager = userManager;
            _appSettings = appSettings.Value;
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody]CredentialsViewModel model)
        {
            Debug.WriteLine("Emeil: " + model.UserName);
            var user = Authenticate(model.UserName, model.Password);
            if (user != null)
                return Ok(user);
            else
                return new BadRequestObjectResult("Server error");
        }



        public UserViewModel Authenticate(string useremail, string password)
        {
            UserViewModel resultuser = null;
            var user = _userManager.FindByEmailAsync(useremail).Result;


            // return null if user not found
            if (user == null)
                return null;
            // authentication successful so generate jwt token
            if (_userManager.CheckPasswordAsync(user, password).IsCompletedSuccessfully)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                resultuser = new UserViewModel { Id=user.Id, FirstName = user.UserName, Email = user.Email, Token = tokenHandler.WriteToken(token) };
            }

            return resultuser;


        }
    }
}