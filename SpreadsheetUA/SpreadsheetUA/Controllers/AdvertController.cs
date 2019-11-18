using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SpreadsheetUA.Entities;
using SpreadsheetUA.Helpers;
using SpreadsheetUA.ViewModels;
using Microsoft.Extensions.Configuration;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using Microsoft.AspNetCore.Authorization;

namespace SpreadsheetUA.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertController : ControllerBase
    {
        private readonly EFContext dbcontext;
        private readonly UserManager<DbUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;

        public AdvertController(UserManager<DbUser> userManager, EFContext _dbcontext, IConfiguration configuration, IHostingEnvironment env)
        {
            this._userManager = userManager;
            dbcontext = _dbcontext;
            _configuration = configuration;
            _env = env;
        }

        [Authorize]
        [HttpPost("add")]
        public IActionResult add([FromBody]AdvertViewModel model)
        {

            var advert = model;
            if (advert != null)
            {
                string imageName = Guid.NewGuid().ToString() + ".jpg";
                string base64 = model.Image;
                if (base64.Contains(","))
                {
                    base64 = base64.Split(',')[1];
                }

                var bmp = base64.FromBase64StringToImage();
                string fileDestDir = _env.ContentRootPath;
                fileDestDir = Path.Combine(fileDestDir, _configuration.GetValue<string>("ImagesPath"));

                string fileSave = Path.Combine(fileDestDir, imageName);
                if (bmp != null)
                {
                    int size = 1000;
                    var image = ImageHelper.CompressImage(bmp, size, size);
                    image.Save(fileSave, ImageFormat.Jpeg);
                }
                dbcontext.Adverts.Add(new Advert { Title = model.Title, Description = model.Description, ImagePath = imageName, User = _userManager.FindByIdAsync(model.UserId).Result });
                dbcontext.SaveChanges();
                return Ok(advert);
            }
                
            else
                return new BadRequestObjectResult("Server error");
        }


        [HttpGet("GetAdverts")]
        public ICollection<Advert> GetAdverts()
        {


            var adverts = dbcontext.Adverts.ToList();
            return adverts;
        }


    }
}