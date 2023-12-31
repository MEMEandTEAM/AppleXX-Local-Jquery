$(() => {

    //? логика с БД
    let wikiData = {};
    for(wikiKey in wikiPages){
        wikiData[wikiKey] = wikiKey;
    }

	let saveNewData = (dataType,fullArray) =>{
		localStorage.setItem(`Wiki-${dataType}`,JSON.stringify(fullArray));
	}
    let loadData = (dataType) =>{
        let dataLoaded = JSON.parse(localStorage.getItem(`Wiki-${dataType}`));
        return dataLoaded;
    }

	let findMusicName = (musicMP3) =>{
		for(musicID in wikiMusicOptions.all){
			let music = wikiMusicOptions.all[musicID];
			if(musicMP3.includes(music.mp3)){
				return music.name;
			}
		}
	}


    //----------------------------------------------------------------
    //* Элементы блоков карточки

	//* готовый элемент select 
    let optionSelect = (value,name,isSelected) =>{
        if(isSelected){
            return `<option value="${value}" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#" selected>${name}</option>  `;
        }
        else{
            return `<option value="${value}" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">${name}</option>`;
        }
    }

	//* функция добавления option в select
	fullOptionSelectList = (selectList,typeSelect) =>{
		let optionList = [];
		switch (typeSelect) {
			case "options":
				for(optionVal in selectList){
					//КРИНЖ
					let optionName;
					if(optionVal == "All" || optionVal == "all"){
						continue;
					}
					if(wikiPages[optionVal] != undefined){
						optionName = wikiPages[optionVal];
					}
					else{
						optionName = MusicType[optionVal];
					}
					optionList.push(optionSelect(optionVal,optionName,false));
				}
				break;
			case "pic":
				for(select in selectList){
					let selectObject = selectList[select];
					optionList.push(optionSelect(selectObject.png,selectObject.name,false));
				}
				break;
			case "music":
				for(select in selectList){
					let selectObject = selectList[select];

					//КРИНЖ
					let musicType = selectObject.type2;
					let musicString = `./assets/music/${musicType}/${selectObject.mp3}`;
					optionList.push(optionSelect(musicString,selectObject.name,false));
				}
				break;
			case "video":
				for(select in selectList){
					let selectObject = selectList[select];
					optionList.push(optionSelect(selectObject.path,selectObject.name,false));
				}
				break;
			case "text":
				for(select in selectList){
					let textChoiceObject = selectList[select];
					optionList.push(optionSelect(textChoiceObject,textChoiceObject,false))
				}
			case "card":
				for(select in selectList){
					let cardChoiceObject = selectList[select];
					optionList.push(optionSelect(cardChoiceObject,cardChoiceObject,false))
				}
			default:
				break;
		}
		return `${optionList.join('')}`;
	}

	//* функция добавления сабкатегории options
	subcategoryOptionList = (thisBlock,typeList) =>{
		let blockWiki = $(thisBlock);
		let blockVal = blockWiki.val();
		let optionList;
		switch (typeList) {
			case "pic":
				let picSelectBlock = blockWiki.parent().children('.picSelect');
				picSelectBlock.children().remove();
				optionList = `
					${optionSelect("Выбор картинки","Выбор картинки",true)}
					${fullOptionSelectList(wikiPicturesOptions[blockVal],"pic")}
				`;
				$(optionList).appendTo(picSelectBlock);
				break;
			case "music":
				let musicSelectBlock = blockWiki.parent().children('.musicSongSelect');
				musicSelectBlock.children().remove();
				optionList = `
					${optionSelect("Выбор музыки","Выбор музыки",true)}
					${fullOptionSelectList(wikiMusicOptions[blockVal],"music")}
					`;
				$(optionList).appendTo(musicSelectBlock);
				break;
			case "text":
				let textChoiceBlock = blockWiki.parent().children('.subTextChoiceSelect');
				textChoiceBlock.children().remove();
				optionList = `
					${optionSelect("Выбор из категории","Выбор из категории",true)}
					${fullOptionSelectList(wikiTextChoiceOptions[blockVal],"text")}
				`;
				$(optionList).appendTo(textChoiceBlock);
				break;
			case "card":
				let cardChoiceBlock = blockWiki.parent().children('.cardChoiceSelectCard');
				cardChoiceBlock.children().remove();
				optionList = `
					${optionSelect("Выбор карточки","Выбор карточки",true)}
					${fullOptionSelectList(wikiTextChoiceOptions[blockVal],"card")}
				`
				$(optionList).appendTo(cardChoiceBlock);
				break;
			default:
				break;
		}
	}

    //* меню карточки
    openCardMenu = (wikiCategory,wikiID) =>{
		return(`
        <div class="wikiMenuCard row container">
				<h3 class="link-${ThemeSet.Primary} text-center border rounded border-${ThemeSet.Primary} borderPrimary linkPrimary menuNote col-12 h2">
					${wikiPages[wikiCategory]}
				</h3>

				<button onclick="toggleEditMode()" class="editCardBtn btn btn-outline-${ThemeSet.Btn} btnOutlineBtn link-${ThemeSet.Primary} linkPrimary col-md-3 col-sm-12 mx-2 menuNote">
					<h5><i class="fa fa-edit" aria-hidden="true"></i></h5>
				</button>

				<button onclick="openWikiCardMenu('${wikiCategory}')" class="btn btn-${ThemeSet.Btn} btnBtn col-md-3 col-sm-12 mx-2 menuNote">
					<h2>Меню</h2>
				</button>

				<button onclick="agreeDeleteWikiCard()" class="agreeDeleteCardBtn btn btn-outline-${ThemeSet.Btn} btnOutlineBtn col-md-3 col-sm-12 mx-2 menuNote">
					<h5><i class="fa fa-trash" aria-hidden="true"></i></h5>
				</button>

				<button onclick="deleteFullCardWiki('${wikiCategory}',${wikiID})" class="deleteCardBtn d-none btn btn-outline-${ThemeSet.Btn} btnOutlineBtn col-md-3 col-sm-12 mx-2 menuNote">
					<h5>Точно удалить? <i class="fa fa-trash" aria-hidden="true"></i></h5>
				</button>

				<button onclick="toggleSortMode()" class="editMode sortCardBtn btn btn-outline-${ThemeSet.Btn} btnOutlineBtn link-${ThemeSet.Primary} linkPrimary col-12 menuNote">
					<h5><i class="fa fa-sort" aria-hidden="true"></i></h5>
				</button>

				<div class="d-none wikiID">${wikiID}</div>
				<div class="d-none wikiCategory">${wikiCategory}</div>
			</div>        
        `);
    }

    //* открытая карточка
    openCardWiki = (wikiCategory,wikiID) =>{
		let openCardFull = [];
		let cardPoster;
		let CardData = loadData(wikiCategory)[wikiID];
		for(wikiBlockID in CardData){
			let wikiBlock = CardData[wikiBlockID];
			let blockType = Object.keys(wikiBlock)[0];
			let blockElem = wikiBlock[blockType];
			switch (blockType) {
				case "wikiPoster":
					cardPoster = cardPosterBlock(wikiCategory,blockElem['posterName'],blockElem['posterText'],blockElem['posterImg'],blockElem['underPosterText']);
					break;
				case "wikiName":
					openCardFull.push(cardNameBlock(blockElem['wikiName'],blockElem['isSpoiler'],wikiBlockID));
					break;
				case "wikiText":
					openCardFull.push(cardTextBlock(blockElem['wikiText'],blockElem['isSpoiler'],wikiBlockID));
					break;
				case "wikiPicText":
					openCardFull.push(cardPicTextBlock(blockElem['wikiText'],blockElem['wikiPic'],blockElem['wikiTextUnder'],blockElem['isSpoiler'],wikiBlockID));
					break;
				case "wikiGallery":
					openCardFull.push(cardGalleryBlock(blockElem['Gallery'],blockElem['isSpoiler'],wikiBlockID));
					break;
				case "wikiTextChoice":
					openCardFull.push(cardTextChoiceBlock(blockElem['wikiTextArr'],blockElem['isSpoiler'],wikiBlockID));
					break;
				case "wikiMusic":
					openCardFull.push(cardAudioBlock(blockElem['musicName'],blockElem['musicLink'],blockElem['posterImg'],blockElem['underPosterText'],wikiBlockID));
					break;
				case "wikiVideo":
					openCardFull.push(cardVideoBlock(blockElem['videoName'],blockElem['VideoLink'],blockElem['isSpoiler'],wikiBlockID));
					break;
				case "wikiYoutube":
					openCardFull.push(cardYoutubeBlock(blockElem['youtubeName'],blockElem['youtubeLink'],blockElem['isSpoiler'],wikiBlockID));
					break;
				case "wikiCardsChoice":
					openCardFull.push(cardCardsBlock(blockElem['Cards'],blockElem['isSpoiler'],wikiBlockID));
					break;
				default:
					break;
			}
		}
        return(`
			<div class="wikiOpenCardPoster row containter">
				${cardPoster}
			</div>
			<div class="wikiOpenCard row container">
				${openCardFull.join('')}
			</div>
        `);
    }


	//* меню добавления блока в карточку
	let cardBlockMenu = (wikiCategory,wikiID) =>{
		return(`
		
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
			
				<option value="wikiCardsChoice" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">Выбор карточек</option>    
		
			</select>

			<button onclick="addBlockWiki('${wikiCategory}',${wikiID},document.getElementById('blockAddType').value)" class="btn btn-${ThemeSet.Btn} btnBtn col-md-3 col-sm-12 mx-2 menuNote">
				<i class="fa fa-plus" aria-hidden="true"></i>
			</button>
		</div>
		
		
		`);
	}

    //*-------------------------------------------------------------
    //* блоки открытой карточки
    let cardPosterBlock = (wikiCategory,posterName,posterText,posterImg,underPosterText) =>{
		return(`
        
        <div class="row wikiBlock wikiPoster">
			<div class="col-md-8 col-sm-12">
				<h2 class="editText posterName h2 link-${ThemeSet.Primary} linkPrimary text-center" contenteditable="false">${posterName}</h2>
			</div>
			<div class="col-md-8 col-sm-12 posterText">
				<p class="link-${ThemeSet.Primary} editText linkPrimary h4 posterTxt"  contenteditable="false">
					${posterText}
				</p>
			</div>
			<div class="col-md-4 col-sm-12 posterPic">
				<figure class="figure">
					<img src="${posterImg}" class="figure-img img-fluid img-fluid-short rounded" alt="${posterName}">
					<div class="d-none imgLinkSave">${posterImg}</div>
					<figcaption class="figure-caption linkPrimary link-${ThemeSet.Primary} editText underPosterText" contenteditable="false">${underPosterText}</figcaption>
				</figure>

				<div class="editMode border border-${ThemeSet.Primary} borderPrimary rounded col-12 container">
					<select class="picSelect link-${ThemeSet.Background} linkBack col-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="changeImgBlockWiki(this,'pic')">
						<option class="bg-${ThemeSet.BodyBackground} ${ThemeSet.Primary} link-${ThemeSet.Primary} linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
						${fullOptionSelectList(wikiPicturesOptions[wikiCategory],"pic")}
					</select>
				</div>
			</div>
		</div>
        
        `);
    }

    let cardNameBlock = (wikiName,isSpoiler,blockID) =>{
        let spoilerCheck = "";
		let spoilerActive = "";
		if(isSpoiler == true){
			spoilerCheck = "spoilerBlur";
			spoilerActive = "used";
		}

		return(`
        
        <div class="row wikiBlock wikiName ${spoilerCheck}">
			<div class="d-none wikiBlockID">${blockID}</div>
            <div class="d-none isSpoilerBlock">${isSpoiler}</div>
            <div class="col-12">
                <h2 class="h2 link-${ThemeSet.Primary} linkPrimary text-center editText wikiNameText" contenteditable="false">${wikiName}</h2>
            </div>
			<div class="editMode border border-${ThemeSet.Primary} borderPrimary rounded col-12 container">
                <div class="navBlockBtns col-sm-12 col-md-1 row">
                    <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'up')"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                    <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'down')"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                </div>
                <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 spoilerBtn linkPrimary link-${ThemeSet.Primary} ${spoilerActive}" onclick="toggleSpoiler(this)"><i class="fa fa-eye" aria-hidden="true"></i></button>
                <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick="deleteBlockWiki(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
            <div class="spoilerBlock">
                <h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="openSpoiler(this)">Спойлер</h4>
            </div>
        </div>
        
        `);
    }

    let cardTextBlock = (wikiText,isSpoiler,blockID) =>{
        let spoilerCheck = "";
		let spoilerActive = "";
		if(isSpoiler == true){
			spoilerCheck = "spoilerBlur";
			spoilerActive = "used";
		}
		
		return(`
        
        <div class="row wikiBlock wikiText ${spoilerCheck}">
			<div class="d-none wikiBlockID">${blockID}</div>
            <div class="d-none isSpoilerBlock">${isSpoiler}</div>
            <p class="link-${ThemeSet.Primary} linkPrimary h4 editText wikiTextTxt" contenteditable="false">
				${wikiText}
            </p>
            <div class="editMode border borderPrimary border-${ThemeSet.Primary} rounded col-12 container">
                <div class="navBlockBtns col-sm-12 col-md-1 row">
                    <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'up')"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                    <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'down')"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                </div>
                <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary} ${spoilerActive}" onclick="toggleSpoiler(this)"><i class="fa fa-eye" aria-hidden="true"></i></button>
                <button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick="deleteBlockWiki(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
            <div class="spoilerBlock">
                <h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="openSpoiler(this)">Спойлер</h4>
            </div>
        </div>
        
        `);
    }

    let cardPicTextBlock = (wikiText,wikiPic,wikiTextUnder,isSpoiler,blockID) =>{
        let spoilerCheck = "";
		let spoilerActive = "";
		if(isSpoiler == true){
			spoilerCheck = "spoilerBlur";
			spoilerActive = "used";
		}
		
		return(`
        
        <div class="row wikiBlock wikiPicText ${spoilerCheck}">
			<div class="d-none wikiBlockID">${blockID}</div>
            <div class="d-none isSpoilerBlock">${isSpoiler}</div>
            <div class="col-md-8 col-sm-12">
                <p class="link-${ThemeSet.Primary} linkPrimary h4 editText wikiTextTxt" contenteditable="false">
                    ${wikiText}
                </p>
            </div>
            <div class="col-md-4 col-sm-12 pictureBlock">
                <figure class="figure">
                <img src="${wikiPic}" class="figure-img img-fluid img-fluid-short rounded" alt="${wikiTextUnder}">
					<div class="d-none imgLinkSave">${wikiPic}</div>
					<figcaption class="figure-caption linkPrimary link-${ThemeSet.Primary} editText wikiPicUnderText" contenteditable="false">${wikiTextUnder}</figcaption>
				</figure>

                <div class="editMode border rounded border-${ThemeSet.Primary} borderPrimary col-12 container">
                    <select class="dirSelect link-${ThemeSet.Background} linkBack col-md-5 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="subcategoryOptionList(this,'pic')">
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории">Выбор категории</option>
                        ${fullOptionSelectList(wikiPicturesOptions,"options")}
                    </select>

                    <select class="picSelect link-${ThemeSet.Background} linkBack col-md-5 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="changeImgBlockWiki(this,'pic')">
                        <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
                    </select>
                </div>
            </div>
			<div class="editMode border rounded border-${ThemeSet.Primary} borderPrimary col-12 container">
			<div class="navBlockBtns col-sm-12 col-md-1 row">
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'up')"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'down')"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
			</div>
			<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 spoilerBtn linkPrimary link-${ThemeSet.Primary} ${spoilerActive}" onclick="toggleSpoiler(this)"><i class="fa fa-eye" aria-hidden="true"></i></button>
			<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick="deleteBlockWiki(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
            <div class="spoilerBlock">
                <h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="openSpoiler(this)">Спойлер</h4>
            </div>
        </div>
        
        `);
    }

	//* Фотка галереи
	let galleryItem = (galleryImg,galleryName,galleryText,ID) =>{
		let activeCheck = "";
		let editText = "";
		let dNoneCheck = "d-none";
		if(ID == 0){
			activeCheck = "active";
			dNoneCheck = "";
		}

		if(isEdit == true){
			editText = `contenteditable="True"`
		}


		return(`
		
		<div class="carousel-item ${activeCheck}">
			<div class="editMode pickPictureContainer container row col-12">
				<select class="dirSelect link-${ThemeSet.Background} linkBack col-md-5 col-sm-11 mx-1 bgSecond bg-${ThemeSet.SecondBackground}" onchange="subcategoryOptionList(this,'pic')">
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории">Выбор категории</option>
					${fullOptionSelectList(wikiPicturesOptions,"options")}
				</select>

				<select class="picSelect link-${ThemeSet.Background} linkBack col-md-5 col-sm-11 mx-1 bgSecond bg-${ThemeSet.SecondBackground}" onchange="changeImgBlockWiki(this,'gallery')">
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
				</select>

				<button class="btn btn-outline-${ThemeSet.Primary} btnOutlineBtn rounded col-md-1 col-sm-5 picDelete" onclick="deleteGalleryItem(this,${ID})"><i class="fa fa-minus" aria-hidden="true"></i></button>
			</div>
			<div class="w-100 carouselPic">
				<img src="${galleryImg}" class="d-block img-fluid" alt="${galleryName}">
				<div class="d-none imgLinkSave">${galleryImg}</div>
			</div>
			<div class="carousel-caption carousel-${ThemeSet.Primary} primCarousel ${dNoneCheck} d-md-block">
				<h5 class="editText mainPicText h4" ${editText}>${galleryName}</h5>
				<p class="editText picText h5" ${editText}>${galleryText}</p>
			</div>
			
		</div>
		
		`);
	}

    let cardGalleryBlock = (Gallery,isSpoiler,blockID) =>{
		let spoilerCheck = "";
		let spoilerActive = "";
		if(isSpoiler == true){
			spoilerCheck = "spoilerBlur";
			spoilerActive = "used";
		}
		
		let picItemList = [];
		for(picItem in Gallery){
			let galleryItemObject = Gallery[picItem];
			picItemList.push(galleryItem(galleryItemObject.galleryImg,galleryItemObject.galleryName,galleryItemObject.galleryText,picItem));
		}

        return(`
        
        <div class="row wikiBlock wikiGallery ${spoilerCheck}">
			<p class="d-none isSpoilerBlock">${isSpoiler}</p>
			<p class="d-none wikiBlockID">${blockID}</p>
			<div id="carouselExampleCaptions${blockID}" class="carousel slide" data-bs-ride="carousel">
				
				<div class="carousel-inner">

					${picItemList.join('')}

				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions${blockID}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Предыдущий</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions${blockID}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Следующий</span>
				</button>
			</div>

			<div class="editMode border borderPrimary rounded border-${ThemeSet.Primary} col-12">
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 picAdd" onclick="addGalleryItem(this)"><i class="fa fa-plus" aria-hidden="true"></i></button>
				<div class="navBlockBtns col-sm-12 col-md-1 row">
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'up')"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'down')"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
				</div>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary} ${spoilerActive}" onclick="toggleSpoiler(this)"><i class="fa fa-eye" aria-hidden="true"></i></button>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick="deleteBlockWiki(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
			<div class="spoilerBlock">
				<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="openSpoiler(this)">Спойлер</h4>
			</div>
		</div>


        `);
    }

	//* выбранный текст (элемент)
	let textChoiceItem = (textName,textChosen) =>{
		return(`
		
		<li class="row textItemFull container">
			<p class="link-${ThemeSet.Primary} editText linkPrimary text-center h3 col-md-6 col-sm-12 textItemTextName">${textName}</p>
			<p class="link-${ThemeSet.Primary} linkPrimary text-center h3 col-md-5 col-sm-12 textItemTextChoice">${textChosen}</p>
			<button class="editMode btn btn-${ThemeSet.Btn} btnBtn rounded col-md-1 col-sm-12 navBlock" onclick="removeTextChoice(this)"><i class="fa fa-minus" aria-hidden="true"></i></button>
		</li>
		
		`);
	}

    let cardTextChoiceBlock = (wikiTextArr,isSpoiler,blockID) =>{
        let spoilerCheck = "";
		let spoilerActive = "";
		if(isSpoiler == true){
			spoilerCheck = "spoilerBlur";
			spoilerActive = "used";
		}

		let wikiTextArrFull = [];
		for(wikiText in wikiTextArr){
			let wikiTextItem = wikiTextArr[wikiText];
			let wikiTextItemName = Object.keys(wikiTextItem)[0];
			let wikiTextItemChoice = wikiTextItem[wikiTextItemName];
			wikiTextArrFull.push(textChoiceItem(wikiTextItemName,wikiTextItemChoice));
		}
		
		return(`
        
        <div class="row wikiBlock wikiTextChoice ${spoilerCheck}">
			<div class="d-none isSpoilerBlock">${isSpoiler}</div>
			<div class="d-none wikiBlockID">${blockID}</div>

			<ul class="container choiceTextList border borderPrimary rounded border-${ThemeSet.Primary}">
				${wikiTextArrFull.join('')}
			</ul>
			
			<div class="editMode border borderPrimary rounded border-${ThemeSet.Primary} col-12">
				<button class="btn btn-${ThemeSet.Btn} btnBtn rounded col-12 navBlock" onclick="addTextChoice(this)"><i class="fa fa-plus" aria-hidden="true"></i></button>
				<select class="textChoiceSelect link-${ThemeSet.Background} linkBack col-md-5 mx-2 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="subcategoryOptionList(this,'text')">
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории">Выбор категории</option>
					${fullOptionSelectList(wikiTextChoiceOptions,'options')}
				</select>
					
				<select class="subTextChoiceSelect link-${ThemeSet.Background} linkBack col-md-5 mx-2 col-sm-11 bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор из категории">Выбор из категории</option>
				</select>
				<div class="navBlockBtns col-sm-12 col-md-1 row">
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'up')"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'down')"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
				</div>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary} ${spoilerActive}" onclick="toggleSpoiler(this)"><i class="fa fa-eye" aria-hidden="true"></i></button>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick="deleteBlockWiki(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
			<div class="spoilerBlock">
				<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="openSpoiler(this)">Спойлер</h4>
			</div>
		</div>


        `);
    }

    let cardAudioBlock = (musicName,musicLink,isSpoiler,blockID) =>{
        let spoilerCheck = "";
		let spoilerActive = "";
		if(isSpoiler == true){
			spoilerCheck = "spoilerBlur";
			spoilerActive = "used";
		}
		
		return(`
        
        <div class="row wikiBlock wikiMusic ${spoilerCheck}">
			<div class="d-none isSpoilerBlock">${isSpoiler}</div>
			<div class="d-none wikiBlockID">${blockID}</div>
			<p class="col-sm-12 col-md-6 link-${ThemeSet.Primary} linkPrimary h5 text-center audioName">
				${musicName}
			</p>
			<audio class="col-md-6 col-sm-12" controls src="${musicLink}"></audio>
			<div class="d-none musicLinkSave">${musicLink}</div>

			<div class="editMode border rounded borderPrimary border-${ThemeSet.Primary} col-12 row container">
				<select class="musicTypeSelect col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack bgSecond bg-${ThemeSet.SecondBackground}" onchange="subcategoryOptionList(this,'music')">
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор жанра музыки">Выбор жанра музыки</option>
					${fullOptionSelectList(wikiMusicOptions,"options")}
				</select>

				<select class="musicSongSelect col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack bgSecond bg-${ThemeSet.SecondBackground}" onchange="changeMusicBlockWiki(this)">
					<option class="bg-dark2 bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор музыки">Выбор музыки</option>
				</select>
				<div class="navBlockBtns col-sm-12 col-md-1 row">
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'up')"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'down')"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
				</div>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary} ${spoilerActive}" onclick="toggleSpoiler(this)"><i class="fa fa-eye" aria-hidden="true"></i></button>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick="deleteBlockWiki(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
			<div class="spoilerBlock">
				<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="openSpoiler(this)">Спойлер</h4>
			</div>
		</div>
        
        `);
    }

    let cardVideoBlock = (videoName,VideoLink,isSpoiler,blockID) =>{
        let spoilerCheck = "";
		let spoilerActive = "";
		if(isSpoiler == true){
			spoilerCheck = "spoilerBlur";
			spoilerActive = "used";
		}
		
		return(`
        
        <div class="row wikiBlock wikiVideo ${spoilerCheck}">
			<div class="d-none isSpoilerBlock">${isSpoiler}</div>
			<div class="d-none wikiBlockID">${blockID}</div>
			<h2 class="h2 col-12 link-${ThemeSet.Primary} linkPrimary text-center localVideoName editText wikiVideoName" contenteditable="false">${videoName}</h2>
			<video class="localVideo" src="${VideoLink}" controls></video>
			<div class="d-none videoLinkSave">${VideoLink}</div>

			<div class="editMode border rounded borderPrimary border-${ThemeSet.Primary} col-12 container row">
				<select class="videoTypeSelect col-12 link-${ThemeSet.Background} linkBack bgSecond bg-${ThemeSet.SecondBackground}" onchange="changeVideoBlockWiki(this)">
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор видео">Выбор видео</option>
					${fullOptionSelectList(VideoDataAll,"video")}
				</select>
				<div class="navBlockBtns col-sm-12 col-md-1 row">
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'up')"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'down')"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
				</div>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary} ${spoilerActive}" onclick="toggleSpoiler(this)"><i class="fa fa-eye" aria-hidden="true"></i></button>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick="deleteBlockWiki(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
			<div class="spoilerBlock">
				<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="openSpoiler(this)">Спойлер</h4>
			</div>
		</div>
        
        `);
    }

    let cardYoutubeBlock = (youtubeName,youtubeLink,isSpoiler,blockID) =>{
        let spoilerCheck = "";
		let spoilerActive = "";
		if(isSpoiler == true){
			spoilerCheck = "spoilerBlur";
			spoilerActive = "used";
		}
		
		return(`
        
        <div class="row wikiBlock wikiYoutube ${spoilerCheck}">
			<div class="d-none isSpoilerBlock">${isSpoiler}</div>
			<div class="d-none wikiBlockID">${blockID}</div>
			<h2 class="h2 col-12 link-${ThemeSet.Primary} linkPrimary text-center localYoutubeName editText wikiVideoName" contenteditable="false">${youtubeName}</h2>
			<iframe class="youtubeVideo" title="YouTube video player" allowfullscreen="" width="500" height="350" frameborder="0" src="${youtubeLink}"></iframe>
			<div class="d-none youtubeLinkSave">${youtubeLink}</div>
			<div class="editMode border rounded borderPrimary border-${ThemeSet.Primary} col-12">
				<p class="youtubeLink col-12 link-${ThemeSet.Primary} borderPrimary linkPrimary border rounded border-${ThemeSet.Primary}" contenteditable="true" oninput="changeYoutubeBlockWiki(this)">${youtubeLink}</p>
				<div class="navBlockBtns col-sm-12 col-md-1 row">
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'up')"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'down')"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
				</div>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary rounded col-12 spoilerBtn link-${ThemeSet.Primary} ${spoilerActive}" onclick="toggleSpoiler(this)"><i class="fa fa-eye" aria-hidden="true"></i></button>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick="deleteBlockWiki(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
			<div class="spoilerBlock">
				<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="openSpoiler(this)">Спойлер</h4>
			</div>
		</div>
        
        `);
    }


	//* карточка
    let wikiCard = (posterImg,posterName,posterText,cardID,cardCategory) =>{
        return(
        `
		<div class="wikiCardShort">
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
			<button class="editMode btn btn-${ThemeSet.Btn} btnBtn rounded col-12" onclick="removeCardBlockShort(this)"><i class="fa fa-minus" aria-hidden="true"></i></button>
		</div>
        `
        );
    }

    let cardCardsBlock = (cardsArr,isSpoiler,blockID) =>{
        let spoilerCheck = "";
		let spoilerActive = "";
		if(isSpoiler == true){
			spoilerCheck = "spoilerBlur";
			spoilerActive = "used";
		}

		//*Проход по карточкам (где карточка идет как БД:Имя карточки)
		let cardList = [];

		for(cardID in cardsArr){
			cardDataName = Object.keys(cardsArr[cardID])[0];
			cardName = cardsArr[cardID][cardDataName];
			cardDataFull = loadData(cardDataName);
			for(currCardID in cardDataFull){
				let currCardName = cardDataFull[currCardID][0]["wikiPoster"]["posterName"]; //* выводим название карточки
				if(currCardName == cardName){
					let cardImg = cardDataFull[currCardID][0]["wikiPoster"]["posterImg"];
					let cardText = cardDataFull[currCardID][0]["wikiPoster"]["posterText"];
					cardList.push(wikiCard(cardImg,currCardName,cardText,currCardID,cardDataName));
					break;
				}
			}
		}

		
		return(`
        <div class="row wikiBlock wikiCardsChoice ${spoilerCheck}">
			<p class="d-none isSpoilerBlock">${isSpoiler}</p>
			<p class="d-none wikiBlockID">${blockID}</p>
			<div class="d-flex containter wikiCardsMenuShort borderPrimary border border-${ThemeSet.Primary} rounded container">
				${cardList.join('')}
			</div>
			
			<div class="editMode border rounded borderPrimary border-${ThemeSet.Primary} col-12 container row">
				<select class="cardChoiceSelect col-md-5 col-sm-12 link-${ThemeSet.Background} linkBack bgSecond bg-${ThemeSet.SecondBackground}" onchange="subcategoryOptionList(this,'card')">
					<option class="bg-${ThemeSet.BodyBackground}  bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор категории">Выбор категории</option>
					${fullOptionSelectList(wikiTextChoiceOptions,'options')}
							</select>
			
				<select class="cardChoiceSelectCard col-md-6 col-sm-12 link-${ThemeSet.Background} linkBack bgSecond bg-${ThemeSet.SecondBackground}" onchange="">
					<option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="Выбор карточки">Выбор карточки</option>
				</select>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-md-1 col-sm-12 navBlock" onclick="addCardBlockShort(this)"><i class="fa fa-plus" aria-hidden="true"></i></button>
				<div class="navBlockBtns col-sm-12 col-md-1 row">
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'up')"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
					<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-6 navBlock" onclick="swapBlocks(this,'down')"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
				</div>
				<button class="btn btn-outline-${ThemeSet.Btn} linkPrimary btnOutlineBtn rounded col-12 spoilerBtn link-${ThemeSet.Primary} ${spoilerActive}" onclick="toggleSpoiler(this)"><i class="fa fa-eye" aria-hidden="true"></i></button>
				<button class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn rounded col-12 deleteBlock" onclick="deleteBlockWiki(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
			<div class="spoilerBlock">
				<h4 class="link-${ThemeSet.Primary} linkPrimary" onclick="">Спойлер</h4>
			</div>
		</div>
        `);
    }


    //!-------------------------------------------------------------

    //* полная страница откытой карточки
    fullOpenCardWiki = (wikiCategory,wikiID) =>{
        return(`
        <div class="wikiCardOpenPage container">
            ${openCardMenu(wikiCategory,wikiID)}
			${cardBlockMenu(wikiCategory,wikiID)}
            ${openCardWiki(wikiCategory,wikiID)}
        </div>
        `);
    }
    
    //----------------------------------------------------------------
	//? работа скриптов открытой карточки

	//? открытие карточки
	openWikiCard = (category,cardID) =>{
		$('.app').children().remove();
		$(fullOpenCardWiki(category,cardID)).appendTo('.app');
		
		//КРИНЖ
		$('.editMode').toggleClass('d-none');
		isEdit = false;
		isSort = false;
	}

	//* открытия меню карточек
	openWikiCardMenu = (wikiCategory) =>{
		$('.app').children().remove();
		$(menuCardsFull()).appendTo('.app');
		changeCardsData(wikiCategory);
		isEdit = false;
		isSort = false;
		allFunctionsDelay();
	}

	let isEdit = false;
    //? вкл/выкл режим редактирования
    toggleEditMode = () =>{
		$('.editMode').toggleClass('d-none');
		$('.editCardBtn').toggleClass('used');
		if (isEdit == false){
			isEdit = true;
		}
		else{
			isEdit = false;
			let wikiID = Number($('.wikiID').text());
			let wikiCategory = $('.wikiCategory').text();
			saveCardWiki(wikiCategory,wikiID);
		}

		if($('.editText').attr('contenteditable') == 'false'){
			$('.editText').attr('contenteditable','true');
		}
		else{
			$('.editText').attr('contenteditable','false');
		}

		if(isEdit == true){
			$('.spoilerBlur').addClass('spoilerBlurOpen');
		}
		else{
			$('.spoilerBlur').removeClass('spoilerBlurOpen');
		}
    }

	//* добавление блока в карточку
	addBlockWiki = (wikiCategory,wikiID,wikiBlock) =>{
		//let wikiData = loadData(wikiCategory);
		//let wikiDataObj = wikiData[wikiID];
		let openedCard = $('.wikiOpenCard');
		let newWikiBlock;
		let blockId = openedCard.children().length;

		switch(wikiBlock){
			case "wikiName":
				newWikiBlock = cardNameBlock("Название", false, blockId);
				break;
			case "wikiText":
				newWikiBlock = cardTextBlock("Текст текст текст текст \n текст текст текст", false, blockId);
				break;
			case "wikiPicText":
				newWikiBlock = cardPicTextBlock("Текст текст текст текст \n текст текст текст", "/assets/images/thumbnail.png","Подназвание текста", false, blockId);
				break;
			case "wikiVideo":
				newWikiBlock = cardVideoBlock("Название видео", "", false, blockId);
				break;
			case "wikiMusic":
				newWikiBlock = cardAudioBlock("Название музыки", "", false, blockId);
				break;
			case "wikiYoutube":
				newWikiBlock = cardYoutubeBlock("Название видео", "", false, blockId);
				break;
			case "wikiGallery":
				newWikiBlock = cardGalleryBlock([{galleryImg:"/assets/images/thumbnail.png",galleryName:"Название",galleryText:"Текст текст текст текст текст"},], false, blockId);
				break;
			case "wikiTextChoice":
				newWikiBlock = cardTextChoiceBlock([{"Текст 1 название":"Выбор 1"},{"Текст 2 название":"Выбор 2"}], false, blockId);
				break;
			case "wikiCardsChoice":
				let wikiCardName = $('.wikiOpenCard').find('.posterName').text();
				//КРИНЖ
				let wikiCardObj = {};
				wikiCardObj[wikiCategory] = wikiCardName;
				newWikiBlock = cardCardsBlock([wikiCardObj],false,blockId);
				break;
			default:
				break;
		}

		$(newWikiBlock).appendTo(openedCard);
		$('.editText').attr('contenteditable','true');
	}

	//* удаление блока из карточки
	deleteBlockWiki = (thisBlock)=>{
		let blockWiki = $(thisBlock).parent().parent();
		blockWiki.remove();
	}

	//* анти-мисклик от удаления карточки
	agreeDeleteWikiCard = () =>{
		$('.agreeDeleteCardBtn').toggleClass('d-none');
		$('.deleteCardBtn').toggleClass('d-none');
	}

	//* удаление всей карточки
	deleteFullCardWiki = (wikiCategory,wikiID) =>{
		let wikiData = loadData(wikiCategory);
		wikiData.splice(wikiID,1)
		saveNewData(wikiCategory,wikiData);
		openWikiCardMenu(wikiCategory);
	}


	//* сохранение данных вики
	let saveCardWiki = (wikiCategory,wikiID) =>{
		console.log('Сохранение карточки !');

		let wikiData = loadData(wikiCategory);
		let wikiDataObj = [];


		//* проход по циклу с wikiBlock
		let wikiBlocksFull = $('.wikiBlock');
		let wikiBlockLength = wikiBlocksFull.length;
		for (let i = 0; i < wikiBlockLength; i++) {
			let wikiBlock = wikiBlocksFull[i];
			let wikiBlockType = wikiBlock.classList[2];
			let spolierCheckVal = $(wikiBlock).find('.isSpoilerBlock').text();
			let spolerSet = false;
			if(spolierCheckVal == "true"){
				spolerSet = true;
			}
			switch(wikiBlockType){
				case "wikiPoster":
					let posterName = $(wikiBlock).find('.posterName').text();
					let posterText = $(wikiBlock).find('.posterTxt').html();
					let posterImg = $(wikiBlock).find('.imgLinkSave').text();
					let underPosterText = $(wikiBlock).find('.underPosterText').text();
					wikiDataObj.push({wikiPoster:{
						posterName: posterName,
						posterText: posterText,
						posterImg: posterImg,
						underPosterText: underPosterText}
					});
					break;
				case "wikiName":
					let wikiName = $(wikiBlock).find('.wikiNameText').text();
					wikiDataObj.push({wikiName:{
							wikiName: wikiName, 
							isSpoiler:spolerSet
						}
					});
					break;
				case "wikiText":
					let wikiText = $(wikiBlock).find('.wikiTextTxt').html();
					wikiDataObj.push({wikiText:{
							wikiText: wikiText, 
							isSpoiler:spolerSet
						}
					});
					break;
				case "wikiPicText":
					let wikiPic = $(wikiBlock).find('.imgLinkSave').text();
					let wikiPicText = $(wikiBlock).find('.wikiTextTxt').html();
					let wikiPicTextUnder = $(wikiBlock).find('.wikiPicUnderText').html();
					wikiDataObj.push({wikiPicText:{
							wikiText: wikiPicText,
							wikiPic: wikiPic,
							wikiTextUnder: wikiPicTextUnder, 
							isSpoiler:spolerSet
						}
					});
					break;
				case "wikiVideo":
					let wikiVideo = $(wikiBlock).find('.videoLinkSave').text();//
					let wikiVideoName = $(wikiBlock).find('.wikiVideoName').html();
					wikiDataObj.push({wikiVideo:{
							videoName: wikiVideoName,
							VideoLink: wikiVideo,
							isSpoiler:spolerSet
						}
					},);
					break;
				case "wikiMusic":
					let wikiMusic = $(wikiBlock).find('.musicLinkSave').text();
					let wikiMusicName = $(wikiBlock).find('.audioName').text();
					wikiDataObj.push({wikiMusic:{
							musicLink: wikiMusic,
							musicName: wikiMusicName,
							isSpoiler:spolerSet
						}
					});
					break;
				case "wikiYoutube":
					let wikiYoutube = $(wikiBlock).find('.youtubeLinkSave').text();//
					let wikiYoutubeName = $(wikiBlock).find('.wikiVideoName').html();
					wikiDataObj.push({wikiYoutube:{
							youtubeName: wikiYoutubeName,
							youtubeLink: wikiYoutube,
							isSpoiler:spolerSet
						}
					});
					break;
				case "wikiGallery":
					let galleryArr = [];
					let galleryItemsFull = $(wikiBlock).find('.carousel-item');
					let galleryItemLength = galleryItemsFull.length;
					for (let i = 0; i < galleryItemLength; i++) {
						let galleryItemHtml = $(galleryItemsFull[i]);
						let galleryImg = galleryItemHtml.find(".imgLinkSave").text();
						let galleryName = galleryItemHtml.find(".mainPicText").text();
						let galleryText = galleryItemHtml.find(".picText").html();
						galleryArr.push({
							galleryImg: galleryImg,
							galleryName: galleryName,
							galleryText: galleryText
						});
					}

					wikiDataObj.push({wikiGallery:{
							Gallery: galleryArr, 
							isSpoiler:spolerSet,
						}
					});
					break;
				case "wikiTextChoice":
					let wikiTextArr = [];
					let textChoiceList = $(wikiBlock).find('.textItemFull');
					let textChoiceListLength = textChoiceList.length;
					for (let i = 0; i < textChoiceListLength; i++) {
						let textChoiceElement = $(textChoiceList[i]);
						let textChoiceName = textChoiceElement.find('.textItemTextName').text();
						let textChoice = textChoiceElement.find('.textItemTextChoice').text();
						let textChoiceObject = {};
						textChoiceObject[textChoiceName] = textChoice;
						wikiTextArr.push(textChoiceObject);
					}
					wikiDataObj.push({wikiTextChoice:{
							wikiTextArr: wikiTextArr, 
							isSpoiler:spolerSet
						}
					});
					break;
				case "wikiCardsChoice":
					let wikiCardsArr = [];
					let cardList = $(wikiBlock).find('.wikiCardShort');
					for(let i = 0; i < cardList.length; i++){
						let currCard = cardList[i];
						let cardData = $(currCard).find('.cardCategory').text();
						let cardName = $(currCard).find('.card-name').text();
						let cardObj = {};
						cardObj[cardData] = cardName;
						wikiCardsArr.push(cardObj);
					}
					wikiDataObj.push({wikiCardsChoice:{
							Cards: wikiCardsArr, 
							isSpoiler:spolerSet
						}
					});
					break;
				default:
					break;
			}

		}

		wikiData[wikiID] = wikiDataObj;
		saveNewData(wikiCategory,wikiData);
	}

	//----------------------------------
	//* функции уже в блоках карточки

	//* стрелочки в блоках
	swapBlocks = (thisBlock,direction) =>{
		let wikiBlock = $(thisBlock).parent().parent().parent();
		let newWikiBlock;
		switch (direction) {
			case 'up':
				newWikiBlock = wikiBlock.prev(".wikiBlock");
				if(newWikiBlock.length != 0){
					wikiBlock.insertBefore(newWikiBlock);
				}
				break;
			case 'down':
				newWikiBlock = wikiBlock.next(".wikiBlock");
				if(newWikiBlock.length != 0){
					wikiBlock.insertAfter(newWikiBlock);
				}
				break;
			default:
				break;
		}
	}

	//* замена фотографии в постере и блоке картинка/текст
	changeImgBlockWiki = (thisBlock,blockType) =>{
		let blockWiki = $(thisBlock);
		let blockVal = blockWiki.val();
		
		switch (blockType) {
			case 'gallery':
				let galleryItemImg = blockWiki.parent().parent().children('.carouselPic').children('img');
				let galleryItemLink = blockWiki.parent().parent().children('.carouselPic').children('.imgLinkSave');;//imgLinkSave
				galleryItemImg.attr('src',blockVal);
				galleryItemLink.text(blockVal);
				break;
			case 'pic':
				let blockImg = blockWiki.parent().parent().children().children('img');
				let blockImgLink = blockWiki.parent().parent().children().children('.imgLinkSave');
				blockImg.attr('src',blockVal);
				blockImgLink.text(blockVal);
				break;
		
			default:
				break;
		}
	}

	//* замена аудио в музыке
	changeMusicBlockWiki = (thisBlock) =>{
		let blockWiki = $(thisBlock);
		let blockVal = blockWiki.val();
		let blockAudio = blockWiki.parent().parent().children('audio');
		blockAudio.attr('src',blockVal);
		let blockAudioLink = blockWiki.parent().parent().children('.musicLinkSave');
		let blockNameLink = blockWiki.parent().parent().children('.musicNameSave');
		let blockName = blockWiki.parent().parent().children('.audioName');
		let audioName = findMusicName(blockVal);
		blockAudioLink.text(blockVal);
		blockNameLink.text(audioName);
		blockName.text(audioName);
	}

	//* замена видео локальное
	changeVideoBlockWiki = (thisBlock) =>{
		let blockWiki = $(thisBlock);
		let blockVal = blockWiki.val();
		let blockVideo = blockWiki.parent().parent().children('video');
		let blockLink = blockWiki.parent().parent().find('.videoLinkSave');
		blockLink.text(blockVal);
		blockVideo.attr('src',blockVal);
	}

	//* замена ютуб видео
	changeYoutubeBlockWiki = (thisBlock) =>{
		let blockWiki = $(thisBlock);
		let blockVal = blockWiki.text();
		let blockYoutube = blockWiki.parent().parent().children('iframe');
		let standartYoutubeStr = "https://www.youtube.com/watch?v=";
		let newYoutubeStr = `https://www.youtube.com/embed/${blockVal.replace(standartYoutubeStr,'')}`;
		blockYoutube.attr('src',newYoutubeStr);
		let blockYoutubeLink = blockWiki.parent().parent().children('.youtubeLinkSave');
		blockYoutubeLink.text(newYoutubeStr);
	}


	//* Галерейные функции-----------------------------

	//* удаление элемента галереи
	deleteGalleryItem = (thisBlock,ID) =>{
		let blockWiki = $(thisBlock);
		let carouselLength = blockWiki.parent().parent().parent().children().length-1;
		let carouselItemFull = blockWiki.parent().parent();
		console.log(carouselItemFull);
		if(ID == carouselLength || ID >= carouselLength){
			carouselItemFull.prev().toggleClass('active');
		}
		else{
			carouselItemFull.next().toggleClass('active');
		}
		carouselItemFull.remove();
	}

	//* добавление элемента в галерею
	addGalleryItem = (thisBlock) =>{
		let blockWiki = $(thisBlock);
		let carousel = blockWiki.parent().parent().children('.carousel').children('.carousel-inner');
		let wikiBlockCurrId = blockWiki.parent().parent().children('.wikiBlockID').text();
		let currentID = carousel.children().length;
		$(galleryItem("/assets/images/thumbnail.png","Название","Текст текст текст текст текст",currentID)).appendTo(carousel);
	}

	//* Выбор текста функции-----------------------------

	//* добавление элемента текста
	addTextChoice = (thisBlock) =>{
		let blockWiki = $(thisBlock);
		let textItemChoice = blockWiki.parent().children('.subTextChoiceSelect').val();
		let textItemList = blockWiki.parent().parent().children('.choiceTextList')
		$(textChoiceItem("",textItemChoice)).appendTo(textItemList);
		$('.editText').attr('contenteditable','true');
	}

	//* удаление элемента текста
	removeTextChoice = (thisBlock) =>{
		let blockWiki = $(thisBlock).parent();
		blockWiki.remove();
	}


	//*Выбор карточки-----------------------------
	
	//* добавление карточки
	addCardBlockShort = (thisBlock) =>{
		let blockWiki = $(thisBlock);

		let cardDataVal = blockWiki.parent().find('.cardChoiceSelect').val();
		let cardNameVal = blockWiki.parent().find('.cardChoiceSelectCard').val();
		
		let currentCard = [];
		//*Проход по карточкам (где карточка идет как БД:Имя карточки)
		cardDataFull = loadData(cardDataVal);
		for(currCardID in cardDataFull){
			let currCardName = cardDataFull[currCardID][0]["wikiPoster"]["posterName"]; //* выводим название карточки
			if(currCardName == cardNameVal){
				let cardImg = cardDataFull[currCardID][0]["wikiPoster"]["posterImg"];
				let cardText = cardDataFull[currCardID][0]["wikiPoster"]["posterText"];
				currentCard.push(wikiCard(cardImg,currCardName,cardText,currCardID,cardDataVal));
				break;
			}
		}
		let cardShortMenu = blockWiki.parent().parent().find('.wikiCardsMenuShort');
		$(currentCard.join('')).appendTo(cardShortMenu);

	}

	//* удаление карточки
	removeCardBlockShort = (thisBlock) =>{
		let blockWiki = $(thisBlock).parent();
		blockWiki.remove();
	}

	//*UI SORTABLE-----------------------------

	let rotateSortIcon = (degree) =>{
		$('.sortCardBtn').children().css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
		$('.sortCardBtn').children().css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
	}

	let isSort = false;
	//* переключение сортировки
    toggleSortMode = () =>{
		if (isSort == false){
			isSort = true;
			rotateSortIcon(90);
		}
		else{
			isSort = false;
			rotateSortIcon(0);
		}
		sortWikiСardBlocks();
        
        //if($('.menuSearchCategory').val() != "Name"){
            //$(`.wikiOpenCard`).sortable("destroy");
        //}
    }

	//* Сортировка карточек
	sortWikiСardBlocks = () =>{
		if(isSort == true){
			$(`.wikiOpenCard`).sortable();
		}
        else{
			$(`.wikiOpenCard`).sortable("destroy");
		}
	}

	//* Спойлеры-----------------------------

	toggleSpoiler = (thisBlock) =>{
		let BtnChange = $(thisBlock).toggleClass('used');
		let blockWiki = $(thisBlock).parent().parent();
		let spoilerData = $(blockWiki).find('.isSpoilerBlock').text();
		if(spoilerData == "false"){
			$(blockWiki).find('.isSpoilerBlock').text('true');
			$(blockWiki).addClass('spoilerBlur');
			$(blockWiki).addClass('spoilerBlurOpen');
		}
		else{
			$(blockWiki).find('.isSpoilerBlock').text('false');
			$(blockWiki).removeClass('spoilerBlur');
			$(blockWiki).removeClass('spoilerBlurOpen');
		}
	}

	openSpoiler = (thisBlock) =>{
		let blockWiki = $(thisBlock).parent().parent();
		blockWiki.addClass('spoilerBlurOpen');
	}
});