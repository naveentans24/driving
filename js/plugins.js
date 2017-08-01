/**
 * Core script to handle plugins
 */

var Plugins = function() {

	"use strict";

	/**************************
	 * Input Masking          *
	 **************************/
	 
	var initInputMasking = function() {
		
		$('input.period').mask('00:00 - 00:00', {placeholder: "00:00 - 00:00"});
		$('input.date').mask('00.00.0000');
		$('.integer input').mask('00000000000');

	}
	
	
	/**************************
	 * Input Datepicker       *
	 **************************/
	
	var initDatepicker = function() {
		
		$('.datepicker').datetimepicker({
            locale: 'de',
            dayViewHeaderFormat: 'MMM YYYY',
            format: 'DD.MM.YYYY',
            debug: true,
            tooltips: {
			    today: 'Zu Heute springen',
			    clear: 'Auswahl zurücksetzen',
			    close: 'Schließen',
			    selectMonth: 'Monat auswählen',
			    prevMonth: 'Vorheriger Monat',
			    nextMonth: 'Nächster Monat',
			    selectYear: 'Jahr auswählen',
			    prevYear: 'Vorheriges Jahr',
			    nextYear: 'Nächstes Jahr',
			    selectDecade: 'Dekade auswählen',
			    prevDecade: 'Vorherige Dekade',
			    nextDecade: 'Nächste Dekade',
			    prevCentury: 'Vorheriges Jahrhundert',
			    nextCentury: 'Nächstes Jahrhundert'
			}
        });

	}

	
	/**************************
	 * Animsition             *
	 **************************/
	 
	var initAnimsition = function() {
		$(".animsition").animsition({
			inClass: 'fade-in',
			outClass: 'fade-out',
			inDuration: 1500,
			outDuration: 800,
			linkElement: '.animsition-link',
			// e.g. linkElement: 'a:not([target="_blank"]):not([href^=#])'
			loading: true,
			loadingParentElement: 'body', //animsition wrapper element
			loadingClass: 'animsition-loading',
			loadingInner: '', // e.g '<img src="loading.svg" />'
			timeout: false,
			timeoutCountdown: 5000,
			onLoadEvent: true,
			browser: [ 'animation-duration', '-webkit-animation-duration'],
			// "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
			// The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
			overlay : false,
			overlayClass : 'animsition-overlay-slide',
			overlayParentElement : 'body',
			transition: function(url){ window.location.href = url; }
		});
	}
	 
	 
	/**************************
	 * OWL Carousel           *
	 **************************/
	 
	var initOwlCarousel = function() {
		$(".owl-carousel").each(function(){
			var el = $(this);
			// events
			el.on('initialized.owl.carousel translated.owl.carousel', function(event) {
				//console.log("owl event: initialized);
				var parent = event.target;
				var video = $(parent).find(".owl-item.active video");
				// start current video (if available)
				if (video.length){
					if (video.hasClass("autoplay")) {
						// start video automatically
						el.trigger('stop.owl.autoplay');
						video.trigger('play');
					} else {
						// show play button
						video.next(".playpause").css("visibility","visible").fadeIn();
					}
					// video end event
					video.bind("ended", function() {
						el.trigger('next.owl.carousel');	
						el.trigger('play.owl.autoplay',[6000]);
					});
				}
			});
			// init owl
		    el.owlCarousel($.extend({
			    callbacks: true,
				loop: true,
				autoplayTimeout: 6000,
				smartSpeed: 400,
				navText: ['<i class="icon-angle-left"></i>','<i class="icon-angle-right"></i>']
		    }, el.data('options')));
		    // events
			el.on('translate.owl.carousel', function(event) {
				//console.log("owl event: translate");
				var parent = event.target;
				// pause all videos
				$(parent).find("video").each(function(){
					$(this).get(0).pause();
				});
			});
		});
		
		/* triggering video on mobile devices */
		$(".owl-carousel video.autoplay",".touch").on('click', function(event){
			$(this).trigger('play');
			event.preventDefault();
		});
		
		/* attach hader owl to var */
		var headerOwl = $("#content-header .owl-carousel");
		
		/* play button */
		$(".owl-carousel .playpause").on('click', function(event){
			headerOwl.trigger("stop.owl.autoplay");
			$(this).prev("video").trigger('play');
			$(this).hide();
			event.preventDefault();
		});
		
		/* stop autoplay if content-header owl-carousel is out of viewport */
		headerOwl.isInViewport({ tolerance: 0 });
		var headerOwlItems = headerOwl.find(".owl-item:not(.cloned)").length;
		$(window).scroll(function(){
			if (headerOwl.length && headerOwlItems > 1){
	    		if (headerOwl.not(':in-viewport').length){
		    		// Header owl-carousel is not in viewport
		    		if (!headerOwl.hasClass("autoplay-stopped")){
		    			headerOwl.trigger("stop.owl.autoplay");
						headerOwl.addClass("autoplay-stopped");
						//console.log("stop owl autoplay");
					}
	    		} else {
		    		// Header owl-carousel is in viewport
		    		if (headerOwl.hasClass("autoplay-stopped")){
			    		headerOwl.trigger("play.owl.autoplay",[6000]);
						headerOwl.removeClass("autoplay-stopped");
						//console.log("start owl autoplay");
					}
	    		}
	    	}
    	}).scroll();
	}	 
	
	
	
	/**************************
	 * MASONRY                *
	 **************************/
	
	var initMasonry = function(){
		$(window).load(function(){
			// init masonry
			$(".masonry").each(function(){
				var el = $(this);
				el.prepend('<div class="grid-sizer"></div><div class="gutter-sizer"></div>');
			    el.isotope($.extend({
					itemSelector: '.box',
					transitionDuration: 0,
					percentPosition: true,
			    }, el.data('options')));
			}).css("visibility","visible");
		});
	}
	
	
	/**************************
	 * MatchHeight            *
	 **************************/
	
	var initMatchHeight = function(){
		$('*[data-mh]').matchHeight();
	}
	
	
	/**************************
	 * Slimscroll             *
	 **************************/
	
	var initSlimscroll = function(){
		var wheelStepInt = 7;
		if ($("html").hasClass("touch")){
			wheelStepInt = 45;
		}
		// inject slimscroll wraps
		$('.block-events-calendar ul .inner-wrap').wrapInner('<div class="slimscroll"></div>');
		// init slimscroll
		$('.slimscroll').slimscroll({
			'height': '100%',
			wheelStep: wheelStepInt,
			alwaysVisible: true
		});
	}
	
	
	/**************************
	 * Custom Select          *
	 **************************/
	
	var initCustomSelects = function(){
		
		$(".custom-select").each(function(){
			var el = $(this);
			el.selectpicker({
				/* ... */
			});
		});
	}
	
	
	/**************************
	 * Labelholder            *
	 **************************/
	
	var initLabelHolder = function() {
		$('.labelholder').labelholder();
	}
	
	
	

	return {

		// main function to initiate all plugins
		init: function () {
			initInputMasking();
			initDatepicker();
			initAnimsition();
			initOwlCarousel();
			initMasonry();
			initMatchHeight();
			initSlimscroll();
			initCustomSelects();
			initLabelHolder();
		},
		

	};

}();