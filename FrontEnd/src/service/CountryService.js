import { axiosApp } from "@/utils/axiosAPI";

export default class CountryServices {

    GetCountries(data) {
        return axiosApp.get("Country/GetCountries", data).then((response) => {
          return response.data;
        });
      }
    
    
}