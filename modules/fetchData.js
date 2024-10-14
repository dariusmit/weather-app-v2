//"use strict";

import swal from "sweetalert";
import { city, zip, lat, lon, country_code } from "./inputData.js";
import { cityEnabled, zipEnabled, coordEnabled } from "./radioToggle.js";

let weatherData = {};

async function getData() {
  const key = import.meta.env.VITE_API_KEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?";
  let url_options = ``;
  if (cityEnabled) {
    url_options = `q=${city}` + `&units=metric` + `&appid=${key}`;
  }
  if (zipEnabled) {
    url_options =
      `zip=${zip},${country_code}` + `&units=metric` + `&appid=${key}`;
  }
  if (coordEnabled) {
    url_options =
      `lat=${lat}` + `&lon=${lon}` + `&units=metric` + `&appid=${key}`;
  }
  try {
    const response = await fetch(url + url_options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    weatherData = await response.json();
    swal("Success", "forecast found", "success", {
      buttons: false,
      timer: 2000,
    });
  } catch (error) {
    swal(`${error.message}`, "Something went wrong!", "error", {
      buttons: false,
      timer: 2000,
    });
  }
}

export { getData, weatherData };
