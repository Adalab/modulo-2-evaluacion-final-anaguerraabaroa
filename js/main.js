"use strict";

const inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");

let shows = [];
let finalShows = [];

function getData() {
  let inputValue = inputElement.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      let showName = "";
      let showImage = "";
      for (let i = 0; i < data.length; i++) {
        finalShows = data[i].show;
        showName = data[i].show.name;
        showImage = data[i].show.image.medium;
      }
    });
}

btnElement.addEventListener("click", getData);
