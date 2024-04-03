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
            <div class="slick-slide">
              <div class="row mx-auto align-items-center">
                <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                  <img src="${item.pic_url}" class="d-block align-self-center" alt="Carousel Pic ${index + 1}" />
                </div>
                <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
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

        $(".slick-carousel").html(carouselHtml);

        $(".slick-carousel").slick({
          arrows: false
        });

        // prevent default behavior for anchor tag arrows
        $(".carousel-control-prev, .carousel-control-next").click(function(e) {
          e.preventDefault();
        });

        $(".arrow-left").click(function() {
          $(".slick-carousel").slick("slickPrev");
        });

        $(".arrow-right").click(function() {
          $(".slick-carousel").slick("slickNext");
        });

        $(".slick-carousel").show();
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

        const moreData = response.concat(response);
        var latestVideosHtml = "";
        $.each(moreData, function(index, item) {
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

  let currentKeyword = '';
  let currentTopic = 'all';
  let currentSort = 'most_popular';

  $(".holberton_school-icon-search_1").on("click", function() {
    // console.log("i am being clicked!!!!");
    const keyword = $(".search-text-area").val().trim();
    currentKeyword = keyword;
    fetchVideoData(currentKeyword, currentTopic, currentSort);
  });

  $(".search-text-area").keypress(function(event) {
    if (event.keyCode === 13) {
      const keyword = $(this).val().trim();
      currentKeyword = keyword;
      fetchVideoData(currentKeyword, currentTopic, currentSort);
    }
  });


  function fetchVideoData(keyword, topic = 'all', sort = 'most_popular') {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      method: "GET",
      data: { q: keyword, topic: topic, sort: sort},
      success: function(response) {
        console.log(`${keyword}, ${topic}, ${sort}`);
        displayVideos(response.courses, currentSort);
        populateTopicDropdown(response.topics);
        populateSortDropdown(response.sorts, response.sort);
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

  function populateTopicDropdown(topics) {
    const topicDropdown = $("#topicDropdown");
    let topicItemsHtml = "";
    topics.forEach(topic => {
      const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
      topicItemsHtml += `<a class="dropdown-item" id="topicDropdownItem" data-topic="${topic}" href="#">${capitalizedTopic}</a>`;
    });
    topicDropdown.html(topicItemsHtml);

    topicDropdown.find('.dropdown-item').click(function() {
      const selectedTopic = $(this).data('topic');
      currentTopic = selectedTopic;
      console.log(selectedTopic);
      console.log(currentTopic);
      fetchVideoData(currentKeyword, currentTopic, currentSort);

      const dropdownText = $(this).text();
      $(this).closest('.dropdown').find('.btn span').text(dropdownText);
    });
  }

  function populateSortDropdown(sorts) {
    const sortByMenu = $('.box3 .dropdown-menu');

    let sortByItemsHtml = '';

    const sortDisplayText = {
      'most_popular': 'Most popular',
      'most_recent': 'Most recent',
      'most_viewed': 'Most viewed'
      // Add more mappings as needed
    };

    sorts.forEach(function(sort) {
      const displayText = sortDisplayText[sort] || sort;
      sortByItemsHtml += `<a class="dropdown-item" data-sort="${sort}" href="#">${displayText}</a>`;
    });

    sortByMenu.html(sortByItemsHtml);

    sortByMenu.find('.dropdown-item').click(function() {
      const selectedSort = $(this).data('sort');
      currentSort = selectedSort;
      console.log(selectedSort);
      fetchVideoData(currentKeyword, currentTopic, currentSort);

      const dropdownText = $(this).text();
      $(this).closest('.dropdown').find('.btn span').text(dropdownText);
    });
  }

  function displayVideos(data, sort) {
    if (sort === 'most_viewed') {
      data.sort((a, b) => b.views - a.views);
    }
    const videoCardsRow = $("#videoCardsRow");
    let videoCardsHtml = '';
    data.forEach(video => {
      videoCardsHtml += createVideoCard(video);
    });
    videoCardsRow.html(videoCardsHtml);

    $(".video-count").text(data.length + " videos");
  }

    fetchVideoData();
});
