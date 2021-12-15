document.addEventListener('DOMContentLoaded', function(){
	const isMobile = $(window).width() < 992;

	// Page Nav Highlighting
	if ($('.top-nav').length > 0) {
		// Cache selectors
		let topMenu = $('.top-nav ul');

		let lastId,
			topMenuHeight = 0,
			// All list items
			menuItems = topMenu.find("a"),
			// Anchors corresponding to menu items
			scrollItems = menuItems.map(function() {
				var item = $($(this).attr("href"));
				if (item.length) {
					return item;
				}
			});

		// Bind to scroll
		$(window).scroll(function() {
			let fromTop = $(this).scrollTop() + $(window).height() * 0.5;

			let cur = scrollItems.map(function() {
				if ($(this).offset().top < fromTop){
					// if ($(this).offset().top + $(this).outerHeight() > $(window).scrollTop() + $(window).height()) {
						return this;
					// }
				}
			});

			cur = cur[cur.length - 1];
			let id = cur && cur.length ? cur[0].id : "";

			if (lastId !== id) {
				lastId = id;
				menuItems.removeClass("active");
				menuItems.filter("[href='#" + id + "']").addClass("active");
			}
		});
	}

	// Accordions
	// const toggleAccordion = (el) => {
	// 	let closeText = 'Close accordion';
	// 	let openText = 'Open accordtion';

	// 	let btn = $(el).find('> .ac-header > .ac-opener');

	// 	$(el).find('> .ac-content').stop().slideToggle(300);
	// 	$(el).toggleClass('opened');

	// 	if ( $(el).find('.slick-slider').length > 0 ) {
	// 		$(el).find('.slick-slider').slick('setPosition');
	// 	}

	// 	if ( btn.attr('aria-expanded') == 'false' ) {
	// 		btn.attr({
	// 			'aria-expanded': 'true',
	// 			'aria-label': closeText
	// 		});
	// 	} else{
	// 		btn.attr({
	// 			'aria-expanded': 'false',
	// 			'aria-label': openText
	// 		});
	// 	}
	// }

	// $('.accordion, .js-accordion').each(function(i, el){
	// 	$(el).find('> .ac-header, > .ac-header > .ac-opener').click(function(e){
	// 		e.preventDefault();
	// 		e.stopPropagation();

	// 		toggleAccordion( $(el) );
	// 	});

	// 	if ($(el).hasClass('opened-on-load')) {
	// 		$(el).find('.ac-header').trigger('click');
	// 	}
	// });

	// Tabs
	// function goToTab(tabId, handler){
	// 	if (handler == undefined) {
	// 		handler = false;
	// 	}

	// 	let dest = $( tabId );
	// 	dest.stop().fadeIn(300).siblings().hide(0);

	// 	$('[data-tab="'+tabId+'"]').addClass('current').siblings().removeClass('current');
	// }

	// $("[data-tab]").click(function(e){
	// 	e.preventDefault();
	// 	let dest = $(this).data('tab');

	// 	goToTab(dest, $(this));

	// 	// $(dest).find('.slick-slider').slick('setPosition');
	// });

	// $(".tabs-nav").each(function(i, el){
	// 	$(el).find('[data-tab]').eq(0).click();
	// });

	// $('.tabs-select').on('change', function(){
	// 	goToTab($(this).val());
	// });

	// function getMaxOfArray(numArray) {
	// 	return Math.max.apply(null, numArray);
	// }

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: `<button type="button" class="slick-arrow slick-prev" aria-label="Previous">
						<svg class="btn-icon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="m19.47 29.03-8.94-8.95H30.5v-4.16H10.53l8.94-8.95-2.94-2.94L2.55 18l13.98 13.97 2.94-2.94Z" fill="#fff"/></svg>
						<svg class="btn-outline" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 40"><path d="M9.25 14.08c-.78.93-13.98 11.82-4.92 19.53 9.06 7.72 52.11 7.24 55.83-15.35C63.87-4.34 19.64.66 14.76 4.9" stroke="#00DAD0" stroke-width="2" stroke-linecap="round"/></svg>
					</button>`,
		nextArrow: `<button type="button" class="slick-arrow slick-next" aria-label="Next">
						<svg class="btn-icon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="m16.53 29.03 2.94 2.94L33.45 18 19.47 4.03l-2.94 2.94 8.94 8.95H5.5v4.16h19.97l-8.94 8.95Z" fill="#fff"/></svg>
						<svg class="btn-outline" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 40"><path d="M9.25 14.08c-.78.93-13.98 11.82-4.92 19.53 9.06 7.72 52.11 7.24 55.83-15.35C63.87-4.34 19.64.66 14.76 4.9" stroke="#00DAD0" stroke-width="2" stroke-linecap="round"/></svg>
					</button>`
	}

	$('.first-screen-slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		autoplay: true,
		autoplaySpeed: 2000
	});

	$('.products-slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		autoplay: true,
		autoplaySpeed: 1500
	});

	$('.reviews-slider-scope').each(function(i, scope){
		const slider = $(scope).find('.reviews-slider');

		slider.on('init', function (e, slick) {
			$(scope).find('.slider-nav .current').text('1');
			$(scope).find('.slider-nav .total').text(slick.slideCount);
		});

		slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			$(scope).find('.slider-nav .current').text(nextSlide + 1);
		});

		slider.slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
			autoplay: false,
			...arrowsButtons,
			appendArrows: $(scope).find('.slider-nav')
		});

		equalSlideHeight( slider );
	});

	$('.about-delivery-component').each(function(i, cmp){
		const slider = $(cmp).find('.cmp-slider');
		const sliderNav = $(cmp).find('.cmp-nav');

		slider.on('init', function (e, slick) {
			sliderNav.find('[data-slide="0"]').addClass('active');
		});

		slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			sliderNav.find('[data-slide]').removeClass('active').filter(`[data-slide="${nextSlide}"]`).addClass('active');
		});

		slider.slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			fade: true
		});

		sliderNav.find('[data-slide]').click(function(e){
			e.preventDefault();

			slider.slick('slickGoTo', +$(this).data('slide'));
		});
	});

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let topNavHeight = 57;

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - topNavHeight
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$('.menu-opener').toggleClass('active');
		$('.header').toggleClass('nav-opened');
		$('.mobile-top-nav').toggleClass('opened');
	});

	// $('.mobile-top-nav').each(function(i, el){
	// 	$(el).find('.menu-item-has-children > a').click(function(e){
	// 		e.preventDefault();

	// 		$(this).toggleClass('opened').siblings('.sub-menu').stop().slideToggle(300);
	// 	});
	// });

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 0
			? header.classList.add('sticky')
			: header.classList.remove('sticky');
		};
	}

	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);

	// Modals
	$('.modal').css('display','block');

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close, .js-modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		if ($(this).data('modal-tab') != undefined) {
			goToTab($(this).data('modal-tab'));
		}

		showModal( $(this).data('modal') );
	});

	// $('[data-video-modal]').click(function(e) {
	// 	e.preventDefault();
	// 	e.stopPropagation();

	// 	let videoId = $(this).data('video-modal');
	// 	let videoType = $(this).data('video-type');

	// 	if (videoType == 'youtube') {
	// 		$('#modal-video-iframe').removeClass('vimeo youtube mp4').addClass('youtube').append('<div class="video-iframe" id="' + videoId + '"></div>');
	// 		createVideo(videoId, videoId);
	// 	} else if (videoType == 'vimeo') {
	// 		$('#modal-video-iframe').removeClass('vimeo youtube mp4').addClass('vimeo').html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/' + videoId + '?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
	// 	} else if (videoType == 'mp4'){
	// 		$('#modal-video-iframe').removeClass('vimeo youtube mp4').addClass('vimeo').html(`<video src="${videoId}" playsinline autoplay controls></video>`);
	// 	}

	// 	hideModal('.modal');

	// 	showModal("#video-modal");
	// });

	// var player;

	// function createVideo(videoBlockId, videoId) {
	// 	player = new YT.Player(videoBlockId, {
	// 		videoId: videoId,
	// 		playerVars: {
	// 			// 'autoplay':1,
	// 			'autohide': 1,
	// 			'showinfo': 0,
	// 			'rel': 0,
	// 			'loop': 1,
	// 			'playsinline': 1,
	// 			'fs': 0,
	// 			'allowsInlineMediaPlayback': true
	// 		},
	// 		events: {
	// 			'onReady': function(e) {
	// 				// e.target.mute();
	// 				// if ($(window).width() > 991) {
	// 				setTimeout(function() {
	// 					e.target.playVideo();
	// 				}, 200);
	// 				// }
	// 			}
	// 		}
	// 	});
	// }
});


function getScrollWidth() {
	// create element with scroll
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;

	div.remove();

	return scrollWidth;
}

let bodyScrolled = 0;

function showModal(modal) {
	$(modal).addClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').addClass('modal-visible')
		.scrollTop(bodyScrolled)
		.css('padding-right', getScrollWidth());
}

function hideModal(modal) {
	$(modal).removeClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').removeClass('modal-visible')
		.scrollTop(bodyScrolled)
		.css('padding-right', 0);
}