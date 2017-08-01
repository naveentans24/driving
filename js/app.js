
/**
Core script to handle the entire layout and base functions
**/

var App = function() {

	"use strict";
	
	// Vars
	var layoutColorCodes = {
		'gray': 	'#666666',
		'black':   	'#111111',
		'yellow': 	'#fdb83d'
	};

	// handle respsonsive layout
	var handleResponsive = function() {
	
		//------ header
	
		// nav toggling
		$('#nav-toggle').click(function() {
			// save #header width to calculate scrollbar width
			var headerWidth = $("#header").innerWidth();
			// toggle class
			$('html, #header').toggleClass('nav-open');
			if ($("#header").hasClass("nav-open")){
				// calculate scrollbar width
				var scrollBarWidth = $("#main-nav").innerWidth() - headerWidth;
				$("body,#header").css("margin-right",scrollBarWidth+"px");
				// shift nav toggle to right (transition via css)
				$("#nav-toggle").css("margin-right",-scrollBarWidth+"px");
			} else {
				$("body,#header,#nav-toggle").removeAttr("style");
			}
		});
		
		// distinguish betweem swipe an click event on touch devices (to prevent srcoll swipe from triggering :active state)
		var clicked;
		$(".touch #main-nav a").on('touchstart', function(e){
			clicked = true;
		}).on('touchmove', function(e){
			// mouse moved = no click
			clicked = false;	
		}).on('touchend', function(e){
			e.preventDefault();
			if (clicked === true){ 
				// active state via class
				$(this).addClass("active");
				// store anchor href
				var goTo = this.getAttribute("href");
				// redirect
			    setTimeout(function(){
			         window.location = goTo;
			    },300);
			}
		});
		
		
		//------ handle for breakpoints change
		
		var handleElements = function() {

			// Remove phone-navigation
			if ($('body').hasClass('nav-open')) {
				$('body').toggleClass('nav-open');
			}

			// Add additional scrollbars
			//handleScrollbars();
		}
		
		
		//------ handles responsive breakpoints
		
		$(window).setBreakpoints({
			breakpoints: [544, 768, 992, 1440]
		});

		$(window).bind('exitBreakpoint544', function() {
			handleElements();
		});
		$(window).bind('enterBreakpoint544', function() {
			handleElements();
		});

		$(window).bind('exitBreakpoint768', function() {
			handleElements();
		});
		$(window).bind('enterBreakpoint768', function() {
			handleElements();
		});

		$(window).bind('exitBreakpoint992', function() {
			handleElements();
		});
		$(window).bind('enterBreakpoint992', function() {
			handleElements();
		});

		$(window).bind('exitBreakpoint1440', function() {
			handleElements();
		});
		$(window).bind('enterBreakpoint1440', function() {
			handleElements();
		});

	
	}
	
	
	// handle headlines
	var handleHighlightedHeadlines = function(){
		// wrap content with span
		$("#content-header h1, #content-header h2, .block-teaser h2, .block-news h4").each(function(){
			var headline = $(this);
			headline.wrapInner("<span></span>");
			// reveal headline
			headline.css("visibility","visible");
		});
	};
	
	
	// handle overlaying headlines
	var handleOverlayingHeadlines = function(){
		// template #1 - tranfer image height to headline min-height
		if($(".block-template-1").length){
			$(".block-template-1").each(function(){
				var headline = $(this).find(".headline");
				var imgWrap = $(this).find(".img-wrap");
				var headlineMarginTop = headline.offset().top - imgWrap.offset().top;
				headline.css("min-height", (imgWrap.height() - headlineMarginTop)+"px");					
			});
		};
		// template #2 - tranfer image height to headline min-height
		if($(".block-template-2").length){
			$(".block-template-2").each(function(){
				var headline = $(this).find(".headline").removeAttr("style");
				var imgWrap = $(this).find(".img-wrap").removeAttr("style");
				if (headline.height() > imgWrap.height()){
					imgWrap.css("height", headline.height()+"px");
				} else {
					headline.css("height", imgWrap.height()+"px");
				}				
			});
		};
	};
	
	
	// handle overlapping headlines
	var handleOverlappingHeadlines = function(){
		$("#content-header h1, #content-header h2, .block-teaser h2").each(function(){
			var $headline = $(this),
				$wrap = $(this).closest(".container-fluid");
			// reset first
			$headline.removeAttr("class");
			// resize headline via class
			// step 1
			if ($headline.innerWidth() > $wrap.width()){
				$headline.addClass("resize-small");
			}
			// step 2
			if ($headline.innerWidth() > $wrap.width()){
				$headline.addClass("resize-smaller");
			}
		});
	};
		
		
	// handle boxes (home)
	var handleHomeBoxes = function() {
		// sync height of boxes	
		if ($("#home-masonry").length){
			var maxHeight = 0;
			// reset height
			$("#home-masonry .box > .inner-wrap").removeAttr("style");
			// walk through boxes
			$("#home-masonry .box").each(function(){
				var boxContent = $(this).find(" > .inner-wrap"); // console.log(boxContent.innerHeight());
				if (boxContent.innerHeight() > maxHeight){
					maxHeight = boxContent.innerHeight();
				}
			});
			// set height
			$("#home-masonry .box > .inner-wrap").css("height", maxHeight+"px");
		}
	}
	
	
	// handle forms
	var handleForms = function() {
		/* nothing so far */
	}
	
	
	// handle fullsize-inside-container
	var handleFullsizeInside = function() {
		$(window).load(function() {
			$(".block .container .fullsize, .block .container-fluid .fullsize").each(function(){
				var fullsizeElement = $(this);
				var parentBlock = $(fullsizeElement).closest(".block");
				fullsizeElement.wrap('<div class="fullsize-wrap"></div>');
				// wrap content in with container
				if (fullsizeElement.hasClass("content-fluid")){
					fullsizeElement.wrapInner('<div class="container-fluid"></div>');
				} else {
					fullsizeElement.wrapInner('<div class="container"></div>');
				}
				fullsizeElement.parent().css("height",fullsizeElement.innerHeight()+"px");
				// is first child ? = no padding top
				if (parentBlock.find(".container .fullsize-wrap").is(':first-child')){
					parentBlock.css("padding-top",0);
				}
				// is last child ? = no padding bottom
				if (parentBlock.find(".container .fullsize-wrap").is(':last-child')){
					parentBlock.css("padding-bottom",0);
				}
			});
		});
		
		$(window).resize(function() {
			$(".block .fullsize-wrap").each(function(){
				$(this).css("height",$(this).children(".fullsize").innerHeight()+"px");
			});
		});
	}
	
	
	// handle accordions
	var handleAccordions = function() {
		$(".accordion dt").click(function(e){
			$(this).toggleClass("open");
			$(this).next().slideToggle();
		});
	}
	
	
	// handle events-calendar
	var handleEventsCalendar = function() {
		$(".filter select").change(function(e){
			if ($(this).val() != "reset" && $(this).val() != ""){
				var filterId = $(this).val();
				// disable all (except month)
				$("ul.calendar li:not(:has(.month))").addClass("filtered");
				// highlight selected
				$('ul.calendar *[data-type="'+filterId+'"]').closest("li").removeClass("filtered");
			} else if ($(this).val() == "reset"){
				$("ul.calendar li").removeClass("filtered");
				$(this).selectpicker('deselectAll');
				e.preventDefault();
			}
		});
	}
	
	
	// handle misc toggles
	var handleToggles = function() {
		// multifunctional toggle
		$(".toggle").click(function(e){
			// target id committed via data attribute
			var targetId = $(this).data("toggle");
			var target = $("#"+targetId);
			// only deals with target hidden on load
			if (!$(this).hasClass("toggle-visible") && !target.is(":visible")){
				target.show();
				$(this).addClass("toggle-visible");
			}
			else if ($(this).hasClass("toggle-visible") && target.is(":visible")){
				target.hide();
				$(this).removeClass("toggle-visible");
			}
		});
		// pictograms toggle
		$("ul.pictograms > li").click(function(e){
			// close all
			$("ul.pictograms > li").not(this).find(".overlay").hide();
			// toggle
			$(this).find(".overlay").toggle();	
		});
	}
	
	
	
	// handle misc toggles	
	var handleMaps = function() {
								
		$(".block-map .map").each(function(){
		    
		    var fahrschuleLoc, loc, mapOptions, map, icon, iconHome, infoBoxOffsetX,
		    	mapId = $(this).attr("id");
	    
		    // ------ MAP STYLING ------
		    //var mapStyle = [ { "featureType": "administrative", "elementType": "labels", "stylers": [ { "color": "#FFFFFF" }, { "visibility": "simplified" } ] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [ { "visibility": "simplified" }, { "color": "#303030" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#000000" }, { "visibility": "simplified" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "simplified" }, { "color": "#FFFFFF" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "visibility": "simplified" }, { "color": "#808080" } ] }, { "featureType": "road", "elementType": "labels.text", "stylers": [ { "color": "#FFFFFF" }, { "visibility": "simplified" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "all", "stylers": [ { "color": "#303030" } ] } ];
		    var mapStyle = [ { "featureType": "administrative", "elementType": "labels", "stylers": [ { "color": "#FFFFFF" }, { "visibility": "simplified" } ] }, { "featureType": "administrative.country", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.province", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.locality", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.locality", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [ { "visibility": "simplified" }, { "color": "#303030" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#000000" }, { "visibility": "simplified" } ] }, { "featureType": "landscape.natural.landcover", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape.natural.landcover", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape.natural.terrain", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "simplified" }, { "color": "#FFFFFF" } ] }, { "featureType": "poi.attraction", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.attraction", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.business", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.sports_complex", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "visibility": "simplified" }, { "color": "#808080" } ] }, { "featureType": "road", "elementType": "labels.text", "stylers": [ { "color": "#FFFFFF" }, { "visibility": "simplified" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#fabb00" } ] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#ffffff" } ] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [ { "color": "#ffffff" }, { "visibility": "on" } ] }, { "featureType": "transit.station.rail", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit.station.rail", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit.station.rail", "elementType": "labels.text.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit.station.rail", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "all", "stylers": [ { "color": "#303030" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] } ];
		    
			// ------ MAP CENTER ------
			fahrschuleLoc = $(this).data("map-center").split(",");
		    loc = new google.maps.LatLng(fahrschuleLoc[0],fahrschuleLoc[1]);
		    
		    // ------ MAP OPTIONS ------
		    mapOptions = {
				zoom: 13,
				center: loc,
				styles: mapStyle,
				backgroundColor: '#111111',
				panControl: false,
				zoomControl: true,
				zoomControlOptions: {
			        position: google.maps.ControlPosition.RIGHT_CENTER
			    },
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				overviewMapControl: true,
				scrollwheel: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		    
		    // ------ MAP INIT ------
			var map = new google.maps.Map(document.getElementById(mapId), mapOptions);			
		    
		    // ------ MARKER DATA -------
		    var locations = eval($(this).data("locations")); // console.log(locations);
			
			// ------ ICON ------
			icon = new google.maps.MarkerImage("/img/maps/maps-pin.png", null, null, null, new google.maps.Size(26,34));
			infoBoxOffsetX = "-10px";
			    
			// ------ MARKERS ------
			
			var markers = [],
				marker;
			
			var counter = 0;
			$.each(locations, function (key, data) {
				//var location = locations[i]; console.log("Location: "+location[0]+" / "+location[1]);
				var locationLoc = new google.maps.LatLng(data.lat, data.long);
				// set marker
				marker = new google.maps.Marker({
			        position: locationLoc,
			        map: map,
			        icon: icon,
			        title: data.text,
			        zIndex: counter
			    });
			    // box text
			    var boxText = document.createElement("div");
			    //these are the options for all infoboxes
	            var infoboxOptions = {
		            content: boxText,
					disableAutoPan: false,
					maxWidth: 0,
					pixelOffset: new google.maps.Size(-120, 25),
					zIndex: null,
					boxStyle: { opacity: 1, width: "240px" },
					//closeBoxMargin: "2px 2px 2px 2px",
					//closeBoxURL: "images/maps-close.png",
					infoBoxClearance: new google.maps.Size(1, 1),
					isHidden: false,
					pane: "floatPane",
					enableEventPropagation: false
		    	};
			    // push marker
			    markers.push(marker);
			    //define the text and style for all infoboxes
				//boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background:#333; color:#FFF; font-family:Arial; font-size:12px; padding: 5px; border-radius:6px; -webkit-border-radius:6px; -moz-border-radius:6px;";
				boxText.innerHTML = '<div class="maps-tooltip" style="margin-left: '+infoBoxOffsetX+'"><div class="inner-wrap">'+data.text+'</div></div>';
			    // set infobox
			    markers[counter].infobox = new InfoBox(infoboxOptions);
				//markers[i].infobox.isOpen = false;
				// listener
				google.maps.event.addListener(marker, 'click', (function(marker, counter) {
					return function() {
						// close all
						for (var h = 0; h < markers.length; h++ ) {
							if(markers[h].infobox){
								markers[h].infobox.close();
							}
					    }
						markers[counter].infobox.open(map, this);
						//map.panTo(markers[counter].position);
					}
				})(marker, counter));
				counter++;
			});
					
		});
	};
	
	
	// handle scroll to	
	var handleScrollTo = function() {
		$('[data-scroll-to]').click(function(event){
			// prevent default
			event.preventDefault();
			// target
			var $target = $("#"+$(this).data('scroll-to')),
				target_top = $target.offset().top,
				buffer = $('#header').height();
			// scroll to
			if (target_top > 0) target_top -= buffer; // prevent covering by fixed header 
			$('html,body').stop().animate({scrollTop:target_top},500);
		});
	}
	
	
	// handle resize events
	var handleResizeEvents = function() {
		var resizeTimer;
		$(window).resize(function(){
			handleHomeBoxes();
			handleOverlayingHeadlines();
			
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				// run code, when resizing has "stopped"
				handleOverlappingHeadlines();
			}, 250);
		});
	}
	
	
	// handle all loaded events
	var handleAllLoadedEvents = function() {
		$(window).load(function(){
		   handleHomeBoxes();
		   handleOverlayingHeadlines();
		   handleOverlappingHeadlines();
		});
	}
	

	return {

		//main function to initiate template pages
		init: function() {
			//core handlers
			handleResponsive(); // sidebar-toggle-button, Breakpoints, etc.
			handleHighlightedHeadlines();
			handleForms();
			handleFullsizeInside();
			handleAccordions();
			handleEventsCalendar();
			handleToggles();
			handleMaps();
			handleScrollTo();
			handleResizeEvents();		
			handleAllLoadedEvents();	
		},
		
		getLayoutColorCode: function(name) {
			if (layoutColorCodes[name]) {
				return layoutColorCodes[name];
			} else {
				return '';
			}
		}

	};

}();

