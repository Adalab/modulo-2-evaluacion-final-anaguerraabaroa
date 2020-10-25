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
      listenFavourites();
    });
}

/* function: paint search results*/
function paintData() {
  let html = "";
  let defaultImage = "./images/default_image.jpg";
  for (let i = 0; i < shows.length; i++) {
    html += `<li class="section__list--show"></li>`;
    html += `<div class="show__wrapper js-favourites" data-id="${shows[i].show.id}">`;
    if (shows[i].show.image === null) {
      html += `<img src="${defaultImage}"; alt="Imagen de la serie ${shows[i].show.name}" class="show__image js-show-image"/>`;
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
  const clickedShow = event.currentTarget;
  const clickedShowId = parseInt(clickedShow.dataset.id);
  const clickedShowName = clickedShow.querySelector(".js-show-title").innerHTML;
  const clickedShowImage = clickedShow.querySelector(".js-show-image").src;

  let favShowItem = {
    id: clickedShowId,
    name: clickedShowName,
    image: clickedShowImage,
  };

  const indexFav = favShows.indexOf(favShowItem);
  if (
    clickedShow.classList.contains("show__wrapper--fav", "show__title--fav")
  ) {
    clickedShow.classList.remove("show__wrapper--fav", "show__title--fav");
    favShows.splice(indexFav, 1);
    paintFavShows();
  } else {
    clickedShow.classList.add("show__wrapper--fav", "show__title--fav");
    favShows.push(favShowItem);
    paintFavShows();
  }
  setLocalStorage();
}

/* function: paint favourite shows */
function paintFavShows() {
  let htmlFav = "";
  for (let i = 0; i < favShows.length; i++) {
    htmlFav += `<li class="section__list--favshow">`;
    htmlFav += `<div class="favshow__wrapper" data-id="${favShows[i].id}">`;
    if (favShows[i].image === null) {
      console.log("dentro if");
      let defaultImg = "./images/default_image.jpg";
      htmlFav += `<img src="${defaultImg}" alt="Imagen de la serie ${favShows[i].name}" class="favshow__image"/>`;
    } else {
      console.log("dentro else");
      htmlFav += `<img src="${favShows[i].image}" alt="Imagen de la serie ${favShows[i].name}" class="favshow__image" />`;
    }
    htmlFav += `<h4 class="favshow__title">${favShows[i].name}</h4>`;
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
  const localFavShows = JSON.parse(localStorage.getItem("favShows"));
  if (localFavShows === null) {
    getData();
  } else {
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
