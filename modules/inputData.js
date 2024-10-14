"use strict";

import swal from "sweetalert";
import { cityEnabled, zipEnabled, coordEnabled } from "./radioToggle";

let zip = "";
let country_code = "";
let lat = "";
let lon = "";
let city = "";
let searchInputValueCity = "";
let searchInputValueZip = "";
let searchInputValueCoord = "";
const searchInputCity = document.getElementById("search-input-city");
const searchInputZip = document.getElementById("search-input-zip");
const searchInputCoord = document.getElementById("search-input-coord");

function updateValueCity(e) {
  searchInputValueCity = e.target.value;
  city = searchInputValueCity.toLowerCase();
}

function updateValueZip(e) {
  let separatedZipInputArray;
  searchInputValueZip = e.target.value;
  const validZipFormatRegExp = /[0-9], [A-Z]/i;
  let isValid = validZipFormatRegExp.test(searchInputValueZip);
  if (isValid === false) {
    swal("Oops", "Incorrect input value, see example", "error", {
      buttons: false,
      timer: 2000,
    });
  } else {
    if (searchInputValueZip.includes(".")) {
      searchInputValueZip = searchInputValueZip.replace(".", ",");
      searchInputValueZip = searchInputValueZip.replace(/\s/g, "");
      separatedZipInputArray = searchInputValueZip.split(",");
    } else {
      searchInputValueZip = searchInputValueZip.replace(/\s/g, "");
      separatedZipInputArray = searchInputValueZip.split(",");
    }
    separatedZipInputArray[0] = separatedZipInputArray[0].replace(/\s/g, "");
    separatedZipInputArray[1] = separatedZipInputArray[1].replace(/\s/g, "");
    zip = separatedZipInputArray[0];
    country_code = separatedZipInputArray[1];
  }
}

function updateValueCoord(e) {
  if (validateCoordInput(e)) {
    searchInputValueCoord = e.target.value;
    let separatedCoordInputArray = searchInputValueCoord.split(", ");
    separatedCoordInputArray[0] = separatedCoordInputArray[0].replace(
      /\s/g,
      ""
    );
    separatedCoordInputArray[1] = separatedCoordInputArray[1].replace(
      /\s/g,
      ""
    );
    separatedCoordInputArray[0] = separatedCoordInputArray[0].replace(",", ".");
    separatedCoordInputArray[1] = separatedCoordInputArray[1].replace(",", ".");
    lat = String(Math.round(Number(separatedCoordInputArray[0]) * 100) / 100);
    lon = String(Math.round(Number(separatedCoordInputArray[1]) * 100) / 100);
  } else {
    swal("Oops", "Incorrect input value, see example", "error", {
      buttons: false,
      timer: 2000,
    });
    lat = "";
    lon = "";
  }
}

function validateCoordInput(e) {
  const validZipFormatRegExp = /[0-9], [0-9]/i;
  let isValid = validZipFormatRegExp.test(e.target.value);

  return isValid;
}

function validateInput() {
  let isValid = false;
  if (
    (cityEnabled && city !== "") ||
    (zipEnabled && zip !== "" && country_code !== "") ||
    (coordEnabled && lat !== "" && lon !== "")
  ) {
    isValid = true;
  } else {
    return;
  }
  return isValid;
}

export {
  updateValueCity,
  updateValueZip,
  updateValueCoord,
  validateInput,
  searchInputCity,
  searchInputCoord,
  searchInputZip,
  city,
  zip,
  lat,
  lon,
  country_code,
  searchInputValueCity,
  searchInputValueZip,
  searchInputValueCoord,
};
