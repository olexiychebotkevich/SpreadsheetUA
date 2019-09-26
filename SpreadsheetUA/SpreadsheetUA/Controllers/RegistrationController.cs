using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SpreadsheetUA.Entities;
using SpreadsheetUA.Helpers;
using SpreadsheetUA.ViewModels;

namespace SpreadsheetUA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly UserManager<DbUser> userManager;
        private readonly IMapper _mapper;
        private readonly SignInManager<DbUser> signInManager;

        public RegistrationController(UserManager<DbUser> userManager, SignInManager<DbUser> _signInManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = _signInManager;
            _mapper = mapper;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Reg([FromBody]RegistrationViewModel model)
        {

            //var userIdentity = _mapper.Map<DbUser>(model);
            var userIdentity = new DbUser { Email = model.Email, UserName = model.FirstName };
            var user = await userManager.CreateAsync(userIdentity,model.Password);
   
         
          
            if (!user.Succeeded)
            {
                foreach (var el in user.Errors)
                {
                    return new BadRequestObjectResult(Errors.AddErrorToModelState("Error", el.Description, ModelState));
                }
            }
    
            model.Password = "";

            return Ok(model);
        }
    }
}