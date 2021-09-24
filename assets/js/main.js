
// Table of Content
// =================
// Detect browser
// Detect mobile device
// Page transitions
// Smooth Scrollbar
// Magic cursor
// Image lazy loading
// Main menu (classic)
// Overlay menu
// Portfolio slider (full screen slider)
// Portfolio carousel (full screen carousel)
// Isotope
// Page header
// Page nav
// GSAP ScrollTrigger plugin
// Sidebar
// Scrolling text
// Scroll between anchors
// Scroll to top





(function ($) {
	'use strict';



	// ========================================
	// Detect browser and add class to </body>
	// ========================================

	// Detect Firefox
	let firefoxAgent = navigator.userAgent.indexOf("Firefox") > -1;

	// Add class "is-firefox" to </body>
	if(firefoxAgent) {
		$("body").addClass("is-firefox");
	}



	// ==========================================================
	// Detect mobile device and add class "is-mobile" to </body>
	// ==========================================================

	// Detect mobile device (Do not remove!!!)
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent) ? true : false;

	// Add class "is-mobile" to </body>
	if(isMobile) {
		$("body").addClass("is-mobile");
	}
	


	// =================
	// Page transitions
	// =================

	if ($("body").hasClass("transition")) {
		
		$(window).on("load", function () {
			setTimeout(function(){
				HideLoad(); // call out animations.
			}, 0);
		});

		// Transitions In (when "ptr-overlay" slides in).
		// =================
		function RevealLoad() {
			var tl_transitIn = gsap.timeline({ defaults: { duration: 1.5, ease: Expo.easeInOut }});
				 tl_transitIn.set("#page-transition", { autoAlpha: 1 });
				 tl_transitIn.to(".ptr-overlay", { scaleY: 1, transformOrigin: "center bottom" }, 0);
				 tl_transitIn.to("#content-wrap", { y: -80, autoAlpha: 0 }, 0);
				 tl_transitIn.to("#header", { y: -20, autoAlpha: 0 }, 0);
				 tl_transitIn.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
		}

		// Transitions Out (when "ptr-overlay" slides out)
		// ================
		function HideLoad() {
			var tl_transitOut = gsap.timeline();
				 tl_transitOut.to(".ptr-preloader", { duration: 1.5, autoAlpha: 0, ease: Expo.easeInOut });
				 tl_transitOut.to(".ptr-overlay", { duration: 1.5, scaleY: 0, transformOrigin: "center top", ease: Expo.easeInOut }, 0.3);

				 // Header appear
				 tl_transitOut.from("#header", { duration: 1.5, y: 20, autoAlpha: 0, ease: Expo.easeInOut, clearProps:"all" }, 0.6);

				 // Page header image appear
				 if ($(".ph-image").length) {
				 	if ($("#page-header").hasClass("ph-bg-image")) {
				 		tl_transitOut.from(".ph-image img, .ph-video", { duration: 2, y: 80, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut }, 0.8);
				 	} else {
				 		tl_transitOut.from(".ph-image", { duration: 2, y: 80, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.2);
				 	}
				 }
				 
				 // Page header elements appear (elements with class "ph-appear")
				 if ($(".ph-appear").length) {
				 	tl_transitOut.from(".ph-appear", { duration: 2, y: 40, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut }, 1.5);
				 }

				 // Page header elements appear (project info list)
				 if ($("#page-header .project-info-list").length) {
				 	if ($("#page-header").hasClass("ph-inline")) {
				 		tl_transitOut.from("#page-header .project-info-list > ul > li", { duration: 2, y: 80, autoAlpha: 0, stagger: 0.15, ease: Expo.easeOut }, 2.2);
				 	} else {
				 		tl_transitOut.from("#page-header .project-info-list > ul", { duration: 2, y: 80, autoAlpha: 0, ease: Expo.easeOut }, 2.2);
				 	}
				 }

				 // Portfolio slider elements appear (full heigth slider)
				 if ($(".psc-elem").length) {
				 	$(".psc-elem").wrap('<div class="ps-appear"></div>');
				 	tl_transitOut.from(".ps-appear", { duration: 2, y: 80, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.4);
				 }

				 // Portfolio carousel elements appear
				 if ($(".pci-title").length) {
				 	tl_transitOut.from(".pci-title", { duration: 2, x: 80, autoAlpha: 0, skewX: "-10deg", ease: Expo.easeOut, clearProps:"all" }, 1.4);
				 }
				 if ($(".pci-category").length) {
				 	tl_transitOut.from(".pci-category", { duration: 2, x: 80, autoAlpha: 0, ease: Expo.easeOut, clearProps:"all" }, 1.5);
				 }

				 // Sliding sidebar trigger appear
				 if ($(".sliding-sidebar-wrap").length) {
					 if(!isMobile) {
						 if ($(".sliding-sidebar-wrap").hasClass("ss-right")) {
						 	tl_transitOut.from(".sliding-sidebar-trigger", { duration: 1.5, autoAlpha: 0, x: 50, ease: Expo.easeOut }, 2);
						 } else {
						 	tl_transitOut.from(".sliding-sidebar-trigger", { duration: 1.5, autoAlpha: 0, x: -50, ease: Expo.easeOut }, 2);
						 }
					 } else {
					 	tl_transitOut.from(".sliding-sidebar-trigger", { duration: 1.5, autoAlpha: 0, y: 20, ease: Expo.easeOut }, 2);
					 }
				 }
				 
				 // Page other elements appear
				 tl_transitOut.from("#page-content", { duration: 2, autoAlpha: 0, y: 80, ease: Expo.easeOut, clearProps:"all" }, 0.8);
				 tl_transitOut.set("#page-transition", { duration: 1.5, autoAlpha: 0, ease: Expo.easeInOut });
		}

		// On link click
		// ==============
		$("a")
			.not('[target="_blank"]') // omit from selection
			.not('[href^="#"]') // omit from selection
			.not('[href^="mailto"]') // omit from selection
			.not('[href^="tel"]') // omit from selection
			.not(".lg-trigger") // omit from selection
			.not(".no-transition") // omit from selection
			.on('click', function(e) {
				e.preventDefault();

				setTimeout(function (url) {
					window.location = url
				}, 1500, this.href);
				
				RevealLoad(); // call in animations.
		});

	}



	// =======================================================================================
	// Smooth Scrollbar
	// Source: https://github.com/idiotWu/smooth-scrollbar/
	// =======================================================================================

	if ($("body").hasClass("smooth-scroll")) {

		// Not for mobile devices!
		if(!isMobile) {

			// Init Smooth Scrollbar
			// ======================
			var Scrollbar = window.Scrollbar;
			Scrollbar.init(document.querySelector("#scroll-container"), {
				damping: 0.05,
				renderByPixel: true,
				continuousScrolling: true,
				alwaysShowTracks: true
			});


			// 3rd party library setup
			// More info: https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy()
			// ========================
			let scrollPositionX = 0,
				scrollPositionY = 0,
				bodyScrollBar = Scrollbar.init(document.getElementById("scroll-container"));

			bodyScrollBar.addListener(({ offset }) => {  
				scrollPositionX = offset.x;
				scrollPositionY = offset.y;
			});

			bodyScrollBar.setPosition(0, 0);
			bodyScrollBar.track.xAxis.element.remove();

			// tell ScrollTrigger to use these proxy getter/setter methods for the "body" element:
			ScrollTrigger.scrollerProxy("body", {
				scrollTop(value) {
					if (arguments.length) {
						bodyScrollBar.scrollTop = value;
					}
					return bodyScrollBar.scrollTop;
				}
			});

			// when smooth scroller updates, tell ScrollTrigger to update() too. 
			bodyScrollBar.addListener(ScrollTrigger.update);


			// Move "header" out of "scroll-container"
			// Expl: Since Smooth Scrollbar doesn't support element fixed position inside "scroll-container" move the "header" out of it.
			// ==========================================
			if ($("#header").hasClass("header-fixed")) {
				$("#header").prependTo( $("#body-inner"));
			}

		}

	}



	// =======================================================================================
	// Magic cursor (no effect on small screens!)
	// https://codepen.io/Sahil89/pen/MQbdNR
	// https://greensock.com/forums/topic/17490-follow-button-effect/?tab=comments#comment-81107
	// =======================================================================================
	
	if ($("body").not(".is-mobile").hasClass("magic-cursor")) {
		if ($(window).width() > 1025) {
			$(".magnetic-item").wrap('<div class="magnetic-wrap"></div>');
			
			if ($("a.magnetic-item").length) {
				$("a.magnetic-item").addClass("not-hide-cursor");
			}

			var $mouse = { x: 0, y: 0 }; // Cursor position
			var $pos = { x: 0, y: 0 }; // Cursor position
			var $ratio = 0.15; // delay follow cursor
			var $active = false;
			var $ball = $("#ball");

			var $ballWidth = 34; // Ball default width
			var $ballHeight = 34; // Ball default height
			var $ballScale = 1; // Ball default scale
			var $ballOpacity = 0.5; // Ball default opacity
			var $ballBorderWidth = 2; // Ball default border width

			gsap.set($ball, {  // scale from middle and style ball
				xPercent: -50, 
				yPercent: -50, 
				width: $ballWidth,
				height: $ballHeight,
				borderWidth: $ballBorderWidth, 
				opacity: $ballOpacity 
			});

			document.addEventListener("mousemove", mouseMove);

			function mouseMove(e) {
				$mouse.x = e.clientX;
				$mouse.y = e.clientY;
			}

			gsap.ticker.add(updatePosition);

			function updatePosition() {
				if (!$active) {
					$pos.x += ($mouse.x - $pos.x) * $ratio;
					$pos.y += ($mouse.y - $pos.y) * $ratio;

					gsap.set($ball, { x: $pos.x, y: $pos.y });
				}
			}

			$(".magnetic-wrap").mousemove(function(e) {
				parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
				callParallax(e, this);
			});

			function callParallax(e, parent) {
				parallaxIt(e, parent, parent.querySelector(".magnetic-item"), 25); // magnetic area = higher number is more attractive
			}

			function parallaxIt(e, parent, target, movement) {
				var boundingRect = parent.getBoundingClientRect();
				var relX = e.clientX - boundingRect.left;
				var relY = e.clientY - boundingRect.top;

				gsap.to(target, {
					duration: 0.3, 
					x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
					y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
					ease: Power2.easeOut
				});
			}

			function parallaxCursor(e, parent, movement) {
				var rect = parent.getBoundingClientRect();
				var relX = e.clientX - rect.left;
				var relY = e.clientY - rect.top;
				$pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
				$pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
				gsap.to($ball, {duration: 0.3, x: $pos.x, y: $pos.y });
			}


			// Magic cursor behavior
			// ======================

			// Magnetic item hover.
			$(".magnetic-wrap").on("mouseenter", function(e) {
				gsap.to($ball, { duration: 0.3, scale: 2, borderWidth: 1, opacity: $ballOpacity });
				gsap.to(this, { duration: 0.3, scale: 1.6 });
				gsap.to(this.querySelector(".magnetic-item"), { duration: 0.3, scale: 0.65 });
				$active = true;
			}).on("mouseleave", function(e) {
				gsap.to($ball, { duration: 0.3, scale: $ballScale, borderWidth: $ballBorderWidth, opacity: $ballOpacity });
				gsap.to(this, { duration: 0.3, scale: $ballScale, clearProps:"all" });
				gsap.to(this.querySelector(".magnetic-item"), { duration: 0.3, scale: 1, x: 0, y: 0, clearProps:"all" });
				$active = false;
			});

			// Alternative cursor style on hover.
			$(".cursor-alter, .main-menu-list > li > a, .main-menu-list > li > .submenu-trigger > a")
			.not(".magnetic-item") // omit from selection.
			.on("mouseenter", function() {
				gsap.to($ball, {
					duration: 0.3, 
					borderWidth: 0, 
					opacity: 0.2, 
					backgroundColor: "#CCC", 
					width: "100px", 
					height: "100px", 
				});
			}).on("mouseleave", function() {
				gsap.to($ball, {
					duration: 0.3, 
					borderWidth: $ballBorderWidth, 
					opacity: $ballOpacity, 
					backgroundColor: "transparent", 
					width: $ballWidth, 
					height: $ballHeight, 
					clearProps:"backgroundColor" 
				});
			});

			// Overlay menu caret hover.
			$(".ol-submenu-caret-wrap .magnetic-wrap").on("mouseenter", function() {
				gsap.to($ball, { duration: 0.3, scale: 1.3, borderWidth: $ballBorderWidth });
			}).on("mouseleave", function() {
				gsap.to($ball, { duration: 0.3, scale: $ballScale });
			});

			// Cursor view on hover (data attribute "data-cursor="...").
			$("[data-cursor]").each(function() {
				$(this).on("mouseenter", function() {
					$ball.append('<div class="ball-view"></div>');
					$(".ball-view").append($(this).attr("data-cursor"));
					gsap.to(ball, { duration: 0.3, yPercent: -75, width: 95, height: 95, opacity: 1, borderWidth: 0, backgroundColor: "#FFF" });
					gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
				}).on("mouseleave", function() {
					gsap.to(ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "transparent" });
					gsap.to(".ball-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
					$ball.find(".ball-view").remove();
				});
				$(this).addClass("not-hide-cursor");
			});

			// Cursor drag on hover (class "cursor-drag"). For Swiper sliders.
			$(".swiper-container").each(function() {
				if ($(this).parent().attr("data-simulate-touch") == "true") {
					if ($(this).parent().hasClass("cursor-drag")) {
						$(this).on("mouseenter", function() {
							$ball.append('<div class="ball-drag"></div>');
							gsap.to($ball, { duration: 0.3, width: 60, height: 60, opacity: 1 });
						}).on("mouseleave", function() {
							$ball.find(".ball-drag").remove();
							gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
						});
						$(this).addClass("not-hide-cursor");

						// Ignore "data-cursor" on hover.
						$(this).find("[data-cursor]").on("mouseenter mouseover", function() {
							$ball.find(".ball-drag").remove();
							return false;
						}).on("mouseleave", function() {
							$ball.append('<div class="ball-drag"></div>');
							gsap.to($ball, { duration: 0.3, width: 60, height: 60, opacity: 1 });
						});
					}
				}
			});
			
			// Cursor drag on mouse down / click and hold effect (class "cursor-drag-mouse-down"). For Swiper sliders.
			$(".swiper-container").each(function() {
				if ($(this).parent().attr("data-simulate-touch") == "true") {
					if ($(this).parent().hasClass("cursor-drag-mouse-down")) {
						$(this).on("mousedown pointerdown", function(e) {
							if (e.which === 1) { // Affects the left mouse button only!
								gsap.to($ball, { duration: 0.2, width: 60, height: 60, opacity: 1 });
								$ball.append('<div class="ball-drag"></div>');
							}
						}).on("mouseup pointerup", function() {
							$ball.find(".ball-drag").remove();
							if ($(this).find("[data-cursor]:hover").length) {
							} else {
								gsap.to($ball, { duration: 0.2, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
							}
						}).on("mouseleave", function() {
							$ball.find(".ball-drag").remove();
							gsap.to($ball, { duration: 0.2, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
						});

						// Ignore "data-cursor" on mousedown.
						$(this).find("[data-cursor]").on("mousedown pointerdown", function() {
							return false;
						});

						// Ignore "data-cursor" on hover.
						$(this).find("[data-cursor]").on("mouseenter mouseover", function() {
							$ball.find(".ball-drag").remove();
							return false;
						});
					}
				}
			});

			// Cursor close on hover.
			$(".cursor-close").each(function() {
				$(this).addClass("ball-close-enabled");
				$(this).on("mouseenter", function() {
					$ball.addClass("ball-close-enabled");
					$ball.append('<div class="ball-close">Close</div>');
					gsap.to($ball, { duration: 0.3, yPercent: -75, width: 80, height: 80, opacity: 1 });
					gsap.from(".ball-close", { duration: 0.3, scale: 0, autoAlpha: 0 });
				}).on("mouseleave click", function() {
					$ball.removeClass("ball-close-enabled");
					gsap.to($ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
					$ball.find(".ball-close").remove();
				});

				// Hover on "cursor-close" inner elements.
				$(".cursor-close a, .cursor-close button, .cursor-close .btn, .cursor-close .hide-cursor")
				.not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
				.on("mouseenter", function() {
					$ball.removeClass("ball-close-enabled");
				}).on("mouseleave", function() {
					$ball.addClass("ball-close-enabled");
				});
			});

			// Portfolio interactive title link hover.
			$(".portfolio-interactive-item").each(function() {
				var $piItem = $(this);
				if ($(this).find(".pi-item-image").length) {
					$piItem.find(".pi-item-title-link").on("mouseenter mouseover", function() {
						$("#magic-cursor").addClass("portfolio-interactive-hover-on");
						$piItem.find(".pi-item-image").appendTo($ball);
						gsap.to($ball, { duration: 0.3, width: "20vw", height: "20vw", opacity: 1 });
						$ball.find(".pi-item-image video").each(function() {
							$(this).get(0).play();
						}); 
					}).on("mouseleave", function() {
						$("#magic-cursor").removeClass("portfolio-interactive-hover-on");
						$ball.find(".pi-item-image").appendTo($piItem); 
						gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
						$piItem.find('.pi-item-image video').each(function() {
							$(this).get(0).pause();
						}); 
					});
					$(this).find(".pi-item-title-link").addClass("not-hide-cursor");
				}
			});

			// Blog interactive title link hover.
			$(".blog-interactive-item").each(function() {
				var $biItem = $(this);
				if ($biItem.find(".bi-item-image").length) {
					$biItem.find(".bi-item-title a").on("mouseenter mouseover", function() {
						$("#magic-cursor").addClass("blog-interactive-hover-on");
						$biItem.find(".bi-item-image").appendTo($ball);
						gsap.to($ball, { duration: 0.3, width: "20vw", height: "20vw", opacity: 1 });
					}).on("mouseleave", function() {
						$("#magic-cursor").removeClass("blog-interactive-hover-on");
						$ball.find(".bi-item-image").appendTo($biItem); 
						gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
					});
					$biItem.find(".bi-item-title a").addClass("not-hide-cursor");
					$biItem.addClass("bi-item-image-on");
				}
			});

			// Page nav hover.
			$(".page-nav").each(function() {
				if ($(this).find(".pn-image").length) {
					$(this).find(".pn-link").on("mouseenter mouseover", function() {
						$("#magic-cursor").addClass("pn-hover-on");
						$(this).parent().find(".pn-image").appendTo($ball);
						gsap.to($ball, { duration: 0.3, width: "20vw", height: "20vw", opacity: 1 });
						$ball.find(".pn-image video").each(function() {
							$(this).get(0).play();
						}); 
					}).on("mouseleave", function() {
						$("#magic-cursor").removeClass("pn-hover-on");
						$ball.find(".pn-image").appendTo(this);
						gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });
						
						$(this).parent().find('.pn-image video').each(function() {
							$(this).get(0).pause();
						}); 
					});
					$(this).find(".pn-link").addClass("not-hide-cursor");
				} else {
					$(this).find(".pn-link").removeClass("not-hide-cursor");
				}
			});

			// Page nav title hover.
			if ($(".pn-image").length) {
				$(".page-nav").each(function() {
					$(this).find(".pn-link").on("mouseenter mouseover", function() {
						$("#magic-cursor").addClass("page-nav-hover-on");
						$(this).parent().find(".pn-image").appendTo($ball);					
						gsap.to($ball, { duration: 0.3, width: "20vw", height: "20vw", opacity: 1 });
						if ($(".pn-image video").length) {
							$(".pn-image video").get(0).play();
						}
					}).on("mouseleave", function() {
						$("#magic-cursor").removeClass("page-nav-hover-on");
						$ball.find(".pn-image").appendTo(this);
						gsap.to($ball, { duration: 0.3, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity });

						if ($(".pn-image video").length) {
							$(".pn-image video").get(0).pause();
						}
					});
				});
				$(".pn-link").addClass("not-hide-cursor");
			} else {
				$(".pn-link").removeClass("not-hide-cursor");
			}

			
			// Show/hide magic cursor
			// =======================

			// Hide on hover.
			$("a, button, .btn, .form-control, .form-radio, .form-check, .hide-cursor") // class "hide-cursor" is for global use.
			.not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
			.not(".cursor-alter") // omit from selection
			.not(".main-menu-list > li > a") // omit from selection
			.not(".main-menu-list > li > .submenu-trigger > a") // omit from selection
			.on("mouseenter", function() {
				gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
			}).on("mouseleave", function() {
				gsap.to($ball, { duration: 0.3, scale: $ballScale, opacity: $ballOpacity });
			});

			// Hide on click.
			$("a")
				.not('[target="_blank"]') // omit from selection.
				.not('[href^="#"]') // omit from selection.
				.not('[href^="mailto"]') // omit from selection.
				.not('[href^="tel"]') // omit from selection.
				.not(".lg-trigger") // omit from selection.
				.on('click', function() {
					gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
			});

			// Show/hide on document leave/enter.
			$(document).on("mouseleave", function() {
				gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
			}).on("mouseenter", function() {
				gsap.to("#magic-cursor", {duration: 0.3, autoAlpha: 1 });
			});

			// Show as the mouse moves.
			$(document).mousemove(function() {
				gsap.to("#magic-cursor", {duration: 0.3, autoAlpha: 1 });
			});
		}
	} 



	// ==================================================
	// Image lazy loading
	// ==================================================

	ScrollTrigger.config({ limitCallbacks: true });

	gsap.utils.toArray(".lazy").forEach(image => {
		
		let newSRC = image.dataset.src,
			 newImage = document.createElement("img"),

		loadImage = () => {
			newImage.onload = () => {
				newImage.onload = null; // avoid recursion
				newImage.src = image.src; // swap the src
				image.src = newSRC;
				// place the low-res version on TOP and then fade it out.
				gsap.set(newImage, {
					position: "absolute", 
					top: image.offsetTop, 
					left: image.offsetLeft, 
					width: image.offsetWidth, 
					height: image.offsetHeight
				});
				image.parentNode.appendChild(newImage);
				gsap.to(newImage, {
					opacity: 0, 
					onComplete: () => {
						newImage.parentNode.removeChild(newImage);
						image.removeAttribute("data-src"); // remove "data-src" attribute if image is loaded
					}
				});
				st && st.kill();
			}
			newImage.src = newSRC;

			ScrollTrigger.refresh(true);
		}, 

		st = ScrollTrigger.create({
			trigger: image,
			start: "-50% bottom",
			onEnter: loadImage,
			onEnterBack: loadImage // make sure it works in either direction
		});
	});



	// ==================================================
	// Main menu (classic)
	// ==================================================

	// Keeping sub-menus inside screen (useful if multi level sub-menus are used). Effect on large screens only!
	// More info: http://stackoverflow.com/questions/17985334/jquery-solution-for-keeping-dropdown-dropdown-inside-screen
	if ($(window).width() > 1024) {
		$(".submenu-trigger").parent().on("mouseenter", function() {
			var menu = $("> .submenu", this);
			var menupos = $(menu).offset();

			if (menupos.left + menu.width() > $(window).width()) {
				var newpos = -$(menu).width();

				menu.css({ left: newpos });    
			}
		});
	}

	// Main menu hover
	$(".main-menu-list").on("mouseenter", function() {
		$(this).addClass("mm-hover");
	}).on("mouseleave", function() {
		$(this).removeClass("mm-hover");
	});


	// Mobile menu (for classic menu)
	// ===============================

	// Submenu wrap hover
	$(".submenu-wrap").on("mouseenter", function() {
		$(this).addClass("submenu-open");
	}).on("mouseleave", function() {
		$(this).removeClass("submenu-open");
	});

	// Open/close mobile menu on toggle button click
	$("#m-menu-toggle-btn-wrap").on("click", function() {
		$("html").toggleClass("no-scroll");
		$("body").toggleClass("m-menu-open");
		if ($("body").hasClass("m-menu-open")) {

			// Move "header" out of "scroll-container" (no effect if "header-fixed" or "smooth-scroll" enabled).
			// Expl: Since Smooth Scrollbar doesn't support element fixed position inside "scroll-container" move the "header" out of it.
			if ($("body").hasClass("smooth-scroll")) {
				$("#header:not(.header-fixed)").prependTo("#body-inner");
			}

			// Menu step in animations
			$("body").addClass("m-menu-toggle-no-click"); // Disable toggle button click until the animations last.

			// Menu in animations
			var tl_MenuIn = gsap.timeline({
				onComplete: function() { 
					$("body").removeClass("m-menu-toggle-no-click"); 
				}
			});

				 tl_MenuIn.to(".main-menu", { duration: 0.4, autoAlpha: 1 });
				 tl_MenuIn.from(".main-menu-content > ul > li", { duration: 0.4, y: 80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" });

			// On menu link click
			$(".main-menu a, .logo a")
			.not('[target="_blank"]') // omit from selection
			.not('[href^="#"]') // omit from selection
			.not('[href^="mailto"]') // omit from selection
			.not('[href^="tel"]') // omit from selection
			.on('click', function() {
				gsap.set("#content-wrap", { autoAlpha: 0 });
				gsap.to(".main-menu-content > ul > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
			});

		} else {	

			// Menu step out animations
			$("body").addClass("m-menu-toggle-no-click"); // Disable toggle button click until the animations last.

			// Menu out animations
			var tl_MenuOut = gsap.timeline({
				onComplete: function() { 
					$("body").removeClass("m-menu-toggle-no-click"); 
				}
			});

				 tl_MenuOut.to(".main-menu-content > ul > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
				 tl_MenuOut.to(".main-menu", { duration: 0.4, autoAlpha: 0, clearProps:"all" }, "+=0.2");
				 tl_MenuOut.to(".main-menu-content > ul > li", { clearProps:"all" }); // clearProps only

			// Close open submenus
			setTimeout(function () {
				$(".submenu").slideUp(350);
				$(".submenu-trigger").removeClass("m-submenu-open");
			}, 500);
		}

		return false;
	});

	// Append element if link href contains #
 	$('.submenu-trigger > a[href^="#"]').parent(".submenu-trigger").append('<span class="submenu-trigger-m"></span>');

	// Open submenu if link href contains #
	if ($(".submenu-trigger > a").is('[href^="#"]')) {
		$(".submenu-trigger-m").on("click", function() {
			var $this = $(this).parent();
			if ($this.hasClass("m-submenu-open")) {
				$this.removeClass("m-submenu-open");
				$this.next().slideUp(350);
			} else {
				$this.parent().parent().find(".submenu").prev().removeClass("m-submenu-open");
				$this.parent().parent().find(".submenu").slideUp(350);
				$this.toggleClass("m-submenu-open");
				$this.next().slideToggle(350);
			}
		});
	}

	// Open submenu on caret click
	$(".submenu-trigger").append('<span class="m-caret"></span>');
	$(".m-caret").on("click", function() {
		var $this = $(this).parent();
		if ($this.hasClass("m-submenu-open")) {
			$this.removeClass("submenu-open");
			$this.next().slideUp(350);
		} else {
			$this.parent().parent().find(".submenu").prev().removeClass("m-submenu-open");
			$this.parent().parent().find(".submenu").slideUp(350);
			$this.toggleClass("m-submenu-open");
			$this.next().slideToggle(350);
		}
	});



	// ==================================================
	// Overlay menu 
	// ==================================================

	// Add class "header-fixed-on" to <body> if "header-fixed" enabled.
	if ($("#header").hasClass("header-fixed")) {
		$("body").addClass("header-fixed-on");
	}

	// On menu toggle button click
	// ============================
	var $olMenuToggleBtn = $(".ol-menu-toggle-btn-text, .ol-menu-toggle-btn");
	
	$olMenuToggleBtn.on("click", function() {
		$("html").toggleClass("no-scroll");
		$("body").toggleClass("ol-menu-open");	
		if ($("body").hasClass("ol-menu-open")) {

			// Move "header" out of "scroll-container" (no effect if "header-fixed" or "smooth-scroll" enabled).
			// Expl: Since Smooth Scrollbar doesn't support element fixed position inside "scroll-container" move the "header" out of it.
			if ($("body").hasClass("smooth-scroll")) {
				$("#header:not(.header-fixed)").prependTo("#body-inner");
			}

			// Menu step in animations
			$("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

			var tl_olMenuIn = gsap.timeline({
				onComplete: function() { 
					$("body").removeClass("olm-toggle-no-click"); 
				}
			});

				 tl_olMenuIn.to(".overlay-menu", { duration: 0.4, autoAlpha: 1 });
				 tl_olMenuIn.from(".ol-menu-list > li", { duration: 0.4, y: 80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" });
				 if ($(".ol-menu-anim").length) {
				 	tl_olMenuIn.from($(".ol-menu-anim"), { duration: 0.4, y: 60, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" }, "-=0.4");
				 }

			// On menu link click
			$(".overlay-menu a, .logo a")
			.not('[target="_blank"]') // omit from selection
			.not('[href^="#"]') // omit from selection
			.not('[href^="mailto"]') // omit from selection
			.not('[href^="tel"]') // omit from selection
			.on('click', function() {
				gsap.set("#content-wrap, .ttgr-cat-nav", { autoAlpha: 0 }); // Hide before timeline
				var tl_olMenuClick = gsap.timeline();
					 tl_olMenuClick.to(".ol-menu-list > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
					 if ($(".ol-menu-anim").length) {
					 	tl_olMenuClick.to(".ol-menu-anim", { duration: 0.4, y: -60, autoAlpha: 0, stagger: 0.05, ease:Power2.easeIn }, "-=0.4");
					 }
			});

		} else {	

			// Move "header" back to the "scroll-container" (in to the "scroll-content").
			if ($("body").hasClass("smooth-scroll")) {
				$("#header:not(.header-fixed)").prependTo(".scroll-content");
			}

			// Menu step out animations
			$("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

			var tl_olMenuOut = gsap.timeline({
				onComplete: function() { 
					$("body").removeClass("olm-toggle-no-click"); 
				}
			});
				 tl_olMenuOut.to(".ol-menu-list > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
				 if ($(".ol-menu-anim").length) {
				 	tl_olMenuOut.to(".ol-menu-anim", { duration: 0.4, y: -60, autoAlpha: 0, stagger: 0.05, ease:Power2.easeIn }, "-=0.4");
				 }
				 tl_olMenuOut.to(".overlay-menu", { duration: 0.4, autoAlpha: 0, clearProps:"all" }, "+=0.2");
				 tl_olMenuOut.set(".ol-menu-list > li, .ol-menu-anim", { clearProps:"all" }); // clearProps only

			// Close open submenus
			setTimeout(function () {
				$(".ol-submenu").slideUp(350);
				$(".ol-submenu-trigger").removeClass("ol-submenu-open");
			}, 500);
		}
		
		return false;
	});

	// Menu list hover
	$(".ol-menu-list").on("mouseenter", function() {
		$(this).addClass("ol-menu-hover");
	}).on("mouseleave", function() {
		$(this).removeClass("ol-menu-hover");
	});

	// Open submenu if link href contains #
	$(".ol-submenu-trigger > a").on("click", function() {
		if ($(this).is('[href^="#"]')) {
			var $this = $(this).parent();
			if ($this.hasClass("ol-submenu-open")) {
				$this.removeClass("ol-submenu-open");
				$this.next().slideUp(350);
			} else {
				$this.parent().parent().find(".ol-submenu").prev().removeClass("ol-submenu-open");
				$this.parent().parent().find(".ol-submenu").slideUp(350);
				$this.toggleClass("ol-submenu-open");
				$this.next().slideToggle(350);
			}
		}
		return false;
	});

	// Open submenu on caret click
	$(".ol-submenu-caret-wrap").on("click", function() {
		var $this = $(this).parent();
		if ($this.hasClass("ol-submenu-open")) {
			$this.removeClass("ol-submenu-open");
			$this.next().slideUp(350);
		} else {
			$this.parent().parent().find(".ol-submenu").prev().removeClass("ol-submenu-open");
			$this.parent().parent().find(".ol-submenu").slideUp(350);
			$this.toggleClass("ol-submenu-open");
			$this.next().slideToggle(350);
		}
	});



	// =======================================================================================
	// Portfolio slider (full screen slider)
	// Source: https://swiperjs.com/
	// =======================================================================================

	if ($(".portfolio-slider").length) {
		$(".portfolio-slider").each(function() {
			var $ttPortfolioSlider = $(this);

			// Data attributes
			// ================
			var $dataMousewheel = $ttPortfolioSlider.data("mousewheel");
			var $dataKeyboard = $ttPortfolioSlider.data("keyboard");
			var $dataSimulateTouch = $ttPortfolioSlider.data("simulate-touch");
			var $dataGrabCursor = $ttPortfolioSlider.data("grab-cursor");
			var $dataAutoplay = $ttPortfolioSlider.data("autoplay") ? { delay: $ttPortfolioSlider.data("autoplay"),} : $ttPortfolioSlider.data("autoplay");
			var $dataLoop = $ttPortfolioSlider.data("loop") ? { loopedSlides: 100, } : $ttPortfolioSlider.data("loop"); // Not recommended!

			if ($ttPortfolioSlider.is("[data-speed]")) {
				var $dataSpeed = $ttPortfolioSlider.data("speed");
			} else {
				var $dataSpeed = 900; // by default
			}

			if ($ttPortfolioSlider.is("[data-pagination-type]")) {
				var $dataPaginationType = $ttPortfolioSlider.data("pagination-type");
			} else {
				var $dataPaginationType = "progressbar"; // by default (bullets/fraction/progressbar)
			}

			// Init Swiper
			// =============
			var $ttPortfolioSliderSwiper = new Swiper ($ttPortfolioSlider.find(".swiper-container")[0], {
				// Parameters
				direction: "horizontal",
				effect: "slide",
				speed: 600, // slider speed for smaller screens (when window width is 1024px or smaller)
				parallax: true,
				resistanceRatio: 0,
				longSwipesRatio: 0.02,
				preventInteractionOnTransition: true, // No actions during transition
				autoplay: $dataAutoplay,
				mousewheel: $dataMousewheel,
				keyboard: $dataKeyboard,
				simulateTouch: $dataSimulateTouch,
				grabCursor: $dataGrabCursor,
				loop: $dataLoop, // Not recommended!

				breakpoints: {
					// when window width is 1025px or larger
					1025: {
						speed: $dataSpeed,
					}
				},

				// Lazy loading
				lazy: {
					loadPrevNext: true,
				},

				// Pagination
				pagination: {
					el: ".ps-nav-pagination",
					type: $dataPaginationType,
					modifierClass: "ps-nav-pagination-",
					dynamicBullets: true,
					dynamicMainBullets: 1,
					clickable: true,
				},

				// Navigation arrows
				navigation: {
					nextEl: $(this).find(".ps-nav-arrow-next")[0],
					prevEl: $(this).find(".ps-nav-arrow-prev")[0],
					disabledClass: "ps-nav-arrow-disabled",
				},

				// Events
				on: {
					init: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// Play video on load
						$slideActive.find("video").each(function() {
							$(this).get(0).play();
						}); 

						// Portfolio slider caption on load
						// ---------------------------------
						// Portfolio slider caption title (if contains link or not)
						if ($ttPortfolioSlider.find(".ps-caption-title").find("a").length) {
							$ttPortfolioSlider.find(".ps-caption-title a").text($slideActive.attr("data-title"));
							$ttPortfolioSlider.find(".ps-caption-title a").attr("href", $slideActive.attr("data-url"));
						} else {
							$ttPortfolioSlider.find(".ps-caption-title").text($slideActive.attr("data-title"));
						}

						// Portfolio slider caption category on load
						$ttPortfolioSlider.find(".ps-caption-category").text($slideActive.attr("data-category"));
					},

					transitionStart: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// If slider image is light
						setTimeout(function(){
							if ($slideActive.hasClass("psi-image-is-light")) {
								$("body").addClass("psi-light-image-on");
							} else {
								$("body").removeClass("psi-light-image-on");
							}
						}, 400);

						// Play video
						$slideActive.find("video").each(function() {
							$(this).get(0).play();
						}); 

						// Animate portfolio slider caption
						gsap.fromTo($ttPortfolioSlider.find(".psc-elem"), { autoAlpha: 1, y: 0 }, { duration: 0.25, autoAlpha: 0, y: -30, stagger: 0.15, ease: Power1.easeIn });
					},

					transitionEnd: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// Pause video
						$slideActive.prevAll().find("video").each(function() {
							$(this).get(0).pause();
						});
						$slideActive.nextAll().find("video").each(function() {
							$(this).get(0).pause();
						});

						// Portfolio slider caption
						// -------------------------
						// Portfolio slider caption title (if contains link or not)
						if ($ttPortfolioSlider.find(".ps-caption-title").find("a").length) {
							$ttPortfolioSlider.find(".ps-caption-title a").text($slideActive.attr("data-title"));
							$ttPortfolioSlider.find(".ps-caption-title a").attr("href", $slideActive.attr("data-url"));
						} else {
							$ttPortfolioSlider.find(".ps-caption-title").text($slideActive.attr("data-title"));
						}

						// Portfolio slider caption category
						$ttPortfolioSlider.find(".ps-caption-category").text($slideActive.attr("data-category"));

						// Animate portfolio slider caption
						gsap.fromTo($ttPortfolioSlider.find(".psc-elem"), { autoAlpha: 0, y: 30 }, { duration: 0.25, autoAlpha: 1, y: 0, stagger: 0.15, ease: Power1.easeOut });
					}
				}
			});


			// Parallax effect on mouse move (no effect on mobile devices!)
			// ------------------------------
			if(!isMobile) {
				if ($ttPortfolioSlider.data("parallax-mouse-move")) {
					gsap.set($ttPortfolioSlider.find(".psi-image"), { scale: 1.05 });

					$ttPortfolioSlider.mousemove(function(e) {
						parallaxIt(e, $ttPortfolioSlider.find(".psi-image"), -25); // Parallax element
						parallaxIt(e, $ttPortfolioSlider.find(".ps-caption-inner"), -35); // Parallax element
					});

					function parallaxIt(e, target, movement) {
						var $this = $ttPortfolioSlider
						var relX = e.pageX - $this.offset().left;
						var relY = e.pageY - $this.offset().top;

						gsap.to(target, {
							duration: 1,
							x: (relX - $this.width() / 2) / $this.width() * movement,
							y: (relY - $this.height() / 2) / $this.height() * movement
						});
					}
				}
			}

		});
	}



	// =======================================================================================
	// Portfolio carousel (full screen carousel)
	// Source: https://swiperjs.com/
	// =======================================================================================

	if ($(".portfolio-carousel").length) {
		$(".portfolio-carousel").each(function() {
			var $ttPortfolioCarousel = $(this);

			// Data attributes
			// ================
			var $dataMousewheel = $ttPortfolioCarousel.data("mousewheel");
			var $dataKeyboard = $ttPortfolioCarousel.data("keyboard");
			var $dataSimulateTouch = $ttPortfolioCarousel.data("simulate-touch");
			var $dataGrabCursor = $ttPortfolioCarousel.data("grab-cursor");
			var $dataAutoplay = $ttPortfolioCarousel.data("autoplay") ? { delay: $ttPortfolioCarousel.data("autoplay"),} : $ttPortfolioCarousel.data("autoplay");
			var $dataLoop = $ttPortfolioCarousel.data("loop") ? { loopedSlides: 100, } : $ttPortfolioCarousel.data("loop"); // Not recommended!

			if ($ttPortfolioCarousel.is("[data-speed]")) {
				var $dataSpeed = $ttPortfolioCarousel.data("speed"); // speed for larger screens
			} else {
				var $dataSpeed = 1200; // speed for larger screens (by default) 
			}

			if ($ttPortfolioCarousel.is("[data-pagination-type]")) {
				var $dataPaginationType = $ttPortfolioCarousel.data("pagination-type");
			} else {
				var $dataPaginationType = "progressbar"; // by default (bullets/fraction/progressbar)
			}

			// Init Swiper
			// =============
			var $ttPortfolioCarouselSwiper = new Swiper ($ttPortfolioCarousel.find(".swiper-container")[0], {
				// Parameters
				direction: "horizontal",
				slidesPerView: "auto",
				spaceBetween: 0,
				resistanceRatio: 0.85,
				longSwipesRatio: 0.3,
				shortSwipes: true,
				centeredSlides: true,
				watchSlidesVisibility: true, // Needed for lazy loading
				preventInteractionOnTransition: false, // No actions during transition
				speed: 900, // Slider speed for smaller screens (when window width is 1024px or smaller)
				keyboard: $dataKeyboard,
				mousewheel: $dataMousewheel,
				autoplay: $dataAutoplay,
				simulateTouch: $dataSimulateTouch,
				grabCursor: $dataGrabCursor,
				loop: $dataLoop, // Not recommended!

				lazy: {
					loadPrevNext: true,
				},

				breakpoints: {
					// When window width is 1025px or larger
					1025: {
						speed: $dataSpeed,
						lazy: {
							loadPrevNextAmount: 3, // Amount of next/prev slides to preload lazy images in.
						},
					}
				},

				// Pagination
				pagination: {
					el: ".pc-pagination",
					type: $dataPaginationType,
					modifierClass: "pc-pagination-",
					dynamicBullets: true,
					dynamicMainBullets: 1,
					clickable: true,
				},

				// Navigation arrows
				navigation: {
					nextEl: ".pc-arrow-next",
					prevEl: ".pc-arrow-prev",
					disabledClass: "pc-arrow-disabled",
				},

				// Events
				on: {
					lazyImageReady: (swiper) => { // Lazy load + slidesPerView:"auto" fix.
						swiper.update()
					},

					init: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// Active slide class (custom) on load
						$slideActive.addClass("slide-active"); // Add class to active slide.

						// Carousel slide disabled (prev/next slide) on load
						$slideActive.prevAll().addClass("pcs-disabled");
						$slideActive.nextAll().addClass("pcs-disabled");

					},

					transitionStart: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// Active slide classes (custom).
						$slideActive.addClass("slide-active"); // Add class to active slide.
						$slideActive.prev().addClass("slide-active-start"); // Add class if active slide transition starts.
						$slideActive.next().addClass("slide-active-start"); // Add class if active slide transition starts.

						// Carousel slide disabled (prev/next slide)
						$slideActive.prevAll().addClass("pcs-disabled");
						$slideActive.removeClass("pcs-disabled");
						$slideActive.nextAll().addClass("pcs-disabled");

					
							// Play video on hover
						// ====================
						$(".portfolio-carousel-item").on("mouseenter", function() {
							$(this).find("video").each(function() {
								$(this).get(0).play();
							}); 
						}).on("mouseleave", function() {
							$(this).find("video").each(function() {
								$(this).get(0).pause();
							});
						});


						// Disable nav arrow action.
						$(".pc-arrow").addClass("pc-arrow-disabled");

					},

					transitionEnd: function () {

						var $this = this;
						var $slideActive = $($this.slides[$this.activeIndex]);

						// Active slide classes (custom)
						$slideActive.prevAll().removeClass("slide-active"); // Remove class if active slide transition ends.
						$slideActive.nextAll().removeClass("slide-active"); // Remove class if active slide transition ends.
						$slideActive.prev().removeClass("slide-active-start"); // Remove class if active slide transition ends.
						$slideActive.next().removeClass("slide-active-start"); // Remove class if active slide transition ends.

						// Pause video
						$(".swiper-slide-prev").find("video").each(function() {
							$(this).get(0).pause();
						});
						
						$(".swiper-slide-next").find("video").each(function() {
							$(this).get(0).pause();
						});

						// Disable nav arrow action.
						$(".pc-arrow").removeClass("pc-arrow-disabled");

					}
				}
			});

			// Scale down animation on carousel click
			if ($ttPortfolioCarousel.attr("data-simulate-touch") == "true") {
				if ($ttPortfolioCarousel.hasClass("pc-scale-down")) {
					$ttPortfolioCarousel.find(".swiper-container").on("mousedown touchstart pointerdown", function(e) {
						if (e.which === 1) { // Affects the left mouse button only!
							gsap.to($ttPortfolioCarousel.find(".swiper-slide"), { duration: 0.7, scale: 0.9 });
						}
					});
					$("body").on("mouseup touchend pointerup mouseleave", function() {	
						gsap.to($ttPortfolioCarousel.find(".swiper-slide"), { duration: 0.7, scale: 1, clearProps: "scale" });
					});
				}
			}

			// Update slider when windows resize or orientation change 
			$(window).on("resize orientationchange", function() {
				setTimeout(function(){
					$ttPortfolioCarouselSwiper.update();
					$ttPortfolioCarousel.find(".swiper-wrapper").addClass("swtr-smooth");
				}, $dataSpeed);

				setTimeout(function(){
					$ttPortfolioCarousel.find(".swiper-wrapper").removeClass("swtr-smooth");
				}, $dataSpeed + $dataSpeed);
			});
		});
	}




	// ============================================================================
   // Isotope
   // More info: http://isotope.metafizzy.co
   // Note: "imagesloaded" blugin is required! https://imagesloaded.desandro.com/
   // ============================================================================

	// init Isotope
	var $container = $(".isotope-items-wrap");
	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: ".isotope-item",
			layoutMode: "packery",
			transitionDuration: "0.7s",
			percentPosition: true
		});

		setTimeout(function() {
			$container.isotope('layout'); // Refresh Isotope
			ScrollTrigger.refresh(true); // Refresh ScrollTrigger
		}, 500);
	});

	// Filter
	$(".ttgr-cat-list > li > a").on("click", function() {
		var selector = $(this).attr("data-filter");
		$container.isotope({
			filter: selector
		});

		// Refresh ScrollTrigger
		setTimeout(function() {
			ScrollTrigger.refresh(true);
		}, 500);

		return false;
	});

	// Filter item active
	var filterItemActive = $(".ttgr-cat-list > li > a");
	filterItemActive.on("click", function(){
		var $this = $(this);
		if ( !$this.hasClass("active")) {
			filterItemActive.removeClass("active");
			$this.addClass("active");
		}
	});


	// Isotope items gaps fix (uncomment the below code if isotope items gaps do not calculate correctly.)
	// ========================

	// if ($(".isotope-items-wrap").length){
	// 	// add overflow scroll to <html> (isotope items gaps fix).
	// 	if ( document.querySelector("body").offsetHeight > window.innerHeight ) {
	// 		document.documentElement.style.overflowY = "scroll";
	// 	}
	// }



	// ================================================================
	// Page header
	// ================================================================

	// If page header image exist
	// ===========================
	if ($(".ph-image").length) {
		$("body").addClass("ph-image-on");

		// If page header image is background image
		if ($("#page-header").hasClass("ph-bg-image")) {
			$("body").addClass("ph-bg-image-on");
		}
	}


	// If page header contains project info list
	// ==========================================
	if ($("#page-header .project-info-list").length) {
		$("#page-header").addClass("project-info-list-on");
	}





	// If page header background image is light (toggle class on scroll handled by scrollTrigger plugin below)
	// =========================================
	if ($("#page-header").is(".ph-bg-image.ph-bg-image-is-light")) {
		$("body").addClass("ph-bg-image-light-on");
	} else {
		$("body").removeClass("ph-bg-image-light-on");
	}



	// ================================================================
	// Portfolio list
	// ================================================================

	// Play video on hover
	$(".pli-image-link").on("mouseenter", function() {
		$(this).find("video").each(function() {
			$(this).get(0).play();
		}); 
	}).on("mouseleave", function() {
		$(this).find("video").each(function() {
			$(this).get(0).pause();
		});
	});



	// ================================================================
	// Portfolio interactive
	// ================================================================

	if(!isMobile) { // No effect on mobile devices!

		if ($(".portfolio-interactive").hasClass("pi-force-scroll")) {

			// Clone hover title (no effect on mobile devices!).
			$(".pi-item-hover-title").each(function() {
				var $this = $(this);
				$this.wrapInner('<span></span>');

				// Clone hover title
				var $piHoverTitle = $($this).find("span");
				for (var i = 0; i < 5; i++) {
					$piHoverTitle.clone().insertAfter($piHoverTitle);
				}
			});

		} else {

			// If the hover title is wider than the parent element.
			$(".pi-item-hover-title").each(function() {
				var $this = $(this);
				if ($this.width() > $this.parent().width()) {
					$this.wrapInner('<span></span>');
					
					// Clone hover title
					var $pnHoverTitle = $($this).find("span");
					for (var i = 0; i < 1; i++) {
						$pnHoverTitle.clone().insertAfter($pnHoverTitle);
					}
				}
			});
		}

		// Title on link hover.
		$(".portfolio-interactive-item").each(function() {
			$(this).find(".pi-item-title-link").on("mouseenter", function() {
				$(this).parent().addClass("pi-item-hover");
			}).on("mouseleave", function() {
				$(this).parent().removeClass("pi-item-hover");
			});
		});

		// Hover scrolling speed.
		$(".portfolio-interactive-item").each(function() {
			var $piHoverSpeed = $(this).data("scroll-speed");
			$(this).find(".pi-item-hover-title span").css({ 
				"animation-duration": $piHoverSpeed + "s",
			});
		});
		
	}




	// ================================================================
	// Page nav
	// ================================================================

	if(!isMobile) { // No effect on mobile devices!

		if ($(".page-nav").hasClass("pn-scroll")) {

			$(".page-nav").find(".pn-hover-title").each(function() {
				var $this = $(this);
				$this.wrapInner('<span></span>');

				// Clone hover title
				var $pnHoverTitle = $($this).find("span");
				for (var i = 0; i < 7; i++) {
					$pnHoverTitle.clone().insertAfter($pnHoverTitle);
				}
			});

		} else {

			// If the hover title is wider than the parent element.
			$(".page-nav").find(".pn-hover-title").each(function() {
				var $this = $(this);
				if ($this.width() > $this.parent().width()) {
					$this.wrapInner('<span></span>');
					
					// Clone hover title
					var $pnHoverTitle = $($this).find("span");
					for (var i = 0; i < 7; i++) {
						$pnHoverTitle.clone().insertAfter($pnHoverTitle);
					}
				}
			});
		}
		
	}



	// ================================================================
	// GSAP ScrollTrigger plugin
	// More info: https://greensock.com/docs/v3/Plugins/ScrollTrigger/
	// ================================================================

	// Page header elements scrolling effects:
	// =======================================
	if ($("#page-header").hasClass("ph-content-parallax")) {
		let tlPhParallax = gsap.timeline({ 
			scrollTrigger: {
				trigger: "#page-header", 
				start: 'top top', 
				end: 'bottom top', 
				scrub: true,
				markers: false
			}
		});

		// Page header caption elements scrolling effect
		if ($(".ph-categories").length) {
			tlPhParallax.to(".ph-categories", { yPercent: -200 }, 0);
		}
		if ($(".ph-caption-title").length) {
			tlPhParallax.to(".ph-caption-title", { yPercent: -10 }, 0);
		}
		if ($(".ph-caption-subtitle").length) {
			tlPhParallax.to(".ph-caption-subtitle", { yPercent: 80 }, 0);
		}
		if ($(".ph-caption-title-ghost").length) {
			tlPhParallax.to(".ph-caption-title-ghost", { yPercent: 20 }, 0);
		}

		// Page header image scrolling effect
		if ($(".ph-image").length) {
			if ($("#page-header").hasClass("ph-bg-image")) {
				tlPhParallax.to(".ph-image img, .ph-video", { yPercent: 30, scale: 1.05 }, 0);
			} else {
				tlPhParallax.to(".ph-image-inner", { yPercent: -30 }, 0);
			}
		}

		// Page header project info list scrolling effect (effect only if it in the page header!)
		if ($("#page-header .project-info-list").length) {
			if ($("#page-header:not('.ph-center')").hasClass("ph-inline")) {
				ScrollTrigger.matchMedia({
					"(min-width: 1025px)": function() {
						gsap.to("#page-header .project-info-list > ul > li", { 
							yPercent: -140,
							stagger: 0.15,
							ease: "none",
							scrollTrigger: {
								trigger: "#page-header",
								start: "top top",
								end: "bottom top",
								scrub: true,
								markers: false
							} 
						});
					},

					"(max-width: 1024px)": function() {
						gsap.to("#page-header .project-info-list", { 
							yPercent: 20,
							ease: "none",
							scrollTrigger: {
								trigger: "#page-header",
								start: "top top",
								end: "bottom top",
								scrub: true,
								markers: false
							} 
						});
					}
				});

			} else {

				gsap.to("#page-header .project-info-list", { 
					y: 30,
					ease: "none",
					scrollTrigger: {
						trigger: "#page-header",
						start: "top top",
						end: "bottom top",
						scrub: true,
						markers: false
					} 
				});
			} 
		}

		// Page header scroll down circle
		if ($(".scroll-down-circle").length) {
			gsap.to(".scroll-down-circle", { 
				x: -100,
				autoAlpha: 0,
				ease: "none",
				scrollTrigger: {
					trigger: "#page-header",
					start: "top top",
					end: "30% top",
					scrub: true,
					markers: false
				}, 
			});
		}

		// Page header made-with-love
		if ($(".mwl-inner").length) {
			gsap.to(".mwl-inner", { 
				yPercent: 250,
				autoAlpha: 0,
				ease: "none",
				scrollTrigger: {
					trigger: "#page-header",
					start: "top top",
					end: "40% top",
					scrub: true,
					markers: false
				}, 
			});
		}

		// Page header projekt share
		if ($(".ph-share").length) {
			ScrollTrigger.matchMedia({
				"(min-width: 1025px)": function() {
					gsap.to(".ph-share", { 
						yPercent: 140,
						autoAlpha: 0,
						ease: "none",
						scrollTrigger: {
							trigger: "#page-header",
							start: "top top",
							end: "40% top",
							scrub: true,
							markers: false
						}, 
					});
				}
			});
		}

		// If page header background image is light
		if ($("#page-header").is(".ph-bg-image.ph-bg-image-is-light")) {
			if ($("#header").hasClass("header-fixed")) {
				ScrollTrigger.create({
					trigger: "#page-header",
					start: "top bottom",
					end: "bottom 30px",
					scrub: true,
					markers: false,

					onLeave: () => phLeaveClass(),
					onEnter: () => phEnterClass(),
					onLeaveBack: () => phLeaveClass(),
					onEnterBack: () => phEnterClass(),
				});

				function phLeaveClass() {
					$("body").removeClass("ph-bg-image-light-on");
				};
				function phEnterClass() {
					$("body").addClass("ph-bg-image-light-on");
				};
			}
		}

	}




	// Image parallax
	// ===============
	$(".anim-image-parallax").each(function() {

		// Add wrap <div> and make it overflow hidden.
		$(this).wrap('<div class="anim-image-parallax-wrap"></div>').parent().css({ "overflow": "hidden" });

		var $this = $(this);
		var $aipWrap = $this.parents(".anim-image-parallax-wrap");

		gsap.to($this, {
			yPercent: 30,
			ease: "none",
			scrollTrigger: {
				trigger: $aipWrap,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
				markers: false,
				onEnter: () => imgParalRefresh(),
			}, 
		});

		// Refresh start/end positions on enter.
		function imgParalRefresh() {
			ScrollTrigger.refresh(true);
		};
	});


	

	// Appear on scroll
	// =================

	// zoom in
	$(".anim-zoomin").each(function() {
		let tl_ZoomIn = gsap.timeline({
			id: "page-nav",
			scrollTrigger: {
				trigger: this,
				start: "top 90%",
				markers: false
			}
		});

		tl_ZoomIn.from(this, { duration: 1.5, autoAlpha: 0, scale: 1.2, ease: Power2.easeOut, clearProps:"all" });
	});


	// fade in-up
	$(".anim-fadeinup").each(function() {
		let tl_FadeInUp = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_FadeInUp.from(this, { duration: 2.5, autoAlpha: 0, y: 100, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
	});


	// skew in-up
	$(".anim-skewinup").each(function() {
		let tl_SkewInUp = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_SkewInUp.from(this, { duration: 2, skewY: 5, transformOrigin: "left top", autoAlpha: 0, y: 100, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
	});


	// stretch in-up
	$(".anim-stretchinup").each(function() {
		let tl_StretchInUp = gsap.timeline({
			scrollTrigger: {
				trigger: this,
				start: "top bottom",
				markers: false
			}
		});

		tl_StretchInUp.from(this, { duration: 2, autoAlpha: 0, y: 100, scaleY: 1.4, transformOrigin: "top", ease: Expo.easeOut, clearProps:"all" }, "+=0.2");
	});



	// ==================================
	// Sidebar (classic)
	// ==================================

	// If sidebar exist.
	if ($(".sidebar").length) {

		$("body").addClass("sidebar-on");

		// If sidebar has class "sidebar-left" add class "sidebar-left-on" to <pody>.
		if ($(".sidebar").hasClass("sidebar-left")) {
			$("body").addClass("sidebar-left-on");
		}

		// If sidebar has class "sidebar-right" add class "sidebar-right-on" to <pody>.
		if ($(".sidebar").hasClass("sidebar-right")) {
			$("body").addClass("sidebar-right-on");
		}
	}



	// ==================================
	// Sliding sidebar
	// ==================================

	// If sliding sidebar exist.
	if ($(".sliding-sidebar-wrap").length) {

		$("body").addClass("sliding-sidebar-on, sliding-sidebar-left-on");  // left position is by default.

		// Append sliding sidebar.
		$(".sliding-sidebar-wrap").appendTo("#body-inner");

		// Open/close sliding sidebar.
		$(".sliding-sidebar-trigger").on("click", function() {
			$("body").toggleClass("sliding-sidebar-open");
		}); 
		$(".sliding-sidebar-close").on("click", function() {
			$("body").removeClass("sliding-sidebar-open");
		}); 

		// If sliding sidebar has class "ss-right" add class "ss-right-on" to <pody>.
		if ($(".sliding-sidebar-wrap").hasClass("ss-right")) {
			$("body").removeClass("sliding-sidebar-left-on");
			$("body").addClass("sliding-sidebar-right-on");
		}
	}



	// ==================================
	// Scrolling text
	// ==================================

	// Hover scrolling speed.
	$(".scrolling-text").each(function() {
		var $tt_stSpeed = $(this).data("scroll-speed");
		$(this).find(".scrolling-text-inner").css({ 
			"animation-duration": $tt_stSpeed + "s",
		});
	});



	// ================================================================
	// Scroll between anchors 
	// Requires "Smooth Scrollbar" (https://github.com/idiotWu/smooth-scrollbar/blob/develop/docs/api.md#scrollbarscrollintoview)
	// ================================================================

	$('a[href^="#"]')
		.not('[href$="#"]')  // omit from selection
		.not('[href$="#0"]')  // omit from selection
		.on("click", function() {

		var target = this.hash;

		// If fixed header position enabled.
		if ($("#header").hasClass("header-fixed")) {
			var $offset = $("#header").height();
		} else {
			var $offset = 0;
		}

		// You can use data attribute (data-offset="100") to set top offset in HTML markup if needed. 
		if ($(this).data("offset") != undefined) $offset = $(this).data("offset");
		
		if(!isMobile) { // Not for mobile devices!
			if ($("body").hasClass("smooth-scroll")) {
				var topY = $(target).offset().top - $("#scroll-container > .scroll-content").offset().top - $offset;
				var $scrollbar = Scrollbar.init(document.getElementById("scroll-container"));

				gsap.to($scrollbar, { duration: 2, scrollTo: { y: topY, autoKill: true }, ease: Expo.easeInOut });

			} else {
				var topY = $(target).offset().top - $("body").offset().top - $offset;
				gsap.to($(window), { duration: 2, scrollTo: { y: topY, autoKill: true }, ease: Expo.easeInOut });
			}
		} else {
			var topY = $(target).offset().top - $("body").offset().top - $offset;
			gsap.to($(window), { duration: 2, scrollTo: { y: topY, autoKill: true }, ease: Expo.easeInOut });
		}
		return false;
	});



	// ================================================================
	// Scroll to top 
	// Requires "GSAP ScrollToPlugin" (https://greensock.com/docs/v2/Plugins/ScrollToPlugin)
	// ================================================================

	$(".scroll-to-top").on("click", function() {
		if(!isMobile) { // Not for mobile devices!
			if ($("body").hasClass("smooth-scroll")) {
				var $scrollbar = Scrollbar.init(document.getElementById("scroll-container"));
				gsap.to($scrollbar, { duration: 2, scrollTo: { y: 0, autoKill: true }, ease: Expo.easeInOut });
			} else {
				gsap.to($(window), { duration: 2, scrollTo: { y: 0, autoKill: true }, ease: Expo.easeInOut });
			}
		} else {
			gsap.to($(window), { duration: 2, scrollTo: { y: 0, autoKill: true }, ease: Expo.easeInOut });
		}
		return false;
	}); 



	// Hover fix for iOS
	// ==================
	$("*").on("touchstart",function() {
		$(this).trigger("hover");
	}).on("touchend",function() {
		$(this).trigger("hover");
	}); 


})(jQuery); 
