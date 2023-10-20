$(() => {

	let ThemesList = () => {
		let ThemeULarr = [];
		for (let index = 0; index < ThemeList.length; index++) {
			let Theme = ThemeList[index];
			let ThemeTab = `
				<a class="dropdown-item bg-${Theme.bg} link-${Theme.link} getTheme" href="#">
					<p class="setTheme d-none">${Theme.theme}</p>${Theme.text}
				</a>
			`;
			ThemeULarr.push(ThemeTab);
		}
		let ThemeUL = $(`
			<div class="dropdown-menu themeList" aria-labelledby="dropdownTheme">
				${ThemeULarr.join('')}
			</div>
		`);
		ThemeUL.appendTo('.theme-list');
	}

	let Searcher = () => {
		let Search = $(`
			<form class="d-flex my-2 my-lg-0 full-search">
				<div class="btn dropdown">
					<a class="dropdown-toggle link-${ThemeSet.Primary} linkPrimary" href="#" id="dropdownSearch" data-bs-toggle="dropdown"
						aria-haspopup="true" aria-expanded="false"><i class="fa-solid fa-globe"></i></a>
					<div class="dropdown-menu bg-${ThemeSet.Background} bgBack" aria-labelledby="dropdownSearch">
						<a href="#" class="dropdown-item bg-${ThemeSet.Background} bgBack link-${ThemeSet.Primary} linkPrimary google" href="#"><i class="fa-brands fa-google"></i> Google</a>
						<a href="#" class="dropdown-item bg-${ThemeSet.Background} bgBack link-${ThemeSet.Primary} linkPrimary yandex" href="#"><i class="fa-brands fa-yandex"></i> Яндекс</a>
					</div>
				</div>
				<input class="form-control me-sm-2 google-Search border-${ThemeSet.Primary} borderPrimary" type="text" placeholder="Поиск по Google">
				<input class="form-control me-sm-2 yandex-Search border-${ThemeSet.Primary} d-none borderPrimary" type="text" placeholder="Поиск по Яндекс">
				<a href="https://www.google.com/search?q=" class="btn btn-outline-${ThemeSet.Primary} btnOutlineBtn my-2 my-sm-0 rounded-5 search-link-google" type="submit"><i class="fa fa-search"></i></a>
			</form>
		`);
		Search.appendTo('#collapsibleNavId');
	}

	let SearchToggle = () => {
		$('.google').click(() => {
			if ($('.google-Search').hasClass('d-none')) {
				$('.google-Search').toggleClass('d-none');
			}
			if ($('.yandex-Search').hasClass('d-none') != true) {
				$('.yandex-Search').toggleClass('d-none');
			}
			$('.search-link-yandex').remove();
			$(`<a href="https://www.google.com/search?q=" class="btn btn-outline-${ThemeSet.Primary} btnOutlineBtn my-2 my-sm-0 rounded-5 search-link-google" type="submit"><i class="fa fa-search"></i></a>`).appendTo('.full-search');
		});
		$('.yandex').click(() => {
			if ($('.yandex-Search').hasClass('d-none')) {
				$('.yandex-Search').toggleClass('d-none');
			}
			if ($('.google-Search').hasClass('d-none') != true) {
				$('.google-Search').toggleClass('d-none');
			}
			$('.search-link-google').remove();
			$(`<a href="https://yandex.ru/search/?lr=213&search_source=morda_desktop_common&text=" class="btn btn-outline-${ThemeSet.Primary} btnOutlineBtn my-2 my-sm-0 rounded-5 search-link-yandex" type="submit"><i class="fa fa-search"></i></a>`).appendTo('.full-search');
		});
	}

	let SearchF = () => {
		let Google = $('.google-Search');
		let Yandex = $('.yandex-Search');
		Google.on('keyup input', () => {
			let GoogleRes = Google.val();
			let GoogleLink = `https://www.google.com/search?q=${GoogleRes.replace(/ /gi, '+')}`;
			$(`.search-link-google`).remove();
			$(`.search-link-yandex`).remove();
			$(`<a href="${GoogleLink}" class="btn btn-outline-${ThemeSet.Primary} btnOutlineBtn my-2 my-sm-0 rounded-5 search-link-google" type="submit"><i class="fa fa-search"></i></a>`).appendTo('.full-search');
		});
		Yandex.on('keyup input', () => {
			let YandexRes = Yandex.val();
			let YandexLink = `https://yandex.ru/search/?lr=213&search_source=morda_desktop_common&text=${YandexRes.replace(/ /gi, '+')}`;
			$(`.search-link-yandex`).remove();
			$(`.search-link-google`).remove();
			$(`<a href="${YandexLink}" class="btn btn-outline-${ThemeSet.Primary} btnOutlineBtn my-2 my-sm-0 rounded-5 search-link-yandex" type="submit"><i class="fa fa-search"></i></a>`).appendTo('.full-search');
		});
	}

	let Menu = () => {
		$('.navbar').remove();

		let MenuList = `
			<ul class="navbar-nav me-auto mt-2 mt-lg-0">
				<li class="nav-item dropdown theme-list">
					<a class="nav-link dropdown-toggle" href="#" id="dropdownTheme" data-bs-toggle="dropdown"
					aria-haspopup="true" aria-expanded="false"><i class="fa fa-eye"></i></a>
				</li>
				<li class="nav-item">
					<a class="nav-link page-changer pageNotes">Заметки</a>
				</li>
				<li class="nav-item">
					<a class="nav-link page-changer pageWiki">Вики</a>
				</li>
				<li class="nav-item">
					<a class="nav-link page-changer pageMusic">Плеер</a>
				</li>
				<li class="nav-item">
					<a class="nav-link page-changer pageBrowser">Браузер</a>
				</li>
				<li class="nav-item">
					<a class="nav-link page-changer pageGenerator">Генераторы</a>
				</li>
				<li class="nav-item d-none">
					<a class="nav-link page-changer pageGames">Игры</a>
				</li>
			</ul>
		`;

		let MenuFull = $(`
				<nav class="navbar navbar-menu navbar-expand-lg navbar-${ThemeSet.Nav} navPrim bgBack bg-${ThemeSet.Background}">
					<div class="container">
					
						<a class="navbar-brand page-changer pageHome">AppleXX</a>
						<button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
							<i class="fa fa-bars"></i>
						</button>
						<div class="collapse navbar-collapse" id="collapsibleNavId">
							${MenuList}
						</div>	

					</div>
				</nav>
		`);
		MenuFull.prependTo('.menuStart');
	}

	

	FullMenuStart = () => {
		Menu();
		ThemesList();
		Searcher();
		SearchToggle();
		SearchF();
	}

	FullMenuStart();
});