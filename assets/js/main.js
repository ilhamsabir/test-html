var Main = (function () {
	'use strict';

	// Module
	var module = {};

	var el = {};

	var url = '/suit-test/comments.json';

	var topDiscuss = [{
		id: 0,
		title: 'bersihkan laptop dari butiran debu'
	}, {
		id: 1,
		title: 'cara akses website menggunakan koneksi openVPN'
	}, {
		id: 2,
		title: 'batas aman overlock PC rakitan'
	}, {
		id: 3,
		title: 'cara mengetahui akun facebook di-hack melalui aplikasi'
	}, {
		id: 4,
		title: 'tutorial: langkah - langkah mencegah website untuk track user'
	}];

	// Init
	module.init = function () {
		module.initSelector();
		module.hoverCategories();
		module.hoverListCategories();
		module.displayListDiscuss();
		module.showMobileMenu();
		module.fetchComment();
		module.handleUpPoint();
		module.handleDownPoint();
		module.showModal();
		module.hideModal();
		module.submitComment();
		module.resetCommentForm();
		module.handleCommentInputChange();
		module.submitLogin();
		module.handleChangeFormLogin();
		module.submitRegister();
		module.handleChangeFormRegister();
	};

	// Init Selector
	module.initSelector = function () {
		el.topList = $('#list-top-discuss');
		el.commentList = $('#comment-data');
		el.menuCategory = $('#categories-list');
		el.collapseMenu = $('.collapse-menu');
		el.categoryListItem = $('.collapse-menu ul>li');
		el.mobileBtnMenuOpen = $('.toggle-mobile');
		el.mobileBtnMenuClose = $('#mobile-menu-close');
		el.mobileMenu = $('.mobile-menu');
		el.btnModal = $('#btn-modal');
		el.modalDialogLogin = $('#modal-login');
		el.modalDialogRegister = $('#modal-register');
		el.btnHideModal = $('#btn-close-modal');
		el.submitComment = $('#submit-comment');
		el.commentInputName = $('#comment-input-name');
		el.commentInputEmail = $('#comment-input-email');
		el.commentInputText = $('#comment-input-text');
		el.resetComment = $('#reset-comment');
		el.submitLogin = $('#submit-login');
		el.loginEmail = $('#login-email');
		el.loginPassword = $('#login-password');
		el.submitReg = $('#submit-reg');
		el.regName = $('#reg-name');
		el.regEmail = $('#reg-email');
		el.regPassword = $('#reg-password');
	};

	module.hoverCategories = function () {
		el.menuCategory.mouseenter(function () {
			el.collapseMenu.addClass('open');
		}).mouseleave(function () {
			el.collapseMenu.removeClass('open');
		})
	};

	// hovering menu categories
	module.hoverListCategories = function () {
		el.categoryListItem.mouseenter(function () {
			el.menuCategory.addClass('active');
		}).mouseleave(function () {
			el.menuCategory.removeClass('active');
		})
	};

	// handle show mobile menu
	module.showMobileMenu = function () {
		el.mobileBtnMenuOpen.on('click', function (e) {
			e.preventDefault();
			el.mobileMenu.css('display', 'block');
		})

		el.mobileBtnMenuClose.on('click', function (e) {
			e.preventDefault();
			el.mobileMenu.css('display', 'none');
		})
	};

	//  fetch top list discuss
	module.displayListDiscuss = function () {
		topDiscuss.forEach((element, index) => {
			var i = index + 1;
			var item = '<li>' + '<span class="bg-brown text-white">' + i + '</span>' + ' <a href="#" target="_blank" class="text-black">' + element.title + '</a>' + '</li>';
			el.topList.append(item)
		});
	};

	// fetch comment
	module.fetchComment = function () {
		$.ajax({
				url: url,
				type: "GET",
				dataType: "JSON",
			})
			.done(function (data) {
				// console.log('data', data);
				module.displayListComment(data);
			})
			.fail(function (error) {
				console.log(error);
			});
	};

	// display main comment
	module.displayListComment = function (data) {
		for (var i = 0; i < data.length; i++) {
			var el = data[i];
			var date = moment(el.date).format('DD MMMM YYYY, h:mm:ss');
			var replyData = module.displayReplyComment(el.replies);
			var html = `<div class="comment-list">
								<div class="comment-list-avatar">
									<img src="${el.avatar}" alt="">
								</div>
								<div class="comment-list-content">
									<div class="comment-list-content-title">
										<h3>${el.author}</h3>
									</div>
									<div class="comment-list-content-date">
										${date}
									</div>
									<div class="comment-list-content-inner">
										<p>
											${el.message}
										</p>
									</div>
									<div class="comment-list-action-bar">
										<div class="comment-list-action-bar-cursor-pointer">
											<span id="point-val" data-id="${el.id}">${el.point}</span> Point
										</div>
										<div class="comment-list-action-bar-button">
											<button class="action-button btn-up" data-id="${el.id}">
												<i class="fa fa-arrow-up"></i>
											</button>
											<button class="action-button btn-down" data-id="${el.id}">
												<i class="fa fa-arrow-down"></i>
											</button>
										</div>
									</div>

									<!-- Comment Reply -->
									${replyData}
								</div>
							</div>`;

			$('body').find('#comment-data').append(html);

		}
	};

	// display reply comment
	module.displayReplyComment = function (replyData) {
		// console.log('replyData', replyData);
		if (replyData.length > 0) {
			for (let i = 0; i < replyData.length; i++) {
				var el = replyData[i];
				var date = moment(el.date).format('DD MMMM YYYY, h:mm:ss');
				var html = `<div class="comment-list">
								<div class="comment-list-reply-avatar"><img src="${el.avatar}" alt=""></div>
									<div class="comment-list-content">
										<div class="comment-list-content-title"><h3>${el.author}</h3></div>
										<div class="comment-list-content-date">${date}</div>
										<div class="comment-list-content-inner"><p>${el.message}</p></div>
										<div class="comment-list-action-bar">
											<div class="comment-list-action-bar-cursor-pointer">
												<span id="point-val" data-id="${el.id}">${el.point}</span> Point
											</div>
											<div class="comment-list-action-bar-button">
												<button class="action-button btn-up" data-id="${el.id}">
													<i class="fa fa-arrow-up"></i>
												</button>
												<button class="action-button btn-down" data-id="${el.id}">
													<i class="fa fa-arrow-down"></i>
												</button>
											</div>
										</div>
									</div>
							</div>`;

			}
			return html
		} else {
			return ''
		}

	};

	// handle up point
	module.handleUpPoint = function () {
		$('body').on('click', '.btn-up', function (e) {
			var id = e.currentTarget.dataset.id;
			var num = $('body').find('#point-val[data-id="' + id + '"]').text();

			$(this).addClass('active');
			$(this).addClass('btn-disabled');
			$('body').find('.btn-down[data-id="' + id + '"]').addClass('btn-disabled');
			$('body').find('#point-val[data-id="' + id + '"]').text(++num);

			// console.log('num', num);
		})
	};

	// handle up point
	module.handleDownPoint = function () {
		$('body').on('click', '.btn-down', function (e) {
			var id = e.currentTarget.dataset.id;
			var num = $('body').find('#point-val[data-id="' + id + '"]').text();

			$(this).addClass('active');
			$(this).addClass('btn-disabled');
			$('body').find('.btn-up[data-id="' + id + '"]').addClass('btn-disabled');

			num = --num

			if (num < 0) {
				num = 0
				$(this).removeClass('active');
				$(this).removeClass('btn-disabled');
				$('body').find('.btn-up[data-id="' + id + '"]').removeClass('btn-disabled');
			}

			$('body').find('#point-val[data-id="' + id + '"]').text(num);

		})
	};

	// show modal
	module.showModal = function () {
		$('body').on('click', '#btn-modal', function (e) {
			e.preventDefault();
			var type = e.currentTarget.dataset.type;

			if (type === 'login') {
				el.modalDialogLogin.css('display', 'block');
			} else {
				el.modalDialogRegister.css('display', 'block');
			}
		})
	};

	// close modal
	module.hideModal = function () {
		$('body').on('click', '#btn-close-modal', function (e) {
			el.modalDialogLogin.css('display', 'none');
			el.modalDialogRegister.css('display', 'none');
		})

	};

	// submit comment handler
	module.submitComment = function () {
		el.submitComment.on('click', function (e) {
			e.preventDefault();

			$('.input').removeClass('error');
			$('.input').removeClass('success');
			$('body').find('.error-input').remove();

			var name = el.commentInputName.val();
			var email = el.commentInputEmail.val();
			var text = el.commentInputText.val();
			var testEmail = module.validateEmail(email);

			if (name === '') {
				el.commentInputName.addClass('error');
				el.commentInputName.after(`<span class="error-input">Wajib diisi</span>`);
			} else {
				el.commentInputName.addClass('success');
			}

			if (email === '' || !testEmail) {
				el.commentInputEmail.addClass('error');
				el.commentInputEmail.after(`<span class="error-input">Format email salah</span>`);
			} else {
				el.commentInputEmail.addClass('success');
			}

			if (text === '') {
				el.commentInputText.addClass('error');
				el.commentInputText.after(`<span class="error-input">Wajib diisi</span>`);
			} else {
				el.commentInputText.addClass('success');
			}
		})
	};

	// comment name , email, komentar input change
	module.handleCommentInputChange = function () {
		el.commentInputName.on('change', function (e) {
			var val = $(this).val();
			var errorMsg = e.currentTarget.nextSibling;
			if (val !== '') {
				$(this).removeClass('error');
				$(this).addClass('success');
				$(errorMsg).remove();
			} else {
				$(this).addClass('error');;
			}
		})

		el.commentInputEmail.on('change', function (e) {
			var val = $(this).val();
			var testVal = module.validateEmail(val);
			var errorMsg = e.currentTarget.nextSibling;
			if (val !== '' && testVal) {
				$(this).removeClass('error');
				$(this).addClass('success');
				$(errorMsg).remove();
			} else {
				$(this).addClass('error');;
			}
		})

		el.commentInputText.on('change', function (e) {
			var val = $(this).val();
			var errorMsg = e.currentTarget.nextSibling;
			if (val !== '') {
				$(this).removeClass('error');
				$(this).addClass('success');
				$(errorMsg).remove();
			}
		})
	};

	// reset comment form
	module.resetCommentForm = function () {
		el.resetComment.on('click', function (e) {
			el.commentInputName.val('');
			el.commentInputEmail.val('');
			el.commentInputText.val('');

			$('.input').removeClass('error');
			$('.input').removeClass('success');
			$('body').find('.error-input').remove();
		})
	};

	// login handler
	module.submitLogin = function () {
		el.submitLogin.on('click', function (e) {
			e.preventDefault();

			$('.input').removeClass('error');
			$('.input').removeClass('success');
			$('body').find('.error-input').remove();

			var email = el.loginEmail.val();
			var password = el.loginPassword.val();
			var testEmail = module.validateEmail(email);

			if (email === '' || !testEmail) {
				el.loginEmail.addClass('error');
				el.loginEmail.after(`<span class="error-input">Format email salah</span>`);
			} else {
				el.loginEmail.addClass('success');
			}

			if (password === '') {
				el.loginPassword.addClass('error');
				el.loginPassword.after(`<span class="error-input">Wajib diisi</span>`);
			} else {
				el.loginPassword.addClass('success');
			}
		});
	};

	// handle change on form login
	module.handleChangeFormLogin = function () {
		el.loginEmail.on('change', function (e) {
			var val = $(this).val();
			var testVal = module.validateEmail(val);
			var errorMsg = e.currentTarget.nextSibling;
			if (val !== '' && testVal) {
				$(this).removeClass('error');
				$(this).addClass('success');
				$(errorMsg).remove();
			} else {
				$(this).addClass('error');;
			}
		})

		el.loginPassword.on('change', function (e) {
			var val = $(this).val();
			var errorMsg = e.currentTarget.nextSibling;
			if (val !== '') {
				$(this).removeClass('error');
				$(this).addClass('success');
				$(errorMsg).remove();
			}
		})
	};

	// register handler
	module.submitRegister = function () {
		el.submitReg.on('click', function (e) {
			e.preventDefault();

			$('.input').removeClass('error');
			$('.input').removeClass('success');
			$('body').find('.error-input').remove();

			var name = el.regName.val();
			var email = el.regEmail.val();
			var password = el.regPassword.val();
			var testEmail = module.validateEmail(email);

			if (name === '') {
				el.regName.addClass('error');
				el.regName.after(`<span class="error-input">Wajib diisi</span>`);
			} else {
				el.regName.addClass('success');
			}

			if (email === '' || !testEmail) {
				el.regEmail.addClass('error');
				el.regEmail.after(`<span class="error-input">Format email salah</span>`);
			} else {
				el.regEmail.addClass('success');
			}

			if (password === '') {
				el.regPassword.addClass('error');
				el.regPassword.after(`<span class="error-input">Wajib diisi</span>`);
			} else {
				el.regPassword.addClass('success');
			}
		});
	};

	// handle change on form register
	module.handleChangeFormRegister = function () {
		el.regName.on('change', function (e) {
			var val = $(this).val();
			var errorMsg = e.currentTarget.nextSibling;
			if (val !== '') {
				$(this).removeClass('error');
				$(this).addClass('success');
				$(errorMsg).remove();
			}
		})

		el.regEmail.on('change', function (e) {
			var val = $(this).val();
			var testVal = module.validateEmail(val);
			var errorMsg = e.currentTarget.nextSibling;
			if (val !== '' && testVal) {
				$(this).removeClass('error');
				$(this).addClass('success');
				$(errorMsg).remove();
			} else {
				$(this).addClass('error');;
			}
		})

		el.regPassword.on('change', function (e) {
			var val = $(this).val();
			var errorMsg = e.currentTarget.nextSibling;
			if (val !== '') {
				$(this).removeClass('error');
				$(this).addClass('success');
				$(errorMsg).remove();
			}
		})
	};

	// validate emailreturn boolean true or false
	module.validateEmail = function (email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};


	return module;
})();

jQuery(document).ready(function ($) {
	Main.init();
});