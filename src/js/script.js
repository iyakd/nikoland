// $('HTML').addClass('JS');
$.noConflict();

jQuery(function($){
	(function($){
	var $promoSlider = $('#promoSlider'),
		$picCont = $('.b-pic-bg__cont', $promoSlider),
		$linkCont = $('.js-promo__slide-lnk', $promoSlider),
		resizeId,
		delay = 0.25,
		duration = 0.5,
		maxWidth = 1024,
		toggleSlick,
		slickVar = {
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			swipeToSlide: true,
			touchThreshold: 100, // щирина крутящего момента (1/touchThreshold) * the width of the slider
			edgeFriction: 0.5, // сопротивление по краям
			arrows: false,
			lazyLoad: 'progressive',
			speed: 700, 
			cssEase: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
			responsive: [
				{
					breakpoint: maxWidth,
					settings: 'unslick'
				}
			]
		},
		runSlick = function(){
			$promoSlider.slick(slickVar);
		};


		toggleSlick = function(){
			var wW = $(window).width();

			if(wW >= maxWidth){
				runSlick();
				// $.fn.fullpage.reBuild();
				$.fn.fullpage.setAutoScrolling(true);
			} else {
				// $.fn.fullpage.reBuild();
				$.fn.fullpage.setAutoScrolling(false);
			}
		};

	runSlick();
	setSliderChange();

	$(window).on('load resize', function(event){
		var wW = $(this).width(),
			$slideW = $('.slick-slide', $promoSlider).width();

		if(event.type == 'resize'){
			toggleSlick();
		}

		if(wW >= maxWidth){
			console.log(111);
			$linkCont.height(406).width(406);
			$picCont.height(406).width(406);
		} else {
			$linkCont.css({
				'height': 198,
				'width': '100%'
			});
			$picCont.css({
				'height': 198,
				'width': '100%'
			});
		}
	});
	
	function setSliderChange(){
		$promoSlider.on('afterChange', function(slick, currentSlide){
			$(this).find('.slick-slide').map(function(index, element){
				if($(element).hasClass('slick-active')){
					$(element).css({
						'-webkit-transition-delay': delay + 's',
						'transition-delay':  delay + 's',
						'-webkit-transition-duration': duration + 's',
						'transition-duration':  duration + 's'
					});
					delay += parseFloat(0.25);
					duration += parseFloat(0.5);
				} else {
					$(element).css({
						'-webkit-transition-delay': '0s',
						'transition-delay':  '0s',
						'-webkit-transition-duration': '0s',
						'transition-duration':  '0s'
					});
				}
			}); 
		});

		$promoSlider.on('setPosition', sliderPicsAnimate);

		$promoSlider.on('swipe', function(event, slick, direction){
			// $.fn.fullpage.setMouseWheelScrolling(false);
			// $.fn.fullpage.setAllowScrolling(false);
		});
	}

	function sliderPicsAnimate(){
		$(this).find('.slick-slide').map(function(index, element){
			if($(element).hasClass('slick-active')){
				$(element).css({
					'-webkit-transition-delay': delay + 's',
					'transition-delay':  delay + 's',
					'-webkit-transition-duration': duration + 's',
					'transition-duration':  duration + 's'
				});
				delay += parseFloat(0.25);
				duration += parseFloat(0.5);
			} else {
				$(element).css({
					'-webkit-transition-delay': '0s',
					'transition-delay':  '0s',
					'-webkit-transition-duration': '0s',
					'transition-duration':  '0s'
				});
			}
		}); 
	}
	}(jQuery));

	(function($){
		var $promoSlider = $('#promoSlider'),
			currentMousePos = { x: -1, y: -1 },
			$interactBG = $("#interactBG");

		$('#fullpage').fullpage({
			verticalCentered: true,
			css3: true,
			easingcss3: 'ease-in',
			scrollingSpeed: 700,
			fitToSectionDelay: 0,
			normalScrollElements: '.b-contacts__popup, .b-about',
			fixedElements: '.b-video__cont',
			anchors:['slide_01', 'slide_02', 'slide_03'],
			responsiveWidth: '768',
			afterRender: function(){
				var win = $(window),
					delay = 0.25,
					duration = 0.5;

				$('#bgvid').get(0).play();

				$interactBG.prepend('<div class="interact-bg">');		
			},
			onLeave: function(index, nextIndex, direction){
				var $bg = $('.interact-bg', $interactBG),
					$contact = $('#promoContact', $interactBG),
					$screen02 = $('.screen_02'),
					$slide = $screen02.find('.slick-slide'),
					$awwards = $('#header').find('.js-header__awards'),
					delay = 0.25,
					duration = 0.5;

				if(index == 1){
					$promoSlider.addClass('vertical-animate');
					
					$awwards.css({
						'right': '-145px',
						'top': '-147px',
						'opacity': '0',
						'-webkit-transform': 'scale(0)',
						'transform': 'scale(0)'
					});

					$('#bgvid').get(0).pause();
					$('#bgvid').next().css({
						'opacity': 0.8
					});
				}
				if(nextIndex == 1){
					$promoSlider.removeClass('vertical-animate');

					$awwards.css({
						'right': '-20px',
						'top': '-20px',
						'opacity': '1',
						'-webkit-transform': 'scale(1)',
						'transform': 'scale(1)'
					});

					$('#bgvid').get(0).play();
					$('#bgvid').next().css({
						'opacity': 0.4
					});
				}

				if(index == 2){
					$slide.map(function(index, element){
							$(element).css({
								'-webkit-transition-delay': '.7s',
								'transition-delay':  '.7s',
								'-webkit-transition-duration': '0s',
								'transition-duration':  '0s'
							});
					});
				}

				if(nextIndex == 2){
					$slide.map(function(index, element){
						if($(element).hasClass('slick-active')){
							$(element).css({
								'-webkit-transition-delay': delay + 's',
								'transition-delay':  delay + 's',
								'-webkit-transition-duration': duration + 's',
								'transition-duration':  duration + 's'
							});
							delay += parseFloat(0.25);
							duration += parseFloat(0.5);
						} else {
							$(element).css({
								'-webkit-transition-delay': '0s',
								'transition-delay':  '0s',
								'-webkit-transition-duration': '0s',
								'transition-duration':  '0s'
							});
						}
					});
				}

				if(nextIndex == 3){
					$bg.css({
						"-webkit-transform": "translate3d(-70px, 0, 0) scale(1)",
						"-moz-transform": "translate3d(-70px, 0, 0) scale(1)",
						"-o-transform": "translate3d(-70px, 0, 0) scale(1)",
						"transform": "translate3d(-70px, 0, 0) scale(1)"
					});

					$contact.fadeIn(1200);

					$(document).mousemove(setTranzishnBG);
					} else {
						$bg.css({
							"-webkit-transform": "translate3d(-70px, 0, 0) scale(1.3)",
							"-moz-transform": "translate3d(-70px, 0, 0) scale(1.3)",
							"-o-transform": "translate3d(-70px, 0, 0) scale(1.3)",
							"transform": "translate3d(-70px, 0, 0) scale(1.3)"
						});
						$contact.fadeOut(1200);
					}
			}
		});

		function setTranzishnBG(e){
			var that = $(this);

				currentMousePos.x = e.pageX / 10;
				currentMousePos.y = e.pageY / 10;
				
				$('.interact-bg').css({
					"-webkit-transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)",
					"-moz-transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)",
					"-o-transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)",
					"transform": "translate3d("+ -currentMousePos.x +"px,0, 0) scale(1)"
				});		
		}
	}(jQuery));

	(function($){
		function logoPopup(){
			var $logo = $('#logo'),
				$popup = $('.js-logo__popup', $logo);

			$logo.on('click', '.js-logo__pic', function(event){
				event.preventDefault();

				$logo.addClass('active');
			});

			$popup.on('click', '.js-closer', function(event){
				if(!event.target.hasAttribute('data-popup-closer')) return;

				$logo.removeClass('active');
			});
		}
		logoPopup();
	}(jQuery));

	(function($){
		(function contactPopup(){
			var $btn = $('.js-form-popup__btn'),
				$popup = $('.b-contacts__popup'),
				$close = $('.b-contacts__popup-close', $popup),
				time = 600;

			$btn.click(function(event){
				event.preventDefault();
				$popup
				.show()
				.animate({
					'right': 0
				}, time);
			});

			$close.click(closePopUp);

			function closePopUp(){
				$popup
					.animate({
						'right': -536
					}, time)
					.queue(function(){

						$(this).hide();
						$(this).dequeue();
					});
			}
		}(jQuery));
	}(jQuery));

	(function($){
		(function aboutPage(){
			var $btn = $('.js-about__page'), wH, resizeId,
			$awwards = $('.js-header__awards');

			$btn.click(function(event) {
				var dataHref = $btn.data('href');

				wH = $(window).innerHeight();
				
				$.ajax({
					method: 'GET',
					url: dataHref,
					cache: false,
					success: function(html){
						$('#fullpage').before(html).css('display', 'none');
						$('.b-about').css('height', wH);

						$awwards.css({
							'right': '-145px',
							'top': '-147px',
							'opacity': '0',
							'-webkit-transform': 'scale(0)',
							'transform': 'scale(0)'
						});

						$('.js-logo__close').css({
							'display': 'inline-block'
						});
					}
				});
			});

			$('.js-logo__close').click(function(){
				$('#fullpage').css('display', 'block');
				$awwards.css({
					'right': '-20px',
					'top': '-20px',
					'opacity': '1',
					'-webkit-transform': 'scale(1)',
					'transform': 'scale(1)'
				});
				$('.b-about').remove();

				$('.js-logo__close').css({
					'display': 'none'
				});
			});

			$(window).resize(function() {
				clearTimeout(resizeId);
				resizeId = setTimeout(doneResizing, 100);
			});
			 
			function doneResizing(){
				wH = $(this).innerHeight();

				$('.b-about').css('height', wH);
			}
		})();
	}(jQuery));

	(function($) {
		
		// Change this to the location of your server-side upload handler:
		var $form = $('#callbackFrom'),
			$buttonSubmit = $('.js-form-call__btn', $form),
			$inps = $form.find('input:not([type="file"]), textarea');

		(function formCall(){
			// $inps.focus(function(){
			// 	$(this).css('border', '1px solid #ecc02d');
			// });


		$.validator.addMethod("usPhoneFormat", function (value, element) {
			return this.optional(element) || /^\(\d{3}\) \d{3}\-\d{4}( x\d{1,6})?$/.test(value);
		}, "Невалидный телефон");

		$.validator.addMethod("laxEmail", function(value, elem) {
		  // allow any non-whitespace characters as the host part
		  return this.optional( elem ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?:\S{1,63})$/.test( value );
		}, 'некорректный email');

			$form.validate({
				highlight: function(element, errorClass) {
					$(element)
						.addClass('invalid-elem').removeClass('valid-elem');
				},
				unhighlight: function(element, errorClass){
					$(element)
						.removeClass('invalid-elem').addClass('valid-elem');
				},
				errorElement: "div",
				errorClass: "l-error-message",
				rules: {
					userName: {
						required: true,
						minlength: 2
					},
					userEmail: {
						email: true,
						required: true
					},
					userPhone: {
						usPhoneFormat: true,
						required: true
					}
				},
				messages: {				
					userName: {
						required: 'Введите ваше имя',
						minlength: jQuery.validator.format('Минимальная длина {0}')
					},
					userEmail: {
						email: 'ваш email адрес должен быть в формате example@example.com',
						required: 'Нам нужен ваш контактный email'
					},
					userPhone: {
						required: 'Нам нужен ваш контактный телефон'
					}
				},
				submitHandler: function(form){
					var formData = $form.serializeArray();

					$.post('order', formData, function(data){
						alert(JSON.stringify(formData));
						$form.find('.b-form-call__cont').hide().prev('.b-form-call__title').text(formData[1].value + ' ваша заявка успешно принята');
					});
				}
			});

			$inps.change(function(e){
				$form.validate().element($(e.target));
			});

			$('#contact-telephone').val('').mask("?(999) 999-9999");
		})();


		$('#fileupload').fileupload({
			url: 'server/php/',
			dataType: 'json',
			autoUpload: false,
			maxFileSize: 100000, // 10MB
			acceptFileTypes: /(\.|\/)(doc?x|pdf|zip|jpg|jpeg)$/i
		}).on('fileuploadadd', function (e, data) {
			var uploadErrors = [];
	        var acceptFileTypes = /(\.|\/)(doc?x|pdf|zip|jpg|jpeg)$/i;

	        $.each(data.files, function (index, file) {
	        		var node = $('<p/>').text(file.name);

	        		data.context = $('<div/>').appendTo('#fileupload__files');

		        if(data.originalFiles[0].type.length && !acceptFileTypes.test(data.originalFiles[0].type)) {
		        	console.log(111);
		            node.appendTo(data.context)
		                .append($('<span class="text-danger"/>').text(' Недопустимое расширение файла'));
		            uploadErrors.push('Недопустимое расширение файла');
		        }
		        if(data.originalFiles[0].size > 100000) {
		            node.appendTo(data.context)
		                .append($('<span class="text-danger"/>').text(' Слишком многа букав'));
		            uploadErrors.push('Слишком многа букав');
		        }
		        if(uploadErrors.length === 0) {
	        		
	        		node.appendTo(data.context);
		        }

			});
		}).on('fileuploaddone', function (e, data) {
			$.each(data.result.files, function (index, file) {
				$('<p style="color: green;">' + file.name + '<i class="elusive-ok" style="padding-left:10px;"/> - Type: ' + file.type + ' - Size: ' + file.size + ' byte</p>')
				.appendTo('#div_files');
			});
		}).on('fileuploadfail', function (e, data) {
			$.each(data.messages, function (index, error) {
				$('<p style="color: red;">Upload file error: ' + error + '<i class="elusive-remove" style="padding-left:10px;"/></p>')
				.appendTo('#div_files');
			});
		}).prop('disabled', !$.support.fileInput)
			.parent().addClass($.support.fileInput ? undefined : 'disabled');
	}(jQuery));
});