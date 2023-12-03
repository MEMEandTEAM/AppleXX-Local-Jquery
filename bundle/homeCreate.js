$(() => {
    
    let createGenDoing = () =>{
        let genDoingArr = [];
        for(gen in allSortedGenerator){
            if(gen != "randNote" && gen != "randWiki" && gen != "number"){
                genDoingArr.push(allSortedGenerator[gen]);
            }
        }
        return genDoingArr;
    }
    const genDoingData = createGenDoing();

    updateGeneratorRandomMini = () =>{
        let randomDoing = getRandomArr(genDoingData);
        $('.mini-generator-name').html(randomDoing[0]);
        $('.mini-generator-val').html(getRandomArr(randomDoing[1]));
    }

    setRandomBrowserCards = () =>{
        $('.iconCategory').children().remove();
        let HomeTabDataAllArr = Array();
        let HometabCards = Array();
        for(data in HometabDataAllSorted){
            let miniHometabArr = HometabDataAllSorted[data].slice(1);
            HomeTabDataAllArr.push(...miniHometabArr);
        }
        for (let index = 0; index < 5; index++) {
            let randomHometab = getRandomArr(HomeTabDataAllArr);
            let randomHometabCard = `
                <a href="${randomHometab.link}" class="borderGradient card iconCard bg-${ThemeSet.SecondBackground} bgSecond borderPrimary border-${ThemeSet.Primary} col-lg-3 col-md-5 col-sm-4 mx-1 my-2 text-decoration-none">
                    <img class="card-img-top cardImg" src="${randomHometab.prev}" alt="${randomHometab.name}">
                    <div class="card-body">
                        <p class="card-text iconText link-${ThemeSet.Primary} linkPrimary">${randomHometab.name}</p>
                    </div>
                </a>
            `;
            HometabCards.push(randomHometabCard);
        }
        $(HometabCards.join('')).appendTo('.iconCategory');
        fixCards();
    }

    setRandomMusicHome = () =>{
        let musicHome = getRandomArr(MusicDataAll);
        let musicHomePath = `assets/music/${musicHome.type2}/${musicHome.mp3}`
        $('#audioHome').attr({src: musicHomePath});
        $('.homeMusicName').text(musicHome.name);
    }

    let fullStartPage = () =>{

        let randomHomeAudio = `
            <div class="row homeTypes">
                <h2 class="mainListName link-${ThemeSet.Primary} linkPrimary">
                    Мини-плеер
                    <button onclick="setRandomMusicHome()" class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><i class="fa-solid fa-shuffle"></i></button>
                </h2>
                <h4 class="link-${ThemeSet.Primary} linkPrimary homeMusicName mainListName"></h4>
                <audio id="audioHome" col-12 controls src=""></audio>
            </div>
        `;

        let randomBrowser = `
            <div class="homeTypes">
                <h2 class="mainListName link-${ThemeSet.Primary} linkPrimary">
                    Закладки браузера
                    <button onclick="setRandomBrowserCards()" class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><i class="fa-solid fa-shuffle"></i></button>
                </h2>
                <div class="row iconCategory border border-${ThemeSet.Primary} borderPrimary rounded"></div>
            </div>
        `;

        let doingGenertatePanel = `
            <div class="homeTypes mainListName rounded border border-${ThemeSet.Background} bg-${ThemeSet.Primary}-dark bgPrimaryDark borderBack">
                <h2 class="mainListName link-${ThemeSet.Primary} linkPrimary">
                    Сегодня предлагаем 
                    <button onclick="updateGeneratorRandomMini()" class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><i class="fa-solid fa-shuffle"></i></button>
                </h2>
                <div class="miniGeneratorRow">
                    <p class="h3 link-${ThemeSet.Primary} linkPrimary mini-generator-name"></p>
                    <p class="h3 link-${ThemeSet.Primary} linkPrimary mini-generator-val"></p>
                </div>
                </div>
            </div>
        `;

        let randomWikiHome = `
            <div class="mainListName generatorListCard rounded generator-randWiki border border-${ThemeSet.Background} borderBack bgPrimaryDark bg-${ThemeSet.Primary}-dark">
                <button class="btn btn-${ThemeSet.Btn} btnBtn col-12" onclick="">Ресет локального хранилища</button>
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

        let randomNoteHome = `
            <div class="mainListName generatorListCard rounded generator-randNote border border-${ThemeSet.Background} borderBack bg-${ThemeSet.Primary}-dark bgPrimaryDark">
                <div class="row">
                    <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Background} linkPrimary">Заметка</p>
                    <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Primary} linkBack generator-randNote-val"></p>
                </div>
                <div class="row underBtnsGenerator">
                    <button onclick="noteShowGenerator();" class="col-md-4 col-sm-11 btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><h4>Показать заметку</h4></button>
                    <button onclick="noteGenerator();" class="col-md-4 col-sm-11 btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><h4>Случайная заметка</h4></button>
                </div>
                <ul class="generatorNote" style="display: none;">
                    <li>
                        <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">Название</p>
                        <p placeholder="Написать что-то..." class="h4 gen-task-name border border-${ThemeSet.Primary} borderPrimary linkPrimary bgBack link-${ThemeSet.Primary} bg-${ThemeSet.BodyBackground} taskView"></p>
                    </li>
                    <li>
                        <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">Описание</p>
                        <p placeholder="Написать что-то..." class="h4 gen-task-main border border-${ThemeSet.Primary} borderPrimary linkPrimary bgBack link-${ThemeSet.Primary} bg-${ThemeSet.BodyBackground} taskView"></p>
                    </li>
                    <li>
                        <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">Остальное</p>
                        <p placeholder="Написать что-то..." class="h4 gen-task-other border border-${ThemeSet.Primary} borderPrimary linkPrimary bgBack link-${ThemeSet.Primary} bg-${ThemeSet.BodyBackground} taskView"></p>
                    </li>
                </ul>
            </div>
        `;


        let startPageFull = $(`
            <div class="homeStarted" style="display:none;">
                <h2 class="link-${ThemeSet.Primary} linkPrimary h1-start">Добро пожаловать</h2>
                <div class="homeStarted-menu row">
                    ${doingGenertatePanel}
                    ${randomBrowser}
                    ${randomHomeAudio}
                    ${randomWikiHome}
                    ${randomNoteHome}
                </div>
            </div>
        `);
        startPageFull.appendTo('.app');
        setTimeout(() => {
            if($('.homeStarted').is(':hidden')){
                $('.homeStarted').slideToggle(1000,"linear");
            }
        }, 300);
    }

    FullHouse = () =>{
        fullStartPage();
        updateGeneratorRandomMini();
        setRandomBrowserCards();
        setRandomMusicHome();
        noteGenerator();
        wikiGenerator();
    };


});