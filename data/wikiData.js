// !--------------------------

// ! wikiDataAll = [типСтраницы, тип(ключ), массив(ист/рас), массив[созд], строка]

const wikiPages = [
    //! 1 - рассы 0 - истории 2 - особые сайты
    //* [ключ, строка, типМассива]
    ["races","Расы", 1],
	["chars","Персонажи", 1],
    ["lore","Лорные факты", 1],
	["fractions","Фракции", 1],
    ["storyLine","Сюжетные линии", 0],
    ["letters","Заметки", 0],
    ["moments","Моменты", 0],
    ["animals","Животные и монстры", 1],
    ["flowers","Растения", 1],
    ["magic","Магия", 1],
    //["elemental","Элементы (магия)", 2],
    /*
    ["fractionNet","Сетка фракций *", 1],
    ["charNet","Сетка персонажей *", 1],
    ["maps","Карты миров *", 2],
    */
];

const allRaces = {
    minding: "Все существа",
    elfs: "Эльфы",
    demons: "Демоны*",
    angels: "Крылатые *",
    humams: "Люди",
    beasts: "Звероиды *",
    reptile: "Рептилоиды *",
}

const allStorys = {
    elfStory: "Не тот, что преджде",
    demonHumanStory: "Разлом",
    angelStory: "Передел постулатов *",
    dragonGod: "Повесть о драконьем боге",
    gods4Mafia: "Община Четырёх Столпов",
    detective: "Испытание судьбы",
    bully: "Путь бродяги (хулиган)",
    business: "Выход есть всегда",
    bulliedSon: "Гибельный исход",
    phoenixGod: "Восстание божественной эгиды",
    warriorBackStory: "Клан Ока *",
    //---
    beastStory: "Зверь **",
    reptileStory: "Битва за престол (рептилоиды) **",
    universityStory: "Созерцатели",
    bibimbusStory: "Крылато - компани **",
}

const wikiCreateTypes = {
    text:"text",
    colorText:"color-text",
    video:"video",
    music:"music",
    picture: "picture",
}

const wikiCreateTypesAll = [
    //! расы
    {
        nameRace: [wikiCreateTypes.colorText,"Название расы"],
        raceAppear1: [wikiCreateTypes.text,"Внешность"],
        raceAppear2: [wikiCreateTypes.text,"Особенности внешности"],
        raceSpecial: [wikiCreateTypes.text,"Особенности"],
        raceSkills: [wikiCreateTypes.text,"Способности"],
        raceMenth: [wikiCreateTypes.text,"Менталитет (характер)"],
        raceConutry: [wikiCreateTypes.colorText,"Родная страна"],
        raceCountyBack: [wikiCreateTypes.text,"Описание родной страны"],
        raceStereotypes: [wikiCreateTypes.text,"Стереотипы"],
    },
    //! персонажи
    {
        nameChar: [wikiCreateTypes.text,"Имя персонажа"],
        charRace: [wikiCreateTypes.colorText,"Раса"],
        charClass: [wikiCreateTypes.text,"Класс"],
        charFract: [wikiCreateTypes.colorText,"Фракция"],
        charSkill: [wikiCreateTypes.text,"Навыки"],
        charAppear: [wikiCreateTypes.text,"Внешность (текст)"],
        сharAppearPicture: [wikiCreateTypes.picture, "Внешность (арт)"],
        charPerson: [wikiCreateTypes.text,"Характер"],
        charTalk: [wikiCreateTypes.text,"Цитаты"],
        charFact: [wikiCreateTypes.text,"Факты"],
        charStories: [wikiCreateTypes.text,"Участие в историях"],
        charOst: [wikiCreateTypes.music,"ОСТ"],
    },
    //! Лорные факты
    {
        nameFact: [wikiCreateTypes.colorText,"Название факта"],
        nameWho: [wikiCreateTypes.colorText,"У кого/чего этот факт"],
        factWrite: [wikiCreateTypes.text,"Описание"],
        factDetail: [wikiCreateTypes.text,"Детали"],
    },
    //! фракции
    {
        nameFraction: [wikiCreateTypes.colorText,"Название фракции"],
        fractLogoPicture: [wikiCreateTypes.picture, "Лого фракции"],
        fractStructure: [wikiCreateTypes.text,"Структура"],
        fractGroups: [wikiCreateTypes.colorText,"Группировки"],
        fractRoles: [wikiCreateTypes.text,"Роли группировок"],
        fractBusiness: [wikiCreateTypes.text,"Деятельность"],
        fractSpecial: [wikiCreateTypes.text,"Особенности"],
        fractMembers: [wikiCreateTypes.text,"Обитатели"],
        fractGoal: [wikiCreateTypes.text,"Цель"],
        fractLocation: [wikiCreateTypes.text,"Местоположение"],
        fractBase: [wikiCreateTypes.text,"База"],
        fractLeader: [wikiCreateTypes.text,"Главарь"],
        fractOst: [wikiCreateTypes.music,"Ост"],
    },
    //! Сюжетные линии
    {
        storyLineName: [wikiCreateTypes.colorText,"Название сюжетки"],
        storyLineMembers: [wikiCreateTypes.text,"Участие персонажей"],
        storyLineFractions: [wikiCreateTypes.text,"Участие фракциий"],
        storyLineWrite: [wikiCreateTypes.text,"Описание"],
        storyLineClass: [wikiCreateTypes.text,"Детали"],
    },
    //! Заметки
    {
        lettersName: [wikiCreateTypes.colorText,"Название заметки"],
        lettersWrite: [wikiCreateTypes.text,"Описание"],
        lettersDetails: [wikiCreateTypes.text,"Детали"],
    },
    //! Моменты
    {
        momentsName: [wikiCreateTypes.colorText,"Название момента"],
        momentsNameVideo: [wikiCreateTypes.text,"Название видео"],
        momentsMembers: [wikiCreateTypes.text,"Участие персонажей"],
        momentsFractions: [wikiCreateTypes.text,"Участие фракциий"],
        momentsWrite: [wikiCreateTypes.text,"Описание"],
        momentsVideo: [wikiCreateTypes.video,"Видео"],
    },
    //! Животные и монстры
    {
        animalsName: [wikiCreateTypes.colorText,"Название животного/монстра"],
        animalsApperance: [wikiCreateTypes.text,"Внешний вид"],
        animalsChar: [wikiCreateTypes.text,"Поведение"],
        animalsSpecial: [wikiCreateTypes.text,"Особенности"],
        animalsLocation: [wikiCreateTypes.text,"Обитание"],
    },
    //! Растения
    {
        flowersName: [wikiCreateTypes.colorText,"Название растения"],
        flowersApperance: [wikiCreateTypes.text,"Внешний вид"],
        flowersChar: [wikiCreateTypes.text,"Поведение"],
        flowersSpecial: [wikiCreateTypes.text,"Особенности"],
        flowersLocation: [wikiCreateTypes.text,"Обитание"],
    },
    //! Магия
    {
        magicName: [wikiCreateTypes.colorText,"Название маг. трюка"],
        magicType: [wikiCreateTypes.colorText,"Тип магии"],
        magicSense: [wikiCreateTypes.text,"Суть использования"],
        magicSpecial: [wikiCreateTypes.text,"Особенности"],
        magicHowUse: [wikiCreateTypes.text,"Как использовать"],
        magicNeeds: [wikiCreateTypes.text,"Требования для пользования"],
    },
    //todo Элементы
    {
        fire: "Огонь",
        water: "Вода",
        earth: "Земля",
        energy: "Энергия",
        void: "Пустота",
        life: "Жизнь",
        dark: "Тьма",
        light: "Свет",
    }
    //Сетка фракций
    //Сетка персонажей
    //Карты миров 2
]

//! создание каждого списка категорий под свой вкус

// ! wikiDataAll = [типСтраницы, тип(ключ), массив(ист/рас), массив[созд], строка]
let sortWikiData = () =>{
    let sortedWiki = [];
    for(pages in wikiPages){
        switch (wikiPages[pages][2]) {
            case 0:
                //? истории
                sortedWiki.push([wikiPages[pages][2],wikiPages[pages][0],allStorys,wikiCreateTypesAll[pages],wikiPages[pages][1]]);
                break;
            case 1:
                //? рассы
                sortedWiki.push([wikiPages[pages][2], wikiPages[pages][0],allRaces,wikiCreateTypesAll[pages],wikiPages[pages][1]]);
                break;
            case 2:
                sortedWiki.push([wikiPages[pages][2], wikiPages[pages][0],'-',wikiCreateTypesAll[pages],wikiPages[pages][1]]);
                break;
        }
    }
    return (sortedWiki);
}

let wikiDataAll = sortWikiData();
for(wikiDataID in wikiDataAll){
    let wikiData = wikiDataAll[wikiDataID];
    let wikiPageID = wikiData[1];
    for(wikiArrID in wikiData[2]){
        if(wikiArrID != "0"){
            if(!JSON.parse(localStorage.getItem(`Wiki-${wikiPageID}-${wikiArrID}`))){
                localStorage.setItem(`Wiki-${wikiPageID}-${wikiArrID}`,JSON.stringify([]));
            }
        }
        else{
            if(!JSON.parse(localStorage.getItem(`Wiki-${wikiPageID}`))){
                localStorage.setItem(`Wiki-${wikiPageID}`,JSON.stringify([]));
            }
        }
    }
}