var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/*=========================================================================
        Preloader
=========================================================================*/
$(document).ready(function() {
    "use strict";
    $(".preloader").delay(400).fadeOut('slow');
});

/*=========================================================================
            animation
=========================================================================*/
new WOW().init();

$(function(){

    /*=========================================================================
            One Page Nav
    =========================================================================*/
    $('.navbar-default').singlePageNav({
        offset: $('.navbar-default').outerHeight(),
        filter: ':not(.external)',
        updateHash: false,
        speed: 1000,
        easing: 'easeInOutCubic'
    });


    /*=========================================================================
            Slick Slider
    =========================================================================*/
    $('.gallery-slide').slick({
        centerMode: true,
        centerPadding: '0',
        variableWidth: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        dots: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              slidesToShow: 1,
              variableWidth: false
            }
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              slidesToShow: 1,
              variableWidth: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              slidesToShow: 1,
              variableWidth: false
            }
          }
        ]
      });
    $( ".slick-dots" ).appendTo( "#gallery-dots" );
    $('.testimonial-slide').slick({
        speed: 1500,
        autoplay: true,
        dots: true,
        arrows: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false
            }
          }
        ]
      });


    /*=========================================================================
            Magnific Popup Functions
    =========================================================================*/
    $('.minfox-video-wrap').magnificPopup({
      type: 'iframe',
      iframe: {
          markup: '<div class="mfp-iframe-scaler">'+
                    '<div class="mfp-close"></div>'+
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                  '</div>',

          patterns: {
            youtube: {
              index: 'youtube.com/',

              id: 'v=',

              src: 'http://www.youtube.com/embed/%id%?autoplay=1'
            },
            vimeo: {
              index: 'vimeo.com/',
              id: '/',
              src: 'https://player.vimeo.com/video/%id%?autoplay=1'
            },
            gmaps: {
              index: 'https://maps.google.com',
              src: '%id%&output=embed'
            }

          },

          srcAction: 'iframe_src',
        }
    });

});

/*=========================================================================
        Sticky Header Animation
=========================================================================*/
var animatedHeader = (function() {

  var docElem = document.documentElement,
    header = document.querySelector( ".navbar-default" ),
    didScroll = false,
    changeHeaderOn = 100;

  function init() {
    window.addEventListener( 'scroll', function( event ) {
      if( !didScroll ) {
        didScroll = true;
        setTimeout( scrollPage, 250 );
      }
    }, false );
  }

  function scrollPage() {
    var sy = scrollY();
    if ( sy >= changeHeaderOn ) {
      classie.add( header, 'shrink' );
    }
    else {
      classie.remove( header, 'shrink' );
    }
    didScroll = false;
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  init();

})();



//------------------------------------------------------------------------
//          SUBSCRIBE FORM VALIDATION'S SETTINGS
//------------------------------------------------------------------------
    $('#subscribe_form').validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo( element.closest("form"));
        },
        messages: {
            email: {
                required: "We need your email address to contact you",
                email: "Please, enter a valid email"
            }
        },

        highlight: function(element) {
            $(element)
        },

        success: function(element) {
            element
            .text('').addClass('valid')
        }
    });




//------------------------------------------------------------------------------------
//            SUBSCRIBE FORM MAILCHIMP INTEGRATIONS SCRIPT
//------------------------------------------------------------------------------------
    $('#subscribe_form').submit(function() {
        $('.error').hide();
        $('.error').fadeIn();
        // submit the form
        if($(this).valid()){
            $('#subscribe_submit').button('loading');
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    newsletter_email: $('#subscribe_name').val(),
                    newsletter_email: $('#subscribe_email').val()
                },
                success: function(data) {
                    $('#subscribe_submit').button('reset');

          //Use modal popups to display messages
          $('#modalMessage .modal-title').html('<i class="icon icon-envelope"></i>' + data);
          $('#modalMessage').modal('show');

                },
                error: function() {
                    $('#subscribe_submit').button('reset');

          //Use modal popups to display messages
          $('#modalMessage .modal-title').html('<i class="icon icon-envelope"></i>Oops!<br>Something went wrong!');
          $('#modalMessage').modal('show');

                }
            });
        }
        return false;
    });




//------------------------------------------------------------------------------------
//            CONTACT FORM VALIDATION'S SETTINGS
//------------------------------------------------------------------------------------
    $('#contact_form').validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            message: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        },
        messages: {
            name: "What's your name?",
            message: "Type your message",
            email: {
                required: "What's your email?",
                email: "Please, enter a valid email"
            }
        },

        highlight: function(element) {
            $(element)
            .text('').addClass('error')
        },

        success: function(element) {
            element
            .text('').addClass('valid')
        }
    });




//------------------------------------------------------------------------------------
//                CONTACT FORM SCRIPT
//------------------------------------------------------------------------------------

    $('#contact_form').submit(function() {
        // submit the form
        if($(this).valid()){
            $('#contact_submit').button('loading');
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    contactname: $('#contact_name').val(),
                    contactemail: $('#contact_email').val(),
                    contactsubject: $('#contact_subject').val(),
                    contactmessage: $('#contact_message').val()
                },
                success: function() {
                    $('#contact_submit').button('reset');
          $('#modalContact').modal('hide');

          //Use modal popups to display messages
          $('#modalMessage .modal-title').html('<i class="icon icon-envelope"></i>Well done!<br>Your message has been successfully sent!');
          $('#modalMessage').modal('show');
                },
                error: function() {
                    $('#contact_submit').button('reset');
          $('#modalContact').modal('hide');

          //Use modal popups to display messages
          $('#modalMessage .modal-title').html('<i class="icon icon-envelope"></i>Oops!<br>Something went wrong!');
          $('#modalMessage').modal('show');
                }
            });
        } else {
            $('#contact_submit').button('reset')
        }
        return false;
    });


$(function(){
    /*=========================================================================
            Particles JS
    =========================================================================*/
    particlesJS('particles-js',

      {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    }

    );

});

$(function(){
    var rSlogans = [
        'The Free Game Management Panel',
        'So Easy Dogmeat Could Use It',
        'Lift Your Servers to the Next Level',
        'Screeching Fast Software',
        '"Hodor" - Hodor',
        '"Pretty Radical" - A Pterodactyl (probably)',
        '"Scraw Scraw Screech... Scraw" - A Pterodactyl',
    ];
    $('#randomSlogan').html(rSlogans[Math.floor(Math.random() * rSlogans.length)]);
});


}
