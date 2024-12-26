$(window).on('load', function () {
  var loadertext = document.querySelector('.loader-text-stroke');

  loadertext.addEventListener('animationend', function () {
    gsap.to(loadertext, 0.8, {
      opacity: 0,
      onComplete: function () {
        gsap.to(loadertext, 0, {
          display: 'none',
        });
        gsap.to('#loader', 1.2, {
          //LOADING PAGE TRANSITION
          y: '-100%',
          ease: 'Expo.easeInOut',
        });
      },
    });
  });
});

$(function () {
  $('.gallery-grid').masonry({
    itemSelector: '.column',
    isAnimated: true,
  });

  var pagelink = document.querySelectorAll('.page-link');

  pagelink.forEach((link) =>
    link.addEventListener('click', function () {
      setTimeout(function () {
        new Masonry('.gallery-grid', {
          itemSelector: '.column',
          isAnimated: true,
        });
      }, 2000);
    })
  );
});

new Swiper(' .swiper-container', {
  slidesPerView: 'auto',
  speed: 1000,
  spaceBetween: 20,
  centeredSlides: true,
  grabCursor: true,
  on: {
    init: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        $(swiper.slides[i])
          .find('.img-container')
          .attr({
            'data-swiper-parallax': 1 * swiper.width,
          });
      }
    },
    resize: function () {
      this.update();
    },
  },
  autoplay: {
    delay: 8000,
    disableOnInteraction: true,
  },
  pagination: {
    el: '#home .swiper-pagination',
    type: 'fraction',
  },
  mousewheel: true,
  observer: true,
  observeParents: true,
});

$(document).ready(function () {
  $('.image-type').lettering();
});

$(function () {
  var $cursor = $('.cursor');
  var $cursortwo = $('.cursor-two');
  function cursormover(e) {
    gsap.to($cursor, {
      x: e.clientX,
      y: e.clientY,
    });
    gsap.to($cursortwo, {
      x: e.clientX,
      y: e.clientY,
    });
  }
  function cursorhover() {
    gsap.to($cursor, {
      scale: 1.5,
      opacity: 0.4,
      background: '#ad0961',
      border: 'none',
      ease: Expo.easeOut,
    });
    gsap.to($cursortwo, {
      scale: 0,
      opacity: 0,
    });
  }
  function linkhover() {
    gsap.to($cursor, {
      width: '100px',
      height: '100px',
      opacity: 1,
      background: '#ad0961',
      border: 'none',
      innerHTML: 'view&nbsp;gallery',
      top: '-50px',
      left: '-50px',
    });
    gsap.to($cursortwo, {
      width: '110px',
      height: '110px',
      border: '2px solid #ad0961',
      background: 'transparent',
      top: '-55px',
      left: '-55px',
    });
  }
  function cursor() {
    gsap.to($cursor, {
      width: '50px',
      height: '50px',
      top: '-25px',
      left: '-25px',
      opacity: 1,
      scale: 1,
      background: 'transparent',
      border: '1px solid #ad0961',
      innerHTML: '',
    });
    gsap.to($cursortwo, {
      scale: 1,
      opacity: 1,
      width: '8px',
      height: '8px',
      border: '0px solid #ad0961',
      background: '#ad0961',
      top: '-4px',
      left: '-4px',
    });
  }
  $(window).on('mousemove', cursormover);
  $('#home .img-container').hover(linkhover, cursor);
  $('.hover').hover(cursorhover, cursor);
});

$(function () {
  $('.menu-bar').on('click', function () {
    gsap.to('#navigation', 1, {
      y: '0%',
      ease: 'Expo.easeInOut',
      onComplete: function () {
        gsap.to('.navigation-opacity', 0.5, {
          opacity: 1,
          stagger: 0.1,
        });
      },
    });
  });

  $('.navigation-close').on('click', function () {
    gsap.to('.navigation-opacity', 0.5, {
      opacity: 0,
      stagger: 0.05,
      onComplete: function () {
        gsap.to('#navigation', 1, {
          y: '100%',
          ease: 'Expo.easeInOut',
        });
      },
    });
  });
});

//PAGE TRANSITIONS

$(function pagetransition() {
  var links = [...document.querySelectorAll('.page-link')];
  var breaker = document.querySelector('#breaker');

  links.forEach((link) =>
    link.addEventListener('click', function () {
      var page = link.getAttribute('href');

      if (document.querySelector(page)) {
        function displaybreaker() {
          breaker.style.display = 'block';

          breaker.addEventListener('animationend', function () {
            this.style.display = 'none';
          });

          gsap.to('.navigation-opacity', 0.5, {
            opacity: 0,
            stagger: -0.05,
            onComplete: function () {
              gsap.to('#navigation', 1, {
                y: '100%',
                ease: 'Expo.easeInOut',
              });
            },
          });
        }

        displaybreaker();

        function changepage() {
          var pages = links.map((a) => a.getAttribute('href'));
          setTimeout(function () {
            pages.forEach(
              (a) => (document.querySelector(a).style.display = 'none')
            );
            document.querySelector(page).style.display = 'block';
          }, 1500);
        }

        changepage();
      }
    })
  );
});

$(function () {
  var sortingbuttons = document.querySelectorAll('.image-sort-button');
  var images = [...document.querySelectorAll('.gallery-img')];

  sortingbuttons.forEach((button) =>
    button.addEventListener('click', function () {
      var sortvalue = button.dataset.sort;
      images.forEach((image) => (image.style.display = 'none'));

      var imagestoshown = document.querySelectorAll(`[alt='${sortvalue}']`);

      imagestoshown.forEach((show) => (show.style.display = 'block'));

      if (sortvalue == 'all') {
        images.forEach((image) => (image.style.display = 'block'));
      }

      new Masonry('.gallery-grid', {
        itemSelector: '.column',
        isAnimated: true,
      });

      sortingbuttons.forEach((buttons) => buttons.classList.remove('active'));
      button.classList.add('active');
    })
  );
});
