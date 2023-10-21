let getTheme = () => {
	let ThemeName = JSON.parse(localStorage.getItem('Wallpaper'));
	let BackgroundTheme = '';
	let BodyBackgroundTheme = '';
	let TextTheme = '';
	let NavTheme = '';
	let SecondBackgroundTheme = '';
	let BtnTheme = '';
	for (let index = 0; index < ThemeList.length; index++) {
		if (ThemeName == ThemeList[index].theme) {
			BackgroundTheme = ThemeList[index].bg;
			TextTheme = ThemeList[index].link;
			NavTheme = ThemeList[index].nav;
			SecondBackgroundTheme = ThemeList[index].bgSecond;
			BodyBackgroundTheme = ThemeList[index].bodyBG;
			BtnTheme = ThemeList[index].btn;
		}
	}
	return (
		{
			Background: BackgroundTheme,
			Primary: TextTheme,
			Nav: NavTheme,
			BodyBackground: BodyBackgroundTheme,
			SecondBackground: SecondBackgroundTheme,
			Btn: BtnTheme,
		}
	);
}

let ThemeSet = getTheme();

let AppStart = () => {
	$('.app').children().remove();
	BodyTheme();
	FullMenuStart();
	if(localStorage.getItem('AppPage') == undefined){
		localStorage.setItem('AppPage', 'дом');
	}
	let pageType = localStorage.getItem('AppPage');
	switch (pageType) {
		case "дом":
			FullHouse();
			break;
		case "музыка":
			FullMusicStart();
			break;
		case "браузер":
			FullHomeTab();
			break;
		case "заметки":
			FullBlocknote();
			break;
		case "вики":
			FullWiki();
			break;
		case "генератор":
			FullGenerator();
			break;
	}
}

changePage = () =>{
	$(`.page-changer.pageNotes`).click(()=>{
		localStorage.setItem('AppPage', 'заметки');
		AppStart();
		updateApp();
	});
	$(`.page-changer.pageWiki`).click(()=>{
		localStorage.setItem('AppPage', 'вики');
		AppStart();
		updateApp();
	});
	$(`.page-changer.pageMusic`).click(()=>{
		localStorage.setItem('AppPage', 'музыка');
		AppStart();
		updateApp();
	});
	$(`.page-changer.pageBrowser`).click(()=>{
		localStorage.setItem('AppPage', 'браузер');
		AppStart();
		updateApp();
	});
	$(`.page-changer.pageGenerator`).click(()=>{
		localStorage.setItem('AppPage', 'генератор');
		AppStart();
		updateApp();
	});
	$(`.page-changer.pageHome`).click(()=>{
		localStorage.setItem('AppPage', 'дом');
		AppStart();
		updateApp();
	});
	$(`.page-changer.pageGamess`).click(()=>{
		localStorage.setItem('AppPage', 'игры');
		AppStart();
		updateApp();
	});
}

let themeSetFunc = () => {
	let themeList = document.querySelector('.themeList');
	themeList.addEventListener('click', (event) => {
		let target = event.target;
		if (target != themeList) {
			let themeName = target.childNodes[1].innerText;
			localStorage.setItem('Wallpaper', JSON.stringify(themeName));
			ThemeSet = getTheme();
			changeTheme();
		}
		else {
			return;
		}

	})
}

$(() =>{
	changeTheme = () =>{
		let themeDict = {
			'bgSecond': `bg-${ThemeSet.SecondBackground}`,
			'bgBody': `bg-${ThemeSet.BodyBackground}`,
			'bgBack': `bg-${ThemeSet.Background}`,
			'bgPrimaryDark': `bg-${ThemeSet.Primary}-dark`,
			'borderPrimary': `border-${ThemeSet.Primary}`,
			'borderBack': `border-${ThemeSet.Background}`,
			'btnBtn': `btn-${ThemeSet.Btn}`,
			'linkPrimary': `link-${ThemeSet.Primary}`,
			'linkBack': `link-${ThemeSet.Background}`,
			'pillBtn': `pill-outline-${ThemeSet.Btn}`,
			'btnOutlineBtn': `btn-outline-${ThemeSet.Btn}`,
			'navPrim': `navbar-${ThemeSet.Nav}`,
		};
		let colorsThemes = [
			'light-dark',
			'light',
			'info-dark',
			'info',
			'warning-dark',
			'warning',
			'warning-light',
			'dark2',
			'success-dark',
			'success',
			'success-light',
			'danger-dark',
			'danger',
			'danger-light',
			'info-light',
			'purple-dark',
			'purple',
			'purple-light',
			'orange',
			'orange-light',
			'orange-dark',
			'dark',
			'dark-light',
		];
		for(tag in themeDict){
			for(colorThemeIndex in colorsThemes){
				let colorTheme = colorsThemes[colorThemeIndex];
				if(tag == 'bgSecond' || tag == 'bgBody' || tag == 'bgBack' || tag == 'bgPrimaryDark'){
					$(`.${tag}`).removeClass(`bg-${colorTheme}`);
				}
				if(tag == 'borderPrimary' || tag == 'borderBack'){
					$(`.${tag}`).removeClass(`border-${colorTheme}`);
				}
				if(tag == 'linkPrimary' || tag == 'linkBack'){
					$(`.${tag}`).removeClass(`link-${colorTheme}`);
				}
				if(tag == 'btnBtn'){
					$(`.${tag}`).removeClass(`btn-${colorTheme}`);
				}
				if(tag == 'navPrim'){
					$(`.${tag}`).removeClass(`navbar-${colorTheme}`);
				}
				if(tag == 'pillBtn'){
					$(`.${tag}`).removeClass(`pill-outline-${colorTheme}`);
				}
				if(tag == 'btnOutlineBtn'){
					$(`.${tag}`).removeClass(`btn-outline-${colorTheme}`);
				}
			}
			$(`.${tag}`).addClass(`${themeDict[tag]}`);
		}
	}
});

let updateApp = () =>{
	setTimeout(() => {
		themeSetFunc();
		changePage();
	}, 500);
}

setTimeout(() => {
	AppStart();
}, 100);

updateApp();