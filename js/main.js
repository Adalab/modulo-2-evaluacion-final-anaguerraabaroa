"use strict";

const inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");
const listContainerElement = document.querySelector(".js-list-container");

let shows = [];

function getData() {
  let inputValue = inputElement.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        shows.push(data[i].show);
      }
      paintData();
    });
}

function paintData() {
  let html = "";
  let defaultImage = "//via.placeholder.com/210x295/ffffff/666666/?text=TV";
  for (let i = 0; i < shows.length; i++) {
    html += `<li class="section__list--movie"></li>`;
    html += `<div class="movie__wrapper">`;
    if (shows[i].image === null) {
      html += `<img src="${defaultImage}" alt="Imagen de la serie ${shows[i].name}" class="movie__image js-image" />`;
    } else {
      html += `<img src="${shows[i].image.medium}" alt="Imagen de la serie ${shows[i].name}" class="movie__image js-image" />`;
    }
    html += `<h4 class="movie__title">${shows[i].name}</h4>`;
    html += "</div>";
    html += "</li>";
  }
  listContainerElement.innerHTML = html;
}

btnElement.addEventListener("click", getData);
getData();
