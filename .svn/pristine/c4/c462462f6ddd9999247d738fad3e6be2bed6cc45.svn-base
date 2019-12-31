(function($, window, undefined) {
	$.fn.DataLazyLoad = function(options) {
		var elements = $(this);
		var settings = {
			//Data Load Offset
			offset: 100,
			//Load data callback
			load: function() {},
			//Which page to load
			page: 2
		}
		if(options) {
			$.extend(settings, options);
		}
		var winHeight = $(elements).height();
		var locked = false;
		$(elements).scroll(function() {
			var scrollTop = $(elements).scrollTop();
			var sheight = $("#myboxx").height();
			var offset = sheight - (scrollTop + winHeight);
			if(offset < settings.offset && !locked) {
				locked = true;
				settings.load(settings.page, function() {
					locked = false;
				});
			}
		});

	}
	$.fn.DataLazyLoad = function(options) {
		var elements = $(this);
		var settings = {
			//Data Load Offset
			offset: 100,
			//Load data callback
			load: function() {},
			//Which page to load
			page: 2
		}
		if(options) {
			$.extend(settings, options);
		}
		//The height of the browser window
		var winHeight = $(elements).height();
		var locked = false;
		var unLock = function(nextPage) {
			//Next load page, 0 is end
			if(nextPage > 0) {
				settings.page = nextPage;
				locked = false;
			}
		}
		$(elements).scroll(function() {
			var scrollTop = $(elements).scrollTop();
			var sheight = $("#myboxx").height();
			var offset = sheight - (scrollTop + $(".mybox").height());
			if(offset < settings.offset && !locked) {				
				locked = true;
				settings.load(settings.page, unLock);
			}
		});
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();
			//elements height + elements top - (scrollbar top + browser window height)
			var offset = $(elements).offset().top + $(elements).height() - (scrollTop + $(window).height());
			if(offset < settings.offset && !locked) {
				locked = true;
				settings.load(settings.page, unLock);
			}
		});
	}
})(jQuery, window);