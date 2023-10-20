const Colors = {
    "#ff0000": "Красный",
    "#800000": "Бордовый",
    "#ff4500": "Оранжевый",

    "#4169e1": "Синий",
    "#00ffff": "Голубой",
    "#40e0d0": "Бирюзовый",

    "#008000": "Зелёный",
    "#00ff00": "Лаймовый",
    "#005500": "Лесной",

    "#ffff00": "Жёлтый",
    "#808000": "Оливковый",
    "#8b4513": "Коричневый",

    "#4b0082": "Фиолетовый",
    "#800080": "Пурпурный",
    "#ff69b4": "Розовый",

    "#252525": "Тёмный",
    "#858585": "Серый",
    "#f5f5f5": "Белый",
}

randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

getRandomArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

copyArr = (arr) =>{
    return Object.assign([],arr);
}

$(() => {
    MicroService = (pagetype) => {
        let noteService;
        switch (pagetype) {
            case "вики":
                noteService = `
                <div class="mainListName generatorListCard rounded generator-randNote border border-${ThemeSet.Background} bgPrimaryDark borderBack bg-${ThemeSet.Primary}-dark">
                    <div class="row">
                        <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack">Заметка</p>
                        <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Primary} linkPrimary generator-randNote-val"></p>
                    </div>
                    <div class="row underBtnsGenerator">
                        <button onclick="noteShowGenerator();" class="col-md-4 col-sm-11 btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><h4>Показать заметку</h4></button>
                        <button onclick="noteGenerator();" class="col-md-4 col-sm-11 btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><h4>Случайная заметка</h4></button>
                    </div>
                    <ul class="generatorNote" style="display: none;">
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">Название</p>
                            <p placeholder="Написать что-то..." class="h4 gen-task-name border border-${ThemeSet.Primary} borderPrimary link-${ThemeSet.Primary} linkPrimary bgBody bg-${ThemeSet.BodyBackground} taskView"></p>
                        </li>
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">Описание</p>
                            <p placeholder="Написать что-то..." class="h4 gen-task-main border border-${ThemeSet.Primary} borderPrimary link-${ThemeSet.Primary} linkPrimary bgBody bg-${ThemeSet.BodyBackground} taskView"></p>
                        </li>
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">Остальное</p>
                            <p placeholder="Написать что-то..." class="h4 gen-task-other border border-${ThemeSet.Primary} borderPrimary link-${ThemeSet.Primary} linkPrimary bgBody bg-${ThemeSet.BodyBackground} taskView"></p>
                        </li>
                    </ul>
                </div>
            `;
                break;
            case "заметки":
                noteService = `
                    <div class="mainListName generatorListCard rounded generator-randWiki border border-${ThemeSet.Background} bg-${ThemeSet.Primary}-dark borderBack bgPrimaryDark">
                        <div class="row">
                            <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack">Вики</p>
                            <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Primary} linkPrimary generator-randWiki-val"></p>
                        </div>
                        <div class="row underBtnsGenerator">
                            <button onclick="wikiShowGenerator();" class="col-md-4 col-sm-11 btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><h4>Показать Вики</h4></button>
                            <button onclick="wikiGenerator();" class="col-md-4 col-sm-11 btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><h4>Случайное вики</h4></button>
                        </div>
                        <div class="generatorWiki" style="display: none;">
        
                        </div>
                    </div>
                `;
                break;
        }
        let musicService = `
        <div class="row homeTypes">
            <h2 class="mainListName link-${ThemeSet.Primary} linkPrimary">
                Мини-плеер
                <button onclick="setRandomMusicHome()" class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><i class="fa-solid fa-shuffle"></i></button>
            </h2>
            <h4 class="link-${ThemeSet.Primary} linkPrimary homeMusicName mainListName"></h4>
            <audio id="audioHome" col-12 controls loop src=""></audio>
        </div>
        `;

        let fullMicroService = $(`
            <div>
                ${noteService}
                ${musicService}
            </div>
        `);

        fullMicroService.appendTo('.microService');

        switch (pagetype) {
            case "вики":
                noteGenerator();
                break;
            case "заметки":
                wikiGenerator();
                break;
        }
        setRandomMusicHome();
    }
});

const videoPath = './assets/videos/';
const picPath = './assets/images/';

const VideoDataAll = [
    {
        name: "GANGSTA Opening",
        path: `${videoPath}GANGSTA Opening.mp4`,
    },{
        name: "Opening Redo of Healer",
        path: `${videoPath}Opening Redo of Healer .mp4`,
    },{
        name: "Rengoku vs Akaza",
        path: `${videoPath}Rengoku vs Akaza.mp4`,
    },{
        name: "terukiIntro",
        path: `${videoPath}terukiIntro.mp4`,
    },
];

const allPicturesData = [
    {
        type: 'chars',
        name: 'Арул',
        png: `${picPath}chars/Арул.png`,
    },
    {
        type: 'chars',
        name: 'Мифолий',
        png: `${picPath}chars/Мифолий.png`,
    },
    {
        type: 'chars',
        name: 'Элмар',
        png: `${picPath}chars/Элмар.png`,
    },
    {
        type: 'chars',
        name: 'Юмилия',
        png: `${picPath}chars/Юмилия.png`,
    },
    {
        type: 'chars',
        name: 'Берлина',
        png: `${picPath}chars/Берлина.png`,
    },
    {
        type: 'fractions',
        name: 'HeroMain',
        png: `${picPath}fractions/HeroMain.png`,
    }, {
        type: 'fractions',
        name: 'JustBased2',
        png: `${picPath}fractions/JustBased2.png`,
    },
];