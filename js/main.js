"use strict";

const inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");
const listContainer = document.querySelector(".js-list-container");

/* original array */
let shows = [];

/* favourite shows array */
let favShows = [];

/* function: server data request */
function getData() {
  let inputValue = inputElement.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      paintData();
      listenFavourites();
    });
}

/* function: paint search engine results and add class to favourite shows*/
function paintData() {
  let html = "";
  let defaultImage = "//via.placeholder.com/210x295/ffffff/666666/?text=TV";
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
      html += `<img src="${defaultImage}" alt="Imagen de la serie ${shows[i].show.name}" class="show__image js-image" />`;
    } else {
      html += `<img src="${shows[i].show.image.medium}" alt="Imagen de la serie ${shows[i].show.name}" class="show__image js-image" />`;
    }
    html += `<h4 class="show__title ${classFav2}">${shows[i].show.name}</h4>`;
    html += `</div>`;
    html += `</li>`;
  }
  listContainer.innerHTML = html;
}

/* function: listen event (form button) */
btnElement.addEventListener("click", getData);

/* function: select favourite shows */
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
}

/* function: listen event (select favourite shows) */
function listenFavourites() {
  const showsItem = document.querySelectorAll(".js-favourites");
  for (const show of showsItem) {
    show.addEventListener("click", favouriteShows);
  }
}

/* start web */
getData();
