"use strict";

import {
  saveArrayToStorage,
  getPaginatedArray,
  getCachedArrayData,
} from "./localStorage.js";
import { paginate, updateRecordsCountView } from "./pagination.js";
import { currentPage } from "./pagination.js";
import { cityEnabled, zipEnabled, coordEnabled } from "./radioToggle.js";
import {
  searchInputValueCoord,
  searchInputValueCity,
  searchInputValueZip,
} from "./inputData.js";

let WeatherArray = [];
let isValueFound = Boolean(localStorage.getItem("isFoundValue")) || false;
const weatherListDiv = document.getElementById("weather-list");

function buildArray(weatherData, e) {
  WeatherArray = getCachedArrayData();
  if (WeatherArray && doesValueExist() === false) {
    let sunriseHours = new Date(weatherData.sys.sunrise * 1000).getHours();
    let sunriseMinutes =
      "0" + new Date(weatherData.sys.sunrise * 1000).getMinutes();
    let formatedSunriseTime =
      sunriseHours + ":" + sunriseMinutes.substring(0, 2);
    let sunsetHours = new Date(weatherData.sys.sunset * 1000).getHours();
    let sunsetMinutes =
      "0" + new Date(weatherData.sys.sunset * 1000).getMinutes();
    let formatedSunsetTime = sunsetHours + ":" + sunsetMinutes.substring(0, 2);
    WeatherArray.push({
      id: WeatherArray.length,
      city: weatherData.name,
      country: weatherData.sys.country,
      temp: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      windspeed: weatherData.wind.speed,
      pressure: weatherData.main.pressure,
      sunrise: formatedSunriseTime,
      sunset: formatedSunsetTime,
      conditions: weatherData.weather[0].icon,
      previousSearchValue: e.target.value,
    });
  }
  saveArrayToStorage();
  updateRecordsCountView();
}

function doesValueExist() {
  if (cityEnabled) {
    isValueFound = false;
    WeatherArray.forEach((item) => {
      if (item.city.toLowerCase() == searchInputValueCity.toLowerCase()) {
        isValueFound = true;
        localStorage.setItem("isFoundValue", String(isValueFound));
      }
    });
    if (isValueFound) {
      return true;
    } else {
      isValueFound = false;
      localStorage.setItem("isFoundValue", String(isValueFound));
      return false;
    }
  }
  if (zipEnabled) {
    isValueFound = false;
    WeatherArray.forEach((item) => {
      if (
        item.previousSearchValue.toLowerCase() ==
        searchInputValueZip.toLowerCase()
      ) {
        isValueFound = true;
        localStorage.setItem("isFoundValue", String(isValueFound));
      }
    });
    if (isValueFound) {
      return true;
    } else {
      isValueFound = false;
      localStorage.setItem("isFoundValue", String(isValueFound));
      return false;
    }
  }

  if (coordEnabled) {
    isValueFound = false;
    WeatherArray.forEach((item) => {
      if (
        item.previousSearchValue.toLowerCase() ==
        searchInputValueCoord.toLowerCase()
      ) {
        isValueFound = true;
        localStorage.setItem("isFoundValue", String(isValueFound));
      }
    });
    if (isValueFound) {
      return true;
    } else {
      isValueFound = false;
      localStorage.setItem("isFoundValue", String(isValueFound));
      return false;
    }
  }
  return false;
}

function renderList() {
  weatherListDiv.innerHTML = "";
  getPaginatedArray().forEach((item) => {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let img = document.createElement("img");
    let deleteButton = document.createElement("button");
    div.setAttribute("id", `weather-item-` + item.id);
    weatherListDiv.appendChild(div);
    let weatherItemDiv = document.querySelector(`#weather-item-${item.id}`);
    img.src = `${item.conditions}` + `.png`;
    p.textContent = `City: ${item.city}, Country: ${item.country}, Temp: ${item.temp}°C, Humidity: ${item.humidity}%, Wind Speed: ${item.windspeed}m/s, Pressure: ${item.pressure}N/m², Sunrise: ${item.sunrise}, Sunset: ${item.sunset}`;
    p.classList.add("paragraph");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("button", "is-danger");
    deleteButton.setAttribute("id", `weather-button-` + item.id);
    weatherItemDiv.appendChild(img);
    weatherItemDiv.appendChild(p);
    weatherItemDiv.appendChild(deleteButton);
  });
}

function deleteItem(clickID) {
  swal("Are you sure you want to DELETE forecast?", {
    dangerMode: true,
    buttons: true,
  }).then((okay) => {
    if (okay) {
      WeatherArray = getCachedArrayData();
      WeatherArray = WeatherArray.filter((item) => {
        return item.id !== clickID;
      });
      for (let i = 0; i < WeatherArray.length; i++) {
        WeatherArray[i].id = i;
      }
      saveArrayToStorage();
      WeatherArray = getCachedArrayData();
      paginate(currentPage);
      renderList();
      updateRecordsCountView();
    }
  });
}

export {
  buildArray,
  renderList,
  deleteItem,
  WeatherArray,
  weatherListDiv,
  isValueFound,
};
