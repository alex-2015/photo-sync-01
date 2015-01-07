var wh = $(window).height();
var ww = $(window).width();
function getWindowDimensions() {
  wh = $(window).height();
  ww = $(window).width();
}


/*  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    Menu
    ....................................  */
var currentPosition = {}

var stagePositions = [
  // Home
  {"posLeft":1,"posTop":1},
  // Logos
  {"posLeft":2,"posTop":0},
  // Meet the Family
  {"posLeft":0,"posTop":1},
  // Apps
  {"posLeft":0,"posTop":2},
  // Photos
  {"posLeft":2,"posTop":1},
  // Websites
  {"posLeft":1,"posTop":0},
  // Videos
  {"posLeft":2,"posTop":2},
  // Join the Family
  {"posLeft":1,"posTop":2},
  // Clients
  {"posLeft":0,"posTop":0}
]

function scrollNavigation() {

  if(window.location.hash) {
    hash = window.location.hash;
  } else {
    hash = "#stage1";
  }

  // Set up grid navigation on desktop
  if ($('.mobilecheck').css('z-index') != 1 && $('.stage').length > 0) {
    var xCon = stagePositions[$(hash).data('stage-position')].posLeft * -ww;
    var yCon = stagePositions[$(hash).data('stage-position')].posTop * -wh;
    $('#container').css({
      'height': 3 * wh,
      'width': 3 * ww,
      '-webkit-transform': 'translate(' + xCon + 'px,' + yCon + 'px)',
      'transform': 'translate(' + xCon + 'px,' + yCon + 'px)'
    });
    for(var i=0; i< $('#container .stage').length; i++) {
      var xStage = stagePositions[i].posLeft * ww;
      var yStage = stagePositions[i].posTop * wh;
      $('#container .stage:nth-child(' + (i + 1) + ')').css({
        '-webkit-transform': 'translate(' + xStage + 'px,' + yStage + 'px)',
        'transform': 'translate(' + xStage + 'px,' + yStage + 'px)'
      });
    }
  } else if($('.mobilecheck').css('z-index') == 1) {
    $('#container').css({
      'height': 'auto',
      'width': 'auto',
      '-webkit-transform': 'initial',
      'transform': 'initial'
    });
    $('#container .stage').css({
      '-webkit-transform': 'initial',
      'transform': 'initial'
    });
  }

}

// Adds 'active' class to the currently active stage
function mobileToggleStages() {

  if(window.location.hash) {
    hash = window.location.hash;
  } else {
    hash = "#stage1";
  }

  $('.stage').removeClass('active');
  $(hash).addClass('active');

  if($('.stage').length > 0) {
    $('a[href^="#stage"]').on('click', function(event){
      event.preventDefault();
      $('.stage').removeClass('active');
      if ($('.mobilecheck').css('z-index') != 1 && $('.stage').length > 0) {
        $($(this).attr('href')).addClass('active');
        var y = stagePositions[$('.stage.active').data('stage-position')].posTop * -wh;
        var x = stagePositions[$('.stage.active').data('stage-position')].posLeft * -ww;
        $('#container').css({
          '-webkit-transition': '-webkit-transform .6s ease-in-out',
          'transition': 'transform .6s ease-in-out',
          '-webkit-transform': 'translate(' + x + 'px,' + y + 'px)',
          'transform': 'translate(' + x + 'px,' + y + 'px)'
        });
        history.pushState(null, null, $(this).attr('href'));
        setTimeout(function() {
          $('#container').css({
            '-webkit-transition': 'initial',
            'transition': 'initial'
          });
        }, $('#container').css('transition'));
      } else if($('.mobilecheck').css('z-index') == 1) {
        $('html, body').scrollTop(0);
        $($(this).attr('href')).addClass('active');
        $(this).animate({ scrollTop: 100 }, 0);
        $('#container').css({
          '-webkit-transform': 'initial',
          'transform': 'initial'
        });
        history.pushState(null, null, $(this).attr('href'));
      }
    });
  }

  $(window).on('popstate', function(event) {

    scrollNavigation();

  });

}

// Toggles main navigational menu
function menuToggle() {
  $("#main-nav-button").on('click', function() {
    $(this).toggleClass('open');
    $('#main-nav h2.title').toggleClass('animated flipInX');
    $('div.main-nav-content').toggleClass('animated fadeInLeft');
    $("#main-nav").toggle();
  });
  $(".main-nav-content li a, #main-nav h2.title, #container").on('click', function() {
    if($('#main-nav').is(':visible')) {
      $("#main-nav-button").toggleClass('open');
      $('#main-nav h2').toggleClass('animated flipInX');
      $('.main-nav-content').toggleClass('animated fadeInLeft');
      $("#main-nav").hide();
    }
  });
}



/*  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    Get In Touch
    ....................................  */

function mailForm(selector) {
  var form = '[data-form="' + selector + '"]';
  var formMessages = $(form + ' .form-messages');
  // front end validation
  $(form + ' .validate').on('change keyup paste', function(e) {
    var empty = $(form).find('input:not([type="submit"]), textarea').filter(function() {
      return this.value === "";
    });
    if(!empty.length){
      $(form + ' input[type="submit"]').removeAttr('disabled');
    }
  });
  // form submit
  $(form).on('submit', function(event) {
    event.preventDefault();
    var formData = $(form).serialize();
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
    .done(function(response) {
      // Make sure that the formMessages div has the 'success' class.
      // $(formMessages).removeClass('error');
      // $(formMessages).addClass('success');

      // Set the message text.
      $(formMessages).text(response);

      // Clear the form.
      $('.validate').val('');
      $(form + ' input[type="submit"]').attr('disabled', true);
    })
    .fail(function(data) {
      // Make sure that the formMessages div has the 'error' class.
      // $(formMessages).removeClass('success');
      // $(formMessages).addClass('error');

      // Set the message text.
      if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
      } else {
          $(formMessages).text('Oops! An error occured and your message could not be sent.');
      }
    });
  });
}


/*  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    All Stages
    ....................................  */

var miniSliderPosition = {}

var totalMiniSlides = {}

function miniSlider(data) {
  miniSliderPosition[data] = 0;
  var miniSliderSelector = '[data-mini-slider="' + data + '"]';
  // set slider length
  totalMiniSlides[data] = $(miniSliderSelector + ' ul > li').length - 1;
  // pagination
  if($(miniSliderSelector + ' ul.pagination').children('li').length == 0) {
    for(var i = 0; i <= totalMiniSlides[data]; i++){
      $(miniSliderSelector + ' ul.pagination').append('<li data-slide="' + i + '" class="marker"></li>');
    }
    $(miniSliderSelector + ' ul.pagination li:nth-of-type(' + (miniSliderPosition[data] + 1) + ')').addClass('active');
  }
  // pagination nav button click
  $(miniSliderSelector + ' ul.pagination li').on('click', function() {
    // fade out
    $(miniSliderSelector + ' ul > li:nth-of-type(' + (miniSliderPosition[data] + 1) + ')').removeClass('active animated fadeIn');
    // change current slide
    miniSliderPosition[data] = $(this).data('slide');
    // fade in
    $(miniSliderSelector + ' ul > li:nth-of-type(' + (miniSliderPosition[data] + 1) + ')').addClass('active animated fadeIn');
  });
  // slider nav button click
  $(miniSliderSelector + ' button.move').on('click', function() {
    if($(this).hasClass('next') && miniSliderPosition[data] < totalMiniSlides[data]) {
      // fade out
      $(miniSliderSelector + ' ul > li:nth-of-type(' + (miniSliderPosition[data] + 1) + ')').removeClass('active animated fadeIn');
      // change current slide
      miniSliderPosition[data]++;
      // fade in
      $(miniSliderSelector + ' ul > li:nth-of-type(' + (miniSliderPosition[data] + 1) + ')').addClass('active animated fadeIn');
    } else if($(this).hasClass('prev') && miniSliderPosition[data] > 0) {
      // fade out
      $(miniSliderSelector + ' ul > li:nth-of-type(' + (miniSliderPosition[data] + 1) + ')').removeClass('active animated fadeIn');
      // change current slide
      miniSliderPosition[data]--;
      // fade in
      $(miniSliderSelector + ' ul > li:nth-of-type(' + (miniSliderPosition[data] + 1) + ')').addClass('active animated fadeIn');
    }
  });
}

// Object that keeps track of slider positions across the site
var sliderPosition = {}

// Object that sets the total number of slides for each slider across the site
var totalSlides = {}

// adjust scroll on window resize
function stageSliderFixScrollOnResize() {
  var stageSliderStages = ['logos','photos','websites','video'];
  for(i=0; i < stageSliderStages.length; i++) {
    $('div.stage-slider[data-stage="' + stageSliderStages[i] + '"] .slides-container').scrollLeft(sliderPosition[stageSliderStages[i]] * ww);
  }
}

// Slider functionality for all stage sliders
function stageSlider(stage) {
  // set default slider position to 0
  if(!(stage in sliderPosition)) {
    sliderPosition[stage] = 0;
  }
  var stageSliderSelector = 'div.stage-slider[data-stage="' + stage + '"]';
  var slideContainer = $(stageSliderSelector + ' .slides-container');
  // set slider length
  totalSlides[stage] = $(stageSliderSelector + ' .slides-container > li').length - 1;
  // add pagination
  if($(stageSliderSelector + ' .slides-pagination').children('li').length == 0) {
    for(var i = 0; i <= totalSlides[stage]; i++){
      $(stageSliderSelector + ' .slides-pagination').append('<li data-slide="' + i + '"></li>');
    }
  }

  // set active class for pagination
  function setActiveIndicator() {
    selectedSlideIndicator = $(stageSliderSelector + ' .slides-pagination li[data-slide="' + sliderPosition[stage] + '"]');
    selectedSlideIndicator.addClass('active');
  }
  setActiveIndicator();
  // pagination controls
  $(stageSliderSelector + ' .slides-pagination li').on('click', function(){
    $(stageSliderSelector + ' .slides-pagination li').removeClass();
    $(this).addClass('active');
    sliderPosition[stage] = $(this).data('slide');
    slideContainer.animate({ 
      scrollLeft: (ww * sliderPosition[stage]) + 'px'
    }, 800, "easeInOutQuad");
  });
  
  // show and hide next/prev based on position in slider
  function showHideNextPrevButtons() {
    if(sliderPosition[stage] < totalSlides[stage]) {
      $(stageSliderSelector + ' .slides-navigation button.next').show();
    } else {
      $(stageSliderSelector + ' .slides-navigation button.next').hide();
    }
    if(sliderPosition[stage] > 0) {
      $(stageSliderSelector + ' .slides-navigation button.prev').show();
    } else {
      $(stageSliderSelector + ' .slides-navigation button.prev').hide();
    }
  }
  showHideNextPrevButtons();
  // left-right controls
  $(stageSliderSelector + ' .slides-navigation button').on('click', function(){
    $(stageSliderSelector + ' .slides-pagination li').removeClass();
    if($(this).hasClass('next') && sliderPosition[stage] < totalSlides[stage]) {
      sliderPosition[stage]++;
    }
    if($(this).hasClass('prev') && sliderPosition[stage] > 0) {
      sliderPosition[stage]--;
    }
    slideContainer.animate({ 
      scrollLeft: ($(stageSliderSelector).width() * sliderPosition[stage]) + 'px'
    }, 800, "easeInOutQuad");
    setActiveIndicator();
    showHideNextPrevButtons();
  });

}

// Scroll triggers animation on mobile and removes 'pause' class if desktop
function mobileScrollAnimate(selector, targetHash) {
  if(window.location.hash) {
    var hash = window.location.hash;
  }
  if(hash == '#stage1') {
    hash = undefined;
  }
  if ($('.mobilecheck').css('z-index') == 1 ) {
    if(hash == targetHash) {
      $(selector + ' .animated').each(function() {
        if($(window).scrollTop() + ($(window).height() * .95) > $(this).offset().top) {
          $(this).removeClass('paused');
        }
      });
    }
  } else {
    $(selector + ' .animated').each(function() {
      $(this).removeClass('paused');
    });
  }
}

function scrollAnimate(selector) {
  $(selector + ' .animated').each(function() {
    if($(window).scrollTop() + ($(window).height() * .95) > $(this).offset().top) {
      $(this).removeClass('paused');
    }
  });
  $(selector).on('scroll', function() {
    $(selector + ' .animated').each(function() {
      if($(window).scrollTop() + ($(window).height() * .95) > $(this).offset().top) {
        $(this).removeClass('paused');
      }
    });
  });
}

// Function that handles modal box activation
function modalActivate() {
  $('[data-modal-trigger]').on('click', function() {
    $('button.fixed').fadeOut(1000);
    $('.modal').removeClass('active');
    $('.modal iframe').attr('src', '');
    var thisModal = '.modal[data-modal="' + $(this).data('modal-trigger') + '"]';
    $(thisModal + ' iframe').attr('src', $(this).data('iframe'));
    $(thisModal).addClass('active');
    $(thisModal).siblings('.modal-hide').hide();
    scrollAnimate(thisModal);
  });
  $('.modal button.close, #main-nav a:not([data-modal-trigger])').on('click', function() {
    $('button.fixed').fadeIn(1000);
    $('.modal').removeClass('active');
    $('.modal iframe').attr('src', '');
    $('.modal').siblings('.modal-hide').show();
  });
}

// Function that handles modal box activation
function slideModalActivate() {
  $('[data-slide-modal-trigger]').on('click', function() {
    $('.slide-modal').removeClass('active');
    var thisModal = '.slide-modal[data-slide-modal="' + $(this).data('slide-modal-trigger') + '"]';
    $(thisModal).siblings('.pre-form').hide();
    $(thisModal).addClass('active');
    scrollAnimate(thisModal);
  });
  $('.slide-modal button.close, #main-nav a:not([data-modal-trigger])').on('click', function() {
    $('.slide-modal').siblings('.pre-form').show();
    $('.slide-modal').removeClass('active');
  });
}

/*  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    Stage 1 - Home
    ....................................  */

// Responsive fullscreen video background for home stage
function videoBackgroundResize(initialWidth, initialHeight) {
  if(Math.abs((initialWidth - ww)/initialWidth) < Math.abs((initialHeight - wh)/initialHeight)) {
    $('.home-video, .home-video video').css({
      'width': '100%',
      'height': 'auto'
    });
  } else {
    $('.home-video, .home-video video').css({
      'width': 'auto',
      'height': '100%'
    });
  }
}

// Pagination navigation on home slider
function homeSlideNavigation() {
  $("#pagination li").on('click', function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var target = $('#' + $(this).data('slide'));
    var siblings = $('#' + $(this).data('slide')).siblings();
    siblings.addClass('inactive');
    setTimeout(function() {
      siblings.removeClass('active');
      target.removeClass('inactive').addClass('active');
    }, 600);
  });
}

// ORIGINAL CODE - Triggers slide 2 on home slider
function homeSlide2() {
  $("#pagination li").removeClass('active');
  $("#marker-2").addClass('active');
  var target = $('#vibrancy-family');
  var siblings = $('#vibrancy-family').siblings();
  target.removeClass('inactive');
  siblings.addClass('inactive');
  setTimeout(function() {
    siblings.removeClass('active');
    target.addClass('active');
  }, 600);
}

// ORIGINAL CODE - Triggers slide 3 on home slider
function homeSlide3() {
  $("#pagination li").removeClass('active');
  $("#marker-3").addClass('active');
  var target = $('#vibrancy-services');
  var siblings = $('#vibrancy-services').siblings();
  target.removeClass('inactive');
  siblings.addClass('inactive');
  setTimeout(function() {
    siblings.removeClass('active');
    target.addClass('active');
  }, 600);
}

// Autoplay home slider on initial load of site
function homeSliderAutoplay() {
  setTimeout(homeSlide2, 6000);
  // setTimeout(homeSlide3, 10000);
}



/*  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    Stage 4 - Apps
    ....................................  */

// Initial step in Apps slide presentation
var currentStep = 1;

// Total steps in Apps slide presentation
var totalSteps = $('.stage-apps section').length;

// Sets Apps stage height so viewport height is set for slide presentation on desktop
function appsDesktopConfig() {
    $('.stage-apps, .stage-apps section').css('height', wh + 'px');
}

function animateScrollAndSetActiveNav(type) {
  // define animations
  
  $('.stage-apps ul.pagination li').removeClass('active');
  $('.stage-apps ul.pagination li[data-step="' + currentStep + '"]').addClass('active');
  if(type == 'direct') {
    $('.stage-apps div.viewport').scrollTop($('.stage-apps div.viewport section').height() * (currentStep - 1));
  } else {
    $('.stage-apps div.viewport').animate({ 
      scrollTop: ($('.stage-apps div.viewport section').height() * (currentStep - 1)) + 'px'
    },800);
  }
}

function appsDesktopNavigation() {
  // advance one slide if clicked anywhere
  $('.stage-apps div.viewport').on('click', function() {
    if ($('.mobilecheck').css('z-index') != 1 ) {
      if(currentStep < totalSteps) {
        currentStep++;
        animateScrollAndSetActiveNav('direct');
      }
    }
  });
  // advance to the slide clicked on in navigation
  $('.stage-apps ul.pagination li').on('click', function() {
    if ($('.mobilecheck').css('z-index') != 1 ) {
      currentStep = $(this).attr('data-step');
      animateScrollAndSetActiveNav('direct');
    }
  });
}

var appsStepHeight = wh;

function appsTransitions() {
  // define all step transitions
  var movingPiecesData = [
    {
      step: 1,
      dataId: '1-1',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 1,
      dataId: '1-2',
      in: 'fadeInRight',
      out: 'fadeOut'
    },
    {
      step: 2,
      dataId: '2-1',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 2,
      dataId: '2-2',
      in: 'fadeInUp',
      out: 'fadeOut'
    },
    {
      step: 2,
      dataId: '2-3',
      in: 'fadeInUp',
      out: 'fadeOut'
    },
    {
      step: 2,
      dataId: '2-4',
      in: 'fadeInUp',
      out: 'fadeOut'
    },
    {
      step: 3,
      dataId: '3-1',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 3,
      dataId: '3-2',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 3,
      dataId: '3-3',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 3,
      dataId: '3-4',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 4,
      dataId: '4-1',
      in: 'fadeInLeft',
      out: 'fadeOut'
    },
    {
      step: 4,
      dataId: '4-2',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 4,
      dataId: '4-3',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 4,
      dataId: '4-4',
      in: 'fadeInRight',
      out: 'fadeOut'
    },
    {
      step: 5,
      dataId: '5-1',
      in: 'fadeInLeft',
      out: 'fadeOut'
    },
    {
      step: 5,
      dataId: '5-2',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 6,
      dataId: '6-1',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 6,
      dataId: '6-2',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 7,
      dataId: '7-1',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 7,
      dataId: '7-2',
      in: 'fadeInLeft',
      out: 'fadeOut'
    },
    {
      step: 7,
      dataId: '7-3',
      in: 'fadeInUp',
      out: 'fadeOut'
    },
    {
      step: 7,
      dataId: '7-4',
      in: 'fadeInRight',
      out: 'fadeOut'
    },
    {
      step: 8,
      dataId: '8-1',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 8,
      dataId: '8-2',
      in: 'fadeIn',
      out: 'fadeOut'
    },
    {
      step: 8,
      dataId: '8-3',
      in: 'fadeInUp',
      out: 'fadeOut'
    },
    {
      step: 8,
      dataId: '8-4',
      in: 'fadeInUp',
      out: 'fadeOut'
    },
    {
      step: 8,
      dataId: '8-5',
      in: 'fadeInUp',
      out: 'fadeOut'
    },
    {
      step: 8,
      dataId: '8-6',
      in: 'fadeInUp',
      out: 'fadeOut'
    },
    {
      step: 8,
      dataId: '8-7',
      in: 'fadeInUp',
      out: 'fadeOut'
    }
  ]
  // run transitions based on scroll position
  function runTransitions(movingPieces) {
    if ($('.mobilecheck').css('z-index') != 1 ) {
      var appsScrollPosition = $('.stage-apps div.viewport').scrollTop();
    } else {
      var appsScrollPosition = $(window).scrollTop();
    }
    // var appsStepHeight = $('.stage-apps div.viewport section').height();
    for(i=0; i < movingPieces.length; i++) {
      var movingPiece = $('.stage-apps *[data-id="' + movingPieces[i].dataId + '"]');
      if(
        appsScrollPosition >= (movingPieces[i].step - 1) * appsStepHeight || 
        appsScrollPosition <= movingPieces[i].step * appsStepHeight
        ) {
        movingPiece.removeClass().addClass('animated ' + movingPieces[i].in);
      } 
      if(
        appsScrollPosition >= ((movingPieces[i].step - 1) * appsStepHeight) + (appsStepHeight * 0.33) ||
        appsScrollPosition < (movingPieces[i].step - 1) * appsStepHeight
        ) {
        movingPiece.removeClass().addClass('animated ' + movingPieces[i].out);
      }
    }
  }
  runTransitions(movingPiecesData);
}



/*  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    Stage 5 - Photos
    ....................................  */

function mobilePhotosScrollEffects() {
  if ($('.mobilecheck').css('z-index') == 1 ) {
    var photosScrollPosition = $(window).scrollTop();
  }
  if(photosScrollPosition >= $('div.stage-photos .panel') * appsStepHeight) {
    movingPiece.removeClass().addClass('animated ' + movingPieces[i].in);
  }
}

// Fade in and adjust menu links if user goes to external page i.e. a photo gallery
function externalPageMenuLinkAdjust() {
  if ($('.stage-photos-gallery').length > 0) {
    $('.stage-photos-gallery').addClass('animated fadeIn').show();
    for(var i=1; i < $('.stage-photos-gallery li').length + 1; i++) {
      $('.stage-photos-gallery li:nth-child(' + i + ') img').css({
        '-webkit-animation-delay': i*500 + 'ms',
        'animation-delay': i*500 + 'ms'
      }).addClass('animated fadeIn');
    }
    $('#main-nav .main-nav-content ul li a[href^="#"]').each(function() {
      var _href = $(this).attr('href');
      $(this).attr('href', '/' + _href);
    });
  }
  // fadeOut transition on external link click
  $('a.external-gallery').on('click', function() {
    $('body').addClass('animated fadeOut');
    var href = $(this).attr('href');
    setTimeout(function() {window.location = href}, 300);
    return false;
  });
}




/*  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    Desktop/Mobile
    ....................................  */
    
function automagicResize() {

  // ....................................
  // ALWAYS
  // ....................................

  // GLOBAL
  $('.stage').css({'min-height': wh + 'px'});
  scrollNavigation();
  mobileScrollAnimate('#vibrancy-clients-mobile');
  mobileScrollAnimate('#navbar');
  mobileScrollAnimate('.stage-logos .lets-create', '#stage2');
  mobileScrollAnimate('.stage-photos', '#stage5');
  mobileScrollAnimate('.stage-websites div.panel', '#stage6');
  mobileScrollAnimate('.stage-websites div.press-logos', '#stage6');
  mobileScrollAnimate('.stage-videos', '#stage7');
  mobileScrollAnimate('.stage-clients', '#stage9');
  stageSliderFixScrollOnResize();
  // Stage 4 - Apps
  appsTransitions();
  // Stage 5 - Photos
  mobilePhotosScrollEffects();
  $(window).load(function() {
    $('ul.stage-photos-gallery li').css('width', function() {
      return $(this).children('img').width() + 'px';
    });
  });

  // ....................................
  // NOT MOBILE (over 768px)
  // ....................................

  if ($('.mobilecheck').css('z-index') != 1 ) {
    // GLOBAL
    $('.stage').css('height', wh + 'px');
    $('.stage').css('width', ww + 'px');
    if($('.home-video video source').length == 0) {
      $('.home-video video').html('<source src="img/home-video.mp4" type="video/mp4">');
    }
    if($('.home-video video').length > 0) {
      $('.home-video video')[0].play();
    }
    // Stage 1 - Home
    $('.stage-home #content').css('height', (wh - $('#navbar').height()) + 'px');
    videoBackgroundResize(1920, 1080);
    // Stage 2 - Logos
    $('div.stage-slider').css('height', wh + 'px');
    // Stage 4 - Apps
    appsDesktopConfig();
    // Stage 8 - Join the Family
    $('.stage-joinfamily .mini-slider').css('height', wh + 'px');

  // ....................................
  // MOBILE (under 768px)
  // ....................................

  } else {
    // GLOBAL
    $('.stage').css('height', 'auto');
    $('.stage').css('width','auto');
    // // Stage 1 - Home
    if($('.home-video video').length > 0) {
      $('.home-video video')[0].pause();
    }
    // Stage 2 - Logos
    $('div.stage-slider').css('height', 'auto');
    // Stage 4 - Apps
    $('.stage-apps').attr('style', '');
    $('.stage-apps section').css({
      'height': 'auto',
      'min-height': wh + 'px'
    });
  }

}

$(document).ready(function() {
  homeSlideNavigation();
  mobileToggleStages();
  menuToggle();
  homeSliderAutoplay();
  automagicResize();
  modalActivate();
  slideModalActivate();
  appsDesktopNavigation();
  externalPageMenuLinkAdjust();
  mailForm('getintouch');

  // All Stages
  // set up hover panels
  // although this can be done without JavaScript, we've attached these events
  // because it causes the hover to be triggered when the element is tapped on a touch device
  $('.hover').click(function(){
    $(this).toggleClass('flip');
    $(this).siblings().removeClass('flip');
  });
  // set up click/tap panels
  $('.click').toggle(function(){
    $(this).addClass('flip');
  },function(){
    $(this).removeClass('flip');
  });



  // Menu
  $(".main-nav-content li.social").click(function() {
    var sml = $(this).children("a").attr("href");
    $(window).location.href(sml);
    event.stopPropagation();
  });

  // Stage 1 - Home
  $('div.service').hover(function() {
    $(this).siblings().addClass('faded');
  }, function() {
    $(this).siblings().removeClass('faded');
  });

  // Stage 2 - Logos
  stageSlider('logos');

  // Stage 3 - Meet the Family
  $('.member:not(.nopic)').on('click', function() {
    $(this).toggleClass('expanded');
    $('.member-bio').hide();
    setTimeout(function() {
      $('.expanded').children('.member-bio').show();
    }, 50);
    $(this).siblings().removeClass('expanded');
    $(this).siblings().find(".member-bio").hide();
    // return false;
  });

  $(".expanded").click(function() {
    $(this).removeClass("expanded");
    // return false;
  });

  // Stage 5 - Photos
  stageSlider('photos');

  // Stage 6 - Websites
  stageSlider('websites');

  // Stage 7 - Videos
  stageSlider('videos');

  // Stage 8 - Join the Family
  miniSlider('joinfamily');

});

$(window).resize(function(){
  getWindowDimensions();
  automagicResize();
  appsStepHeight = wh;
  videoBackgroundResize(1920, 1080);
});

$('.stage-apps div.viewport').on('scroll', function() {
  appsTransitions();
});

// Clients
$(window).on('scroll', function() {
  appsTransitions();
  mobileScrollAnimate('#vibrancy-clients-mobile');
  mobileScrollAnimate('#navbar');
  mobileScrollAnimate('.stage-logos .lets-create', '#stage2');
  mobileScrollAnimate('.stage-photos', '#stage5');
  mobileScrollAnimate('.stage-websites div.panel', '#stage6');
  mobileScrollAnimate('.stage-websites div.press-logos', '#stage6');
  mobileScrollAnimate('.stage-websites div.lets-create', '#stage6');
  mobileScrollAnimate('.stage-videos', '#stage7');
  mobileScrollAnimate('.stage-clients', '#stage9');
});

$('.clients-modal').on('scroll', function() {
  mobileScrollAnimate('.clients-modal');
});