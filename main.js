"use strict";

import "./style.css";
import swal from "sweetalert";
import {
  paginate,
  currentPage,
  prevPage,
  nextPage,
  updateCurrentpageView,
  updateRecordsCountView,
  pageDownButton,
  pageUpButton,
} from "./modules/pagination.js";
import {
  revealCitySearch,
  revealZipSearch,
  revealCoordSearch,
  cityRadio,
  zipRadio,
  coordRadio,
} from "./modules/radioToggle.js";
import {
  searchInputCity,
  searchInputCoord,
  searchInputZip,
  updateValueCity,
  updateValueCoord,
  updateValueZip,
  validateInput,
} from "./modules/inputData.js";
import { weatherData, getData } from "./modules/fetchData.js";
import {
  weatherListDiv,
  renderList,
  buildArray,
  isValueFound,
  deleteItem,
} from "./modules/listFunctions.js";

const searchButton = document.getElementById("search-button");

window.onload = () => {
  updateCurrentpageView();
  updateRecordsCountView();
  renderList();
};

async function buildList(e) {
  await getData();
  buildArray(weatherData, e);
  paginate(currentPage);
  renderList();
}

weatherListDiv.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    deleteItem(Number(e.target.id.replace(/\D/g, "")));
  }
});
searchButton.addEventListener("click", (e) => {
  if (validateInput()) {
    buildList(e);
  } else {
    swal("Oops", "Incorrect input value, see example", "error", {
      buttons: false,
      timer: 2000,
    });
  }
});
pageUpButton.addEventListener("click", nextPage);
pageDownButton.addEventListener("click", prevPage);
searchInputCity.addEventListener("change", updateValueCity);
searchInputZip.addEventListener("change", updateValueZip);
searchInputCoord.addEventListener("change", updateValueCoord);
cityRadio.addEventListener("click", revealCitySearch);
zipRadio.addEventListener("click", revealZipSearch);
coordRadio.addEventListener("click", revealCoordSearch);
