using HtmlAgilityPack;
using Scrape_Country_list.Model;
using System.Collections.Generic;

namespace Scrape_Country_list.scrape
{

    public class ScrapeCore
    {
        public static List<CountryModel> ScrapeCountry()
        {
            HtmlWeb web = new HtmlWeb();
            HtmlDocument doc = web.Load("https://www.worldometers.info/geography/how-many-countries-are-there-in-the-world/");

            var TablePath = "//table[contains(@id,\"example2\")]/tbody";
            var Table = doc.DocumentNode.SelectSingleNode(TablePath);

            List<CountryModel> countries = new List<CountryModel>();

            // Her satırı dolaş
            foreach (HtmlNode row in Table.SelectNodes("tr"))
            {
                var cells = row.SelectNodes("td");
                if (cells != null && cells.Count == 5) 
                {
                    CountryModel country = new CountryModel
                    {
                        CountryName = cells[1].InnerText.Trim(),
                        Population = cells[2].InnerText.Trim(),
                        WorldShare = cells[3].InnerText.Trim(),
                        Size = cells[4].InnerText.Trim()
                    };

                    countries.Add(country); 
                }
            }

            return countries;
        }
    }
}
