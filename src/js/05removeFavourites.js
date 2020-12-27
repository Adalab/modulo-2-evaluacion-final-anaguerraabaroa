"use strict";

// Remove favourite shows from favourite shows list
function removeFavShow(event) {
  for (let i = 0; i < favShows.length; i++) {
    const removeBtnid = parseInt(event.target.id);
    const idFavShow = parseInt(favShows[i].id);
    if (removeBtnid === idFavShow) {
      favShows.splice([i], 1);
    }
  }
  renderFavShows();
  listenRemoveBtn();
  renderData();
  listenFavourites();
  setLocalStorage();
}

// Favourite shows button listener
function listenRemoveBtn() {
  const removeBtns = document.querySelectorAll(".js-fav-btn");
  for (const removeBtn of removeBtns) {
    removeBtn.addEventListener("click", removeFavShow);
  }
}
