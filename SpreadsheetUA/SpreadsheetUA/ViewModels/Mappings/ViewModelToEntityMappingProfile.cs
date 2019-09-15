using AutoMapper;
using SpreadsheetUA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpreadsheetUA.ViewModels.Mappings
{
    public class ViewModelToEntityMappingProfile : Profile
    {
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<RegistrationViewModel, DbUser>()
                .ForMember(au => au.UserName, map => map.MapFrom(vm => vm.FirstName));
            //CreateMap<AdvertViewModel, Advertisement>()
            //  .ForMember(ad => ad.Name, map => map.MapFrom(adv => adv.Name))
            //  .ForMember(ad => ad.Description, map => map.MapFrom(adv => adv.Description))
            //  .ForMember(ad => ad.Date, map => map.MapFrom(adv => adv.Date))
            //  .ForMember(ad => ad.City.Name, map => map.MapFrom(adv => adv.City))
            //  .ForMember(ad => ad.User.Id, map => map.MapFrom(adv => adv.User.Id));

        }
    }
}
