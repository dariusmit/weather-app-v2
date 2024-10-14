//"use strict";

import {
  saveCurrentPage,
  getCurrentPage,
  savePaginatedArray,
  getPaginatedArray,
  getCachedArrayData,
} from "./localStorage.js";
import { weatherListDiv, renderList } from "./listFunctions.js";
import swal from "sweetalert";

let paginatedArray = [];
const itemsPerPage = 3;
let currentPage = 1;
const currentPageContainer = document.getElementById(
  "current-page-1-container"
);
const recordsCountContainer = document.getElementById(
  "records-1st-list-container"
);
const pageDownButton = document.getElementById("prev-page");
const pageUpButton = document.getElementById("next-page");

function paginate(currentPage) {
  paginatedArray = [];
  for (let i = 0; i < getCachedArrayData().length; i++) {
    if (
      i >= (currentPage - 1) * itemsPerPage &&
      i < currentPage * itemsPerPage
    ) {
      paginatedArray.push(getCachedArrayData()[i]);
    }
  }
  savePaginatedArray();
}

function prevPage() {
  currentPage = getCurrentPage();
  if (currentPage === 1) {
    swal("This is already first page", {
      buttons: false,
      timer: 1500,
    });
    saveCurrentPage();
  } else {
    currentPage = currentPage - 1;
    weatherListDiv.innerHTML = "";
    paginate(currentPage);
    renderList();
    saveCurrentPage();
  }
  updateCurrentpageView();
}

function nextPage() {
  currentPage = getCurrentPage();
  if (getPaginatedArray().length === getCachedArrayData().length) {
    swal("This is already last page", {
      buttons: false,
      timer: 1500,
    });
    saveCurrentPage();
  } else {
    if (currentPage < getCachedArrayData().length / itemsPerPage) {
      currentPage = currentPage + 1;
      weatherListDiv.innerHTML = "";
      paginate(currentPage);
      renderList();
      saveCurrentPage();
    } else {
      swal("This is already last page", {
        buttons: false,
        timer: 1500,
      });
      saveCurrentPage();
    }
  }
  updateCurrentpageView();
}

function updateCurrentpageView() {
  currentPageContainer.innerHTML = "";
  currentPageContainer.innerHTML = String(getCurrentPage());
}

function updateRecordsCountView() {
  recordsCountContainer.innerHTML = "";
  recordsCountContainer.innerHTML = String(getCachedArrayData().length);
}

export {
  paginate,
  prevPage,
  nextPage,
  paginatedArray,
  itemsPerPage,
  currentPage,
  updateCurrentpageView,
  updateRecordsCountView,
  pageDownButton,
  pageUpButton,
};
