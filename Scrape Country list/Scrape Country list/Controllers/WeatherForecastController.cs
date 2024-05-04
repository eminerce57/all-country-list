using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Scrape_Country_list.Model;

namespace Scrape_Country_list.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScrapeCore : ControllerBase
    {
        [HttpGet("GetCountries")]
        public IActionResult Get()
        {

            var model = new CountryModel();

            return Ok();
        }
    }




}
