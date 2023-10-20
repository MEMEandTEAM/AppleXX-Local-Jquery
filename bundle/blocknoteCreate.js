$(() => {

    //todo noteTypesDataAll дата

	let createColor = (noteTypeId,nameType,strType,showType) =>{
		let colorList = [];
		for(color in Colors){
			let colorVal = `
				<option class="bg-${ThemeSet.SecondBackground}" value="${color}" style="color:${color};">${Colors[color]}</option>
			`;
			colorList.push(colorVal);
		}
		let colorPicker = `
			<select class="task-${nameType}-${noteTypeId}-color-${showType} colorSelect link-dark bg-${ThemeSet.SecondBackground} style="color: white;">
				<option class="bg-${ThemeSet.SecondBackground}" selected value="white" style="color: white;"> Выберите цвет (${strType})</option>
				${colorList.join('')}
			</select>
		`;
		return colorPicker;
	}

	//! реализуй
	clearData = (noteTypeId) =>{
		localStorage.setItem(`Notes-${noteTypeId}`,JSON.stringify([]));
	}

    saveData = () =>{
		let noteDataAll = [];
		for(noteType in noteTypes){
			let noteData = (localStorage.getItem(`Notes-${noteType}`));
			noteDataAll.push(noteData,'*&$%*');
		}

		let blob = new Blob(noteDataAll, {
			type: "application/json"
		});

		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.setAttribute("download", `"MyNotes.json"`);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
    }

	loadData = () =>{
		let fileData = document.getElementById('fileIn').files[0];
		if(fileData == undefined){
			return;
		}
		if(fileData.name != `MyNotes.json`){
			alert("Закиньте нужный файл");
		}
		let Freader = new FileReader();
		Freader.readAsText(fileData);
		Freader.onload = () =>{
			let dataLoadAll = Freader.result;
			let dataLoad = dataLoadAll.split('*&$%*');
			let dataSortList = Object.keys(noteTypes);
			for(data in dataLoad){
				if(data != dataLoad.length-1){
					localStorage.setItem(`Notes-${dataSortList[data]}`,dataLoad[data]);
					updateView(dataSortList[data]);
				}
			}
		}
	}

	let getSortedNotes = () =>{
		for(type in noteTypes){
			let noteIDs = $(`.noteId-${type}`);
			let noteList = JSON.parse(localStorage.getItem(`Notes-${type}`));
			let newNoteList = [];
			for(Id in noteIDs){
				if(noteIDs[Id].innerText != undefined){
					let newId = noteIDs[Id].innerText;
					newNoteList.push(noteList[newId])
				}
			}
			localStorage.setItem(`Notes-${type}`,JSON.stringify(newNoteList));
		}
	}

    let sortNotes = () =>{
		for(type in noteTypes){
			$(`.noteList-${type}`).sortable(
				{
					stop: () => {
						getSortedNotes();
					}
				}
			);
		}
    }

    addNote = (notetypeId) =>{
        let noteArray = JSON.parse(localStorage.getItem("Notes-"+notetypeId));
		let noteNameVal = $(`.task-name-${notetypeId}`).html();
		let noteColorVal = $(`.task-name-${notetypeId}-color-create`).val();
		let noteMainVal = $(`.task-main-${notetypeId}`).html();
		let noteOtherVal = $(`.task-other-${notetypeId}`).html();
		noteArray.push({
			nameNote: noteNameVal,
			mainNote: noteMainVal,
			otherNote: noteOtherVal,
			noteColor: noteColorVal,
		});
		localStorage.setItem("Notes-"+notetypeId, JSON.stringify(noteArray));
		updateView(notetypeId);
		$(`.task-name-${notetypeId}`).html("");
		$(`.task-main-${notetypeId}`).html("");
		$(`.task-other-${notetypeId}`).html("");
    }

    deleteNote = (notetypeId) =>{
		let noteIDval = $(`.noteID-${notetypeId}`).text();
		if(noteIDval == ''){
			return;
		}
		let noteArray = JSON.parse(localStorage.getItem("Notes-"+notetypeId));
		noteArray.splice(noteIDval, 1);
		localStorage.setItem("Notes-"+notetypeId, JSON.stringify(noteArray));
		updateView(notetypeId);
		$(`.task-name-show-${notetypeId}`).text('');
		$(`.task-main-show-${notetypeId}`).text('');
		$(`.task-other-show-${notetypeId}`).text('');
		$(`.noteID-${notetypeId}`).text('');
    }

	showNote = (notetypeId,noteId) =>{
		let noteObj = JSON.parse(localStorage.getItem(`Notes-${notetypeId}`));
		$(`.task-name-show-${notetypeId}`).html(noteObj[noteId].nameNote);
		$(`.task-main-show-${notetypeId}`).html(noteObj[noteId].mainNote);
		$(`.task-other-show-${notetypeId}`).html(noteObj[noteId].otherNote);
		$(`.noteID-${notetypeId}`).text(noteId);
		if($(`.noteShowList-${notetypeId}`).is(':hidden')){
			$(`.noteShowList-${notetypeId}`).slideToggle();
			$(`.noteCreateList-${notetypeId}`).hide();
		}
	}

	swapNote = (notetypeId,noteId,path) =>{
		let notesArr = JSON.parse(localStorage.getItem(`Notes-${notetypeId}`));
		if(notesArr.length <= 1){
			return;
		}
		let setNoteId = notesArr[Number(noteId)];
		switch (path) {
			case "left":
				if(notesArr[Number(noteId)-1] != undefined){
					notesArr[Number(noteId)] = notesArr[Number(noteId)-1]
					notesArr[Number(noteId)-1] = setNoteId;
				}
				break;
			case "right":
				if (notesArr[Number(noteId)+1] != undefined) {
					notesArr[Number(noteId)] = notesArr[Number(noteId)+1]
					notesArr[Number(noteId)+1] = setNoteId;
				}
				break;
		}
		localStorage.setItem(`Notes-${notetypeId}`,JSON.stringify(notesArr));
		updateView(notetypeId);
	}

    editNote = (notetypeId) =>{
		let noteIDval = $(`.noteID-${notetypeId}`).text();
		if(noteIDval == ''){
			return;
		}
		let isEdit = $(`.isEdit-${notetypeId}`).text();
		switch (isEdit) {
			case "0":
				$(`.color-edit-${notetypeId}`).removeClass('d-none');
				$(`.editButton-${notetypeId}`).addClass('used');
				$(`.task-name-show-${notetypeId}`).attr({contenteditable: "true"});
				$(`.task-main-show-${notetypeId}`).attr({contenteditable: "true"});
				$(`.task-other-show-${notetypeId}`).attr({contenteditable: "true"});
				$(`.isEdit-${notetypeId}`).text("1");
				break;
		
			case "1":
				$(`.color-edit-${notetypeId}`).addClass('d-none');
				$(`.editButton-${notetypeId}`).removeClass('used');
				$(`.task-name-show-${notetypeId}`).attr({contenteditable: "false"});
				$(`.task-main-show-${notetypeId}`).attr({contenteditable: "false"});
				$(`.task-other-show-${notetypeId}`).attr({contenteditable: "false"});
				$(`.isEdit-${notetypeId}`).text("0");
				break;
		}

    }

    saveNote = (notetypeId) =>{
		let noteIDval = $(`.noteID-${notetypeId}`).text();
		if(noteIDval == ''){
			return;
		}
		let newNoteNameVal = $(`.task-name-show-${notetypeId}`).html();
		let newNoteColorVal = $(`.task-name-${notetypeId}-color-show`).val();
		let newNoteMainVal = $(`.task-main-show-${notetypeId}`).html();
		let newNoteOtherVal = $(`.task-other-show-${notetypeId}`).html();
		let newNoteIDVal = $(`.noteID-${notetypeId}`).text();
		
		let noteObj = JSON.parse(localStorage.getItem(`Notes-${notetypeId}`));
		noteObj[newNoteIDVal] = {
			nameNote: newNoteNameVal,
			mainNote: newNoteMainVal,
			otherNote: newNoteOtherVal,
			noteColor: newNoteColorVal,
		}
		localStorage.setItem("Notes-"+notetypeId, JSON.stringify(noteObj));
		updateView(notetypeId);
    }

    switchNoteShow = (typeNote, noteTypeId) =>{
        switch (typeNote) {
            case "show":
                $(`.noteShowList-${noteTypeId}`).slideToggle();
                if($(`.noteCreateList-${noteTypeId}`).is(':visible')){
					$(`.noteCreateList-${noteTypeId}`).hide();
				}
                break;
            case "create":
				$(`.noteCreateList-${noteTypeId}`).slideToggle();
                if($(`.noteShowList-${noteTypeId}`).is(':visible')){
					$(`.noteShowList-${noteTypeId}`).hide();
				}
                break;
        }
    }


    //! компоненты

    let fullNotePanels = () =>{

		//проход по все категориям
        let pillPanelsList = [];
		let tablePanelList = [];
        for(k in noteTypes){
            let typeName = noteTypes[k];
            let typeKey = k;
            let pillPanels = `
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-${typeKey}-tab" data-bs-toggle="pill" data-bs-target="#pills-${typeKey}" type="button" role="tab" aria-controls="pills-${typeKey}" aria-selected="false">
                        <p class="btn pill-outline-${ThemeSet.Btn} pillBtn">${typeName}</p>
                    </button>
                </li>
            `;
            pillPanelsList.push(pillPanels);


			let createNoteMenu = `
				<div class="noteMenu row">
					<button class="btn btn-${ThemeSet.Btn} btnBtn col-md-5 col-sm-12 menuNote note-create-menu" onclick="switchNoteShow('create','${k}')"><h2>Создать заметку</h2></button>
					<button class="btn btn-${ThemeSet.Btn} btnBtn col-md-5 col-sm-12 menuNote note-show-menu" onclick="switchNoteShow('show','${k}')"><h2>Посмотреть заметку</h2></button>
				</div>
			`;

			let noteShow = `
			<ul class="noteShowList noteShowList-${k} ${typeKey} border border-${ThemeSet.Primary}" style="display: none;">
			<li class="menuBtnNote">
				<button onclick="saveNote('${k}')" class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary link-${ThemeSet.Primary} save-btn-${k}"><i class="fa fa-save" aria-hidden="true"></i></button>
				<button onclick="editNote('${k}')" class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary link-${ThemeSet.Primary} editButton-${k}"><i class="fa fa-edit" aria-hidden="true"></i></button>
				<button onclick="deleteNote('${k}')" class="btn btn-outline-${ThemeSet.Btn} btnOutlineBtn linkPrimary link-${ThemeSet.Primary}"><i class="fa fa-trash" aria-hidden="true"></i></button>
			</li>
				<li>
					<p class="h3 link-${ThemeSet.Primary} taskNaming">Название</p>
					<p placeholder="Написать что-то..." class="h4 task-name-show-${k} border border-${ThemeSet.Primary} borderPrimary linkPrimary bgBody link-${ThemeSet.Primary} bg-${ThemeSet.BodyBackground} taskShow taskView" contenteditable="false"></p>
					<div class="color-edit-${k} d-none">
						${createColor(k,'name','название','show')}
					</div>
				</li>
				<li>
					<p class="h3 link-${ThemeSet.Primary} taskNaming">Описание</p>
					<p placeholder="Написать что-то..." class="h4 task-main-show-${k} border borderPrimary linkPrimary border-${ThemeSet.Primary} link-${ThemeSet.Primary} bg-${ThemeSet.BodyBackground} taskShow taskView" contenteditable="false"></p>
				</li>
				<li>
					<p class="h3 link-${ThemeSet.Primary} taskNaming">Остальное</p>
					<p placeholder="Написать что-то..." class="h4 task-other-show-${k} border borderPrimary linkPrimary border-${ThemeSet.Primary} link-${ThemeSet.Primary} bg-${ThemeSet.BodyBackground} taskShow taskView" contenteditable="false"></p>
				</li>
				<li class="d-none noteID-${k}"></li>
				<li class="d-none isEdit-${k}">0</li>
			</ul>
			`;

			let noteCreate = `
				<ul class="noteCreateList noteCreateList-${k} ${typeKey} border border-${ThemeSet.Primary}" style="display: none;">
					<li>
						<p class="h3 link-${ThemeSet.Primary} taskNaming">Название</p>
						<p placeholder="Написать что-то..." class="h4 task-name-${k} border border-${ThemeSet.Primary} borderPrimary linkPrimary bgBody bg-${ThemeSet.BodyBackground} link-${ThemeSet.Primary} taskView taskArea ${typeKey}" contenteditable="true"></p>
						${createColor(k,'name','название','create')}
					</li>
					<li>
						<p class="h3 link-${ThemeSet.Primary} taskNaming">Описание</p>
						<p placeholder="Написать что-то..." class="h4 task-main-${k} border border-${ThemeSet.Primary} borderPrimary linkPrimary bgBody bg-${ThemeSet.BodyBackground} link-${ThemeSet.Primary} taskView taskArea ${typeKey}" contenteditable="true"></p>
					</li>
					<li>
						<p class="h3 link-${ThemeSet.Primary} taskNaming">Остальное</p>
						<p placeholder="Написать что-то..." class="h4 task-other-${k} border border-${ThemeSet.Primary} borderPrimary linkPrimary bgBody bg-${ThemeSet.BodyBackground} link-${ThemeSet.Primary} taskArea taskView ${typeKey}" contenteditable="true"></p>
					</li>
					<li class="menuBtnNote">
						<button class="btn btn-${ThemeSet.Btn} btnBtn addNote-${k}" onclick="addNote('${k}')"><h2 class="taskNaming">Добавить заметку</h2></button>
					</li>

				</ul>
			`;

			let NotesListFull = `
				<ul class="row noteList noteList-${k}">
					<h2 class="link-${ThemeSet.Primary} linkPrimary mainListName-">Список заметок ${typeName}</h2>
				</ul>
			`;

			let tabPanel = `
				<div class="tab-pane fade" id="pills-${typeKey}" role="tabpanel" aria-labelledby="pills-${typeKey}-tab">
					<h3 class="link-${ThemeSet.Primary} linkPrimary mainListName">Заметки ${typeName}</h3>
						<div class="noteMenuFull container bg-${ThemeSet.Background} bgBack">
							<div class="row noteFullMenuPanel">
								${createNoteMenu}
								<div class="noteShow col-12">
									${noteShow}
									${noteCreate}
								</div>
							</div>
						</div>
						<div class="noteListPad">
							<h3 class="link-${ThemeSet.Primary} linkPrimary mainListName">Список заметок (${typeName})</h3>
							${NotesListFull}
						</div>
				</div>
			`;
			tablePanelList.push(tabPanel);
        }

		//таблеточные панели (начало)
        let pillPanelsMenu = $(`
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                    <p class="btn pill-outline-${ThemeSet.Btn} pillBtn">Главная</p>
                </button>
                </li>
                    ${pillPanelsList.join('')}
            </ul>
        `);
		pillPanelsMenu.appendTo('.app');


		let fileDataMenu = `
			<div class="border noteMenu row border-${ThemeSet.Primary} borderPrimary">
				<button onclick="saveData()" class="btn btn-${ThemeSet.Btn} btnBtn m-2 col-md-3 col-sm-12"><h4>Скачать данные <i class="fa fa-download" aria-hidden="true"></i></h4></button>
				<button onclick="loadData()" class="btn btn-${ThemeSet.Btn} btnBtn m-2 col-md-3 col-sm-12"><h4>Загрузить данные <i class="fa fa-upload" aria-hidden="true"></i></h4></button>
				<form class="m-2 col-md-3 col-sm-12">
					<label class="input-file">
						<input id="fileIn" type="file" name="file">
						<span class="fileName btn btn-${ThemeSet.Btn} btnBtn h4">Выберите файл (MyNotes.json)</span>
					</label>
				</form>
			</div>
		`;

		//табличные панели (финал)
		let tabPanelMenu = $(`
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <h3 class="link-${ThemeSet.Primary} linkPrimary mainListName">Главная</h3>
                    ${fileDataMenu}
					<div class="row microService">
                	</div>
                </div>
				${tablePanelList.join('')}
            </div>
        `);
		tabPanelMenu.appendTo('.app');

		//смена текста у input
		$('#fileIn').on('change', () =>{
			let file = document.getElementById('fileIn').files[0]
			$('.fileName').text(file.name);
		});

		/********************************* */
    }

	//! список заметок
	let updateView = (notetypeId) =>{
		$(`.noteList-${notetypeId}`).children().remove();

		let notesListArr = JSON.parse(localStorage.getItem(`Notes-${notetypeId}`));
		let notesList = [];
		for (notes in notesListArr){
			let Note = `
				<li href="#" class="card noteCard-${notetypeId} bg-${ThemeSet.SecondBackground} border-${ThemeSet.Primary} bgSecond borderPrimary col-lg-3 col-md-6 col-sm-12 mx-1 my-3 text-decoration-none">
					<div class="card-body noteCard">
						<div class="d-none noteId-${notetypeId}">${notes}</div>
						<button onclick="swapNote('${notetypeId}','${notes}','left')" class="btn btn-${ThemeSet.Btn} btnBtn"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
						<h4 class="card-text taskName noteNameIcon" style="color: ${notesListArr[notes].noteColor};" onclick="showNote('${notetypeId}',${notes})">
							${notesListArr[notes].nameNote}
						</h4>
						<button onclick="swapNote('${notetypeId}','${notes}','right')" class="btn btn-${ThemeSet.Btn} btnBtn"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
					</div>
				</li>
			`;
			notesList.push(Note);
		}
		$(`${notesList.join('')}`).appendTo(`.noteList-${notetypeId}`);
	}

	let updateViewStart = () =>{
		for(Ntype in noteTypes){
			updateView(Ntype);
		}
	}


    FullBlocknote = () =>{
        $('.nav-pills').remove();
		$("#pills-tabContent").remove();

        fullNotePanels();
		updateViewStart();
		sortNotes();
		MicroService("заметки");
    }
});