using Microsoft.AspNetCore.Mvc;
using Scrape_Country_list.Model;
using Scrape_Country_list.scrape;

namespace Scrape_Country_list.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountryController : ControllerBase
    {
    
        [HttpGet("GetCountries")]
        public IActionResult Get()
        {
            var model = new CountryModel();

            var data = ScrapeCore.ScrapeCountry();
         
            return Ok(data);
        }
    }
}
