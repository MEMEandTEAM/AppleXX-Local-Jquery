$(() => {

    //? логика с БД
    let wikiData = {};
    for(wikiKey in wikiPages){
        wikiData[wikiKey] = wikiKey;
    }
    let updateDBNewItem = (dataType,newItem) => {
        let DB = JSON.parse(localStorage.getItem(`Wiki-${dataType}`));
        DB.push(newItem);
        localStorage.setItem(`Wiki-${dataType}`,JSON.stringify(DB));
    }


    let loadData = (dataType) =>{
        let dataLoaded = JSON.parse(localStorage.getItem(`Wiki-${dataType}`));
        return dataLoaded;
    }


    //----------------------------------------------------------------
    //? Элементы меню карточек

    
    //* страницы вики для селектора меню
    let selectWikiData = () =>{
        let allWikiOptionList = [];
        let wikiOption;
        for(wikiKeys in wikiPages){
            if(wikiKeys == Object.keys(wikiPages)[0]){
                wikiOption = `
                    <option value="${wikiKeys}" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#" selected>${wikiPages[wikiKeys]}</option>  
                `;
            }
            else{
                wikiOption = `
                    <option value="${wikiKeys}" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">${wikiPages[wikiKeys]}</option>  
                `;
            }
            allWikiOptionList.push(wikiOption);
        }
        return (allWikiOptionList.join(''));
    }
    
    //* страницы вики для селектора меню
    let selectWikiDataSmall = () =>{
        let allWikiOptionList = [];
        let wikiOption;
        for(wikiKeys in wikiPages){
            wikiOption = `
                <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="${wikiKeys}">${wikiPages[wikiKeys]}</option>  
            `;
            allWikiOptionList.push(wikiOption);
        }
        return (allWikiOptionList.join(''));
    }


    //! навигационное меню карточек
    let menuCardsNav = () =>{
        return(
            `
			<div class="wikiMenuCard row container">
                <select onchange="changeCardsData(this.options[this.selectedIndex].value)" class="btn btn-${ThemeSet.Btn} btnBtn menuNote menuNoteSelect wikiMenuSelect col-md-3 col-sm-12 mx-2 h2">
                    ${selectWikiData()}
                </select>

                <h1 class="link-${ThemeSet.Primary} linkPrimary wikiCategoryName col-md-4 text-center">Персонажи</h1>

                <button onclick="wikiCardAdd()" class="btn btn-${ThemeSet.Btn} btnBtn col-md-3 col-sm-12 mx-2 menuNote">
                    <h2><i class="fa fa-plus" aria-hidden="true"></i></h2>
                </button>
                <div class="d-none wikiPanelType"></div>

                <div class="wikiCardsSearch col-12 row">
                    <select class="dirCategory link-${ThemeSet.Background} linkPrimary col-md-4 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="none">Выбор категории</option>
                        ${selectWikiDataSmall()}
                    </select>

                    <select class="cardCategory link-${ThemeSet.Background} linkPrimary col-md-4 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="none">Выбор категории 2</option>
                        ${selectWikiDataSmall()}
                    </select>
                    <div class="wikiSearch col-md-4 col-sm-12">
                        <input type="search" class="w-100 bordered border-${ThemeSet.Primary} borderPrimary rounded" placeholder="Поиск..." onblur="">
                    </div>
                </div>

			</div>
            `
        );
    }


    let wikiCard = (posterImg,posterName,posterText,cardID,cardCategory) =>{
        return(
        `
        
        <div class="wikiCardFull border border-${ThemeSet.Primary} rounded borderPrimary" style="width: 18rem;" onclick="">
			<p class="d-none cardID">${cardID}</p>
			<p class="d-none cardCategory">${cardCategory}</p>
			<div class="wikiCard">
				<div class="cardFront">
					<img src="${posterImg}" class="card-img-top wikiCardImg" alt="...">
					<div class="nameCard w-100 bg-${ThemeSet.BodyBackground} bgBody">
						<h5 class="link-${ThemeSet.Primary} linkPrimary card-name">${posterName}</h5>
					</div>
				</div>
				<div class="cardBack bg-${ThemeSet.Background} bgBack">
					<p class="link-${ThemeSet.Primary} linkPrimary h6">
						${posterText}
					</p>
				</div>
			</div>
		</div>

        `
        );
    }

    //? меню карточек
    let cardsMenuTab = () =>{
        return(
        `
        <div class="d-flex containter wikiCardsMenu border border-${ThemeSet.Primary} borderPrimary rounded container">
            <h3 class="link-${ThemeSet.Primary} linkPrimary wikiNoCards">Пусто...</h3>
        </div>
        `
        );
    }

    //! фул меню карточек
    let menuCardsFull = () =>{
        return(
        `
        <div class="wikiCardsMenuPage container">
            ${menuCardsNav()}
        </div>
        `);
    }

    //----------------------------------------------------------------
    //? Элементы блоков карточки



    //----------------------------------------------------------------
    //? работа скриптов меню карточек

    //* смена категорий в меню карточек
    changeCardsData = (page) =>{
        let wikiPageStr = wikiPages[page];
        $('.wikiCategoryName').text(`${wikiPageStr}`);
        $('.wikiPanelType').text(`${page}`);
        $('.wikiCardsMenu').remove();
        //обновление меню карточек (КРИНЖ)
        $(cardsMenuTab()).appendTo('.wikiCardsMenuPage');
        checkCardPanel(page);
        
    }

    //?удаление строчки при наличии карточек и обнова карточек
    checkCardPanel = (page) =>{
        if(localStorage.getItem(`Wiki-${page}`) == '[]'){
            return;
        }
        $('.wikiCardsMenu').children().remove();
        let cardArr = loadData(page);
        for(cardID in cardArr){
            let cardPosterObj = cardArr[cardID][0];
            let cardPoster = cardPosterObj.wikiPoster;
            let card = wikiCard(cardPoster.posterImg,cardPoster.posterName,cardPoster.posterText,cardID,page);
            //добавление карточки в меню (КРИНЖ)
            $(card).appendTo('.wikiCardsMenu');
        }
    }

    //! добавление карточки в меню
    wikiCardAdd = () => {
        let wikiPanelType = $('.wikiPanelType').text();
        let newCardData = [{wikiPoster: {posterName: "Карточка",posterText:"Пример текста",posterImg:"/assets/images/thumbnail.png",underPosterText:"Текст",}}];
        updateDBNewItem(wikiPanelType,newCardData);
        checkCardPanel(wikiPanelType);
    }


    //? работа скриптов открытой карточки




    //? Запуск всего кода



    allFunctionsDelay = () =>{
        changeCardsData(wikiData.StoryLines);
    }


    FullWiki = () => {
        $(menuCardsFull()).appendTo('.app');
        allFunctionsDelay();
    }

});


/*

данные карточки

[
    {wikiPoster: {posterName: "пример",posterText:"",posterImg:"",underPosterText:"",}},
    {:[]},
]


*/