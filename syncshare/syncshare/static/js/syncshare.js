var mobileScrollOffset;

function automagicResize() {
	$("img").one('load', function() {
    // portfolio piece hover div resize to match image
  	var c = $('img.cover').height();
		$('a.portfolio-piece-cover h4').css({'line-height': c + 'px'});
	}).each(function() {
  	if(this.complete) $(this).load();
	});
  // image-cover resize
  $('.image-block.cover a').css({'height': $('.image-block').width() + 'px'});
	// header resize & mobile scroll offset
  if ($('.mobilecheck').css('z-index') != 1 ) {
  	wh = $(window).height();
    $('#intro').css({'min-height': wh - 98 + 'px'});
    mobileScrollOffset = 0;
    // vertically center intro
    $('div.intro').css('margin-top', ($('#intro').height() - $('div.intro').height()) * .5 - 30 + 'px');
  } else {
    $('#intro').css({'min-height': 0});
    mobileScrollOffset = 6;
    $('div.intro').css('margin-top', 0);
  }
}

function masonryEffect() {
  $('div.masonry-effect').imagesLoaded( function(){
    $('div.masonry-effect').masonry({
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer',
      itemSelector: '.image-block'
    });
  });
}


$(document).ready(function() {
	automagicResize();
  masonryEffect();
});

$(window).resize(function(){
	automagicResize();
});

$(window).scroll(function() {
});