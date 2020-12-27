"use strict";

// Elements
const inputElement = document.querySelector(".js-input"); // Text input
const btnElement = document.querySelector(".js-btn"); // Search button
const listContainer = document.querySelector(".js-list-container"); // Search results list

// Arrays
let shows = []; // Original shows array

// API data request
function getData() {
  let inputValue = inputElement.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      renderData();
      listenFavourites();
    });
}

// Render search results and add class to favourite shows once they have been selected
function renderData() {
  let html = "";
  for (let i = 0; i < shows.length; i++) {
    let classFav;
    html += `<li class="results__list--show"></li>`;
    for (let j = 0; j < favShows.length; j++) {
      if (parseInt(favShows[j].id) === shows[i].show.id) {
        classFav = "results__list--favWrapper results__list--favBorder";
      }
    }
    html += `<div class="results__list--wrapper js-favourites ${classFav}" id="${shows[i].show.id}">`;
    if (shows[i].show.image === null) {
      html += `<img src="../assets/images/default_image.jpg"; alt="Imagen de la serie ${shows[i].show.name}" class="results__list--image js-show-image"/>`;
    } else {
      html += `<img src="${shows[i].show.image.medium}" alt="Imagen de la serie ${shows[i].show.name}" class="results__list--image js-show-image" />`;
    }
    html += `<h4 class="results__list--title js-show-title">${shows[i].show.name}</h4>`;
    html += `</div>`;
    html += `</li>`;
  }
  listContainer.innerHTML = html;
}

// Search button listener
btnElement.addEventListener("click", getData);
