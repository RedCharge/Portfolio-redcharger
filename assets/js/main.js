(function ($) {
  "use strict";

  var $window = $(window);
  /*----------------------------------
# header sticky 
-----------------------------------*/
  $.fn.elExists = function () {
    return this.length > 0;
  };


  var activeSticky = $("#sticky-header"),
    $winDow = $($window);
  $winDow.on("scroll", function () {
    var scroll = $($window).scrollTop(),
      isSticky = activeSticky;

    if (scroll < 1) {
      isSticky.removeClass("is-sticky");
    } else {
      isSticky.addClass("is-sticky");
    }
  });




  if ($(".testimonial").elExists()) {
    const testimonialCarousel = new Swiper(".testimonial .swiper", {
      pagination: false,
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 45,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 45,
        },
      },
    });
  }





  if ($(".brandCarousel").elExists()) {
    const brandCarousel = new Swiper(".brandCarousel .swiper", {
      pagination: false,
      spaceBetween: 24,
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 2000,
      },
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6
        },
      },
    });
  }



  if ($(".play-button").elExists()) {
    $(".play-button").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,
      fixedContentPos: true,
    });
  }




  if ($(".counter").elExists()) {
    const counterUp = window.counterUp.default

    const callback = entries => {
      entries.forEach(entry => {
        const el = entry.target
        if (entry.isIntersecting && !el.classList.contains('is-visible')) {
          counterUp(el, {
            duration: 3000,
            delay: 15,
          })
          el.classList.add('is-visible')
        }
      })
    }

    const IO = new IntersectionObserver(callback, { threshold: 1 })

    const el = document.querySelector('.counter')
    IO.observe(el)
  }



  // You can also pass an optional settings object
  // below listed default settings
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 600, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

  });



  /*
  
  * Ajax Contact Form 
  
  */
  // Get the form.
  const form = $('#contact-form');

  // Get the messages div.
  const formMessages = $('.form-message');

  // Set up an event listener for the contact form.
  $(form).on('submit', function (e) {

    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    const formData = $(form).serialize();

    // Prefer FormSubmit's AJAX endpoint so we receive JSON instead of an HTML page.
    const actionUrl = $(form).attr('action') || '';
    const ajaxEndpoint = actionUrl.replace(/^https?:\/\/(?:www\.)?formsubmit\.co\//i, 'https://formsubmit.co/ajax/');

    // Submit the form using AJAX (expect JSON). Do NOT inject raw response HTML into the page.
    $.ajax({
      type: 'POST',
      url: ajaxEndpoint || $(form).attr('action'),
      data: formData,
      dataType: 'json'
    })

      .done(function (response) {
        $(formMessages).removeClass('error').addClass('success');

        // Response may be JSON or an empty body; show a friendly message rather than raw server HTML.
        if (response && (response.success === true || response.success === 'true')) {
          $(formMessages).text(response.message || '✓ Message sent successfully! I will get back to you soon.');
        } else if (response && response.message) {
          $(formMessages).text(response.message);
        } else {
          $(formMessages).text('✓ Message sent successfully! I will get back to you soon.');
        }

        // Clear the form fields.
        $('#contact-form [name="name"]').val('');
        $('#contact-form [name="email"]').val('');
        $('#contact-form [name="phone"]').val('');
        $('#contact-form [name="subject"]').val('');
        $('#contact-form [name="message"]').val('');
      })

      .fail(function (data) {
        console.log(data);
        $(formMessages).removeClass('success').addClass('error');

        // Try to parse a JSON error message; if it's HTML (activation page), avoid showing it.
        var msg = 'Oops! An error occurred and your message could not be sent.';
        try {
          if (data && data.responseJSON && data.responseJSON.message) {
            msg = data.responseJSON.message;
          } else if (data && data.responseText) {
            try {
              var parsed = JSON.parse(data.responseText);
              if (parsed && parsed.message) msg = parsed.message;
            } catch (e) {
              // responseText is likely HTML (activation page) — do not display it.
            }
          }
        } catch (e) {
          // ignore parsing errors
        }

        $(formMessages).text(msg);
      });

  });




  // Hello
  /*---------------------------------
        Scroll Up
    -----------------------------------*/
  function scrollToTop() {
    var $scrollUp = $("#scrollUp"),
      $lastScrollTop = 0,
      $window = $(window);

    $window.on("scroll", function () {
      var st = $(this).scrollTop();
      if (st > $lastScrollTop) {
        $scrollUp.css({ bottom: "-60px" });
      } else {
        if ($window.scrollTop() > 200) {
          $scrollUp.css({ bottom: "60px" });
        } else {
          $scrollUp.css({ bottom: "-60px" });
        }
      }
      $lastScrollTop = st;
    });

    $scrollUp.on("click", function (evt) {
      $("html, body").animate({ scrollTop: 0 }, 400);
      evt.preventDefault();
    });
  }
  scrollToTop();

})(jQuery);