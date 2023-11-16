$(() => {

    //? логика с БД
    let wikiData = {};
    for(wikiKey in wikiPages){
        wikiData[wikiKey] = wikiKey;
    }


    let loadData = (dataType) =>{
        let dataLoaded = JSON.parse(localStorage.getItem(`Wiki-${dataType}`));
        console.log(dataLoaded);
    }
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


    //! фул меню карточек
    let menuCardsFull = () =>{
        return(
            `
            <div class="wikiCardsMenuPage container">

			    <div class="wikiMenuCard row container">
                    <select onchange="changeCardsData(this.options[this.selectedIndex].value)" class="btn btn-${ThemeSet.Btn} btnBtn menuNote menuNoteSelect wikiMenuSelect col-md-3 col-sm-12 mx-2 h2">
                        ${selectWikiData()}
                    </select>

                    <h1 class="link-${ThemeSet.Primary} linkPrimary wikiCategoryName col-md-4 text-center">Персонажи</h1>

                    <button onclick="" class="btn btn-${ThemeSet.Btn} btnBtn col-md-3 col-sm-12 mx-2 menuNote">
                        <h2>Меню</h2>
                    </button>

                    <div class="wikiCardsSearch col-12 row">
                        <select class="dirCategory link-${ThemeSet.Background} linkPrimary col-md-4 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
                            <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории">Выбор категории</option>
                            ${selectWikiDataSmall()}
                        </select>

                        <select class="cardCategory link-${ThemeSet.Background} linkPrimary col-md-4 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
                            <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории 2">Выбор категории 2</option>
                            <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                            <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                            <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                            <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                            <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                            <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                            <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        </select>
                        <div class="wikiSearch col-md-4 col-sm-12">
                            <input type="search" class="w-100 bordered border-${ThemeSet.Primary} borderPrimary rounded" placeholder="Поиск..." onblur="">
                        </div>
                    </div>

			    </div>
            </div>
            `
        );
    }



    //? Элементы блоков карточки


    //! не забудь добавить оформление в виде спойлера

    //? работа скриптов меню карточек

    //* смена карточек в меню карточек
    changeCardsData = (page) =>{
        $('.wikiCategoryName').text(`${wikiPages[page]}`);
    }


    //? работа скриптов открытой карточки




    //? Запуск всего кода



    allFunctionsDelay = () =>{
        changeCardsData(wikiData.StoryLines);
    }


    FullWiki2 = () => {
        $(menuCardsFull()).appendTo('.app');
        allFunctionsDelay();
    }

});