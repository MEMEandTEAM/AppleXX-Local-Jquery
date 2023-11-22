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
    
    //* страницы вики для категорий меню
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
                        <input type="search" class="w-100 bordered border-${ThemeSet.Primary} borderPrimary rounded" placeholder="Поиск..." oninput="findNameCards(this.value)">
                    </div>
                </div>

			</div>
            `
        );
    }

	
    let wikiCard = (posterImg,posterName,posterText,cardID,cardCategory) =>{
        return(
        `
        
        <div class="wikiCardFull border border-${ThemeSet.Primary} rounded borderPrimary" style="width: 18rem;" onclick="openWikiCard('${cardCategory}',${cardID})">
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
    menuCardsFull = () =>{
        return(
        `
        <div class="wikiCardsMenuPage container">
            ${menuCardsNav()}
        </div>
        `);
    }

    //----------------------------------------------------------------
    //? Элементы блоков карточки

    //! меню карточки
    openCardMenu = (wikiCategory,wikiID) =>{
        return(`
        
        <div class="wikiMenuCard row container">
				<select onchange="(this.options[this.selectedIndex].value)" class="btn btn-${ThemeSet.Btn} btnBtn menuNote menuNoteSelect wikiMenuSelect col-md-3 col-sm-12 mx-2 h2">
					<option value="0" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.bg}" href="#" selected>Расы</option>  
					
					<option value="0" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.bg}" href="#">Расы</option>   
				
					<option value="1" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.bg}" href="#">Персонажи</option>   
				
					<option value="2" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.bg}" href="#">Лорные факты</option>   
				
					<option value="3" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.bg}" href="#">Фракции</option>   
				
					<option value="4" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.bg}" href="#">Сюжетные линии</option>   
				
					<option value="5" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.bg}" href="#">Заметки</option>   
				
					<option value="6" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.bg}" href="#">Моменты</option>   
				
					<option value="7" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.bg}" href="#">Животные и монстры</option>   
				
					<option value="8" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.bg}" href="#">Растения</option>   
				
					<option value="9" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.bg}" href="#">Магия</option>   
			
				</select>

				<button onclick="toggleEditMode()" class="editCardBtn btn btn-${ThemeSet.Btn} btnBtn col-md-3 col-sm-12 mx-2 menuNote">
					<h5><i class="fa fa-edit" aria-hidden="true"></i></h5>
				</button>

				<button onclick="openWikiCardMenu('wikiCategory')" class="btn btn-${ThemeSet.Btn} btnBtn col-md-3 col-sm-12 mx-2 menuNote">
					<h2>Меню</h2>
				</button>

				<div class="d-none wikiID">${wikiID}</div>
				<div class="d-none wikiCategory">${wikiCategory}</div>
			</div>

        
        `);
    }

    //! открытая карточка
    openCardWiki = (wikiCategory,wikiID) =>{
		let openCardFull = [];
		let CardData = loadData(wikiCategory)[wikiID];
		for(wikiBlockID in CardData){
			let wikiBlock = CardData[wikiBlockID];
			let blockType = Object.keys(wikiBlock)[0];
			let blockElem = wikiBlock[blockType];
			switch (blockType) {
				case "wikiPoster":
					openCardFull.push(cardPosterBlock(blockElem['posterName'],blockElem['posterText'],blockElem['posterImg'],blockElem['underPosterText']));
					break;
				case "wikiName":
					openCardFull.push(cardNameBlock(blockElem['wikiName'],blockElem['isSpoiler']));
					break;
				case "wikiText":
					openCardFull.push(cardTextBlock(blockElem['wikiText'],blockElem['isSpoiler']));
					break;
				case "wikiPicText":
					openCardFull.push(cardPicTextBlock(blockElem['wikiText'],blockElem['wikiPic'],blockElem['wikiTextUnder'],blockElem['isSpoiler']));
					break;
				case "wikiGallery":
					openCardFull.push(cardGalleryBlock(blockElem['Gallery'],blockElem['isSpoiler']));
					break;
				case "wikiTextChoice":
					openCardFull.push(cardTextChoiceBlock(blockElem['wikiText'],blockElem['isSpoiler']));
					break;
				case "wikiMusic":
					openCardFull.push(cardAudioBlock(blockElem['musicName'],blockElem['musicLink'],blockElem['posterImg'],blockElem['underPosterText']));
					break;
				case "wikiVideo":
					openCardFull.push(cardVideoBlock(blockElem['videoName'],blockElem['VideoLink'],blockElem['isSpoiler']));
					break;
				case "wikiYoutube":
					openCardFull.push(cardYoutubeBlock(blockElem['youtubeName'],blockElem['youtubeLink'],blockElem['isSpoiler']));
					break;
				case "wikiCardsChoice":
					openCardFull.push(cardCardsBlock(blockElem['Cards'],blockElem['isSpoiler']));
					break;
				default:
					openCardFull.push('');
					break;
			}
		}

		//меню добавления блока карточки
		openCardFull.push(`
		<div class="editMode wikiMenuCard border borderPrimary border-${ThemeSet.Primary} rounded container row">
			<select onchange="(this.options[this.selectedIndex].value)" class="btn btn-${ThemeSet.Btn} btnBtn menuNote menuNoteSelect col-md-3 col-sm-12 mx-2 h2" id="blockAddType"> 
			
				<option value="wikiName" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">Название</option>   
			
				<option value="wikiText" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">Текст</option>   
			
				<option value="wikiPicText" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">Текст с картинкой</option>   
			
				<option value="wikiGallery" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">Галерея</option>   

				<option value="wikiMusic" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">Музыка</option> 
			
				<option value="wikiTextChoice" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">Текст с выбором</option>   
			
				<option value="wikiVideo" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">Локальное видео</option>   
			
				<option value="wikiYoutube" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">Ютуб видео</option>   
			
				<option value="wikiCards" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">Выбор карточек</option>    
		
			</select>

			<button onclick="alert(document.getElementById('blockAddType').value)" class="btn btn-${ThemeSet.Btn} btnBtn col-md-3 col-sm-12 mx-2 menuNote">
				<i class="fa fa-plus" aria-hidden="true"></i>
			</button>
		</div>
		`);


        return(`
            ${openCardFull.join('')}
        `);
    }

    //!-------------------------------------------------------------
    //! блоки открытой карточки
    let cardPosterBlock = (posterName,posterText,posterImg,underPosterText) =>{
        return(`
        
        <div class="row wikiBlock wikiPoster">
					<div class="col-md-8 col-sm-12 posterName">
						<h2 class="h2 link-${ThemeSet.Primary} linkPrimary text-center" contenteditable="false">${posterName}</h2>
					</div>
					<div class="col-md-8 col-sm-12 posterText">
						<p class="link-${ThemeSet.Primary} linkPrimary h5"  contenteditable="false">
							${posterText}
						</p>
					</div>
					<div class="col-md-4 col-sm-12 posterPic">
						<figure class="figure">
						<img src="${posterImg}" class="figure-img img-fluid rounded" alt="${posterName}">
						<div class="d-none imgLinkSave">${posterImg}</div>
						<figcaption class="figure-caption linkPrimary link-${ThemeSet.Primary}" contenteditable="false">${underPosterText}</figcaption>
						</figure>

						<div class="editMode border border-${ThemeSet.Primary} borderPrimary rounded col-12 container">
							<select class="picSelect link-${ThemeSet.Background} linkBack col-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
								<option class="bg-${ThemeSet.BodyBackground} ${ThemeSet.Primary} link-${ThemeSet.Primary} linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
								<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
								<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
								<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
								<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
								<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
								<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
								<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							</select>
							<div class="navBlockBtns col-sm-12 col-md-1 row">
								<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
								<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
							</div>
						</div>
					</div>
				</div>
        
        `);
    }

    let cardNameBlock = (wikiName,isSpoiler) =>{
        return(`
        
        <div class="row wikiBlock wikiName">
            <div class="d-none isSpoilerBlock">${isSpoiler}</div>
            <div class="col-12">
                <h2 class="h2 link-${ThemeSet.Primary} linkPrimary text-center" contenteditable="false">${wikiName}</h2>
                <div class="editMode border border-${ThemeSet.Primary} borderPrimary rounded col-12 container">
                    <div class="navBlockBtns col-sm-12 col-md-1 row">
                        <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                        <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                    </div>
                    <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 spoilerBtn linkPrimary link-${ThemeSet.Primary}" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
                    <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>
            </div>
            <div class="spoilerBlock">
                <h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="">Спойлер</h4>
            </div>
        </div>
        
        `);
    }

    let cardTextBlock = (wikiText,isSpoiler) =>{
        return(`
        
        <div class="row wikiBlock wikiText">
            <div class="d-none isSpoilerBlock">${isSpoiler}</div>
            <p class="link-${ThemeSet.Primary} linkPrimary h5" contenteditable="false">
				${wikiText}
            </p>
            <div class="editMode border borderPrimary border-${ThemeSet.Primary} rounded col-12 container">
                <div class="navBlockBtns col-sm-12 col-md-1 row">
                    <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                    <button class="btn btn-outline-${ThemeSet.Primary} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                </div>
                <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary}" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
                <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
            <div class="spoilerBlock">
                <h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="">Спойлер</h4>
            </div>
        </div>
        
        `);
    }

    let cardPicTextBlock = (wikiText,wikiPic,wikiTextUnder,isSpoiler) =>{
        return(`
        
        <div class="row wikiBlock wikiPicText spoilerBlurOpen">
            <div class="d-none isSpoilerBlock">${isSpoiler}</div>
            <div class="col-md-8 col-sm-12">
                <p class="link-${ThemeSet.Primary} linkPrimary h5" contenteditable="false">
                    ${wikiText}
                </p>
            </div>
            <div class="col-md-4 col-sm-12">
                <figure class="figure">
                <img src="${wikiPic}" class="figure-img img-fluid rounded" alt="${wikiTextUnder}">
				<div class="d-none imgLinkSave">${wikiPic}</div>
                <figcaption class="figure-caption linkPrimary link-${ThemeSet.Primary}" contenteditable="false">${wikiTextUnder}</figcaption>
                </figure>

                <div class="editMode border rounded border-${ThemeSet.Primary} borderPrimary col-12 container">
                    <select class="dirSelect link-${ThemeSet.Background} linkBack col-md-5 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории">Выбор категории</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                    </select>

                    <select class="picSelect link-${ThemeSet.Background} linkBack col-md-5 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
                    </select>
                    <div class="navBlockBtns col-sm-12 col-md-1 row">
                        <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                        <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                    </div>
                    <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 spoilerBtn linkPrimary link-${ThemeSet.Primary}" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
                    <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>
            </div>
            <div class="spoilerBlock">
                <h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="">Спойлер</h4>
            </div>
        </div>
        
        `);
    }

    let cardGalleryBlock = (isSpoiler) =>{
        return(`
        
        <div class="row wikiBlock wikiGallery">
			<div class="d-none isSpoilerBlock">${isSpoiler}</div>
			<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
				<div class="carousel-indicators">
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>
			<div class="carousel-inner">

			    <div class="carousel-item active">
					<div class="w-100 carouselPic">
						<img src="${galleryImg}" class="d-block img-fluid" alt="${galleryName}">
						<div class="d-none imgLinkSave">${galleryImg}</div>
					</div>
					<div class="carousel-caption carousel-${ThemeSet.Primary} primCarousel d-none d-md-block">
						<h5>${galleryName}</h5>
						<p>${galleryText}</p>
					</div>
				</div>

				<div class="carousel-item">
					<div class="w-100 carouselPic">
						<img src="${galleryImg}" class="d-block img-fluid" alt="${galleryName}">
						<div class="d-none imgLinkSave">${galleryImg}</div>
					</div>
					<div class="carousel-caption carousel-${ThemeSet.Primary} primCarousel d-none d-md-block">
						<h5>${galleryName}</h5>
						<p>${galleryText}</p>
					</div>
				</div>

				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Предыдущий</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Следующий</span>
				</button>
			</div>

			<div class="editMode border borderPrimary rounded border-${ThemeSet.Primary} col-12">

				<div class="pickPictureContainer container row col-12">
					<select class="dirSelect link-${ThemeSet.Background} linkBack col-md-5 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
						<option class="bg-${ThemeSet.bodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории">Выбор категории</option>
						<option class="bg-${ThemeSet.bodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					</select>
		
					<select class="picSelect link-${ThemeSet.Background} linkBack col-md-5 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
						<option class="${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
						<option class="${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					</select>

					<button class="btn btn-outline-${ThemeSet.Primary} btnOutlineBtn rounded col-md-1 col-sm-5 picDelete" onclick=""><i class="fa fa-minus" aria-hidden="true"></i></button>
					    <p class="mainPicText col-md-5 col-sm-11 link-${ThemeSet.Primary} linkPrimary border borderPrimary rounded border-${ThemeSet.Primary}" contenteditable="true">lorem ipsum</p>
						<p class="picText col-md-5 col-sm-11 link-${ThemeSet.Primary} linkPrimary border borderPrimary rounded border-${ThemeSet.Primary}" contenteditable="true">lorem ipsum</p>
					</div>

					<div class="pickPictureContainer container row col-12">
						<select class="dirSelect link-${ThemeSet.Background} linkBack col-md-5 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории">Выбор категории</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						</select>
		
						<select class="picSelect link-${ThemeSet.Background} linkBack col-md-5 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
							<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						</select>

						<button class="btn btn-outline-${ThemeSet.Primary} btnOutlineBtn rounded col-md-1 col-sm-5 picDelete" onclick=""><i class="fa fa-minus" aria-hidden="true"></i></button>

						<p class="mainPicText col-md-5 col-sm-11 link-${ThemeSet.Primary} linkPrimary border borderPrimary rounded border-${ThemeSet.Primary}" contenteditable="true">lorem ipsum</p>
						<p class="picText col-md-5 col-sm-11 link-${ThemeSet.Primary} linkPrimary border borderPrimary rounded border-${ThemeSet.Primary}" contenteditable="true">lorem ipsum</p>
					</div>

					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 picAdd" onclick=""><i class="fa fa-plus" aria-hidden="true"></i></button>
					<div class="navBlockBtns col-sm-12 col-md-1 row">
						<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
						<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
					</div>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary}" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
				</div>
				<div class="spoilerBlock">
					<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="">Спойлер</h4>
				</div>

		</div>


        `);
    }

    let cardTextChoiceBlock = (wikiText,isSpoiler) =>{
        return(`
        
        <div class="row wikiTextChoice wikiBlock">
			<div class="d-none isSpoilerBlock">${isSpoiler}</div>
			<p class="link-${ThemeSet.Primary} linkPrimary text-center h3">${wikiText}</p>

			<div class="editMode border borderPrimary rounded border-${ThemeSet.Primary} col-12">

				<div class="pickPictureContainer container row col-12">
					<select class="baseSelect link-${ThemeSet.Background} linkBack col-md-4 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории (общий)">Выбор категории (общий) (расса)</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					</select>
		
					<select class="subBaseSelect link-${ThemeSet.Background} linkBack col-md-4 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор Выбор из категории конкретный">Выбор из категории конкретный (эльфы)</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					</select>

					<select class="subOptionSelect link-${ThemeSet.Background} linkBack col-md-4 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор Выбор из категории конкретный">Выбор из опции (Альты)</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
						<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					</select>
					<div class="navBlockBtns col-sm-12 col-md-1 row">
						<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
						<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
					</div>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary}" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
				</div>
			</div>
			<div class="spoilerBlock">
				<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="">Спойлер</h4>
			</div>
		</div>


        `);
    }

    let cardAudioBlock = (musicName,musicLink,isSpoiler) =>{
        return(`
        
        <div class="row wikiBlock wikiMusic">
			<div class="d-none isSpoilerBlock">${isSpoiler}</div>
			<p class="col-sm-12 col-md-6 link-${ThemeSet.Primary} linkPrimary h5 text-center">
				${musicName}
			</p>
			<audio class="col-md-6 col-sm-12" controls src="${musicLink}"></audio>
			<div class="d-none musicLinkSave">${musicLink}</div>

			<div class="editMode border rounded borderPrimary border-${ThemeSet.Primary} col-12 row container">
				<select class="musicTypeSelect col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор жанра музыки">Выбор жанра музыки</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
				</select>

				<select class="musicSongSelect col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
					<option class="bg-dark2 bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор музыки">Выбор музыки</option>
					<option class="bg-dark2 bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-dark2 bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-dark2 bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-dark2 bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-dark2 bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-dark2 bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-dark2 bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
				</select>
				<div class="navBlockBtns col-sm-12 col-md-1 row">
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
				</div>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary}" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
			<div class="spoilerBlock">
				<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="">Спойлер</h4>
			</div>
		</div>
        
        `);
    }

    let cardVideoBlock = (videoName,VideoLink,isSpoiler) =>{
        return(`
        
        <div class="row wikiVideo wikiBlock">
			<div class="d-none isSpoilerBlock">${isSpoiler}</div>
			<h2 class="h2 col-12 link-${ThemeSet.Primary} linkPrimary text-center localVideoName" contenteditable="false">${videoName}</h2>
			<video class="localVideo" src="${VideoLink}" controls></video>
			<div class="d-none videoLinkSave">${VideoLink}</div>

			<div class="editMode border rounded borderPrimary border-${ThemeSet.Primary} col-12 container row">
				<select class="videoTypeSelect col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор жанра видео">Выбор жанра видео</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
				</select>

				<select class="videoSelect col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор видео">Выбор видео</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
				</select>
				<div class="navBlockBtns col-sm-12 col-md-1 row">
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
				</div>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary}" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
			<div class="spoilerBlock">
				<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="">Спойлер</h4>
			</div>
		</div>
        
        `);
    }

    let cardYoutubeBlock = (youtubeName,youtubeLink,isSpoiler) =>{
        return(`
        
        <div class="row wikiYoutube wikiBlock">
			<div class="d-none isSpoilerBlock">${isSpoiler}</div>
			<h2 class="h2 col-12 link-${ThemeSet.Primary} linkPrimary text-center localYoutubeName" contenteditable="false">${youtubeName}</h2>
			<iframe class="youtubeVideo" title="YouTube video player" allowfullscreen="" width="500" height="350" frameborder="0" src="${youtubeLink}"></iframe>
			<div class="d-none youtubeLinkSave">${youtubeLink}</div>
			<div class="editMode border rounded borderPrimary border-${ThemeSet.Primary} col-12">
				<p class="youtubeLink col-12 link-${ThemeSet.Primary} borderPrimary linkPrimary border rounded border-${ThemeSet.Primary}" contenteditable="true">lorem ipsum</p>
				<div class="navBlockBtns col-sm-12 col-md-1 row">
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
				</div>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary}" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
			<div class="spoilerBlock">
				<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="">Спойлер</h4>
			</div>
		</div>
        
        `);
    }

    let cardCardsBlock = (isSpoiler) =>{
        return(`
        
        <div class="row wikiCardsChoice wikiBlock">
			<div class="d-none isSpoilerBlock">${isSpoiler}</div>
			<div class="d-flex containter wikiCardsMenuShort borderPrimary border border-${ThemeSet.Primary} rounded container">
							
				<div class="wikiCardFull border borderPrimary border-${ThemeSet.Primary} rounded" style="width: 18rem;" onclick="">
					<p class="d-none cardID">123</p>
					<p class="d-none cardCategory">Chars</p>
					<div class="wikiCard">
						<div class="cardFront">
							<img src="/assets/images/chars/Мифолий.png" class="card-img-top wikiCardImg" alt="...">
							<div class="nameCard w-100 bg-${ThemeSet.SecondBackground} bgSecond">
								<h5 class="link-${ThemeSet.Primary} linkPrimary card-name">Мифолий Ле'Раферандр</h5>
							</div>
						</div>
						<div class="cardBack bg-${ThemeSet.Background} bgBack">
							<p class="link-${ThemeSet.Primary} linkPrimary h6">
								Светло-зеленая кожа.
								Среднее телосложение,
								Длинные огненные волосы,завитые в небольшую косу.
								Жёлтые глаза.
								Носит жёлтые сережки(от родителей).
								#Пара шрамов на руке
								##Бордовый оттенок кожи
							</p>
						</div>
					</div>
				</div>

			</div>

			<div class="editMode border rounded borderPrimary border-${ThemeSet.Primary} col-12 container row">
				<select class="cardChoiceSelect1 col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
					<option class="bg-${ThemeSet.BodyBackground}  bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории 1">Выбор категории 1</option>
					<option class="bg-${ThemeSet.BodyBackground}  bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground}  bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground}  bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
				</select>

				<select class="cardChoiceSelect2 col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории 2">Выбор категории 2</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" value="1">1</option>
				</select>
				<div class="navBlockBtns col-sm-12 col-md-1 row">
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick=""><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
				</div>
				<button class="btn btn-outline-${ThemeSet.Btn} linkPrimary btnOutlineBtn rounded col-12 spoilerBtn link-${ThemeSet.Primary}" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
			<div class="spoilerBlock">
				<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="">Спойлер</h4>
			</div>
		</div>
        

        
        `);
    }


    //!-------------------------------------------------------------

    //! полная страница откытой карточки
    fullOpenCardWiki = (wikiCategory,wikiID) =>{
        return(`
        <div class="wikiCardOpenPage container">
            ${openCardMenu(wikiCategory,wikiID)}
            ${openCardWiki(wikiCategory,wikiID)}
        </div>
        `);
    }

    
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
        checkCardPanel(page,'');
        
    }

    //*удаление строчки при наличии карточек и обнова карточек
    checkCardPanel = (page,search) =>{
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
                let cardPoster = cardPosterObj.wikiPoster;
                if(cardPoster.posterName.includes(search)){
                    let card = wikiCard(cardPoster.posterImg,cardPoster.posterName,cardPoster.posterText,cardID,page);
                    //добавление карточки в меню (КРИНЖ)
                    $(card).appendTo('.wikiCardsMenu');
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

    //! поиск карточки по названию
    findNameCards = (search) =>{
        let wikiPanelType = $('.wikiPanelType').text();
        checkCardPanel(wikiPanelType,search);
    }

	openWikiCard = (category,cardID) =>{
		$('.app').children().remove();
		$(fullOpenCardWiki(category,cardID)).appendTo('.app');
	}


    //? работа скриптов открытой карточки

	openWikiCardMenu = (wikiCategory) =>{
		$('.app').children().remove();
		$(menuCardsFull()).appendTo('.app');
	}

    //! вкл/выкл режим редактирования
    toggleEditMode = () =>{
		$('.editMode').toggleClass('editModeOn');
		$('.editCardBtn').toggleClass('used');
    }



    //? Запуск всего кода



    allFunctionsDelay = () =>{
        changeCardsData(wikiData.StoryLines);
    }


    FullWiki = () => {
        $(menuCardsFull()).appendTo('.app');
        allFunctionsDelay();
    }

});