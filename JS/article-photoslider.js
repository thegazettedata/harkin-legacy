// Universally available variable for the first load of these sections
var InitialLoad = true;


// Fires lazy load and loads photo 
// If we're on the feature article
function fireLazyLoad() {
	if (feature_article === true) {
		// Fire lazyload
      	$(window).trigger('scroll');
      	// Back up scroll just in case that doesn't fire
      	var y = $(window).scrollTop();
      	$(window).scrollTop( y + 1 );
	}    
};


function photoSliderInit(){
	//Check if it is the first click to the right
	var firstClick = true;
	//Initialize a photo counter
	var photo_counter = 0;
	//Start on the first photo
	var current_photo = 1;

	//Count how many photos have been made by the photos pbo files
	$(".mediawell-photo").each(function(index, value){
		if (!feature_article) {
			photo_counter ++;
		} else if ( feature_article && $(value).parent().parent().attr('id') === 'extrapictures' ) {
			photo_counter ++;
		}
	});

	//This section creates the buttons. We only initialize this if there is a need for the photo slider
	if((photo_counter > 1)){
		if(InitialLoad){
			//Append the left arrow
			$("#photo-selector").append('<div id="left-photo" class="arrow fa fa-chevron-left"></div>');
			//Loop through the photos and add circles for how many photos exist
			for(var x = 1; x <= photo_counter; x++){
				$("#photo-selector").append('<div id="photo-circle-' + x + '" class="fa fa-circle"></div>');
			}
			//Add the right arrow
			$("#photo-selector").append('<div id="right-photo" class="arrow fa fa-chevron-right"></div>');
			//Select the first photo
			$("#photo-circle-1").addClass("selected");
			InitialLoad = false;
		}
	}
	
	$(".fa-circle").click(function(){
		var id = $(this).attr("id");
		var number = id.substr(13, id.length);

		$("#art_photo_" + current_photo).hide("slide", { direction: "right" }, 250, fireLazyLoad);
				//Ensure animation is done
				$( "#art_photo_" + current_photo ).promise().done(function() {
					//Slide in new photo
					$("#art_photo_" + number).show("slide", { direction: "left" }, 250), fireLazyLoad;
				});
		current_photo = number;
		$(".fa-circle").removeClass("selected");
		$("#photo-circle-"+current_photo).addClass("selected");
	});

	//Launch an event listener for the arrows
	$(".arrow").click(function(){
		var id = $(this).attr("id");
		
		//Left arrow selected
		if(id == "left-photo"){
			//Make sure we are not at the beginning of the slideshow
			if(current_photo != 1){
				//Subtract from current position
				current_photo--;
				//Slide out current photo
				$("#art_photo_" + (current_photo + 1)).hide("slide", { direction: "right" }, 250, fireLazyLoad);
				//Ensure animation is done
				$( "#art_photo_" + (current_photo + 1) ).promise().done(function() {
					//Slide in new photo
					$("#art_photo_" + current_photo).show("slide", { direction: "left" }, 250, fireLazyLoad);
				});
				//Remove the selected class from the circles
				$(".fa-circle").removeClass("selected");
				//Select the new photo
				$("#photo-circle-"+current_photo).addClass("selected");
				//var containerHeight = ($("#art_photo_" + current_photo).outerHeight() + $("#art_photo_" + current_photo + " .caption").outerHeight() + $("#photo-selector").outerHeight());
				//$(".picture-holder").css("height", containerHeight);
			}
		}

		//Same as the left side, just in reverse
		if(id == "right-photo"){
			//Checking if it is the first click to the right to set the height.
			if(firstClick){
				firstClick = false;
				var height = $("#art_photo_1 .picture-holder").height();
				$(".picture-holder").css("height", height);
				//$("#mediawell-photos").css("height", height + 100);

				var width = $("#art_photo_1 .picture-holder").width();
				//Set all picture holders to that width and height so that we will ensure similarly sized photos
				$(".picture-holder").css("max-width", width);
				$("#mediawell-photos").css("max-width", width);
				$("#photo-selector").css("width", width);

			}
			if(current_photo != photo_counter){
				current_photo++;
				$("#art_photo_" + (current_photo - 1)).hide("slide", { direction: "left" }, 150, fireLazyLoad);
				$( "#art_photo_" + (current_photo - 1) ).promise().done(function() {
					$("#art_photo_" + current_photo).show("slide", { direction: "right" }, 150), fireLazyLoad;
				});
				$(".fa-circle").removeClass("selected");
				$("#photo-circle-"+current_photo).addClass("selected");
			}
		}
	// Close click
	});	
// Close photoSliderInit
}