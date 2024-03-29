$(document).ready(function() {
  function showLoader() {
    $(".loader").show();
  }

  function hideLoader() {
    $(".loader").hide();
  }

  function fetchCarouselData() {
    $.ajax({
      url:  "https://smileschool-api.hbtn.info/quotes",
      method: "GET",
      beforeSend: function() {
        showLoader();
      },
      success: function(response) {
        hideLoader();

        var carouselHtml = "";
        // populate html with data from api
        $.each(response, function(index, item) {
          console.log(item);
          carouselHtml += `
            <div class="carousel-item">
              <div class="row mx-auto align-items-center">
                <div class="">
                  <img src="${item.pic_url}" class="d-block align-self-center" alt="Carousel Pic ${index + 1}" />
                </div>
                <div class="">
                  <div class="quote-text">
                    <p class="text-white text-wrap">${item.text}</p>
                    <h4 class="text-white font-weight-bold">${item.name}</h4>
                    <span class="text-white">${item.title}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        });

        $(".carousel").html(carouselHtml);

        $(".carousel").slick({
          arrows: false
        });

        // prevent default behavior for anchor tag arrows
        $(".carousel-control-prev, .carousel-control-next").click(function(e) {
          e.preventDefault();
        });

        $(".arrow-left").click(function() {
          $(".carousel").slick("slickPrev");
        });

        $(".arrow-right").click(function() {
          $(".carousel").slick("slickNext");
        });

        $(".carousel").show();
      },
      error: function() {
        hideLoader();
        console.log("error getting api");
      }
    });
  }
  fetchCarouselData();

  function fetchTutorialsData() {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      method: "GET",
      beforeSend: function() {
        showLoader();
      },
      success: function(response) {
        hideLoader();

        var tutorialsHtml = "";
        $.each(response, function(index, item) {
          console.log(item);
          tutorialsHtml += `
            <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center zindex-1">
              <div class="card">
                <img src="${item.thumb_url}" class="card-img-top" alt="Video thumbnail" />
                <div class="card-img-overlay text-center">
                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${item.title}</h5>
                  <p class="card-text text-muted">${item["sub-title"]}</p>
                  <div class="creator d-flex align-items-center">
                    <img src="${item.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                    <h6 class="pl-3 m-0 main-color">${item.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">`;

          for (let i = 1; i <= 5; i++) {
            if (i <= item.star) {
              tutorialsHtml += `<img src="images/star_on.png" alt="star on" width="15px" />`;
            } else {
              tutorialsHtml += `<img src="images/star_off.png" alt="star off" width="15px" />`;
            }
          }

          tutorialsHtml += `
                    </div>
                    <span class="main-color">${item.duration}</span>
                  </div>
                </div>
              </div>
            </div>`;
        });

        tutorialsHtml += `
            </div>
          </div>`;

        $(".carousel-tutorials").html(tutorialsHtml);

        $(".carousel-tutorials").slick({
          arrows: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });

        $(".arrow-left-tutorials, .arrow-right-tutorials").click(function(e) {
          e.preventDefault();
        });

        $(".arrow-left-tutorials").click(function() {
          $(".carousel-tutorials").slick("slickPrev");
        });

        $(".arrow-right-tutorials").click(function() {
          $(".carousel-tutorials").slick("slickNext");
        });

        $(".carousel-tutorials").show();
      },
      error: function() {
        hideLoader();
        console.log("error getting tutorials api")
      }
    });
  }
  fetchTutorialsData();

//......... latest videos carousel.............................

  function fetchLatestVideosData() {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/latest-videos",
      method: "GET",
      beforeSend: function() {
        showLoader();
      },
      success: function(response) {
        hideLoader();

        var latestVideosHtml = "";
        $.each(response, function(index, item) {
          console.log(item);
          latestVideosHtml += `
            <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center zindex-1">
              <div class="card">
                <img src="${item.thumb_url}" class="card-img-top" alt="Video thumbnail" />
                <div class="card-img-overlay text-center">
                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${item.title}</h5>
                  <p class="card-text text-muted">${item["sub-title"]}</p>
                  <div class="creator d-flex align-items-center">
                    <img src="${item.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                    <h6 class="pl-3 m-0 main-color">${item.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">`;

          for (let i = 1; i <= 5; i++) {
            if (i <= item.star) {
              latestVideosHtml += `<img src="images/star_on.png" alt="star on" width="15px" />`;
            } else {
              latestVideosHtml += `<img src="images/star_off.png" alt="star off" width="15px" />`;
            }
          }

          latestVideosHtml += `
                    </div>
                    <span class="main-color">${item.duration}</span>
                  </div>
                </div>
              </div>
            </div>`;
        });

        latestVideosHtml += `
            </div>
          </div>`;

        $(".carousel-latest").html(latestVideosHtml);

        $(".carousel-latest").slick({
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });

        $(".arrow-left-latest, .arrow-right-latest").click(function(e) {
          e.preventDefault();
        });

        $(".arrow-left-latest").click(function() {
          $(".carousel-latest").slick("slickPrev");
        });

        $(".arrow-right-latest").click(function() {
          $(".carousel-latest").slick("slickNext");
        });

        $(".carousel-latest").show();
      },
      error: function() {
        hideLoader();
        console.log("error getting latest videos api")
      }
    });
  }
  fetchLatestVideosData();

// ......................video search script>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  function fetchVideoData(keyword = '', topic = 'all', sort = 'most_popular') {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      method: "GET",
      data: { q: keyword},
      success: function(response) {
        displayVideos(response.courses);
      },
      error: function() {
        console.log("Error fetching video courses data");
      }
    });
  }

  function createVideoCard(video) {
    return `
          <div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
            <div class="card">
              <img src="${video.thumb_url}" class="card-img-top" alt="Video thumbnail">
              <div class="card-img-overlay text-center">
                <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay">
              </div>
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${video.title}</h5>
                <p class="card-text text-muted">${video['sub-title']}</p>
                <div class="creator d-flex align-items-center">
                  <img src="${video.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle">
                  <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating">
                    ${'<img src="images/star_on.png" alt="star on" width="15px">'.repeat(video.star)}
                    ${'<img src="images/star_off.png" alt="star off" width="15px">'.repeat(5 - video.star)}
                  </div>
                  <span class="main-color">${video.duration}</span>
                </div>
              </div>
            </div>
          </div>
    `;
  }
  function displayVideos(data) {
    const videoCardsRow = $("#videoCardsRow");
    let videoCardsHtml = '';
    data.forEach(video => {
      videoCardsHtml += createVideoCard(video);
    });
    videoCardsRow.html(videoCardsHtml);

    $(".video-count").text(data.length + " videos");
  }

  // $(".search-text-area").on("input", function() {
  //   console.log("i am being clicked!!!!");
  //   const keyword = $(this).val().trim();
  //   fetchVideoData(keyword);
  // });

  $(".holberton_school-icon-search_1").on("click", function() {
    const keyword = $(this).val().trim();
    fetchVideoData(keyword);
  });

  fetchVideoData();
});
