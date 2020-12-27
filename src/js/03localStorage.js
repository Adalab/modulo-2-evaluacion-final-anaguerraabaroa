"use strict";

// Save data in LocalStorage
function setLocalStorage() {
  localStorage.setItem("favShows", JSON.stringify(favShows));
}

// Get data from LocalStorage
function getLocalStorage() {
  const localFavShows = JSON.parse(localStorage.getItem("favShows"));
  if (localFavShows !== null) {
    favShows = localFavShows;
    renderFavShows();
    listenRemoveBtn();
    listenFavourites();
  }
}
