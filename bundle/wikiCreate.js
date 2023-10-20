$(() => {

// ! wikiDataAll = [типСтраницы, тип(ключ), массив(ист/рас), массив[созд], строка]
//! пример [0, moments, storyAll, momentsArr, Моменты Видео]

onchangeAudioWiki = (wikiTypeID,wikiPage,wikiPanel,wikiCategory,musicVal) =>{
    $(`.audio-${wikiPage}-${wikiPanel}-${wikiCategory}-${wikiTypeID}`).attr({src: musicVal});
    let musicNameStr = '';
    if(musicVal.includes("./assets/music/Аниме/")){
        musicNameStr = musicVal.replace('./assets/music/Аниме/','',1);
    }
    if(musicVal.includes("./assets/music/Игры/")){
        musicNameStr = musicVal.replace('./assets/music/Игры/','',1);
    }
    if(musicVal.includes("./assets/music/Музыка/")){
        musicNameStr = musicVal.replace('./assets/music/Музыка/','',1);
    }
    let musicNameStrFull = musicNameStr.replace('.mp3','',1);
    $(`.musicOstName-${wikiPanel}-${wikiTypeID}`).text(musicNameStrFull);
            
}

onchangeYoutubeWiki = (wikiTypeID,wikiPage,wikiPanel,wikiCategory,videoLink) =>{
    let newVideoLink;
    if(videoLink.includes('https://www.youtube.com/watch?v=')){
        newVideoLink = videoLink.replace('https://www.youtube.com/watch?v=','https://www.youtube.com/embed/');
    }
    else{
        newVideoLink = '';
    }
    $(`.youtube-${wikiPage}-${wikiPanel}-${wikiCategory}-${wikiTypeID}`).attr({src: newVideoLink});
}

onchangeLocalVideoWiki = (wikiTypeID,wikiPage,wikiPanel,wikiCategory,videoLink) =>{
    $(`.video-${wikiPage}-${wikiPanel}-${wikiCategory}-${wikiTypeID}`).attr({src: videoLink});
}

onchangePictureWiki = (wikiTypeID,wikiPage,wikiPanel,wikiCategory,picLink) =>{
    //picture-chars-elfs-сharAppearPicture
    //picture-chars-elfs-сharAppearPicture-show
    let typeWiki = ``;
    if(wikiTypeID == 'show'){
        typeWiki = `-${wikiTypeID}`
    }
    $(`.picture-${wikiPage}-${wikiPanel}-${wikiCategory}${typeWiki}`).attr({src: picLink});
}

checkRadioVideo = (wikiPanel,wikiCategory,item) =>{
    if(!item.hasClass('active')){
        $(`.check-player-${wikiPanel}-${wikiCategory}.active`).removeClass('active');
        item.addClass('active');
    }
    if(item.val() == 'video'){
        $(`.${wikiPanel}-moments-youtube`).addClass('d-none');
        $(`.${wikiPanel}-moments-local`).removeClass('d-none');
        $(`.videoPlayer-${wikiPanel}`).text('video');
    }
    if(item.val() == 'youtube'){
        $(`.${wikiPanel}-moments-youtube`).removeClass('d-none');
        $(`.${wikiPanel}-moments-local`).addClass('d-none');
        $(`.videoPlayer-${wikiPanel}`).text('youtube');
    }
}

wikiChangeColorText = (wikiTypeID,wikiPage,wikiPanel,wikiCategory,color2) =>{
    //wiki-races-elfs-nameRace.colorText
    if(wikiTypeID == 'create'){
        $(`.wiki-${wikiPage}-${wikiPanel}-${wikiCategory}.colorText`).css({color: color2});
    }
    else{
        $(`.wiki-show-${wikiPage}-${wikiPanel}-${wikiCategory}.colorText`).css({color: color2});
    }
}

//!сделай
clearDataWiki = (wikiPage,wikiPanel) =>{
    //localStorage.setItem(`Notes-${wikiPage}-${wikiPanel}`,JSON.stringify([]));
}

saveDataWiki = (wikiPage) =>{
    let wikiPageDataAll = {};
    let wikiPanelDataList;
    for(wikiPageID in wikiDataAll){
        if(wikiDataAll[wikiPageID][1] == wikiPage){
            wikiPanelDataList = wikiDataAll[wikiPageID][2]
        }
    }
    for(wikiPanelDataStr in wikiPanelDataList){
        let wikiPanelData = localStorage.getItem(`Wiki-${wikiPage}-${wikiPanelDataStr}`)
        wikiPageDataAll[`${wikiPanelDataStr}`] = wikiPanelData;
    }
    let blob = new File([JSON.stringify(wikiPageDataAll)], {
        type: "application/json",
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.setAttribute("download", `Wiki-${wikiPage}.json`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

loadDataWiki = (wikiPage) =>{
    let wikiPanelDataList;
    for(wikiPageID in wikiDataAll){
        if(wikiDataAll[wikiPageID][1] == wikiPage){
            wikiPanelDataList = Object.keys(wikiDataAll[wikiPageID][2]);
        }
    }
    let fileData = document.getElementById(`fileIn-${wikiPage}`).files[0];
    if(fileData == undefined){
		return;
	}
    if(fileData.name != `Wiki-${wikiPage}.json`){
        alert(`Закиньте нужный файл: Wiki-${wikiPage}.json`);
    }
    let Freader = new FileReader();
    Freader.readAsText(fileData);
    Freader.onload = () =>{
		let dataLoadAll = Freader.result;
        dataLoadAll.split(0);
        dataLoadAll.split(dataLoadAll.length);
        let dataObject = JSON.parse(dataLoadAll);
		for(data in dataObject){
            localStorage.setItem(`Wiki-${wikiPage}-${data}`, dataObject[data])
            updateViewWiki(wikiPage,data);
        }
	}
    /*

	let Freader = new FileReader();
	Freader.readAsText(fileData);
	Freader.onload = () =>{
		let dataLoadAll = Freader.result;
		dataLoad = dataLoadAll.split('*&$%*');
		let dataSortList = Object.keys(noteTypes);
		for(data in dataLoad){
			if(data != dataLoad.length-1){
				localStorage.setItem(`Notes-${dataSortList[data]}`,dataLoad[data]);
				updateView(dataSortList[data]);
			}
		}
	}

    */
}


let sortWikis = (wikiPage,wikiPanelList) =>{
    if(wikiPage == undefined){
        return;
    }
    for(wikiPanel in wikiPanelList){
        $(`.wikiList-${wikiPage}-${wikiPanel}`).sortable(
            {
                stop: () => {
                    getSortedWikis(wikiPage,wikiPanelList);
                }
            }
        );
    }
}

let getSortedWikis = (wikiPage,wikiPaneList) =>{
    let fullPanelList = wikiPaneList;
    for(wikiPanel in fullPanelList){
        let wikiIDs = $(`.wikiId-${wikiPage}-${wikiPanel}`);
        let wikiList = JSON.parse(localStorage.getItem(`Wiki-${wikiPage}-${wikiPanel}`));
        let newWikiList = [];
        for(wikiID in wikiIDs){
            if(wikiIDs[wikiID].innerText != undefined){
                let newWikiId = wikiIDs[wikiID].innerText;
                newWikiList.push(wikiList[newWikiId]);
            }
        }
        localStorage.setItem(`Wiki-${wikiPage}-${wikiPanel}`,JSON.stringify(newWikiList));
        updateViewWiki(wikiPage,wikiPanel);
    }
}

addWiki = (wikiPage,wikiPanel) =>{
    for(sortWiki in wikiDataAll){
        if(wikiDataAll[sortWiki][1]== wikiPage){
            let wikiCategs = wikiDataAll[sortWiki][3];
            let wikiObject = Object();
            for(wikiCateg in wikiCategs){
                let categsKey = wikiCateg;
                let categType = wikiCategs[wikiCateg][0];
                switch (categType) {
                    case "text":
                        let textVal = $(`.wiki-${wikiPage}-${wikiPanel}-${categsKey}`).html();
                        wikiObject[`${categsKey}`] = textVal;
                        $(`.wiki-${wikiPage}-${wikiPanel}-${categsKey}`).html("");
                        break;
                    case "color-text":
                        let textValColor = $(`.wiki-${wikiPage}-${wikiPanel}-${categsKey}`).html();
                        let textColor = $(`.wiki-create-${wikiPage}-${wikiPanel}-${categsKey}-color`).val();
                        wikiObject[`${categsKey}`] = textValColor;
                        wikiObject[`${categsKey}-color`] = textColor;
                        $(`.wiki-${wikiPage}-${wikiPanel}-${categsKey}`).html("");
                        break;
                    case "music":
                        let AudioVal = $(`.wiki-create-${wikiPage}-${wikiPanel}-${categsKey}-music`).val();
                        wikiObject[`${categsKey}`] = AudioVal;
                        break;
                    case "video":
                        let videoType = $(`.active.check-player-${wikiPanel}-${categsKey}`).val();
                        let videoLink = $(`.wiki-${wikiPage}-${wikiPanel}-${categsKey}`).val();
                        let localVideoLink = $(`.wiki-create-${wikiPage}-${wikiPanel}-${categsKey}-localVideo`).val();
                        wikiObject[`${categsKey}-type`] = videoType;
                        if(videoType == "youtube"){
                            wikiObject[`${categsKey}`] = videoLink;
                            $(`.wiki-${wikiPage}-${wikiPanel}-${categsKey}`).val("");
                            onchangeYoutubeWiki('create',`${wikiPage}`,`${wikiPanel}`,`${categsKey}`,' ');
                        }
                        if(videoType == "video"){
                            wikiObject[`${categsKey}`] = localVideoLink;
                        }
                        break;
                    case "picture":
                        let pictureVal = $(`.wiki-create-${wikiPage}-${wikiPanel}-${categsKey}-picture`).val();
                        wikiObject[`${categsKey}`] = pictureVal;
                        break;
                }
            }
            let wikiArr = JSON.parse(localStorage.getItem(`Wiki-${wikiPage}-${wikiPanel}`));
            wikiArr.push(wikiObject);
            localStorage.setItem(`Wiki-${wikiPage}-${wikiPanel}`,JSON.stringify(wikiArr));
            updateViewWiki(wikiPage,wikiPanel);
            break;
        }
    }
}

deleteWiki = (wikiPage,wikiPanel) =>{
    if($(`.wikiID-${wikiPanel}`).text() == ``){
        return;
    }
    let wikiArr = JSON.parse(localStorage.getItem(`Wiki-${wikiPage}-${wikiPanel}`));
    let wikiIdVal = $(`.wikiID-${wikiPanel}`).text();
    $(`.wikiID-${wikiPanel}`).text('');
    let wikiCategsObj = wikiArr[wikiIdVal]
    for(wikiCategs in wikiCategsObj){
        if(wikiCategs.endsWith(`-color`)){
            let wikiCategColor = wikiCategs.slice(0, -6);
            $(`.wiki-show-${wikiPage}-${wikiPanel}-${wikiCategColor}`).css({color : ''});
        }
        else{
            $(`.wiki-show-${wikiPage}-${wikiPanel}-${wikiCategs}`).html('');
        }
        if(wikiCategs.endsWith(`Ost`)){
            $(`.audio-${wikiPage}-${wikiPanel}-${wikiCategs}-show`).attr({src: ''});

        }
        if(wikiCategs.endsWith(`Video`) && !wikiCategs.endsWith(`NameVideo`)){
            $(`.wiki-${wikiPage}-${wikiPanel}-${wikiCategs}-show`).val('');
            onchangeYoutubeWiki('show',wikiPage,wikiPanel,wikiCategs,'');
        }
        if(wikiCategs.endsWith(`Picture`)){
            $(`.picture-${wikiPage}-${wikiPanel}-${wikiCategs}-show`).attr({src: ''});
        }
    }
    wikiArr.splice(wikiIdVal, 1);
    localStorage.setItem(`Wiki-${wikiPage}-${wikiPanel}`,JSON.stringify(wikiArr));
    updateViewWiki(wikiPage,wikiPanel);
}

showWiki = (wikiPage,wikiPanel,wikiID) =>{
    let wikiObjList = JSON.parse(localStorage.getItem(`Wiki-${wikiPage}-${wikiPanel}`));
	let wikiObj = wikiObjList[wikiID];
    for(wikiCategs in wikiObj){
        if(wikiCategs.endsWith(`-color`)){
            let wikiCategColor = wikiCategs.slice(0, -6);
            $(`.wiki-show-${wikiPage}-${wikiPanel}-${wikiCategColor}`).css({color :wikiObj[wikiCategs]});
            $(`.${wikiPage}-${wikiPanel}-${wikiCategColor}-prepicker-color`).text(`${wikiObj[wikiCategs]}`);
        }
        else{
            $(`.wiki-show-${wikiPage}-${wikiPanel}-${wikiCategs}`).html(wikiObj[wikiCategs]);
        }
        if(wikiCategs.endsWith(`Ost`)){
            onchangeAudioWiki('show',wikiPage,wikiPanel,wikiCategs,wikiObj[wikiCategs]);
            $(`.${wikiPage}-${wikiPanel}-${wikiCategs}-prepicker-ost`).text(`${wikiObj[wikiCategs]}`);
        }
        if(wikiCategs.endsWith(`Picture`)){
            $(`.picture-${wikiPage}-${wikiPanel}-${wikiCategs}-show`).attr({src: wikiObj[wikiCategs]});
            $(`.${wikiPage}-${wikiPanel}-${wikiCategs}-prepicker-picture`).text(`${wikiObj[wikiCategs]}`);
        }
        if(wikiCategs.endsWith(`Video`) && !wikiCategs.endsWith(`NameVideo`)){
            if(wikiObj[`${wikiCategs}-type`] == "youtube"){

                $(`.${wikiPanel}-${wikiPage}-local`).addClass('d-none');
                $(`.${wikiPanel}-${wikiPage}-youtube`).removeClass('d-none');

                $(`.wiki-${wikiPage}-${wikiPanel}-${wikiCategs}-show`).val(wikiObj[wikiCategs]);
                onchangeYoutubeWiki('show',wikiPage,wikiPanel,wikiCategs,wikiObj[wikiCategs]);
                onchangeLocalVideoWiki('show',wikiPage,wikiPanel,wikiCategs,'');
            }
            if(wikiObj[`${wikiCategs}-type`] == "video"){

                $(`.${wikiPanel}-${wikiPage}-local`).removeClass('d-none');
                $(`.${wikiPanel}-${wikiPage}-youtube`).addClass('d-none');

                onchangeLocalVideoWiki('show',wikiPage,wikiPanel,wikiCategs,wikiObj[wikiCategs]);
                $(`.wiki-${wikiPage}-${wikiPanel}-${wikiCategs}-show`).val('');
                onchangeYoutubeWiki('show',wikiPage,wikiPanel,wikiCategs,'');
                $(`.${wikiPage}-${wikiPanel}-${wikiCategs}-prepicker-videoLocal`).text(`${wikiObj[wikiCategs]}`);
            }
        }
    }

	$(`.wikiID-${wikiPanel}`).text(wikiID);
	if($(`.wikiShowList-${wikiPanel}`).is(':hidden')){
		$(`.wikiShowList-${wikiPanel}`).slideToggle();
		$(`.wikiCreateList-${wikiPanel}`).hide();
	}
}

swapWiki = (wikiPage,wikiPanel,wikiID,path) =>{
    let wikiArr = JSON.parse(localStorage.getItem(`Wiki-${wikiPage}-${wikiPanel}`));
	if(wikiArr.length <= 1){
		return;
	}
    let setWikiId = wikiArr[wikiID];
    switch (path) {
        case 'left':
            if(wikiArr[wikiID-1] != undefined){
				wikiArr[wikiID] = wikiArr[wikiID-1]
				wikiArr[wikiID-1] = setWikiId;
			}
            break;
        case 'right':
            if (wikiArr[wikiID+1] != undefined) {
				wikiArr[wikiID] = wikiArr[wikiID+1]
				wikiArr[wikiID+1] = setWikiId;
			}
            break;
    }
    localStorage.setItem(`Wiki-${wikiPage}-${wikiPanel}`,JSON.stringify(wikiArr));
	updateViewWiki(wikiPage,wikiPanel);
}

editWiki = (wikiPage,wikiPanel) =>{
    let wikiCategsLocal;
    for(sortWiki in wikiDataAll){
        if(wikiDataAll[sortWiki][1]== wikiPage){
            wikiCategsLocal = wikiDataAll[sortWiki][3];
            break;
        }
    }
    let wikiIDval = $(`.wikiID-${wikiPanel}`).text();
	if(wikiIDval == ''){
		return;
	}
	let isEdit = $(`.isEdit-${wikiPanel}`).text();
	switch (isEdit) {
		case "0":
			$(`.show-edit-${wikiPage}-${wikiPanel}`).removeClass('d-none');
            $(`.show-unedit-${wikiPage}-${wikiPanel}`).addClass('d-none');
            $('audio').each(function(){
                this.pause(); 
                this.currentTime = 0; 
            }); 
			$(`.editButton-${wikiPanel}`).addClass('used');
			for(keyCateg in wikiCategsLocal){
                $(`.wiki-show-${wikiPage}-${wikiPanel}-${keyCateg}`).attr({contenteditable: "true"});
            }
			$(`.isEdit-${wikiPanel}`).text("1");
			break;
	
		case "1":
            $(`.show-edit-${wikiPage}-${wikiPanel}`).addClass('d-none');
            $(`.show-unedit-${wikiPage}-${wikiPanel}`).removeClass('d-none');
            $('audio').each(function(){
                this.pause(); 
                this.currentTime = 0; 
            }); 
			$(`.editButton-${wikiPanel}`).removeClass('used');
			for(keyCateg in wikiCategsLocal){
                $(`.wiki-show-${wikiPage}-${wikiPanel}-${keyCateg}`).attr({contenteditable: "false"});
            }
			$(`.isEdit-${wikiPanel}`).text("0");
			break;
	}
}

saveWiki = (wikiPage,wikiPanel) =>{
    if($(`.wikiID-${wikiPanel}`).text() == ``){
        return;
    }
    for(sortWiki in wikiDataAll){
        if(wikiDataAll[sortWiki][1]== wikiPage){
            let wikiCategs = wikiDataAll[sortWiki][3];
            let wikiObject = Object();
            for(wikiCateg in wikiCategs){
                let categsKey = wikiCateg;
                let categType = wikiCategs[wikiCateg][0];
                switch (categType) {
                    case "text":
                        //wiki-show-chars-elfs-nameChar
                        let textVal = $(`.wiki-show-${wikiPage}-${wikiPanel}-${categsKey}`).html();
                        wikiObject[`${categsKey}`] = textVal;
                        break;
                    case "color-text":
                        let textValColor = $(`.wiki-show-${wikiPage}-${wikiPanel}-${categsKey}`).html();
                        let textColor = $(`.wiki-show-${wikiPage}-${wikiPanel}-${categsKey}-color`).val();
                        let backupColor = $(`.${wikiPage}-${wikiPanel}-${categsKey}-prepicker-color`).text();
                        wikiObject[`${categsKey}`] = textValColor;
                        if(textColor == 'none'){
                            wikiObject[`${categsKey}-color`] = backupColor;
                        }
                        else{
                            wikiObject[`${categsKey}-color`] = textColor;
                        }
                        break;
                    case "music":
                        let AudioVal = $(`.wiki-show-${wikiPage}-${wikiPanel}-${categsKey}-music`).val();
                        let backupAudio = $(`.${wikiPage}-${wikiPanel}-${categsKey}-prepicker-ost`).text();
                        if(AudioVal == 'none'){
                            wikiObject[`${categsKey}`] = backupAudio;
                        }
                        else{
                            wikiObject[`${categsKey}`] = AudioVal;
                        }
                        break;
                    case "video":
                        let videoType = $(`.active.check-player-${wikiPanel}-${categsKey}`).val();
                        let videoLink = $(`.wiki-${wikiPage}-${wikiPanel}-${categsKey}-show`).val();
                        let videoLinkLocal = $(`.wiki-show-${wikiPage}-${wikiPanel}-${categsKey}-localVideo`).val();
                        let videoLinkLocalBackup = $(`.${wikiPage}-${wikiPanel}-${categsKey}-prepicker-videoLocal`).text();
                        console.log(videoLinkLocal);
                        wikiObject[`${categsKey}-type`] = videoType;
                        if(videoType == "youtube"){
                            wikiObject[`${categsKey}`] = videoLink;
                        }
                        if(videoType == "video"){
                            if(videoLinkLocal == 'none'){
                                wikiObject[`${categsKey}`] = videoLinkLocalBackup;
                            }
                            else{
                                wikiObject[`${categsKey}`] = videoLinkLocal;
                            }
                        }
                        break;
                    case "picture":
                        let pictureVal = $(`.wiki-show-${wikiPage}-${wikiPanel}-${categsKey}-picture`).val();
                        let pictureValBackup = $(`.${wikiPage}-${wikiPanel}-${categsKey}-prepicker-picture`).text();
                        if(pictureVal == 'none'){
                            wikiObject[`${categsKey}`] = pictureValBackup;
                        }
                        else{
                            wikiObject[`${categsKey}`] = pictureVal;
                        }
                        break;
                }
            }
            let wikiArr = JSON.parse(localStorage.getItem(`Wiki-${wikiPage}-${wikiPanel}`));
            let wikiIdVal = $(`.wikiID-${wikiPanel}`).text()
            wikiArr[wikiIdVal] = wikiObject;
            localStorage.setItem(`Wiki-${wikiPage}-${wikiPanel}`,JSON.stringify(wikiArr));
            updateViewWiki(wikiPage,wikiPanel);
            showWiki(wikiPage,wikiPanel,wikiIdVal);
            break;
        }
    }
}

switchWikiShow = (typeWiki,wikiTypeId) =>{
    switch (typeWiki) {
        case "show":
            $(`.wikiShowList-${wikiTypeId}`).slideToggle();
            if($(`.wikiCreateList-${wikiTypeId}`).is(':visible')){
                $(`.wikiCreateList-${wikiTypeId}`).hide();
            }
            break;
        case "create":
            $(`.wikiCreateList-${wikiTypeId}`).slideToggle();
            if($(`.wikiShowList-${wikiTypeId}`).is(':visible')){
                $(`.wikiShowList-${wikiTypeId}`).hide();
            }
            break;
    }
}
//! Компоненты

// ! wikiDataAll = [типСтраницы, тип(ключ), массив(ист/рас), массив[созд], строка]
//! пример [0, moments, storyAll, momentsArr, Моменты Видео]

//? типы категорий

let createColorWiki = (wikiTypeID,wikiPage,wikiPanel,wikiCategory,wikiCategStr) =>{
    let colorList = [];
    for(color in Colors){
        let colorVal = `
            <option class="bg-${ThemeSet.SecondBackground} bgSecond" value="${color}" style="color:${color};">${Colors[color]}</option>
        `;
        colorList.push(colorVal);
    }
    let prepickerColor;
    if(wikiTypeID == 'show'){
        prepickerColor = `<p class="d-none ${wikiPage}-${wikiPanel}-${wikiCategory}-prepicker-color"></p>`;
    }
    let colorPicker = `
		<select onchange="wikiChangeColorText('${wikiTypeID}','${wikiPage}','${wikiPanel}','${wikiCategory}',this.options[this.selectedIndex].value)" class="wiki-${wikiTypeID}-${wikiPage}-${wikiPanel}-${wikiCategory}-color colorSelect link-dark bg-${ThemeSet.SecondBackground} bgSecond">
			<option class="bg-${ThemeSet.SecondBackground} bgSecond" selected value="none" style="color: white;"> Выберите цвет (${wikiCategStr})</option>
			${colorList.join('')}
		</select>
        ${prepickerColor}
	`;
    return colorPicker;
}

let createAudioList = (wikiTypeID,wikiPage,wikiPanel,wikiCategory,wikiCategStr) =>{
    let musicListFull = [];
    for(musicID in SortedMusic[3]){
        let MusicPlay = SortedMusic[3][musicID];
        if(MusicPlay.type2 == undefined){
            continue;
        }
        let path = `./assets/music/${MusicPlay.type2}/${MusicPlay.mp3}`;
        let musicOption = `
            <option value="${path}" class="bg-${ThemeSet.BodyBackground} link-${ThemeSet.Primary} linkPrimary">${MusicPlay.name}</option>
        `;
        musicListFull.push(musicOption);
    }

    let prepickerMusic;
    if(wikiTypeID == 'show'){
        prepickerMusic = `<p class="d-none ${wikiPage}-${wikiPanel}-${wikiCategory}-prepicker-ost"></p>`;
    }

    let musicPicker = `
        <select onchange="onchangeAudioWiki('${wikiTypeID}','${wikiPage}','${wikiPanel}','${wikiCategory}',this.options[this.selectedIndex].value)" class="wiki-${wikiTypeID}-${wikiPage}-${wikiPanel}-${wikiCategory}-music colorSelect link-dark bgSecond bg-${ThemeSet.SecondBackground}">
            <option class="bg-${ThemeSet.BodyBackground} bgBack linkPrimary link-${ThemeSet.Primary}" selected value="none"> Выберите ${wikiCategStr}</option>
            ${musicListFull.join('')}
        </select>
        ${prepickerMusic}
    `;

    let musicPickerFull = `
        ${musicPicker}
        <audio class="audio-${wikiPage}-${wikiPanel}-${wikiCategory}-create musicSelect" src="" controls></audio>
    `;
    return musicPickerFull;
}

let createVideoListLocal = (wikiTypeID,wikiPage,wikiPanel,wikiCategory,wikiCategStr) =>{
    let VideoList = [];
    for(videoID in VideoDataAll){
        let video = VideoDataAll[videoID];
        let videoOption = `
        <option value="${video.path}" class="bg-${ThemeSet.BodyBackground} bgBody linkPrimary link-${ThemeSet.Primary}">${video.name}</option>
        `;
        VideoList.push(videoOption);
    }

    let prepickerVideoLocal;
    if(wikiTypeID == 'show'){
        prepickerVideoLocal = `<p class="d-none ${wikiPage}-${wikiPanel}-${wikiCategory}-prepicker-videoLocal"></p>`;
    }

    let VideoListFull = `
        <select onclick="onchangeLocalVideoWiki('${wikiTypeID}','${wikiPage}','${wikiPanel}','${wikiCategory}',this.options[this.selectedIndex].value)" class="wiki-${wikiTypeID}-${wikiPage}-${wikiPanel}-${wikiCategory}-localVideo colorSelect link-dark bgSecond bg-${ThemeSet.SecondBackground}">
            <option class="bg-${ThemeSet.BodyBackground} bgBack linkPrimary link-${ThemeSet.Primary}" selected value="none"> Выберите ${wikiCategStr}</option>
            ${VideoList.join('')}
        </select>
        ${prepickerVideoLocal}
    `;
    return VideoListFull;
}

let createVideoList = (wikiTypeID,wikiPage,wikiPanel,wikiCategory) =>{
    let wikiTypeIDstr = ``;
    if(wikiTypeID == `show`){
        wikiTypeIDstr = `-${wikiTypeID}`;
    }
    let videoPlayerChoseMenu = `
        <div class="videoRadioBtns row radioSelect">
            <button onclick="checkRadioVideo('${wikiPanel}','${wikiCategory}',$(this));" class=" col-md-6 col-sm-12 btn pill-outline-${ThemeSet.Btn} pillBtn active check-player-${wikiPanel}-${wikiCategory}" value="youtube">
                <span class="h3">Youtube</span>
            </button>
            <button onclick="checkRadioVideo('${wikiPanel}','${wikiCategory}',$(this));" class=" col-md-6 col-sm-12 btn pill-outline-${ThemeSet.Btn} pillBtn check-player-${wikiPanel}-${wikiCategory}" value="video">
                <span class="h3">Video</span>
            </button>
            <p class="d-none videoPlayer-${wikiPanel}">youtube</p>
        </div>
    `;

    let videoYoutube = `
        <div class="${wikiPanel}-${wikiPage}-youtube">
            <input type="text" onchange="onchangeYoutubeWiki('${wikiTypeID}','${wikiPage}','${wikiPanel}','${wikiCategory}',$(this).val());" placeholder="Ссылка ютуб" 
            class="h4 wiki-${wikiPage}-${wikiPanel}-${wikiCategory}${wikiTypeIDstr} border border-${ThemeSet.Primary} borderPrimary bgBody linkPrimary bg-${ThemeSet.BodyBackground} link-${ThemeSet.Primary} taskView taskArea">
            <iframe class="youtube-${wikiPage}-${wikiPanel}-${wikiCategory}-${wikiTypeID} videoSelect" title="YouTube video player" allowfullscreen="" width="500" height="350" frameborder="0"></iframe>
        </div>
    `;

    let videoLocal = `
        <div class="${wikiPanel}-${wikiPage}-local d-none">
            ${createVideoListLocal(wikiTypeID,wikiPage,wikiPanel,wikiCategory,'видео')}
            <video class="video-${wikiPage}-${wikiPanel}-${wikiCategory}-${wikiTypeID} videoSelect" controls="controls" src="">
        </div>
    `;

    let fullVideo = `
        ${videoPlayerChoseMenu}
        ${videoYoutube}
        ${videoLocal}
    `;
    return fullVideo;
}

let createPictureList = (wikiTypeID,wikiPage,wikiPanel,wikiCategory,wikiCategStr) =>{
    let pictureListFull = [];
    for(pictureID in allPicturesData){
        let picturePic = allPicturesData[pictureID];
        if(picturePic.type == wikiPage){
            let pictureOption = `
                <option value="${picturePic.png}" class="bg-${ThemeSet.BodyBackground} bgBody linkPrimary link-${ThemeSet.Primary}">${picturePic.name}</option>
            `;
            pictureListFull.push(pictureOption);
        }
    }

    let prepickerPicture;
    if(wikiTypeID == 'show'){
        prepickerPicture = `<p class="d-none ${wikiPage}-${wikiPanel}-${wikiCategory}-prepicker-picture"></p>`;
    }

    let picturePicker = `
        <select onchange="onchangePictureWiki('${wikiTypeID}','${wikiPage}','${wikiPanel}','${wikiCategory}',this.options[this.selectedIndex].value)" class="wiki-${wikiTypeID}-${wikiPage}-${wikiPanel}-${wikiCategory}-picture colorSelect link-dark bgSecond bg-${ThemeSet.SecondBackground}">
            <option class="bg-${ThemeSet.BodyBackground} bgBody link-${ThemeSet.Primary} linkPrimary" selected value="none"> Выберите ${wikiCategStr}</option>
            ${pictureListFull.join('')}
        </select>
        ${prepickerPicture}
    `;
    return picturePicker;
}


//? главное меню вики
let createWikiMenu = () =>{

    let wikiMenuList = [];
    for(wikiList in wikiDataAll){

        let wikiPageData = wikiDataAll[wikiList];
        let wikiPageBtn = `
            <button onclick="createWikiTab('${wikiList}');"
            class="btn btn-${ThemeSet.Btn} btnBtn col-md-3 col-sm-12 mx-2 menuNote">
                <h2>${wikiPageData[4]}</h2>
            </button>
        `;
        wikiMenuList.push(wikiPageBtn);
    }

    let wikiMenu = $(`
        <div class="row wikiFullMenu">
            <h1 class="link-${ThemeSet.Primary} linkPrimary mainListName">Вики</h1>
            ${wikiMenuList.join('')}
        </div>
    `);
    wikiMenu.appendTo('.app');
}

// ! wikiDataAll = [типСтраницы, тип(ключ), массив(ист/рас), массив[созд], строка]
//! пример [0, moments, storyAll, momentsArr, Моменты Видео]
//! [,wikiPage[1],wikiKey,wikiPage[3],,]


let whichWikiPageOpen = () =>{
    if(localStorage.getItem("PageWiki") == undefined){
        localStorage.setItem("PageWiki","menu");
    }
    if(localStorage.getItem("PageWiki") == "menu"){
        createWikiMenu();
    }
    else{
        let wikiPageOpen = localStorage.getItem("PageWiki");
        createWikiTab(wikiPageOpen);
    }

    //сброс страницы
    $('.page-changer').click(() =>{
        localStorage.setItem("PageWiki","menu");
    });
}

//? табы и панели вики
createWikiTab = (wikiID) =>{
    localStorage.setItem("PageWiki",wikiID);
    //убираем меню
    $('.app').children().remove();
    if(wikiID == "menu"){
        createWikiMenu();
        return;
    }

    //задаём стандарт
    let wikiPage = wikiDataAll[wikiID];
    //******* */
    //console.log(wikiPage);
    let pillPanelsList = [];
	let tablePanelList = [];
    
    for(wikiArr in wikiPage[2]){
        //тут задавай все стандарты ввода панелей
        let wikiKey = wikiArr;
        let wikiStr = wikiPage[2][wikiArr];
        let pillPanels = `
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-${wikiKey}-tab" data-bs-toggle="pill" data-bs-target="#pills-${wikiKey}" type="button" role="tab" aria-controls="pills-${wikiKey}" aria-selected="false">
                    <p class="btn pill-outline-${ThemeSet.Btn} pillBtn">${wikiStr}</p>
                </button>
            </li>
        `;
        pillPanelsList.push(pillPanels);


		let createWikiMenu = `
			<div class="noteMenu row">
				<button class="btn btn-${ThemeSet.Btn} btnBtn col-md-5 col-sm-12 menuNote wiki-create-menu" onclick="switchWikiShow('create','${wikiKey}')"><h2>Создать ${wikiPage[4]} ${wikiStr}</h2></button>
				<button class="btn btn-${ThemeSet.Btn} btnBtn col-md-5 col-sm-12 menuNote wiki-show-menu" onclick="switchWikiShow('show','${wikiKey}')"><h2>Посмотреть ${wikiPage[4]} ${wikiStr}</h2></button>
			</div>
		`;

        //создаёт критерии для менюшек
        let criteryShowList = [];
        let criteryCreateList = [];
        for(critery in wikiPage[3]){
            let criteryKey = critery;
            let criteryType = wikiPage[3][critery][0];
            let criteryStr = wikiPage[3][critery][1];
            let criteryShow;
            let criteryCreate;
            switch (criteryType) {
                case "text":
                    criteryShow = `
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${criteryStr}</p>
                            <p placeholder="Написать что-то..." class="h4 wiki-show-${wikiPage[1]}-${wikiKey}-${criteryKey} border border-${ThemeSet.Primary} borderPrimary bgBody link-${ThemeSet.Primary} linkPrimary bg-${ThemeSet.BodyBackground} taskShow taskView" contenteditable="false"></p>
                        </li>
                    `;
                    criteryCreate = `
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${criteryStr}</p>
                            <p placeholder="Написать что-то..." class="h4 wiki-${wikiPage[1]}-${wikiKey}-${criteryKey} border border-${ThemeSet.Primary} borderPrimary bgBody bg-${ThemeSet.BodyBackground} link-${ThemeSet.Primary} linkPrimary taskView taskArea" contenteditable="true"></p>
                        </li>
                    `;
                    break;
                case "color-text":
                    criteryShow = `
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${criteryStr}</p>
                            <p placeholder="Написать что-то..." class="h4 wiki-show-${wikiPage[1]}-${wikiKey}-${criteryKey} colorText border border-${ThemeSet.Primary} borderPrimary bgBody bg-${ThemeSet.BodyBackground} taskShow taskView" contenteditable="false"></p>
                            <div class="show-edit-${wikiPage[1]}-${wikiKey} d-none">
                                ${createColorWiki("show",wikiPage[1],wikiKey,criteryKey,criteryStr)}
                            </div>
                        </li>
                    `;
                    criteryCreate = `
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${criteryStr}</p>
                            <p placeholder="Написать что-то..." class="h4 wiki-${wikiPage[1]}-${wikiKey}-${criteryKey} colorText border border-${ThemeSet.Primary} borderPrimary bgBody bg-${ThemeSet.BodyBackground} taskView taskArea" contenteditable="true"></p>
                            ${createColorWiki("create",wikiPage[1],wikiKey,criteryKey,criteryStr)}
                        </li>
                    `;
                    break;
                case "video":
                    criteryShow = `
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${criteryStr}</p>
                            ${createVideoList("show",wikiPage[1],wikiKey,criteryKey,criteryStr)}
                        </li>
                    `;
                    criteryCreate = `
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${criteryStr}</p>
                            ${createVideoList("create",wikiPage[1],wikiKey,criteryKey,criteryStr)}
                        </li>
                    `;
                    break;
                case "music":
                    criteryShow = `
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${criteryStr}</p>
                            <p class="h4 link-${ThemeSet.Primary} linkPrimary taskNaming musicOstName-${wikiKey}-show"></p>
                            <div class="show-unedit-${wikiPage[1]}-${wikiKey}">
                                <audio class="audio-${wikiPage[1]}-${wikiKey}-${criteryKey}-show musicSelect" src="" controls></audio>
                            </div>
                            <div class="show-edit-${wikiPage[1]}-${wikiKey} d-none">
                                ${createAudioList("show",wikiPage[1],wikiKey,criteryKey,criteryStr)}
                            </div>
                        </li>
                    `;
                    criteryCreate = `
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${criteryStr}</p>
                            <p class="h4 link-${ThemeSet.Primary} linkPrimary taskNaming musicOstName-${wikiKey}-create"></p>
                            ${createAudioList("create",wikiPage[1],wikiKey,criteryKey,criteryStr)}
                        </li>
                    `;
                    break;
                case "picture":
                    criteryShow = `
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${criteryStr}</p>
                            <div class="show-unedit-${wikiPage[1]}-${wikiKey}">
                                <img class="picture-${wikiPage[1]}-${wikiKey}-${criteryKey}-show pictureSelect" src="">
                            </div>
                            <div class="show-edit-${wikiPage[1]}-${wikiKey} d-none">
                                ${createPictureList("show",wikiPage[1],wikiKey,criteryKey,criteryStr)}
                                <img class="picture-${wikiPage[1]}-${wikiKey}-${criteryKey}-show pictureSelect" src="">
                            </div>
                        </li>
                    `;
                    criteryCreate = `
                        <li>
                            <p class="h3 link-${ThemeSet.Primary} linkPrimary taskNaming">${criteryStr}</p>
                            ${createPictureList("create",wikiPage[1],wikiKey,criteryKey,criteryStr)}
                            <img class="picture-${wikiPage[1]}-${wikiKey}-${criteryKey} pictureSelect" src="">
                        </li>
                    `;
            }
            criteryShowList.push(criteryShow);
            criteryCreateList.push(criteryCreate);
        }

		let wikiShow = `
			<ul class="noteShowList wikiShowList-${wikiKey} border border-${ThemeSet.Primary} borderPrimary" style="display: none;">
                <li class="menuBtnNote">
                    <button onclick="saveWiki('${wikiPage[1]}','${wikiKey}')" class="btn btnOutlineBtn btn-outline-${ThemeSet.Btn} linkPrimary link-${ThemeSet.Primary} saveBtn-${wikiKey}"><i class="fa fa-save" aria-hidden="true"></i></button>
                    <button onclick="editWiki('${wikiPage[1]}','${wikiKey}')" class="btn btnOutlineBtn btn-outline-${ThemeSet.Btn} linkPrimary link-${ThemeSet.Primary} editButton-${wikiKey}"><i class="fa fa-edit" aria-hidden="true"></i></button>
                    <button onclick="deleteWiki('${wikiPage[1]}','${wikiKey}')" class="btn btnOutlineBtn btn-outline-${ThemeSet.Btn} linkPrimary link-${ThemeSet.Primary}"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </li>
                ${criteryShowList.join('')}
                <li class="d-none wikiID-${wikiKey}"></li>
                <li class="d-none isEdit-${wikiKey}">0</li>
		    </ul>
		`;

		let wikiCreate = `
			<ul class="noteCreateList wikiCreateList-${wikiKey} border border-${ThemeSet.Primary} borderPrimary" style="display: none;">
				${criteryCreateList.join('')}
				<li class="menuBtnNote">
					<button class="btn btn-${ThemeSet.Btn} btnBtn" onclick="addWiki('${wikiPage[1]}','${wikiKey}')"><h2 class="taskNaming">Добавить ${wikiPage[4]}</h2></button>
				</li>

			</ul>
		`;

        //фулл одна панель таблицы
		let tabPanel = `
			<div class="tab-pane fade" id="pills-${wikiKey}" role="tabpanel" aria-labelledby="pills-${wikiKey}-tab">
				<h3 class="link-${ThemeSet.Primary} linkPrimary mainListName">${wikiPage[4]} ${wikiStr}</h3>
				<div class="noteMenuFull container bg-${ThemeSet.Background} bgBack">
					<div class="row">
						${createWikiMenu}
						<div class="noteShow col-12">
							${wikiShow}
							${wikiCreate}
						</div>
					</div>
				</div>
				<div class="noteListPad">
					<h3 class="link-${ThemeSet.Primary} linkPrimary mainListName">Список ${wikiPage[4]} ${wikiStr}</h3>
					<ul class="row noteList wikiList-${wikiPage[1]}-${wikiKey}">
			        </ul>
				</div>
			</div>
		`;
		tablePanelList.push(tabPanel);
        setTimeout(() => {
            updateViewWiki(wikiPage[1],wikiKey);
        }, 100);
    }


    //верхние кнопки меню вики
    let dropDownWikiPages = [];
    for(wikiPageId in wikiDataAll){
        let wikiK = wikiPageId;
        let wikiV = wikiDataAll[wikiPageId][4];
        let wikiDropDown = `
            <option value="${wikiK}" class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">${wikiV}</option>   
        `;
        dropDownWikiPages.push(wikiDropDown);
    }

    
    let wikiUPBtns = `
        <div class="row noteMenu">
            <select onchange="createWikiTab(this.options[this.selectedIndex].value)" class="btn btn-${ThemeSet.Btn} btnBtn menuNote menuNoteSelect col-md-3 col-sm-12 mx-2 h2">
                <option value="${wikiID}" selected class="link-${ThemeSet.Primary} linkPrimary bgBack bg-${ThemeSet.Background}" href="#">${wikiPage[4]}</option> 
                ${dropDownWikiPages.join('')}
            </select>
            <button onclick="createWikiTab('menu');" class="btn btn-${ThemeSet.Btn} btnBtn col-md-3 col-sm-12 mx-2 menuNote">
                <h2>Меню</h2>
            </button>
        </div>
    `;

    //табличные панели (начало)
    let wikiPillPanelsMenu = $(`
        ${wikiUPBtns}
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                <p class="btn pill-outline-${ThemeSet.Btn} pillBtn">Главная</p>
            </button>
            </li>
            ${pillPanelsList.join('')}
        </ul>
    `);
	wikiPillPanelsMenu.appendTo('.app');

    //файловые панели
    let fileDataMenuWiki = `
		<div class="border noteMenu row border-${ThemeSet.Primary} borderPrimary">
			<button onclick="saveDataWiki('${wikiPage[1]}')" class="btn btn-${ThemeSet.Btn} btnBtn m-2 col-md-3 col-sm-12"><h4>Скачать данные <i class="fa fa-download" aria-hidden="true"></i></h4></button>
			<button onclick="loadDataWiki('${wikiPage[1]}')" class="btn btn-${ThemeSet.Btn} btnBtn m-2 col-md-3 col-sm-12"><h4>Загрузить данные <i class="fa fa-upload" aria-hidden="true"></i></h4></button>
			<form class="m-2 col-md-3 col-sm-12">
				<label class="input-file">
					<input id="fileIn-${wikiPage[1]}" type="file" name="file">
					<span class="fileName btn btn-${ThemeSet.Btn} btnBtn h4">Выберите файл (Wiki-${wikiPage[1]}.json)</span>
				</label>
			</form>
		</div>
	`;

    //табличные панели (финал)
	let wikiTabPanelMenu = $(`
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <h3 class="link-${ThemeSet.Primary} linkPrimary mainListName">Главная ${wikiPage[4]}</h3>
                ${fileDataMenuWiki}
                <div class="row microService">
                </div>
            </div>
            ${tablePanelList.join('')}
        </div>
    `);
    wikiTabPanelMenu.appendTo('.app');

    $(`#fileIn-${wikiPage[1]}`).on('change', () =>{
        let file = document.getElementById(`fileIn-${wikiPage[1]}`).files[0]
        $('.fileName').text(file.name);
    });
    sortWikis(wikiPage[1],wikiPage[2]);

    setTimeout(() => {
        MicroService("вики");
    }, 1);
}

//! список вики
let updateViewWiki = (wikiPage,wikiPanel) =>{
    $(`.wikiList-${wikiPage}-${wikiPanel}`).children().remove();

    let wikisListArr = JSON.parse(localStorage.getItem(`Wiki-${wikiPage}-${wikiPanel}`));
    let wikisList = [];
    for (wikis in wikisListArr){
        let wikiVals = Object.values(wikisListArr[wikis]);
        let wikiKeys = Object.keys(wikisListArr[wikis]);
        let wikiNameColor;
        if(wikiKeys[1] == `${wikiKeys[0]}-color`){
            wikiNameColor = wikiVals[1];
        }
        let Wiki = `
            <li href="#" class="card noteCard-${wikiPage}-${wikiPanel} bg-${ThemeSet.SecondBackground} bgSecond borderPrimary border-${ThemeSet.Primary} col-lg-3 col-md-6 col-sm-12 mx-1 my-3 text-decoration-none">
                <div class="card-body noteCard">
                    <div class="d-none wikiId-${wikiPage}-${wikiPanel}">${wikis}</div>
                    <button onclick="swapWiki('${wikiPage}','${wikiPanel}',${wikis},'left')" class="btn btn-${ThemeSet.Btn} btnBtn"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                    <h4 class="card-text taskName noteNameIcon link-${ThemeSet.Primary}" style="color: ${wikiNameColor} !important;" onclick="showWiki('${wikiPage}','${wikiPanel}',${wikis})">
                        ${wikiVals[0]}
                    </h4>
                    <button onclick="swapWiki('${wikiPage}','${wikiPanel}',${wikis},'right')" class="btn btn-${ThemeSet.Btn} btnBtn"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                </div>
            </li>
        `;
        wikisList.push(Wiki);
    }
    let fullListWiki = $(`
        ${wikisList.join('')}
    `);
    fullListWiki.appendTo(`.wikiList-${wikiPage}-${wikiPanel}`);
}

FullWiki = () =>{
    whichWikiPageOpen();
}

});