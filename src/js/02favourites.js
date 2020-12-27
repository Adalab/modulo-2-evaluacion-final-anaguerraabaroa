"use strict";

// Elements
const favouriteList = document.querySelector(".js-favourites-list"); // Favourite shows list

// Arrays
let favShows = []; // Favourite shows array
let favShowsId = []; // Favourite shows index array (to add favourite shows into favShows array with indexOf method)

// Select favourite shows and add them into FavShows array
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
  renderFavShows();
  listenRemoveBtn();
  renderData();
  listenFavourites();
  setLocalStorage();
}

// Render favourite shows
function renderFavShows() {
  let htmlFav = "";
  for (let i = 0; i < favShows.length; i++) {
    htmlFav += `<li class="favourites__list--favshow js-fav-show">`;
    htmlFav += `<div class="favourites__list--wrapper">`;
    if (favShows[i].image === null) {
      let defaultImg = "./assets/images/default_image.jpg";
      htmlFav += `<img src="${defaultImg}" alt="Imagen de la serie ${favShows[i].name}" class="favourites__list--image"/>`;
    } else {
      htmlFav += `<img src="${favShows[i].image}" alt="Imagen de la serie ${favShows[i].name}" class="favourites__list--image" />`;
    }
    htmlFav += `<h4 class="favourites__list--title">${favShows[i].name}</h4>`;
    htmlFav += `<button class="favourites__list--button js-fav-btn"><i class="fas fa-times" id="${favShows[i].id}"></i></button>`;
    htmlFav += `</div>`;
    htmlFav += `</li>`;
  }
  favouriteList.innerHTML = htmlFav;
}

// Search results list listener
function listenFavourites() {
  const showsItem = document.querySelectorAll(".js-favourites");
  for (const show of showsItem) {
    show.addEventListener("click", favouriteShows);
  }
}
