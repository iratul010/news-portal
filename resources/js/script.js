let navLink = document.querySelector(".nav-link");
("use strict");
let fetchTwo, dataTwo;
const newsUl = document.getElementById("news-ul");
const reporter = async function (id) {
  const categoryUrl = ` https://openapi.programming-hero.com/api/news/categories`;

  const res = await fetch(categoryUrl);
  const data = await res.json();
  const dataOne = data.data.news_category;
  console.log(dataOne);
  fetchTwo = async function (id) {
    const newsUrl = `  https://openapi.programming-hero.com/api/news/category/${id}`;
    const newsRes = await fetch(newsUrl);
    const newsData = await newsRes.json();
    console.log(newsData);
    dataTwo = newsData.data;
    console.log(dataTwo);
  };

  dataOne.forEach((el) => {
    let newsLi = document.createElement("li");
    newsLi.classList.add("fw-semibold");
    newsLi.classList.add("nav-item");
    let id = el.category_id;

    // newsLi.setAttribute("id", `${id}`);
    // navLink.setAttribute("id", `${id}`);
    newsLi.innerHTML = `
        
        <a class="nav-link" href="${id}"> ${el.category_name}</a>
        `;

    newsUl.appendChild(newsLi);
  });
  newsUl.addEventListener("click", function (e) {
    e.preventDefault();
    // console.log(e.target);
    if (e.target.classList.contains("nav-link")) {
      const id = e.target.getAttribute("href");
      console.log(id);
      fetchTwo(id);
    }
  });
};
reporter(5);
