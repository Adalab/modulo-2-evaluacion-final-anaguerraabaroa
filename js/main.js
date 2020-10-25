"use strict";

const inputElement = document.querySelector(".js-input"); // text input element
const btnElement = document.querySelector(".js-btn"); // search button element
const listContainer = document.querySelector(".js-list-container"); // search results list element
const favouriteList = document.querySelector(".js-favourites-list"); // favourite shows list element

/* original array */
let shows = [];

/* favourite shows array */
let favShows = [];

/* favourite shows index array */
let favShowsId = [];

/* function: API data request */
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

/* function: paint search results*/
function paintData() {
  let html = "";
  for (let i = 0; i < shows.length; i++) {
    let classFav = "";
    html += `<li class="section__list--show"></li>`;
    for (let j = 0; j < favShows.length; j++) {
      if (parseInt(favShows[j].id) === shows[i].show.id) {
        classFav = "show__wrapper--fav show__title--fav";
      }
    }
    html += `<div class="show__wrapper js-favourites ${classFav}" data-id="${shows[i].show.id}">`;
    if (shows[i].show.image === null) {
      html += `<img src="./images/default_image.jpg"; alt="Imagen de la serie ${shows[i].show.name}" class="show__image js-show-image"/>`;
    } else {
      html += `<img src="${shows[i].show.image.medium}" alt="Imagen de la serie ${shows[i].show.name}" class="show__image js-show-image" />`;
    }
    html += `<h4 class="show__title js-show-title">${shows[i].show.name}</h4>`;
    html += `</div>`;
    html += `</li>`;
  }
  listContainer.innerHTML = html;
}

/* function: select favourite shows and add/remove elements to/from favourite shows array */
function favouriteShows(event) {
  const currentShow = event.currentTarget;
  const currentShowName = currentShow.querySelector(".js-show-title");
  const currentShowImage = currentShow.querySelector(".js-show-image");

  const objFavShow = {
    name: currentShowName.innerHTML,
    image: currentShowImage.src,
    id: event.currentTarget.dataset.id,
  };

  const clickedShow = parseInt(currentShow.dataset.id);
  favShowsId = favShows.map(function (element) {
    return parseInt(element.id);
  });

  const indexFav = favShowsId.indexOf(clickedShow);
  if (indexFav === -1) {
    favShows.push(objFavShow);
  } else {
    favShows.splice(indexFav, 1);
  }
  paintFavShows();
  paintData();
  listenFavourites();
  setLocalStorage();
}

/* function: paint favourite shows */
function paintFavShows() {
  let htmlFav = "";
  for (let i = 0; i < favShows.length; i++) {
    htmlFav += `<li class="section__list--favshow">`;
    htmlFav += `<div class="favshow__wrapper" data-id="${favShows[i].id}">`;
    if (favShows[i].image === null) {
      let defaultImg = "./images/default_image.jpg";
      htmlFav += `<img src="${defaultImg}" alt="Imagen de la serie ${favShows[i].name}" class="favshow__image"/>`;
    } else {
      htmlFav += `<img src="${favShows[i].image}" alt="Imagen de la serie ${favShows[i].name}" class="favshow__image" />`;
    }
    htmlFav += `<h4 class="favshow__title">${favShows[i].name}</h4>`;
    htmlFav += `<button class="favshow__button js-fav-btn"><i class="fas fa-times-circle"></i></button>`;
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
  const localFavShows = JSON.parse(localStorage.getItem("favShows"));
  if (localFavShows !== null) {
    favShows = localFavShows;
    paintFavShows();
    listenFavourites();
  }
}

/* function: listen event (click search button) */
btnElement.addEventListener("click", getData);

/* start web */
getLocalStorage();
getData();
