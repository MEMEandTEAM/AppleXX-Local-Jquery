$(() => {

    wikiShowGenerator = () =>{
        $('.generatorWiki').slideToggle();
    }

    wikiGenerator = () => {
        $('.generatorWiki').children().remove()
        let randWikiArr = getRandomArr(allSortedGenerator.randWiki[1]);
        if(randWikiArr == undefined){
            return;
        }
        let randWikiPanelList = [];
        for(randWikiID in wikiDataAll){
            if(Object.keys(wikiDataAll[randWikiID][3])[0] == Object.keys(randWikiArr)[0]){
                let randWikiList = wikiDataAll[randWikiID][3];
                $('.generator-randWiki-val').html(randWikiArr[Object.keys(randWikiArr)[0]]);
                for(randWiki in randWikiList){
                    let randWikiType = randWikiList[randWiki][0];
                    let randWikiStr = randWikiList[randWiki][1];
                    let randWikiPanel;
                    switch (randWikiType) {
                        case "text":
                            randWikiPanel = `
                                <li>
                                    <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${randWikiStr}</p>
                                    <p class="h4 border linkPrimary bgBody borderPrimary border-${ThemeSet.Primary} link-${ThemeSet.Primary} bg-${ThemeSet.BodyBackground} taskShow taskView">${randWikiArr[randWiki]}</p>
                                </li>
                            `;
                            break;
                        case "color-text":
                            randWikiPanel = `
                                <li>
                                    <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${randWikiStr}</p>
                                    <p class="h4 colorText border bgBody borderPrimary border-${ThemeSet.Primary} bg-${ThemeSet.BodyBackground} taskShow taskView" style="color: ${randWikiArr[`${randWiki}-color`]}">${randWikiArr[randWiki]}</p>
                                </li>
                            `;
                            break;
                        case "video":
                            let randWikiVideo;
                            let randWikiLink;
                            if(randWikiArr[randWiki].includes('https://www.youtube.com/watch?v=')){
                                randWikiLink = randWikiArr[randWiki].replace('https://www.youtube.com/watch?v=','https://www.youtube.com/embed/');
                            }
                            else{
                                randWikiLink = '';
                            }
                            if(randWikiArr[`${randWiki}-type`] == 'youtube'){
                                randWikiVideo = `
                                <iframe src="${randWikiLink}" class="videoSelect" title="YouTube video player" allowfullscreen="" width="500" height="350" frameborder="0"></iframe>
                                `;
                            }
                            else{

                            }
                            randWikiPanel = `
                                <li>
                                    <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${randWikiStr}</p>
                                    ${randWikiVideo}
                                </li>
                            `;
                            break;
                        case "music":
                            randWikiPanel = `
                                <li>
                                    <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${randWikiStr}</p>
                                    <audio class="musicSelect" src="${randWikiArr[randWiki]}" controls></audio>
                                </li>
                            `;
                            break;
                        case "picture":
                            randWikiPanel = `
                                <li>
                                    <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${randWikiStr}</p>
                                    <img class="pictureSelect" src="${randWikiArr[randWiki]}">
                                </li>
                            `;
                            break;
                    }
                    randWikiPanelList.push(randWikiPanel)
                }
                break;
            }   
        }
        $(randWikiPanelList.join('')).appendTo('.generatorWiki');
    }

    noteShowGenerator = () =>{
        $('.generatorNote').slideToggle();
    }

    noteGenerator = () => {
        let randNote = getRandomArr(allSortedGenerator.randNote[1]);
        if(randNote == undefined){
            return;
        }
        $('.generator-randNote-val').html(randNote.nameNote);
        $('.gen-task-name').html(randNote.nameNote);
        $('.gen-task-main').html(randNote.mainNote);
        $('.gen-task-other').html(randNote.otherNote);
    }

    updateGeneratorRandom = (generator) =>{
        $(`.generator-${generator}-val`).text(getRandomArr(allSortedGenerator[generator][1]))
    }

    randomNumber = () =>{
        let minVal = Number($('.generator-number-min').text());
        let maxVal = Number($('.generator-number-max').text());
        let min,max;
        if(Number.isNaN((minVal))){
            min = 1;
        }
        else{
            min = minVal;
        }
        if(Number.isNaN((maxVal))){
            max = 100;
        }
        else{
            max = maxVal;
        }
        $('.generator-number-val').text(randomInt(min,max));
    }

    let fullGenerators = () =>{
        let generatorList = [];
        for(genKey in allSortedGenerator){
            let genStr = allSortedGenerator[genKey][0];
            let genStrList;
            switch (genKey) {
                case 'number':
                    genStrList = `
                        <div class="mainListName generatorListCard rounded generator-${genKey} borderBack bgPrimaryDark border border-${ThemeSet.Background} bg-${ThemeSet.Primary}-dark">
                            <div class="row">
                                <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack">${genStr}</p>
                                <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Primary} linkPrimary generator-${genKey}-val"></p>
                            </div>
                            <div class="row underBtnsGenerator">
                                <p contenteditable placeholder="Мин.(1)" class="col-md-4 col-sm-6 h4 border border-${ThemeSet.Primary} borderPrimary taskView linkPrimary link-${ThemeSet.Primary} generator-${genKey}-min"></p>
                                <p contenteditable placeholder="Макс.(100)" class="col-md-4 col-sm-6 h4 border border-${ThemeSet.Primary} borderPrimary taskView linkPrimary link-${ThemeSet.Primary} generator-${genKey}-max"></p>
                                <button onclick="randomNumber();" class="col-md-4 col-sm-11 btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><h4>Задать число</h4></button>
                            </div>
                        </div>
                    `;
                    break;
                case 'randWiki':
                    genStrList = `
                    <div class="mainListName generatorListCard rounded generator-${genKey} border border-${ThemeSet.Background} borderBack bg-${ThemeSet.Primary}-dark bgPrimaryDark">
                        <div class="row">
                            <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack">${genStr}</p>
                            <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Primary} linkPrimary generator-${genKey}-val"></p>
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
                case 'randNote':
                    genStrList = `
                    <div class="mainListName generatorListCard rounded generator-${genKey} border border-${ThemeSet.Background} borderBack bgPrimaryDark bg-${ThemeSet.Primary}-dark">
                        <div class="row">
                            <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack">${genStr}</p>
                            <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Primary} linkPrimary generator-${genKey}-val"></p>
                        </div>
                        <div class="row underBtnsGenerator">
                            <button onclick="noteShowGenerator();" class="col-md-4 col-sm-11 btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><h4>Показать заметку</h4></button>
                            <button onclick="noteGenerator();" class="col-md-4 col-sm-11 btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><h4>Случайная заметка</h4></button>
                        </div>
                        <ul class="generatorNote" style="display: none;">
                            <li>
                                <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">Название</p>
                                <p placeholder="Написать что-то..." class="h4 gen-task-name border border-${ThemeSet.Primary} borderPrimary linkPrimary link-${ThemeSet.Primary} bgBody bg-${ThemeSet.BodyBackground} taskView"></p>
                            </li>
                            <li>
                                <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">Описание</p>
                                <p placeholder="Написать что-то..." class="h4 gen-task-main border border-${ThemeSet.Primary} borderPrimary linkPrimary link-${ThemeSet.Primary} bgBody bg-${ThemeSet.BodyBackground} taskView"></p>
                            </li>
                            <li>
                                <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">Остальное</p>
                                <p placeholder="Написать что-то..." class="h4 gen-task-other border border-${ThemeSet.Primary} borderPrimary linkPrimary link-${ThemeSet.Primary} bgBody bg-${ThemeSet.BodyBackground} taskView"></p>
                            </li>
                        </ul>
                    </div>

                    `;
                    break; 
                default:
                    genStrList = `
                        <div class="mainListName generatorListCard rounded generator-${genKey} border border-${ThemeSet.Background} borderBack bgPrimaryDark bg-${ThemeSet.Primary}-dark">
                            <div class="row">
                                <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack">${genStr}</p>
                                <p class="h3 col-md-6 col-sm-12 link-${ThemeSet.Primary} linkPrimary generator-${genKey}-val"></p>
                                <div class="underBtnsGenerator centerBtnGenerator row">
                                    <button onclick="updateGeneratorRandom('${genKey}')" class="col-12 btn btn-outline-${ThemeSet.Btn} btnOutlineBtn"><h4>Случайно выбрать</h4></button>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
            }
            generatorList.push(genStrList);
        }


        let fullGenerator = $(`
            <h2 class="link-${ThemeSet.Primary} linkPrimary mainListName">Генераторы</h2>
            <div class="row generatorList">
                ${generatorList.join('')}
            </div>
        `);
        fullGenerator.appendTo('.app');
    }

    //старт задания генераторов
    let updateGeneratorRandomStart = () =>{
        for(gen in allSortedGenerator){
            if(gen != 'randWiki' & gen != 'randNote'){
                updateGeneratorRandom(gen);
            }
        }
    }
    randomNumberStart = () =>{
        $('.generator-number-val').text(randomInt(1,100));
    };
    
    FullGenerator = () =>{
        $('.app').children().remove();
        fullGenerators();
        randomNumberStart();
        updateGeneratorRandomStart();
        noteGenerator();
        wikiGenerator();
    }
});