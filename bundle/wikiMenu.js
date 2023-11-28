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

    //* готовый элемент select 
    let optionSelect = (value,name,isSelected) =>{
        if(isSelected){
            return `<option value="${value}" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#" selected>${name}</option>`;
        }
        else{
            return `<option value="${value}" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">${name}</option>`;
        }
    }

    //* элемент option для datalist
    let datalistOption = (value) =>{
        return `<option value="${value}" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}">`;
    }

    //? функция добавления в datalist
    datalistSearch = (typeSearch) =>{
        $('#searchList').children().remove();
        let dataListSmall = [];
        let datalist = loadData(JSON.parse(localStorage.getItem('WikiPage')));
        for(data in datalist){
        
            switch (typeSearch) {
                case "Name":
                    let cardName = datalist[data][0].wikiPoster.posterName;
                    dataListSmall.push(datalistOption(cardName));
                    break;
                case "Race":
                    //!
                    break;
                case "Fraction":
                    //!
                    break;
                case "Story":
                    //!
                    break;
                case "Moment":
                    //!
                    break;

                default:
                    break;
            }
        }
        $(dataListSmall.join('')).appendTo('#searchList');
    }

    
    //* страницы вики для селектора меню
    let selectWikiData = () =>{
        let allWikiOptionList = [];
        let wikiOption;
        for(wikiKeys in wikiPages){
            if(wikiKeys == JSON.parse(localStorage.getItem('WikiPage'))){
                wikiOption = optionSelect(wikiKeys,wikiPages[wikiKeys],true);
            }
            else{
                wikiOption = optionSelect(wikiKeys,wikiPages[wikiKeys],false);;
            }
            allWikiOptionList.push(wikiOption);
        }
        return (allWikiOptionList.join(''));
    }

    //*составление options в поиске
    let wikiMenuOptionCreate = () =>{
        let optionList  = [];
        for(optionValue in wikiMenuSelectOptions){
            let optionString = wikiMenuSelectOptions[optionValue];
            optionList.push(optionSelect(optionValue,optionString,false));
        }
        return(`
            ${optionList.join('')}
        `);
        
    }

    //* навигационное меню карточек
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
                    <select class="menuSearchCategory link-${ThemeSet.Background} linkPrimary col-md-6 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="datalistSearch(this.options[this.selectedIndex].value)">
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Name">Выбор категории поиска</option>
                        ${wikiMenuOptionCreate()}
                    </select>
                    <div class="wikiSearch col-md-6 col-sm-12">
                        <input type="search" list="searchList" class="w-100 bordered border-${ThemeSet.Primary} borderPrimary rounded" placeholder="Поиск..." oninput="findNameCards(document.getElementsByClassName('menuSearchCategory')[0].value,this.value)">
                        <datalist id="searchList">
                        </datalist>
                    </div>
                </div>
                
                <div class="wikiSaveMenu col-12 row border border-${ThemeSet.Primary} rounded borderPrimary">
                    <h2 class="link-${ThemeSet.Primary} linkPrimary text-center col-12">Данные вики</h2>
                    <button class="btn btn-${ThemeSet.Btn} btnBtn col-md-4 mx-2 col-sm-12" onclick="downloadWikiData()">
                        <h3>Скачать вики <i class="fa fa-download" aria-hidden="true"></i> </h3>
                    </button>

                    <form class="mx-2 col-md-3 col-sm-12">
                        <label class="input-file">
                            <input id="fileIn-chars" type="file" name="file">
                            <span class="fileName btn btn-${ThemeSet.Btn} btnBtn h4">Выберите файл (Wiki.json)</span>
                        </label>
                    </form>

                    <button class="btn btn-${ThemeSet.Btn} btnBtn col-md-4 mx-2 col-sm-12" onclick="uploadWikiData()">
                        <h3>Загрузить вики <i class="fa fa-upload" aria-hidden="true"></i> </h3>
                    </button>
                </div>

			</div>
            `
        );
    }

	//* карточка
    let wikiCard = (posterImg,posterName,posterText,cardID,cardCategory) =>{
        return(
        `
        
        <div class="wikiCardFull border border-${ThemeSet.Primary} rounded borderPrimary" style="width: 18rem;" onclick="openWikiCard('${cardCategory}',${cardID})">
			<p class="d-none cardID">${cardID}</p>
			<p class="d-none cardCategory">${cardCategory}</p>
			<div class="wikiCard rounded">
				<div class="cardFront rounded">
					<img src="${posterImg}" class="card-img-top wikiCardImg" alt="...">
					<div class="nameCard w-100 bg-${ThemeSet.BodyBackground} bgBody">
						<h5 class="link-${ThemeSet.Primary} linkPrimary card-name">${posterName}</h5>
					</div>
				</div>
				<div class="cardBack bg-${ThemeSet.Background} bgBack rounded">
					<p class="link-${ThemeSet.Primary} linkPrimary h6">
						${posterText}
					</p>
				</div>
			</div>
		</div>

        `
        );
    }

    //* меню карточек
    let cardsMenuTab = () =>{
        return(
        `
        <div class="d-flex containter wikiCardsMenu border border-${ThemeSet.Primary} borderPrimary rounded container">
            <h3 class="link-${ThemeSet.Primary} linkPrimary wikiNoCards">Пусто...</h3>
        </div>
        `
        );
    }

    
    //----------------------------------------------------------------
    //? работа скриптов меню карточек


    //! скачать данные вики
    downloadWikiData = () =>{
        let wikiDataFull = {};
        for(wikiPage in wikiPages){
            let wikiData = JSON.parse(localStorage.getItem(`Wiki-${wikiPage}`));
            wikiDataFull[wikiPage] = wikiData;
        }
        console.log(wikiDataFull);
    }

    //! загрузить данные вики
    uploadWikiData = () =>{

    }


    //*смена категорий в localstorage
    changeCardsData = (page) =>{
        localStorage.setItem('WikiPage',JSON.stringify(page));
        changeCardsDataFunc();
    }

    //* смена категорий в меню карточек
    changeCardsDataFunc = () =>{
        let page = JSON.parse(localStorage.getItem('WikiPage'));
        let wikiPageStr = wikiPages[page];
        $('.wikiCategoryName').text(`${wikiPageStr}`);
        $('.wikiPanelType').text(`${page}`);
        $('.wikiCardsMenu').remove();
        //обновление меню карточек (КРИНЖ)
        $(cardsMenuTab()).appendTo('.wikiCardsMenuPage');
        checkCardPanel(page,'');
        
    }

    //? удаление строчки при наличии карточек и обнова карточек
    checkCardPanel = (page,search) =>{
        let searchType = $('.menuSearchCategory').val();
        
        if(localStorage.getItem(`Wiki-${page}`) == '[]'){
            return;
        }
        $('.wikiCardsMenu').children('.wikiCardFull').remove();
        let cardArr = loadData(page);
        if(search == ''){
            for(cardID in cardArr){
                let cardPosterObj = cardArr[cardID][0];
                let cardPoster = cardPosterObj.wikiPoster;
                let card = wikiCard(cardPoster.posterImg,cardPoster.posterName,cardPoster.posterText,cardID,page);
                //добавление карточки в меню (КРИНЖ)
                $(card).appendTo('.wikiCardsMenu');
            }
        }
        else{
            for(cardID in cardArr){
                let cardPosterObj = cardArr[cardID][0];

                switch (searchType) {
                    case "Name":
                        let cardPoster = cardPosterObj.wikiPoster;
                        if(cardPoster.posterName.includes(search)){
                            let card = wikiCard(cardPoster.posterImg,cardPoster.posterName,cardPoster.posterText,cardID,page);
                            //добавление карточки в меню (КРИНЖ)
                            $(card).appendTo('.wikiCardsMenu');
                        }
                        break;
                    case "Race":
                        //!
                        break;
                    case "Fraction":
                        //!
                        break;
                    case "Story":
                        //!
                        break;
                    case "Moment":
                        //!
                        break;                
                    default:
                        break;
                }
            }
        }
        if($('.wikiCardsMenu').children('.wikiCardFull').length != 0){
            $('.wikiNoCards').addClass('d-none');
        }
        else{
            $('.wikiNoCards').removeClass('d-none');
        }
    }

    //* добавление карточки в меню
    wikiCardAdd = () => {
        let wikiPanelType = $('.wikiPanelType').text();
        let newCardData = [{wikiPoster: {posterName: "Карточка",posterText:"Пример текста",posterImg:"/assets/images/thumbnail.png",underPosterText:"Текст",}}];
        updateDBNewItem(wikiPanelType,newCardData);
        checkCardPanel(wikiPanelType,'');
    }

    //? поиск карточки
    findNameCards = (searchType,search) =>{            
        let wikiPanelType = $('.wikiPanelType').text();
        checkCardPanel(wikiPanelType,search);
    }

    //----------------------------------------------------------------
    allFunctionsDelay = () =>{
        changeCardsData(JSON.parse(localStorage.getItem('WikiPage')));
    }

	//* фул меню карточек
    menuCardsFull = () =>{
        return(
        `
        <div class="wikiCardsMenuPage container">
            ${menuCardsNav()}
        </div>
        `);
    }


	//* запуск кода
    FullWiki = () => {
        $(menuCardsFull()).appendTo('.app');
		//localStorage.setItem('')
		allFunctionsDelay();
    }

});