const HometabDataType = {
	society: "Соцсети и почта",
	gameMods: "Моды для игр",
	LoL: "League of Legends",
	anime: "Аниме и сериалы",
	useful: "Полезное",
	writing: "Писательство",
	webCrafting: "Вёрстка",
	gameDev: "Разработка игр",
	torrents: "Торренты",
	university: "Универское",
	marks: "Закладки",
};

const PathTab = "assets/homeTab/";

const HometabDataAll = [
	{
		type: [HometabDataType.society],
		name: "* VK",
		prev: `${PathTab}vk-logo.png`,
		link: "https://vk.com/",
		crossed: 0,
	},
	{
		type: [HometabDataType.society],
		name: "*v Reddit",
		prev: `${PathTab}reddit-logo.png`,
		link: "https://www.reddit.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.society],
		name: "* YouTube",
		prev: `${PathTab}YouTube-logo.png`,
		link: "https://www.youtube.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.society],
		name: "*l Янедкс Почта",
		prev: `${PathTab}yandexMail-logo.png`,
		link: "https://mail.yandex.ru/",
		crossed: 0
	},
	{
		type: [HometabDataType.society],
		name: "*a Gmail",
		prev: `${PathTab}gmail-logo.png`,
		link: "https://mail.google.com/mail/u/0/#inbox",
		crossed: 0
	},
	{
		type: [HometabDataType.society,HometabDataType.gameDev,HometabDataType.webCrafting],
		name: "*v GitHub",
		prev: `${PathTab}github-logo.png`,
		link: "https://github.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.society],
		name: "*v GitLab",
		prev: `${PathTab}gitLab-logo.png`,
		link: "https://gitlab.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.gameMods],
		name: "*v NexusMods",
		prev: `${PathTab}nexus-logo.png`,
		link: "https://www.nexusmods.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.gameMods],
		name: "PlayGround",
		prev: `${PathTab}playground-logo.png`,
		link: "https://www.playground.ru/",
		crossed: 0
	},
	{
		type: [HometabDataType.gameMods],
		name: "Gamer-Mods",
		prev: `${PathTab}GM-logo.jpg`,
		link: "https://gamer-mods.ru/",
		crossed: 0
	},
	{
		type: [HometabDataType.gameMods],
		name: "TES-Game",
		prev: `${PathTab}tesgame-logo.ico`,
		link: "http://tes-game.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.gameMods],
		name: "Minecraft-Inside",
		prev: `${PathTab}minecraftInside-logo.png`,
		link: "https://minecraft-inside.ru/",
		crossed: 0
	},
	{

		type: [HometabDataType.gameMods],
		name: "Ru-Minecraft",
		prev: `${PathTab}RuMinecraft-logo.jpg`,
		link: "https://ru-minecraft.ru/",
		crossed: 0
	},
	{
		type: [HometabDataType.gameMods],
		name: "GTA5 Mods",
		prev: `https://images.gta5-mods.com/icons/favicon.png`,
		link: "https://ru.gta5-mods.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.gameMods],
		name: "GTA.com",
		prev: `https://gta.com.ua/favicon.ico`,
		link: "https://gta.com.ua/",
		crossed: 0
	},
	{
		type: [HometabDataType.gameMods],
		name: "Synthira",
		prev: `https://synthira.ru/templates/Synthira/images/favicon.ico`,
		link: "https://synthira.ru/",
		crossed: 0
	},
	{
		type: [HometabDataType.LoL],
		name: "OP.GG",
		prev: "https://s-lol-web.op.gg/images/icon/opgglogo.svg?v=1658394405082",
		link: "https://ru.op.gg/",
		crossed: 0
	},
	{
		type: [HometabDataType.LoL],
		name: "U.GG",
		prev: "https://static.bigbrain.gg/assets/ugg/favicon/favicon-32x32.png",
		link: "https://u.gg/lol/profile/ru/mustbegamer/overview",
		crossed: 0
	},
	{
		type: [HometabDataType.LoL],
		name: "League of Graphs",
		prev: "//lolg-cdn.porofessor.gg/img/s/favicon_v2.png",
		link: "https://www.leagueofgraphs.com/ru/summoner/ru/MustBeGamer",
		crossed: 0
	},
	{
		type: [HometabDataType.anime],
		name: "Shikimori",
		prev: "https://shikimori.one/favicon.ico",
		link: "https://shikimori.one/animes/status/ongoing",
		crossed: 0
	},
	{

		type: [HometabDataType.anime],
		name: "AnimeGo",
		prev: "https://animego.org/favicon-32x32.png",
		link: "https://animego.org/",
		crossed: 0
	},
	{
		type: [HometabDataType.anime],
		name: "Anime-Stars",
		prev: "https://animestars.org/templates/New/images/favicon.ico",
		link: "https://animestars.org/",
		crossed: 0
	},
	{
		type: [HometabDataType.anime],
		name: "YummyAnime",
		prev: "https://yummyanime.org/favicon.png",
		link: "https://yummyanime.org/",
		crossed: 0
	},
	{
		type: [HometabDataType.anime],
		name: "# Anilibria",
		prev: "https://tvfeed.in/cache/3b/93/3b932c24d1a8b9a72899dc96cfbd3c80.jpg",
		link: "https://anilibria.tv/",
		crossed: 0
	},
	{
		type: [HometabDataType.anime],
		name: "Zetfix",
		prev: "https://zetfix.online/favicon.ico",
		link: "https://zetfix.online/",
		crossed: 0
	},
	{
		type: [HometabDataType.useful, HometabDataType.webCrafting],
		name: "*o Netlify",
		prev: "https://www.netlify.com/v3/static/favicon/apple-touch-icon.png",
		link: "https://app.netlify.com/teams/olegrozhkov2287/overview",
		crossed: 0
	},
	{

		type: [HometabDataType.useful],
		name: "Переводчик",
		prev: "http://ssl.gstatic.com/translate/favicon.ico",
		link: "https://translate.google.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.useful],
		name: "*v AI Dungeon",
		prev: "https://play.aidungeon.io/favicon.ico",
		link: "https://play.aidungeon.io/main/home/",
		crossed: 0
	},
	{
		type: [HometabDataType.useful, HometabDataType.gameMods],
		name: "Steam Workshop",
		prev: "http://steamworkshop.download/favicon.ico",
		link: "http://steamworkshop.download/",
		crossed: 0
	},
	{
		type: [HometabDataType.marks],
		name: "Photoshop",
		prev: "https://fotoredactor.ru/image/home-logo.svg",
		link: "https://fotoredactor.ru/adobe-photoshop-2021/",
		crossed: 0
	},
	{
		type: [HometabDataType.useful, HometabDataType.writing],
		name: "RandomAll генераторы ",
		prev: "https://randomall.ru/favicon-32x32.png",
		link: "https://randomall.ru/",
		crossed: 0
	},
	{
		type: [HometabDataType.useful],
		name: "## Cheatground",
		prev: "http://www.cheatground.ru/favicon.ic",
		link: "http://www.cheatground.ru/",
		crossed: 1
	},
	{
		type: [HometabDataType.writing, HometabDataType.useful],
		name: "*a Документы",
		prev: "https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png",
		link: "https://docs.google.com/document/u/0/",
		crossed: 0
	},
	{
		type: [HometabDataType.writing, HometabDataType.useful],
		name: "*a Таблицы",
		prev: "https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png",
		link: "https://docs.google.com/spreadsheets/u/0/",
		crossed: 0
	},
	{
		type: [HometabDataType.marks],
		name: "Вики старое (кринж концепт)",
		prev: "https://justbased.netlify.app/fons/favicon.ico",
		link: "https://justbased.netlify.app/",
		crossed: 0
	},
	{
		type: [HometabDataType.writing],
		name: "*v Miro",
		prev: "https://miro.com/static/favicons/apple-touch-icon-76x76.png?cbh=125c14f7d2c4919fba6c7cc26e958a81",
		link: "https://miro.com/app/dashboard/",
		crossed: 0
	},
	{
		type: [HometabDataType.writing],
		name: "# Эльфы",
		prev: "https://cdn-icons-png.flaticon.com/512/1065/1065442.png",
		link: "https://wow-cool.ru/raznoe/elfijskie-imena-zhenskie-spisok-kakie-est-elfijskie-imena-zhenskie-yandeks-znatoki.html",
		crossed: 0
	},
	{
		type: [HometabDataType.webCrafting],
		name: "*l Skillbox",
		prev: "https://skillbox.ru/favicon-32x32.png",
		link: "https://go.skillbox.ru/education/my",
		crossed: 0
	},
	{
		type: [HometabDataType.webCrafting],
		name: "Webref",
		prev: "https://webref.ru/themes/webref/ico/favicon.svg",
		link: "https://webref.ru",
		crossed: 0
	},
	{
		type: [HometabDataType.webCrafting],
		name: "NPM JS (либы)",
		prev: "https://static.npmjs.com/58a19602036db1daee0d7863c94673a4.png",
		link: "https://www.npmjs.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.webCrafting],
		name: "Reg домены",
		prev: "https://www.reg.ru/i/svg/b-header__logo_type_ru.svg",
		link: "https://www.reg.ru",
		crossed: 0
	},
	{
		type: [HometabDataType.webCrafting],
		name: "Stepik",
		prev: "https://stepik.org/static/classic/ico/favicon_152.png",
		link: "https://stepik.org/catalog",
		crossed: 0
	},
	{
		type: [HometabDataType.webCrafting],
		name: "Bootstrap5",
		prev: "https://bootstrap5.ru/img/favicons/apple-touch-icon.png",
		link: "https://bootstrap5.ru",
		crossed: 0
	},
	{
		type: [HometabDataType.webCrafting],
		name: "TheCode",
		prev: `${PathTab}code-logo.jpg`,
		link: "https://thecode.media",
		crossed: 0
	},
	{
		type: [HometabDataType.webCrafting],
		name: "# Pexels фонки",
		prev: `${PathTab}pexel-logo.png`,
		link: "https://www.pexels.com/ru-ru/videos/",
		crossed: 0
	},
	{
		type: [HometabDataType.webCrafting],
		name: "React",
		prev: `${PathTab}react-logo.png`,
		link: "https://ru.reactjs.org",
		crossed: 0
	},
	{
		type: [HometabDataType.webCrafting],
		name: "Photopea (редактор)",
		prev: `https://www.photopea.com/promo/icon512.png`,
		link: "https://www.photopea.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.gameDev],
		name: "UE магаз",
		prev: `${PathTab}ue-logo.png`,
		link: "https://www.unrealengine.com/marketplace/en-US/store",
		crossed: 0
	},
	{

		type: [HometabDataType.gameDev],
		name: "*o Mixamo анимки",
		prev: `https://www.mixamo.com/favicon.ico`,
		link: "https://www.mixamo.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.gameDev],
		name: "RPGmaker Формулы",
		prev: `https://forums.rpgmakerweb.com/data/bg/rpgmaker-r.png`,
		link: "https://forums.rpgmakerweb.com/index.php?threads/damage-formulas-101.81905/",
		crossed: 0
	},
	{
		type: [HometabDataType.torrents],
		name: "# VseTop",
		prev: `${PathTab}vsetop-logo.png`,
		link: "https://vsetop.org/",
		crossed: 0
	},
	{
		type: [HometabDataType.torrents],
		name: "NoTorGames",
		prev: `https://notorgames.net/wp-content/uploads/2020/03/cropped-icon2-270x270.png`,
		link: "https://notorgames.net/",
		crossed: 0
	},
	{
		type: [HometabDataType.gameDev],
		name: "RPGMakerUnion",
		prev: `https://rpgmakerunion.ru/favicon-32x32.png`,
		link: "https://rpgmakerunion.ru",
		crossed: 0
	},
	{
		type: [HometabDataType.webCrafting],
		name: "Преобразовать цвета",
		prev: `https://colorscheme.ru/apple-touch-icon-72x72.png`,
		link: "https://colorscheme.ru/color-converter.html",
		crossed: 0
	},
	{
		type: [HometabDataType.university],
		name: "Unitech MO",
		prev: `https://ies.unitech-mo.ru/files/upload/pages/_thumb/image/favicon.ico`,
		link: "https://ies.unitech-mo.ru",
		crossed: 0
	},
	{
		type: [HometabDataType.university],
		name: "Znanium",
		prev: `https://znanium.com/img/icons/favicon-32x32.png`,
		link: "https://znanium.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.university],
		name: "Лань ЭБС",
		prev: `https://e.lanbook.com/favicon.ico`,
		link: "https://e.lanbook.com/",
		crossed: 0
	},
	{
		type: [HometabDataType.university],
		name: "БиблиоКлуб",
		prev: `https://cdn.knightlab.com/libs/orangeline/latest/assets/favicons/favicon-32x32.png`,
		link: "https://biblioclub.ru/",
		crossed: 0
	},
	{
		type: [HometabDataType.university],
		name: "Доп. Библиотеки",
		prev: `https://ies.unitech-mo.ru/files/upload/pages/_thumb/image/favicon.ico`,
		link: "https://unitech-mo.ru/library/resources/electronic-resources/",
		crossed: 0
	},
	{
		type: [HometabDataType.useful],
		name: "Яндекс диск",
		prev: `${PathTab}YandexDisk-logo.png`,
		link: "https://disk.yandex.ru/client/recent",
		crossed: 0
	},
	{
		type: [HometabDataType.gameDev],
		name: "Godot доки офф.",
		prev: `https://docs.godotengine.org/en/3.2/_static/docs_logo.png`,
		link: "https://docs.godotengine.org/ru/stable/index.html#",
		crossed: 0
	},
	{
		type: [HometabDataType.gameDev],
		name: "# Godot Engine",
		prev: `https://godot-engine.ru/logo.png`,
		link: "https://godot-engine.ru/",
		crossed: 0
	},
	{
		type: [HometabDataType.marks],
		name: "k Сохранения стим",
		prev: `https://store.cloudflare.steamstatic.com/public/images/v6/logo_steam_footer.png`,
		link: "https://store.steampowered.com/account/remotestorage",
		crossed: 0
	},
	{
		type: [HometabDataType.marks],
		name: "Paimon moe",
		prev: `https://paimon.moe/favicon.png`,
		link: "https://paimon.moe/",
		crossed: 0
	},
	{
		type: [HometabDataType.useful,HometabDataType.writing],
		name: "upscale.media (AI)",
		prev: `https://cdn.pixelbin.io/v2/dummy-cloudname/original/upscalemedia_assets/logo/favicon.png`,
		link: "https://www.upscale.media/ru",
		crossed: 0
	},
	{
		type: [HometabDataType.marks],
		name: "Payberry (steam)",
		prev: `https://payberry.ru/content/images/h-logo.svg`,
		link: "https://payberry.ru/pay/5745/8",
		crossed: 0
	},
	{
		type: [HometabDataType.marks],
		name: "FreeSteam",
		prev: `https://avatars.dzeninfra.ru/get-zen-logos/246004/pub_595bf1b6d7d0a69b431e3c50_595bf2d777d0e6f896f754dd/xxh`,
		link: "https://freesteam.ru/",
		crossed: 0
	},
	{
		type: [HometabDataType.writing],
		name: "*v *o-tw PixAI.art",
		prev: `https://pixai.art/favicon.ico`,
		link: "https://pixai.art/",
		crossed: 0
	},
	{
		type: [HometabDataType.marks],
		name: "DNS магазин",
		prev: `https://as.dns-shop.ru/static/11/2l5yo/static/favicon.png`,
		link: "https://www.dns-shop.ru/",
		crossed: 0
	},
	{
		type: [HometabDataType.useful,HometabDataType.university],
		name: "Реверсо перводчик",
		prev: `https://cdn.reverso.net/context/v62110/images/reverso180.png`,
		link: "https://context.reverso.net/%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4/",
		crossed: 0
	},
	{
		type: [HometabDataType.writing,HometabDataType.useful],
		name: "ConvertIO",
		prev: `https://static.convertio.co/favicon.ico`,
		link: "https://convertio.co/ru/webp-png/",
		crossed: 0
	},
	{
		type: [HometabDataType.torrents],
		name: "Tapochek Net",
		prev: `https://tapochek.net/favicon.ico`,
		link: "https://tapochek.net/",
		crossed: 0
	},
	{
		type: [HometabDataType.university,HometabDataType.useful],
		name: "*l Нейронка",
		prev: `https://dpo.edu.asu.ru/pluginfile.php/1/core_admin/logo/0x200/1676858726/%D0%A3%D1%81%D1%8B%20%D0%90%D0%93%D0%A3__%D0%B2%20%D0%BA%D1%80%D1%83%D0%B3%D0%B5.png`,
		link: "https://dpo.edu.asu.ru/course/view.php?id=1527",
		crossed: 0
	},
	{
		type: [HometabDataType.useful],
		name: "*a Google Drive",
		prev: `http://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png`,
		link: "https://drive.google.com/drive/my-drive?hl=ru",
		crossed: 0
	},
	{
		type: [HometabDataType.useful,HometabDataType.university],
		name: "Deepl (переводчик)",
		prev: `https://static.deepl.com/img/favicon/favicon_16.png`,
		link: "https://www.deepl.com/ru/translator",
		crossed: 0
	},
	{
		type: [HometabDataType.anime],
		name: "MultFix",
		prev: `https://multfix.online/templates/Magic_new/images/logo.svg`,
		link: "https://multfix.online/",
		crossed: 0
	},
	{
		type: [HometabDataType.anime],
		name: "AnimeGO",
		prev: `https://animego.online/favicon.ico`,
		link: "https://animego.online",
		crossed: 0
	},
	{
		type: [HometabDataType.gameDev,HometabDataType.writing,HometabDataType.webCrafting],
		name: "*v BAI chat",
		prev: `https://beta.theb.ai/images/theb-ai-model.png`,
		link: "https://beta.theb.ai/home",
		crossed: 0
	},
	{
		type: [HometabDataType.marks],
		name: "Starrail Station",
		prev: `https://pom.moe/favicon.png`,
		link: "https://starrailstation.com/ru",
		crossed: 0
	},
	{
		type: [HometabDataType.university,HometabDataType.marks],
		name: "GPT chatbot",
		prev: `https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png`,
		link: "https://gpt-chatbot.ru/",
		crossed: 0
	},

];
/*
	{
		type: [HometabDataType.],
		name: "",
		prev: ``,
		link: "",
		crossed: 0
	},
*/



// ! код ебац


for (let i = 0; i < HometabDataAll.length; i++) {
	const HomeTab = HometabDataAll[i];
	HomeTab.id = i+1;
}

LoadDataID = () => {
	let HometabDataSortedID = [];

	for (let k in HometabDataType) {
		//массив одной категории
		const TableTab = [HometabDataType[k]];

		for (let i = 0; i < HometabDataAll.length; i++) {

			//собираем данные таба и его категории
			const Hometab = HometabDataAll[i];
			const TabType = Hometab.type;
			const TabID = Hometab.id;

			//проверка подходящего типа категории
			for (let j = 0; j < TabType.length; j++) {
				const Type = TabType[j];
				if (Type == HometabDataType[k]) {
					// добавление таба под категорию
					TableTab.push(TabID);
				}
			}
		}
		HometabDataSortedID.push(TableTab);
	}
	if (localStorage.getItem('Hometab')) {
		HometabDataSortedID = JSON.parse(localStorage.getItem('Hometab'));
	}
	else {
		localStorage.setItem('Hometab', JSON.stringify(HometabDataSortedID));
	}
	return HometabDataSortedID;
}

let SortHometab = () => {
	let HometabDataSorted = [];
	let HometabDataSortedID = LoadDataID();
	// категории с ID
	for (let j = 0; j < HometabDataSortedID.length; j++) {
		const Category = HometabDataSortedID[j];
		//ID В категории
		let CategoryArr = [];
		for (let k = 1; k < Category.length; k++) {
			const ID = Category[k];
			//пробежка по фулл дате
			for (let i = 0; i < HometabDataAll.length; i++) {
				const Hometab = HometabDataAll[i];
				if (Hometab.id == ID) {
					CategoryArr.push(Hometab);
				}
			}
		}
		CategoryArr.unshift(Category[0]);
		HometabDataSorted.push(CategoryArr);
	}
	
	return HometabDataSorted;
}

$(() =>{
	let resetTabsFull = () =>{
		LoadDataID();
		HometabDataAllSorted = SortHometab();
	}
	$('.resetTabs').click(() =>{
		resetTabsFull();
	});
	resetTabsFull();
});
Window.HometabDataType = HometabDataType;
Window.HometabDataAll = HometabDataAll;


/*
{
		type: [HometabDataType.],
		name: "",
		prev: ``,
		link: "",
		crossed: 0
	},

*/