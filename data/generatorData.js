
//! Все типы занятий для самого себя
let allRandomTypes = [
    ["number", "Случайное число"],
    ["writing" ,"Писать"],
    ["randNote" ,"Случайная заметка"],
    ["anime" ,"Смотреть аниме"],
    ["films" ,"Смотреть фильм"],
    ["serial" ,"Смотреть сериал"],
    ["walk" ,"Прогуляться"],
    ["coding" ,"Программировать"],
    ["playing" ,"Играть в"],
    ["sport" ,"Заняться спортом"],
    ["cooking" ,"Готовить"],
    ["randWiki" ,"Случайная карточка вики"],
    ["reading", "Читать книгу"],
    ["cartoon", "Смотреть мульт"],
    ["manga", "Читать мангу"],
];

let allWritingGenerator = [
    "Не тот, что прежде",
    "Разлом",
];

let allSandboxGames = [
    "CS Ultimante V3.2.2017 fulsetup",
    "Hades",
    "Deep rock galactic",
    "Skyrim",
    "The Sims 4",
    "The Sims 3",
    "Devil May Cry 5",
    "Battlefield 4",
    "Doom Ethernal",
    "Grand Theft Auto V",
    "Attack on Titan 2",
    "Cities Skylines",
    "Yazkuza 0",
    "Mortal Kombat 9",
    "Mortal Kombat 11",
    "Ведьмак 3",
    "Slay the spire",
    "Team fortress 2",
];

let allPlotGames = [
    "This is the police",
    "Bioshock: infinite",
    "Unravel",
    "Delta Force: Task force dagger",
    "Little Nightmares",
    "Ведьмак 1",
    "Ведьмак 2",
    "Devil may cry 4",
    "Doom 2016",
    "Dishonored 2",
    "Dragon Age: orgins",
    "Hollow Knight",
    "Just Cause 3",
    "Dark messiah",
    "Kingdom Come: Deliverance",
    "Metal Gear Solid V: The Phantom pain",
    "Metal Gear Solid V: Ground Zeroes",
    "Darksiders",
    "Code Vein",
    "Red Strings club",
    "Need for Speed",
    "A Hat in Time",
    "Star Wars: The Force Unleashed",
    "Darksiders 2",
    "Medieval Dynasty",
    "",
    //"",
];

let allProgrammingGenerator = [
    "Python (skillbox)",
    "Godot (Наблюдатели)",
    "React (skillbox)",
    "Нейронки на python",
    "",
];

let allSportGenerator = [
    "Ганели",
    "Пресс",
    "упражнения для спины",
    "беговая дорожка",
    "Футбол (кинект)",
    "Боулинг (кинект)",
    "Бокс (кинект)",
    "Атлетика (кинект)",
    "Волейбол (кинект)",
    "Настольный теннис (кинект)",
    "Дартс (кинект)",
    "Регби (кинект)",
    "Бейсбол (кинект)",
    "Гольф (кинект)",
    "Лыжи (кинект)",
    "Теннис (кинект)",
    "",
];

let allWalkGenerator = [
    "в сторону юбилейного (на север)",
    "в сторону валентиновки (леса)",
    "в сторону юга (где лес и парад планет)",
    "в сторону казахстана (москвы)",
    "",
];

let allCookingGenerator = [
    "пельмени",
    "шаурму",
    "хлопья",
    "курицу",
    "салатик",
    "",
];

let allAnimeGenerator = [
    //"Притворная любовь",
    "золотой парень",
    "Dr. Stone",
    "Восхождение в тени",
    "Классный кризис",
    //"Overlord",
    "JoJo",
    "Angel Beats -",
    "Blade of the Immortal",
    "Игра дарвина",
    "Ранма 1/2",
    "Sabage-bu!",
    "Унеси меня на луну",
    "Богатый детектив",
    "Восхождение в тени",
    "Насколько тяжелые гантели ты сможешь поднять",
    "Рыцарь-вампир",
    "Реинкарнация безработного",
    "Токийский гуль",
    "Ты — хозяин, я — слуга",
    "Повесть о конце света",
    "Золотая пора",
    "Эхо террора",
    "Решающий удар",
    //"Этот герой неуязвим но очень осторожен",
    "Члены школьного совета",
    //"Тяжёлый труд в подземелье",
    "Фарфоровая кукла",
    "Семья шпионов",
    "Мастер на все руки Сайто в другом мире",
    "Шарлотта",
    "Томо - девушка!",
    "Привлекая поцелуй",
    "Валькирия и любовь",
    "Веремейл в золотом",
    "В другом мире со смартфоном",
    "",
    //"",
];

let allFilmsGenerator = [
    "Первому игроку приготовиться",
    "Глупый и бессмысленный жест",
    "Пропавшая",
    "Отрыв",
    "Сноуден",
    "Ninjago movie",
    "Эскобар (2017)",
    "Красное уведомление",
    "Бойфренд из будущего",
    "Не отпускай",
    "Образцовый самец",
    "Хакер",
    "Полтора шпиона",
    "Большой брат (2018)",
    "Принцесса-лебедь",
    "Мистер Бивень **",
    //"Кунг-фу панда 1 *",
    "Третий лишний",
    "Леон",
    "День курка (2020)",
    "Тихоня в школьной столовой",
    "Зелёная книга",
    "Двадцать одно (2008)",
    "Облачно, возможны осадки в виде фрикаделек *",
    "Остин Поверс",
    "Капернаум",
    //"Губка боб и корона Нептуна",
    //"Губка боб в 3D",
    "Малифисента",
    "Хроники Нарнии",
    "Зелёная миля",
    //"Ронал-варвар",
    "Мэри и Макс",
    "Метропия",
    "Аврора",
    "Омар",
    "Лобстер",
    "Мариот",
    "Приключения Флика",
    "Хищник",
    "Толстяк Альберт",
    "Убить боба -",
    //"Терминатор",
    "Время",
    "Счастливого дня смерти",
    "Дитя человеческое",
    "Шоу Трумана",
    "Геошторм",
    //"Зверополис -",
    //"Пипец",
    "Милые кости",
    "Заводной Апельсин",
    "Как приручить дракона",
    "Муха",
    "Гремлины",
    "Грязь",
    //"Волк с Уолл-Стрит",
    "Залечь на дно в Брюгге",
    "Джанго: Освобождённый",
    "12 rounds 3: lockdown",
    "Стальной Гигант",
    "Довод",
    "Город героев",
    "Близ диканьки",
    "Борат",
    "Копрорация монстров",
    "Пророк",
    "Великий Гэтсби",
    "Знамения",
    "Мачо и ботан",
    "Мед в голове",
    "Особо опасен",
    "Страх и ненависть Лас-Вегаса",
    "Красная шапочка энд Серый волк",
    "Остров сокровищ",
    "Остров",
    "Следствие ведут колобки",
    "Обратная сторона луны",
    "Мафия",
    //"Люди в чёрном",
    "Убить билла",
    "Жизнь за гранью",
    "Зеркала",
    "Страсти Христовы",
    "Необратимость",
    "Антихрист",
    "Сырое",
    "Зелёный ад",
    "Неуязвимый / Сплит",
    "Джей и молчаливый Боб *",
    "Бегущий по лезвию",
    "Хардкор -",
    "Нерв",
    "13 Грехов",
    "Лицо со шрамом",
    "Аура восьмиклассника",
    //"Бэтмен: Убийственная шутка",
    "Притворись моей женой",
    "Возможности карьеры",
    //"Кот в сапогах -",
    "Кот в сапогах 2",
    "Быстрее пули",
    "Ральф",
    "Гадкий Я",
    "Стрелок (2007)",
    "Гадкий Я 2",
    "Все могу (2015)",
    "Механик (2011)",
    "Хостел",
    "Поймай меня, если сможешь (2002)",
    "Неоспоримый",
    "Пара на праздники",
    "Робот по имени Чаппи",
    "Он",
    "Изобретение лжи",
    "Superперцы",
    "Как сделать себе идеального парня",
    "Легенда",
    "Джерри и Мардж",
    "Без тормозов",
    //"Парни со стволами (2016)",
    "Трасса 60 (2002)",
    "Оппенгеймер",
    "Она",
    "Космическая одиссея (1968)",
    "Бесславные ублюдки",
    "Вечное сияние чистого разума",
    "Мечтатели (2003)",
    "Бруно",
    "Скотт Пилигрим против всех",
    "Крик (все части)",
    "Чёрный Адам",
    "Балто",
    "Бионикл",
    "гонка на вымирание",
    "Чокнутый профессор",
    "",
    //"",
];

let allSerialGenerator = [
    "Острые козырьки",
    "Остров отчаянных героев",
    "Моряк Папай",
    "Мульт личности",
    "Под куполом",
    "Лейт найт скул",
    "Бесстыжие",
    "Люцифер",
    "Пацаны (the boys)",
    "Бруклин 9-9",
    "Во все тяжкие",
    "Семья Нестеренко",
    "Power Rangers",
    "Волшебники из Бэверли-хилз",
    "Любовь, смерть и роботы",
    "Давай убьём гитлера",
    "Доктор Кто",
    "Дворняги",
    "Зик и Лютер",
    "Братья Джонас",
    "Офис",
    "Отбросы",
    "Ход королевы",
    "Малкольм в центре внимания",
    "Семейка Адамс",
    "Мир дикого запада",
    "Новичок (2018)",
    "Прослушка",
    "Чёрное зеркало",
    "Доктор Брейн",
    "Сообщество",
    "Два холма",
    "Король Талсы",
    "Два короля",
    "Мистер робот",
    "Игра престолов",
    "Черное зеркало",
    "",
    //"Легенда об искателе -",
    //"",
]; 

let allBookGenerator = [
    "Керниган, Пайк: Практика программирования",
    "Властелин колец",
    "1984",
    "Идиократия",
    "О, дивный новый мир",
    "451 по фаренгейту",
    "Томминокеры",
    "Тёмная башня",
    "Рациональный мужчина [Ролло Томасси]",
    "50 дней до самойбийства",
    "Град обреченный",
    "Искусство оскорблять",
    "Трансерфинг реальности",
    "Томминокеры",
    "",
    //"",
];

let allCartoonGenerator = [
    "Похождения императора",
    "Мир квеста",
    "Капитан пронин",
    "Американский дракон Джейк-Лонг",
    "Завоеватель Зим",
    "Чародейки",
    "Бейблейд горячий металл",
    "Шаман Кинг",
    "Школа клонов",
    "Мотор-сити",
    "Югио",
    "Южный парк",
    "Гриффины",
    "Американский папаша",
    "Бешенные кролики",
    "Полиция Парадайз",
    "Бриклберри",
    "Неуязвимый",
    "Кик Бутовский",
    "Настоящие монстры",
    "Волшебные покровители",
    "Луни Тюнз",
    "",
    //"",
];

let allMangaGenerator = [
    "Гаремная жизнь хозяина проклятого меча",
    "Игрок, который вернулся спустя 10000 лет",
    "Поднятие уровня в одиночку",
    "Internet Explorer Comics",
    "Клиника кошмаров",
    "100 девушек очень очень очень любят тебя",
    "Мир боевых исскуств",
    "Магическое подразделение паладинов и призванных демонов",
    "DCead",
    "",
    //"",
];





//?-------------------------------------------------

let allGamesGenerator = [
    ...allSandboxGames,
    ...allPlotGames
];


let allNotesGenerator = Array();
for(note in noteTypes){
    allNotesGenerator.push(...JSON.parse(localStorage.getItem(`Notes-${note}`)))
}

let allWikisGenerator = Array();
/*
for(wiki in wikiDataAll){
    let wikiTypeStr = wikiDataAll[wiki][1];
    let wikiPanelArr = wikiDataAll[wiki][2];
    for(wikiPanel in wikiPanelArr){
        allWikisGenerator.push(...JSON.parse(localStorage.getItem(`Wiki-${wikiTypeStr}-${wikiPanel}`)));
    }
}
*/

//?-------------------------------------------------

//!Все массивы с данными для генератора
let generatorArrays = [
    [], //номера
    allWritingGenerator,
    allNotesGenerator,
    allAnimeGenerator,
    allFilmsGenerator,
    allSerialGenerator,
    allWalkGenerator,
    allProgrammingGenerator,
    allGamesGenerator,
    allSportGenerator,
    allCookingGenerator,
    allWikisGenerator,
    allBookGenerator,
    allCartoonGenerator,
    allMangaGenerator,
];


//! сортировка генератора
let sortGenerator = () => {
    let fullGenerator = Object();
    for(gen in allRandomTypes){
        fullGenerator[`${allRandomTypes[gen][0]}`] = [allRandomTypes[gen][1],generatorArrays[gen]];
    }
    return fullGenerator;
}

const allSortedGenerator = sortGenerator();