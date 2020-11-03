"use strict";

// Elements

const inputElement = document.querySelector(".js-input"); // Text input
const btnElement = document.querySelector(".js-btn"); // Search button
const listContainer = document.querySelector(".js-list-container"); // Search results list
const favouriteList = document.querySelector(".js-favourites-list"); // Favourite shows list
const resetBtn = document.querySelector(".js-btn-reset"); // Reset button

// Arrays

let shows = []; // Original shows array
let favShows = []; // Favourite shows array
let favShowsId = []; // Favourite shows index array (to add favourite shows into favShows array with indexOf method)

/*** 1. SEARCH ***/

// Function API data request

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

// Function paint search results (initial for [i]) and add class to favourite shows once they have been selected (secondary for [j])

function paintData() {
  let html = "";
  for (let i = 0; i < shows.length; i++) {
    let classFav;
    html += `<li class="section__list--show"></li>`;
    for (let j = 0; j < favShows.length; j++) {
      if (parseInt(favShows[j].id) === shows[i].show.id) {
        classFav = "show__wrapper--fav show__title--fav";
      }
    }
    html += `<div class="show__wrapper js-favourites ${classFav}" id="${shows[i].show.id}">`;
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

// Search button listener

btnElement.addEventListener("click", getData);

/*** 2. FAVOURITES ***/

// Function select favourite shows and add them into FavShows array

function favouriteShows(event) {
  const currentShow = event.currentTarget;
  const currentShowName = currentShow.querySelector(".js-show-title");
  const currentShowImage = currentShow.querySelector(".js-show-image");

  const objFavShow = {
    name: currentShowName.innerHTML,
    image: currentShowImage.src,
    id: currentShow.id,
  };

  const clickedShow = parseInt(currentShow.id);
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
  listenRemoveBtn();
  paintData();
  listenFavourites();
  setLocalStorage();
}

// Function paint favourite shows

function paintFavShows() {
  let htmlFav = "";
  for (let i = 0; i < favShows.length; i++) {
    htmlFav += `<li class="section__list--favshow js-fav-show">`;
    htmlFav += `<div class="favshow__wrapper">`;
    if (favShows[i].image === null) {
      let defaultImg = "./images/default_image.jpg";
      htmlFav += `<img src="${defaultImg}" alt="Imagen de la serie ${favShows[i].name}" class="favshow__image"/>`;
    } else {
      htmlFav += `<img src="${favShows[i].image}" alt="Imagen de la serie ${favShows[i].name}" class="favshow__image" />`;
    }
    htmlFav += `<h4 class="favshow__title">${favShows[i].name}</h4>`;
    htmlFav += `<button class="favshow__button js-fav-btn"><i class="fas fa-times" id="${favShows[i].id}"></i></button>`;
    htmlFav += `</div>`;
    htmlFav += `</li>`;
  }
  favouriteList.innerHTML = htmlFav;
}

// Listener search results list

function listenFavourites() {
  const showsItem = document.querySelectorAll(".js-favourites");
  for (const show of showsItem) {
    show.addEventListener("click", favouriteShows);
  }
}

/*** 3. LOCAL STORAGE ***/

// Function save data in LocalStorage

function setLocalStorage() {
  localStorage.setItem("favShows", JSON.stringify(favShows));
}

// Function get data from LocalStorage
function getLocalStorage() {
  const localFavShows = JSON.parse(localStorage.getItem("favShows"));
  if (localFavShows !== null) {
    favShows = localFavShows;
    paintFavShows();
    listenRemoveBtn();
    listenFavourites();
  }
}

/*** 4. BONUS ***/

// Function reset favourite shows list

function handleReset() {
  favShows = [];
  inputElement.value = "";
  localStorage.removeItem("favShows");
  paintFavShows();
  listenRemoveBtn();
  paintData();
  listenFavourites();
}

// Listener reset button

resetBtn.addEventListener("click", handleReset);

// Function to remove favourites from favourite shows list

function removeFavShow(event) {
  for (let i = 0; i < favShows.length; i++) {
    const removeBtnid = parseInt(event.target.id);
    const idFavShow = parseInt(favShows[i].id);
    if (removeBtnid === idFavShow) {
      favShows.splice([i], 1);
    }
  }
  paintFavShows();
  listenRemoveBtn();
  paintData();
  listenFavourites();
  setLocalStorage();
}

// Listener remove shows from favourite list

function listenRemoveBtn() {
  const removeBtns = document.querySelectorAll(".js-fav-btn");
  for (const removeBtn of removeBtns) {
    removeBtn.addEventListener("click", removeFavShow);
  }
}

/*** 5. DEFAULT ***/

// Function default calls start app
getLocalStorage();
getData();
