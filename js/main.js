"use strict";

const inputElement = document.querySelector(".js-input"); // text input element
const btnElement = document.querySelector(".js-btn"); // search button element
const listContainer = document.querySelector(".js-list-container"); // search results list element
const favouriteList = document.querySelector(".js-favourites-list"); // favourite shows list element

/* original array */
let shows = [];

/* favourite shows array */
let favShows = [];

/* function: API data request */
function getData() {
  let inputValue = inputElement.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      paintData();
      listenSearchbtn();
      listenFavourites();
    });
}

/* function: paint search results and add classes to favourite shows*/
function paintData() {
  let html = "";
  let defaultImage = "./images/default_image.jpg";
  for (let i = 0; i < shows.length; i++) {
    let classFav1;
    let classFav2;
    const favIndex = favShows.indexOf(i);
    const fav = favIndex !== -1;
    if (fav === true) {
      classFav1 = "show__wrapper--fav";
      classFav2 = "show__title--fav";
    } else {
      classFav1 = "";
      classFav2 = "";
    }
    html += `<li class="section__list--show"></li>`;
    html += `<div class="show__wrapper js-favourites ${classFav1}" id="${i}">`;
    if (shows[i].show.image === null) {
      html += `<img src="${defaultImage}" alt="Imagen de la serie ${shows[i].show.name}" class="show__image"/>`;
    } else {
      html += `<img src="${shows[i].show.image.medium}" alt="Imagen de la serie ${shows[i].show.name}" class="show__image" />`;
    }
    html += `<h4 class="show__title ${classFav2}">${shows[i].show.name}</h4>`;
    html += `</div>`;
    html += `</li>`;
  }
  listContainer.innerHTML = html;
}

/* function: select favourite shows and add/remove elements to/from favourite shows array */
function favouriteShows(event) {
  const selectedItem = parseInt(event.currentTarget.id);
  const indexFav = favShows.indexOf(selectedItem);
  const isFav = indexFav !== -1;

  if (isFav === false) {
    favShows.push(selectedItem);
  } else {
    favShows.splice(indexFav, 1);
  }
  paintData();
  listenFavourites();
  paintFavShows();
  setLocalStorage();
}

/* function: paint favourite shows */
function paintFavShows() {
  let htmlFav = "";
  let defaultImage = "./images/default_image.jpg";
  for (let i = 0; i < favShows.length; i++) {
    htmlFav += `<li class="section__list--favshow">`;
    htmlFav += `<div class="favshow__wrapper" js-favourites id="${i}"></div>`;
    if (favShows[i].show.image === null) {
      htmlFav += `<img src="${defaultImage}" alt="Imagen de la serie ${favShows[i].show.name}" class="favshow__image"/>`;
    } else {
      htmlFav += `<img src="${favShows[i].show.image.medium}" alt="Imagen de la serie ${favShows[i].show.name}" class="favshow__image" />`;
    }
    htmlFav += ` <h4 class="favshow__title">${favShows[i].show.name}</h4>`;
    htmlFav += `<button class="favshow__button"><i class="fas fa-times-circle"></i></button>`;
    htmlFav += `</div>`;
    htmlFav += `</li>`;
  }
  favouriteList.innerHTML = htmlFav;
}

/* function: listen event (click favourite shows) */
function listenFavourites() {
  const showsItem = document.querySelectorAll(".js-favourites");
  for (const show of showsItem) {
    show.addEventListener("click", favouriteShows);
  }
}

/* function: save data in LocalStorage */
function setLocalStorage() {
  localStorage.setItem("favShows", JSON.stringify(favShows));
}

/* function: get data from LocalStorage */
function getLocalStorage() {
  const localFavShows = localStorage.getItem("favShows");
  const localFavShowsJS = JSON.parse(localFavShows);
  if (localFavShows !== null) {
    favShows = localFavShowsJS;
  }
}

/* function: listen event (click search button) */
function listenSearchbtn() {
  btnElement.addEventListener("click", getData);
}

/* start web */
getData();
