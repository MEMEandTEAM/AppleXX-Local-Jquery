let ThemeList = [
	{ theme: "classicLight", bodyBG: "light-dark", bg: "light", bgSecond: "info-dark", link: "info", nav: "info", btn: "light", text: "Светлая" },
	{ theme: "yellowLight", bodyBG: "warning-dark", bg: "warning", bgSecond: "warning-light", link: "light", nav: "dark2", btn: "warning", text: "Жёлтая" },
	{ theme: "greenLight", bodyBG: "success-dark", bg: "success", bgSecond: "success-light", link: "light", nav: "dark2", btn: "success", text: "Зелёная" },
	{ theme: "redLight", bodyBG: "danger-dark", bg: "danger", bgSecond: "danger-light", link: "light", nav: "dark2", btn: "danger", text: "Красная" },
	{ theme: "blueLight", bodyBG: "info-dark", bg: "info", bgSecond: "info-light", link: "light", nav: "dark2", btn: "info", text: "Синяя" },
	{ theme: "purpleLight", bodyBG: "purple-dark", bg: "purple", bgSecond: "purple-light", link: "light", nav: "dark2", btn: "purple", text: "Пурпурная" },
	{ theme: "orangeLight", bodyBG: "orange-dark", bg: "orange", bgSecond: "orange-light", link: "light", nav: "dark2", btn: "orange", text: "Оранжевая" },
	{ theme: "classicDark", bodyBG: "dark2", bg: "dark", bgSecond: "secondary", link: "light", nav: "dark2", btn: "dark", text: "Тёмная" },
	{ theme: "yellowDark", bodyBG: "dark2", bg: "dark", bgSecond: "warning-dark", link: "warning", nav: "warning", btn: "warning", text: "Тёмно-Жёлтая" },
	{ theme: "greenDark", bodyBG: "dark2", bg: "dark", bgSecond: "success-dark", link: "success", nav: "success", btn: "success", text: "Тёмно-Зелёная" },
	{ theme: "redDark", bodyBG: "dark2", bg: "dark", bgSecond: "danger-dark", link: "danger", nav: "danger", btn: "danger", text: "Тёмно-Красная" },
	{ theme: "blueDark", bodyBG: "dark2", bg: "dark", bgSecond: "info-dark", link: "info", nav: "info", btn: "info", text: "Тёмно-Синяя" },
	{ theme: "purpleDark", bodyBG: "dark2", bg: "dark", bgSecond: "purple-dark", link: "purple", nav: "purple", btn: "purple", text: "Тёмно-Пурпурная" },
	{ theme: "orangeDark", bodyBG: "dark2", bg: "dark", bgSecond: "orange-dark", link: "orange", nav: "orange", btn: "orange", text: "Тёмно-Оранжевая" },
];



$(() => {
	BodyTheme = () => {
		let Body = $('body');
		for (let i = 0; i < ThemeList.length; i++) {
			const theme = ThemeList[i];
			Body.removeClass(`bg-${theme.bodyBG}`);
		}
		Body.addClass(`bg-${ThemeSet.BodyBackground}`);
	}
	BodyTheme();
});

if (localStorage.getItem('Wallpaper') == null) {
	localStorage.setItem('Wallpaper', JSON.stringify('classicDark'));
}