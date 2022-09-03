"use strict";

let navLink = document.querySelector(".nav-link");

let fetchTwo, dataTwo;
const newsBlog = document.getElementById("news-blog");
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
    ///news Blog child Element

    //end
    dataTwo = dataTwo.slice(0, 10);
    let length = dataTwo.length;
    if (length === 0) {
      console.log("dataTwo length =0");
    } else {
      ////news-div
      dataTwo.forEach((el) => {
        let classAdd = function (className) {
          newsChildDiv.classList.add(`${className}`);
        };
        let newsChildDiv = document.createElement("div");
        classAdd("row");
        classAdd("m-3");
        classAdd("bg-white");
        classAdd("p-4");
        classAdd("rounded");
        classAdd("item");
        //all data ---create
        console.log(el);
        // console.log(el.thumbnail_url);
        let authorName = el.author.name;
        let authorImg = el.image_url;
        let authorHeadLine = el.title;
        let ratingNumber = el.rating.number;
        let authorThumbnail = el.thumbnail_url;
        console.log(ratingNumber);
        newsChildDiv.innerHTML = `
        <div class="col-sm-4" style="width: 300px">
        <img src="${authorImg}" class="rounded float-start" alt="..." style="height: 100%; width: 100%" />
      </div>
   
      <div class="col-sm-8">
        <div class="row flex-column">
          <div class="col mb-5">
            <h2 class="fs-1 p-3">${authorHeadLine}</h2>
            <p class="fs-3 p-3">
              From our favourite UK influencers to the best missives from Milan and the coolest New Yorkers, read on some
              of the best fashion blogs out there, and for even more inspiration, do head to our separate black fashion
              influencer . Fancy some shopping deals? Check out these amazing sales: Zara Black Friday, ASOS Black Friday,
              Missoma Black Friday and Gucci Black Friday.
            </p>
          </div>
          <div class="col details-logo">
            <div class="d-flex justify-content-between fs-2 flex-column flex-md-row align-items-center">
              <div class="item-1">
                <div class="author-details d-flex flex-row">
                  <div class="author img mx-3" style="width: 50px">
                    <img class="rounded-circle" src="${authorThumbnail}" alt="" style="width: 100%" />
                  </div>
                  <div class="author">
                    <div class="authors-about">
                      <h4>${authorName}</h4>
                      <p class="fs-4">Jan 10, 2022</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item-2">
                <div class="author-view">
                  <span><i class="fa-regular fa-eye"></i> </span><span>${ratingNumber} M</span>
                </div>
              </div>
              <div class="item-3">
                <div class="ratings">
                  <span class="rating-logo">
                    <i class="fa-solid fa-star-half-stroke"></i>
                  </span>
                  <span class="rating-logo">
                    <i class="fa-regular fa-star"></i>
                  </span>
                  <span class="rating-logo">
                    <i class="fa-regular fa-star"></i>
                  </span>
                  <span class="rating-logo">
                    <i class="fa-regular fa-star"></i>
                  </span>
                  <span class="rating-logo">
                    <i class="fa-regular fa-star"></i>
                  </span>
                </div>
              </div>
              <div class="item-4">
                <a class="btn fs-2">
                  <i class="fa-solid fa-arrow-right"> </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        `;

        newsBlog.appendChild(newsChildDiv);
      });
    }
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
    newsBlog.innerHTML = "";
    if (e.target.classList.contains("nav-link")) {
      const id = e.target.getAttribute("href");
      fetchTwo(id);
    }
  });
};
reporter(5);
