"use strict";

const newsContainer = document.querySelector(".container");
const categories = document.querySelector(".categories-btns");

let apiKey = "0492074410434e47a900c830befd0f73";

const country = "US";

let categoryOptions = [
  "General",
  "Entertainment",
  "Health",
  "Science",
  "Technology",
];

let url;

const generateMarkup = function (articles) {
  for (let element of articles) {
    let newsCard = document.createElement("div");
    newsCard.classList.add("news-card");
    newsCard.innerHTML = `<div class="news-image-container">
    <img src="${element.urlToImage ?? "./Newspaper.png"}" alt"" />
    </div>
 <div class="news-content">
 <div class="news-title">
 ${element.title}
 </div>
 <div class="news-description">
 ${element.description ?? element.content ?? ""}
 </div>
 <a href="${element.url}" target="_blank" class="btn-view">Read More</a>
 </div>`;
    newsContainer.appendChild(newsCard);
  }
};

const categorySelect = function (e, category) {
  let options = document.querySelectorAll(".categories");
  options.forEach((option) => {
    option.classList.remove("active");
  });
  url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getData();
};

const createCategories = function () {
  for (let i of categoryOptions) {
    const btnMarkup = `<button class="categories ${
      i == "General" ? "active" : ""
    }"onclick="categorySelect(event, '${i}')">${i}</button>`;
    categories.insertAdjacentHTML("beforeend", btnMarkup);
  }
};

const init = function () {
  categoryOptions.innerHTML = "";
  getData();
  createCategories();
};

const getData = async function () {
  newsContainer.innerHTML = "";
  const res = await fetch(url);

  if (!res.ok) {
    alert("Data Not Availble at This moment");
    return;
  }
  const data = await res.json();
  generateMarkup(data.articles);
};

window.onload = () => {
  url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
  init();
};
