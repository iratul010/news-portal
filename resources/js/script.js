"use strict";
const modalBody = document.getElementById("modal-body");
let navLink = document.querySelector(".nav-link");
let noDataFound = document.querySelector(".no-data-found");
let fetchTwo, dataTwo;
const newsBlog = document.getElementById("news-blog");
const newsUl = document.getElementById("news-ul");
const countNewsBlog = document.getElementById("count-news-blog");
const toggleSpinner = (hasSpinner) => {
  let load = document.getElementById("loader");
  if (hasSpinner) {
    load.classList.remove("d-none");
  } else {
    load.classList.add("d-none");
  }
};
toggleSpinner(false);
const reporter = async function () {
  const categoryUrl = ` https://openapi.programming-hero.com/api/news/categories`;
  let res, data, dataOne;
  try {
    res = await fetch(categoryUrl);
    data = await res.json();
  } catch (error) {
    console.log(error);
  }
  dataOne = data.data.news_category;
  console.log(dataOne);
  fetchTwo = async function (id) {
    const newsUrl = `  https://openapi.programming-hero.com/api/news/category/${id}`;
    const newsRes = await fetch(newsUrl);
    const newsData = await newsRes.json();
    // console.log(newsData);
    dataTwo = newsData.data;

    ///news Blog child Element

    //end
    dataTwo = dataTwo.slice(0, 10);

    let length = dataTwo.length;
    countNewsBlog.innerHTML = `${length} items found for category Entertainment`;
    if (length === 0) {
      toggleSpinner(false);
      noDataFound.classList.remove("d-none");
      newsBlog.appendChild(noDataFound);
    } else {
      ////news-div

      noDataFound.classList.add("d-none");
      let id = 0;
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

        let authorName = el.author.name;
        let authorimg = el.author.img;
        let newsDetails = el.details.slice(0, 500);
        let img = el.image_url;
        let authorHeadLine = el.title;
        let ratingNumber = el.rating.number;
        let timeZone = el.author.published_date;
        let time = new Date(parseInt(timeZone) / (1000 * 60 * 60 * 24));
        let year = time.getFullYear();
        let days = time.getDay();
        // console.log(el);
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        let month = monthNames[time.getMonth()];

        newsChildDiv.innerHTML = `
        <div class="col-sm-4" style="width: 300px">
        <img src="${img}" class="rounded float-start" alt="..." style="height: 100%; width: 100%" />
      </div>
   
      <div class="col-sm-8">
        <div class="row flex-column">
          <div class="col mb-5">
            <h2 class="fs-1 p-3">${authorHeadLine}</h2>
            <p class="fs-3 p-3">
              ${newsDetails}...
            </p>
          </div>
          <div class="col details-logo">
            <div class="d-flex justify-content-between fs-2 flex-column flex-md-row align-items-center">
              <div class="item-1">
                <div class="author-details d-flex flex-row">
                  <div class="author img mx-3" style="width: 50px">
                    <img class="rounded-circle" src="${authorimg}" alt="" style="width: 100%" />
                  </div>
                  <div class="author">
                    <div class="authors-about">
                      <h4>${authorName}</h4>
                      <p class="fs-4">${month} ${days},${year}</p>
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
              <div class="item-4" id="${id}">
                <a class="btn fs-2 " type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <i class="fa-solid fa-arrow-right"> </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        `;
        id += 1;
        toggleSpinner(false);
        newsBlog.appendChild(newsChildDiv);
        // modal
        let reporterName, reporterImg, reporterDate, reporterTotalView, reporterRating, reporterBadge;
        [newsChildDiv].forEach((data) => {
          data.addEventListener("click", function (e) {
            e.preventDefault();
            const clicked = e.target.closest(".item-4");

            // Guard clause
            if (clicked) {
              if (!clicked) return;
              console.log(e.target);
              const item = e.target.closest(".item-4");
              let id = item.getAttribute("id");
              console.log(dataTwo[id]);
              reporterName = dataTwo[id].author.name;
              reporterImg = dataTwo[id].author.img;
              reporterDate = new Date(dataTwo[id].author.published_date);
              reporterRating = dataTwo[id].rating.number;
              reporterBadge = dataTwo[id].rating.badge;
              reporterTotalView = dataTwo[id].total_view;

              console.log(reporterDate.getMonth());

              const div = document.createElement("div");
              modalBody.innerHTML = "";
              div.innerHTML = `
              <div class="container-fluid">
              <div class="row">
                <div class="col-md-8 col-8" style="height: 200px; width: 220px">
                  <img style="width: 100%" src="${reporterImg}" alt="" />
                </div>
                <div class="col-md-4  ms-auto text-center  ">
                  <h3 class="heading-primary fs-2">${reporterName}</h3>
                  <p class="fs-4">${
                    monthNames[reporterDate.getMonth()]
                  } ${reporterDate.getDate()}, ${reporterDate.getFullYear()}</p>
                  <p class="fs-4">Rating: ${reporterRating}, <span class="fw-semibold">${reporterBadge}</span> </p>
                  <p class="fs-4">Total View: <span class="fw-semibold">${reporterTotalView}</span> </p>
                
                </div>
              </div>
            </div>`;

              modalBody.appendChild(div);
              // (reporterName = 0), (reporterImg = 0), (reporterDate = 0);
            }
          });
        });
      });
    }
  };

  dataOne.forEach((el) => {
    let newsLi = document.createElement("li");
    newsLi.classList.add("fw-semibold");
    newsLi.classList.add("nav-item");
    let id = el.category_id;

    newsLi.innerHTML = `
        
        <a class="nav-link" href="${id}"> ${el.category_name}</a>
        `;

    newsUl.appendChild(newsLi);
  });

  newsUl.addEventListener("click", function (e) {
    e.preventDefault();
    toggleSpinner(true);
    newsBlog.innerHTML = "";
    if (e.target.classList.contains("nav-link")) {
      const id = e.target.getAttribute("href");
      console.log(id);
      fetchTwo(id);
    }
  });
};
reporter(5);
// const btnNews = document.getElementById("news");
// const btnBlog = document.getElementById("blog");
// btnBlog.addEventListener("click", function () {
//  console.log(btnBlog);
// });
