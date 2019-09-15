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

        public RegistrationController(UserManager<DbUser> userManager, IMapper mapper)
        {
            this.userManager = userManager;
            _mapper = mapper;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Reg([FromBody]RegistrationViewModel model)
        {

            var userIdentity = _mapper.Map<DbUser>(model);
            var result = await userManager.CreateAsync(userIdentity);


            if (!result.Succeeded)
            {
                foreach (var el in result.Errors)
                {
                    return new BadRequestObjectResult(Errors.AddErrorToModelState("Error", el.Description, ModelState));
                }
            }
            model.Password = "";

            return Ok(model);
        }
    }
}