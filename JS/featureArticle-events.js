var fullscreen_image = false;
var fullscreen_button;

function openFullScreenImage(this_button, state) {
	// Make image full screen
	// No need to add class if we're resizing the window
	if (state !== 'resize') {
		$(this_button).parent().parent().parent().addClass('fullscreen-image');
	}

	// Grab coordinates of photo while it's shown
	var photo_width = $(this_button).prev().prev().children().width();
	var photo_left = $(this_button).prev().prev().children().offset().left;

	// Hide so we can fade in
	// Don't do on resize
	if (state !== 'resize') {
		$(this_button).parent().parent().parent().hide();
	}

	// Set position of close fullscreen button
	$(this_button).prev().prev().prev().css({
		'margin-left': (photo_left + photo_width - 40) + 'px'
	});

	// Set caption box width the same size as image
	$(this_button).prev().css({
		'width': (photo_width - 20) + 'px',
		'margin-left': photo_left + 'px'
	});

	// Show image box
	// Don't do on resize
	if (state !== 'resize') {
		$(this_button).parent().parent().parent().fadeIn();
	}
}

$(document).ready(function() {
	// Fade in all sections   
	$('body').imagesLoaded( function() {
		setTimeout(function() {
			// Calls everything we need
			loadPage('initial');
		}, 800);
	});

	// Click on nav item
	$('#nav-box a').click(function(e) {
		ga('send', 'event', 'Feature article', 'Nav button at top clicked');

		e.preventDefault();

		if ( $(window).width() < 851 ) {
			$('#nav-box').hide();
			$('#nav-box-mobile').addClass('unselected');
		}

		// Retrieve just the chapter number (1, 2, 3, etc.)
		var chapter_number = removeSpecialCharacters( $(e.target).text().toLowerCase() ).replace('chapter','');

		// Scroll to section
		$("html, body").stop().animate({
			scrollTop: $('#scroll-to-' + chapter_number).offset().top
		}, 1000);


		return false;
	});

	// Click on caption text box
	$('.photo-caption-container').click(function() {
		ga('send', 'event', 'Feature article', 'Caption box on scroller image clicked');

		var caption_name = $(this).attr('name');
		var text_container_width = $('#photo-caption-text-container-' + caption_name).width();

		// If caption box is not shown
		if( $(this).hasClass("not-shown") ) {
			$('#photo-caption-text-container-' + caption_name).fadeIn();
			$(this).removeClass("not-shown");
			$(this).addClass("shown");
			$(this).css({
				'background-color': 'rgba(33, 33, 33, 0.5)'
			});

			// Switch out icons
			$(this).find('.fa').removeClass('fa-info-circle');
			$(this).find('.fa').addClass('fa-times-circle');
		// If caption box is hidden
		} else if( $(this).hasClass("shown") ) {
			$('#photo-caption-text-container-' + caption_name).fadeOut();
			$(this).removeClass("shown");
			$(this).addClass("not-shown");
			$(this).css({
				'background-color': 'rgba(33, 33, 33, 0)'
			});

			// Switch out icons
			$(this).find('.fa').removeClass('fa-times-circle');
			$(this).find('.fa').addClass('fa-info-circle');
		}
	});

	// Click on zoom icon next to a photo
	$(document).on('click', '.open-fullscreen-image', function(e) {
		ga('send', 'event', 'Feature article', 'Full screen image clicked');

		e.preventDefault();

		fullscreen_image = true;
		fullscreen_button = this;
		openFullScreenImage(fullscreen_button, 'initial');
	});

	// Close photo full screen
	$(document).on('click', '.close-fullscreen-image', function(e) {
		e.preventDefault();

		// Un-fullscreen it
		fullscreen_image = false;
		$(this).parent().parent().parent().removeClass('fullscreen-image');

		// Default style on caption box
		$(this).next().next().css({
			'width': '95%',
			'margin-left': '0px'
		});
	});

	// Nav box click: Mobile
	$('#nav-box-mobile').click(function() {
		ga('send', 'event', 'Feature article', 'Nav button on mobile clicked');

		if ( $(this).hasClass('unselected') ) {
			$('#nav-box').show();
			$(this).removeClass('unselected');
		} else {
			$('#nav-box').hide();
			$(this).addClass('unselected');
		}
	});
// Close doc ready
});

// Reloads scroller images on resize
$( window ).resize(function() {
	loadPage('resize');
});