"use strict";

import { WeatherArray } from "./listFunctions.js";
import { currentPage, paginatedArray } from "./pagination.js";

function saveArrayToStorage() {
  localStorage.setItem("weather array", JSON.stringify(WeatherArray));
}

function saveCurrentPage() {
  localStorage.setItem("current page", String(currentPage));
}

function savePaginatedArray() {
  localStorage.setItem("paginated array", JSON.stringify(paginatedArray));
}

function getCurrentPage() {
  return Number(localStorage.getItem("current page") || 1);
}

function getPaginatedArray() {
  return JSON.parse(localStorage.getItem("paginated array") || "[]");
}

function getCachedArrayData() {
  return JSON.parse(localStorage.getItem("weather array") || "[]");
}

export {
  saveArrayToStorage,
  saveCurrentPage,
  getCurrentPage,
  savePaginatedArray,
  getPaginatedArray,
  getCachedArrayData,
};
