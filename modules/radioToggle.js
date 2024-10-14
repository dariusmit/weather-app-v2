//"use strict";

import {
  searchInputCity,
  searchInputCoord,
  searchInputZip,
} from "./inputData.js";

let cityEnabled = false;
let zipEnabled = false;
let coordEnabled = false;
const cityLabel = document.getElementById("city-search");
const zipLabel = document.getElementById("zip-search");
const coordLabel = document.getElementById("coord-search");
const cityRadio = document.getElementById("city");
const zipRadio = document.getElementById("zip");
const coordRadio = document.getElementById("coord");

function revealCitySearch() {
  cityEnabled = true;
  if (zipEnabled) {
    zipLabel.style.display = "none";
    searchInputZip.style.display = "none";
    zipEnabled = false;
  }
  if (coordEnabled) {
    coordLabel.style.display = "none";
    searchInputCoord.style.display = "none";
    coordEnabled = false;
  }
  searchInputCity.style.display = "block";
  cityLabel.style.display = "block";
}

function revealZipSearch() {
  zipEnabled = true;
  if (cityEnabled) {
    cityLabel.style.display = "none";
    searchInputCity.style.display = "none";
    cityEnabled = false;
  }
  if (coordEnabled) {
    coordLabel.style.display = "none";
    searchInputCoord.style.display = "none";
    coordEnabled = false;
  }
  searchInputZip.style.display = "block";
  zipLabel.style.display = "block";
}

function revealCoordSearch() {
  coordEnabled = true;
  if (cityEnabled) {
    cityLabel.style.display = "none";
    searchInputCity.style.display = "none";
    cityEnabled = false;
  }
  if (zipEnabled) {
    zipLabel.style.display = "none";
    searchInputZip.style.display = "none";
    zipEnabled = false;
  }
  searchInputCoord.style.display = "block";
  coordLabel.style.display = "block";
}

export {
  revealCitySearch,
  revealZipSearch,
  revealCoordSearch,
  cityEnabled,
  zipEnabled,
  coordEnabled,
  cityRadio,
  zipRadio,
  coordRadio,
};
