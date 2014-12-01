// Used with extra photo slider
var feature_article = true;

// Window width, height
var winW;
var winH;

// Lazy load
function lazyLoad(content) {
	$(content).fadeOut(0, function() {
		$(content).fadeIn(1000);
	});
}

// Get embeds from Edit UI
// And place them on the page
// Matching up empty div on page with matching id
function addEmbeds() {
	// Loop through embeds that were put on the page
	_.each($('#embeds .mediawell-object-container'), function(value, key) {
		var embed_html = $(value).html();
		var embed_name = $(value).attr('name');
		
		// Append to page
		if (embed_name === 'summary') {
			// Desktop
			if ( $(value).attr('id') === 'summary-desktop' ) {
				$('#chapter1-container').prepend( $(value).html());
			// Mobile
			} else if ( $(value).attr('id') === 'summary-mobile' ) {
				$('#summary-container-mobile').append( $(value).html() );
			}
		} else {
			if ( $('#' + embed_name).length > 0 ) {
				$('#' + embed_name).html( $(value).html() );
			}
		}

		// Place individual extra photos on page
		if (embed_name === 'extrapictures') {
			var current_photos = $(value).find('.mediawell-photo');

			// Loop through photos in embeds and place on page
			// If appropriate empty DIV exists
			_.each(current_photos, function(value_pictures, key_pictures) {
				if( $('#extrapicture' + (key_pictures + 1) ).length > 0) {

					if ( $(value_pictures).attr('id') === 'art_photo_' + (key_pictures + 1) ) {
						var static_photo = '<div class="mediawell-object" id="mediawell-photos">'
						static_photo += '<div class="mediawell-photo" id="art_photo_ind_' + (key_pictures + 1) +'">';
						static_photo += $(value_pictures).html();
						static_photo += '</div></div>';

						$('#extrapicture' + (key_pictures + 1)).html( static_photo );
						$('#extrapicture' + (key_pictures + 1)).find('.mediawell-photo').show();

						$('#extrapicture' + (key_pictures + 1) ).find('.mediawell-photo').append('<i class="fa fa-search open-fullscreen-image hide-mobile"></i>');
						$('#extrapicture' + (key_pictures + 1) ).find('.mediawell-photo').prepend('<i class="fa fa-times-circle fa-2x close-fullscreen-image"></i>');
					}
				}
			}, this);
		}
	}, this);

	// Kick off lazy load
	$('.lazyload').lazyload({
		threshold: 800,
		load: lazyLoad
	});

	// Show content and stop spinner
	$('#main-content-container').css({
		'visibility': 'visible'
	});
	spinner.stop();
}

// Put header of section at top of the page when scrolling past it
function toggleHeaders() {
	var sections = [];

	// Create array of sections
	// First value: Position from top of page
	// Second: Headline
	_.each($('.homeSlide'), function(value, key) {
		// Used when scrolling
    	var paraDistance = $('#scroll-to-' + (key + 1) ).offset().top
		var headline = $(value).find('.hsContainer h2').text();
		sections.push( [paraDistance, headline] );
	}, this);

	// Scroll function that puts headline in top heaader
	$(window).scroll(function () {
		var switched = false;
		var currentSpot = $(window).scrollTop();

		// Show share icons once you scroll past the main image
		if ( $(window).width() < 501 &&  currentSpot > ($(window).height() / 2) ) {
			$('#share').fadeIn();

			// Set max width of header
			$('.header h1').css({
				'max-width': ($(window).width() - $('.logos').width() - $('#nav-box-mobile').width() - 25) + 'px'
			});
		} else if ( $(window).width() < 501 ) {
			$('#share').hide();
		}

		// Loop through sections as we scroll
		 _.find(sections, function(value_sections, key_sections) {
			var paraDistance_scroll = value_sections[0];
			var headline_scroll = value_sections[1];
			var content_height = $('.content:eq(' + key_sections + ')').outerHeight();

			// If we have scrolled past a section, place header at top of page
			if (currentSpot > paraDistance_scroll){
				$('#nav-box #item-' + (key_sections + 1) ).addClass('selected');
				$('#nav-box #item-' + (key_sections + 1) ).parent().siblings().children().removeClass('selected');
				switched = true;

				// Change The Gazette header image
				if (key_sections === 0) {
					$('.header .logos a img').attr('src', '/Includes/data/imgs/gazette-g.png');
					if ( $(window).width() > 850 ) {
						$('#nav-box').fadeIn();
					}
					$('.header h1').fadeIn();
				}
			}
		}, this);

		if (!switched) {
			$('.header h1').hide();
			if ( $(window).width() > 850 ) {
				$('#nav-box').fadeOut();
			}
			$('.header .logos a img').attr('src', '/Includes/data/imgs/gazette-logo-inverse.png');
		}
	// Close scroll event
	});
// Close toggle headers
};

// Loop through photos
// And adjust background-size depending on if its 
// A vertical or horizontal photo
function adjustPhotos() {
	// Get window size
	winW = $(window).width();
	winH = $(window).height();

	// Keep minimum height 550
	if (winH <= 550) {
		winH = 550;
	}

	_.each($('.bcg'), function(value, key) {
		// Make first image 100% height
		if (key === 0) {
			winH = $(window).height();
		// Otherwise 75%
		} else {
			// Desktop
			if ( $(window).width() > 600 ) {
				winH = $(window).height() * 0.75;
			// Mobile
			} else {
				winH = $(window).height() * 0.5;
			}
		}

		$(value).height(winH);

		var img = new Image();
		var img_this = this;

		// Load image
		img.onload = function() {
		 	var img_container_height =  winH;

			// Make photo high enough
			// If we have a vert long image
			if (this.height > img_container_height) {
				$(img_this).css({
		 			'background-size': winW + 'px auto'
				});
			}
		}

		img.src = $(value).css('background-image').replace('url(', '').replace(')','');
	}, this);
};

// Resize photos, sections
function adjustWindow(){
	// Init Skrollr
	var s = skrollr.init({
		forceHeight: false,

		// Forces mobile version to be off
		mobileCheck: function() {
			return false;
		}
	});

	// Resize our slides
	adjustPhotos();

	// Refresh Skrollr after resizing our sections
	s.refresh($('.homeSlide'));
// Close adjust window
}

// Calls everything we need to run the page
function loadPage(state) {
	// Resize sections
	adjustWindow();
		    
	// Fade in sections
	$('body').removeClass('loading').addClass('loaded');

	if (state === 'initial') {
		// Add headers to top of page as you scroll down
		toggleHeaders();

		// Add embeds to page
		addEmbeds();
	} else {
		if ( $(window).width() > 851 ) {
			$('#nav-box').show();
		} else {
			$('#nav-box').hide();
		}

		// Adjust close, caption boxes if we have a fullscreen image
		if (fullscreen_image === true) {
			openFullScreenImage(fullscreen_button, 'resize');
		}
	}
}