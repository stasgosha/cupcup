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

	// Info block
	function setTooltipPosition(){
		if ($(window).width() > 575) {
			return false;
		}

		$('.info-tooltip').each(function(i, el){
			const xPos = $(el).offset().left;

			$(el).find('.block-hidden-content')[0].style.setProperty('--add-shift', `${ (xPos - 20) * -1 - $(el).width() / 2 }px`);
		});
	}

	setTooltipPosition();
	$(window).resize(setTooltipPosition);

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
						<svg class="btn-outline draw-on-hover" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 40"><path d="M9.25 14.08c-.78.93-13.98 11.82-4.92 19.53 9.06 7.72 52.11 7.24 55.83-15.35C63.87-4.34 19.64.66 14.76 4.9" stroke="#00DAD0" stroke-width="2" stroke-linecap="round"/></svg>
					</button>`,
		nextArrow: `<button type="button" class="slick-arrow slick-next" aria-label="Next">
						<svg class="btn-icon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="m16.53 29.03 2.94 2.94L33.45 18 19.47 4.03l-2.94 2.94 8.94 8.95H5.5v4.16h19.97l-8.94 8.95Z" fill="#fff"/></svg>
						<svg class="btn-outline draw-on-hover" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 40"><path d="M9.25 14.08c-.78.93-13.98 11.82-4.92 19.53 9.06 7.72 52.11 7.24 55.83-15.35C63.87-4.34 19.64.66 14.76 4.9" stroke="#00DAD0" stroke-width="2" stroke-linecap="round"/></svg>
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
			appendArrows: $(scope).find('.slider-nav'),
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					}
				}
			]
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

		let topNavHeight = 70;

		if ($(window).width() < 992) {
			topNavHeight = 58;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - topNavHeight
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$('.menu-opener').toggleClass('active');
		$('.header, body').toggleClass('nav-opened');
		$('.mobile-top-nav').toggleClass('opened');
	});

	$('.mobile-top-nav').each(function(i, el){
		$(el).find('a').click(function(e){
			e.preventDefault();

			$('.header .menu-opener').trigger('click');
		});
	});

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

	// Draw lines
	$('.draw-on-scroll').each(function(i, el){
		let isAnimated = false;

		let options = {};
		let delay = 0;
		let animateOnLoad = false;

		if ($(el).data('delay') && $(window).width() >= 768) {
			delay = +$(el).data('delay');
		}

		if ($(el).data('duration')) {
			options.duration = +$(el).data('duration');
		}

		if ($(el).data('stagger')) {
			options.stagger = +$(el).data('stagger');
		}

		if ($(el).data('reverse')) {
			options.reverse = $(el).data('reverse') === 'true' ? true : false;
		}

		if ($(el).data('animateOnLoad')) {
			animateOnLoad = $(el).data('animateOnLoad') === 'true' ? true : false;
		}

		let svg = $(el).drawsvg({
			duration: 1500,
			...options
		});

		if (animateOnLoad) {
			svg.drawsvg('animate');
			isAnimated = true;
		} else{

			$(window).scroll(function(){
				if ($(window).scrollTop() + $(window).height() * 0.8 > $(el).offset().top && !isAnimated) {
					setTimeout(function(){
						svg.drawsvg('animate');
						isAnimated = true;
					}, delay);
				}
			});
		}
	});

	$('.draw-on-hover').each(function(i, el){
		let svg = $(el).drawsvg({
			duration: 150
		});

		$(el).hover(function(){
			svg.drawsvg('animate');
		}, function(){
			svg.css({
				opacity: 0
			});

			setTimeout(function(){
				svg.drawsvg('progress', 0);

				svg.css({
					opacity: 1
				});
			}, 150);
		});
	});
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