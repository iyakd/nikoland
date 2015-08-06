// $('HTML').addClass('JS');

$(function (){
	var interactBG = $("#interactBG"),
		$promoSlider = $('#promoSlider');

	$('#fullpage').fullpage({
		verticalCentered: true,
		css3: true,
		scrollingSpeed: 700,
		loopBottom: false,
		loopTop: false,
		afterRender: function(){
			$('#bgvid').get(0).play();

			$('#promoSlider').slick({
				centerPadding: '60px',
				infinite: false,
				slidesToShow: 3,
				centerMode: true,
				slidesToScroll: 1,
				responsive: [
					{
					breakpoint: 1281,
						settings: {
							slidesToShow: 2
						}
					},
					{
					breakpoint: 600,
						settings: {
							slidesToShow: 1
						}
					}					
					]
			});

			$("#interactBG").interactive_bg({
				strength: 25,
				scale: 1.07,
				animationSpeed: "400ms"
			});
		},
		afterResize: function(){
			var pluginContainer = $(this),
				win = $(window);

			$("#interactBG").find('.ibg-bg').css({
				width: win.outerWidth(),
				height: win.outerHeight()
			});
		}
	});
});


(function($){
  
  var defaults = {
	strength: 50,
	scale: 1.07,
	animationSpeed: "100ms",
	contain: true,
	wrapContent: false
  };  
  
  $.fn.interactive_bg = function(options){
	return this.each(function(){
	  var settings = $.extend({}, defaults, options),
		  el = $(this),
		  h = el.outerHeight(),
		  w = el.outerWidth(),
		  sh = settings.strength / h,
		  sw = settings.strength / w,
		  has_touch = 'ontouchstart' in document.documentElement;
		  
	  if (settings.contain === true) {
		el.css({
		  overflow: "hidden"
		});
	  }
	  // Insert new container so that the background can be contained when scaled.
	  
	  if (settings.wrapContent === false) {
		el.prepend("<div class='ibg-bg'></div>");
	  } else {
		el.wrapInner("<div class='ibg-bg'></div>");
	  }
	  
	  
	  
	  // Set background to the newly added container.
	  
	  if (el.data("ibg-bg") !== undefined) {
		el.find("> .ibg-bg").css({
		  background: "url('" + el.data("ibg-bg") + "') no-repeat center center",
		  "background-size": "cover",
		});
	  }
	  
	  el.find("> .ibg-bg").css({
		width: w,
		height: h
	  });
	  
	 
	 function deviceMotionHandler(eventData) {
		var accX = Math.round(event.accelerationIncludingGravity.x*10) / 10,
			accY = Math.round(event.accelerationIncludingGravity.y*10) / 10,
			xA = -(accX / 10) * settings.strength,
			yA = -(accY / 10) * settings.strength,
			newX = -(xA*2),
			newY = -(yA*2);
			
			el.find("> .ibg-bg").css({
			  "-webkit-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
			  "-moz-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
			  "-o-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
			  "transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")"
			});    

	 }
	  
	  if(has_touch || screen.width <= 699) {
		// For Mobile
		// Add support for accelerometeron mobile
		window.addEventListener('devicemotion', deviceMotionHandler, false);
		
	  } else {
		// For Desktop 
		// Animate only scaling when mouse enter
		el.mouseenter(function(e) {
		  if (settings.scale != 1) el.addClass("ibg-entering");
		  el.find("> .ibg-bg").css({
			"-webkit-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + ",0,0)",
			"-moz-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + ",0,0)",
			"-o-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + ",0,0)",
			"transform": "matrix(" + settings.scale + ",0,0," + settings.scale + ",0,0)",
			"-webkit-transition": "-webkit-transform " + settings.animationSpeed + " linear",
			"-moz-transition": "-moz-transform " + settings.animationSpeed + " linear",
			"-o-transition": "-o-transform " + settings.animationSpeed + " linear",
			"transition": "transform " + settings.animationSpeed + " linear"
		  }).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){

			// This will signal the mousemove below to execute when the scaling animation stops
			el.removeClass("ibg-entering");
		  });
		}).mousemove(function(e){
		  // This condition prevents transition from causing the movement of the background to lag
		  if (!el.hasClass("ibg-entering") && !el.hasClass("exiting")) {
			var pageX = e.pageX || e.clientX,
				pageY = e.pageY || e.clientY;

				pageX = (pageX - el.offset().left) - (w / 2);
				pageY = (pageY - el.offset().top) - (h / 2);
				
			var newX = ((sw * pageX)) * - 1,
				newY = ((sh * pageY)) * - 1;
			// Use matrix to move the background from its origin
			// Also, disable transition to prevent lag
			el.find("> .ibg-bg").css({
			  "-webkit-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
			  "-moz-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
			  "-o-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
			  "transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")"
			});
		  }
		}).mouseleave(function(e) {
		  if (settings.scale != 1) el.addClass("ibg-exiting");
		  // Same condition applies as mouseenter. Rescale the background back to its original scale
		  el.addClass("ibg-exiting").find("> .ibg-bg").css({
			"-webkit-transform": "matrix(1,0,0,1,0,0)",
			"-moz-transform": "matrix(1,0,0,1,0,0)",
			"-o-transform": "matrix(1,0,0,1,0,0)",
			"transform": "matrix(1,0,0,1,0,0)",
			"-webkit-transition": "-webkit-transform " + settings.animationSpeed + " linear",
			"-moz-transition": "-moz-transform " + settings.animationSpeed + " linear",
			"-o-transition": "-o-transform " + settings.animationSpeed + " linear",
			"transition": "transform " + settings.animationSpeed + " linear"
		  }).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			el.removeClass("ibg-exiting");
		  });
		});
	  }
	});
	
  };
  
  
})(jQuery);