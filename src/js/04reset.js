"use strict";

// Elements
const resetBtn = document.querySelector(".js-btn-reset"); // Reset button

// Reset favourite shows list
function handleReset() {
  favShows = [];
  inputElement.value = "";
  localStorage.removeItem("favShows");
  renderFavShows();
  listenRemoveBtn();
  renderData();
  listenFavourites();
}

// Reset button listener
resetBtn.addEventListener("click", handleReset);
