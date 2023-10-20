const noteTypes = {
    create: "Творчество",
	games: "Игры",
	anime: "Аниме",
	webCrafting: "Верстка",
    gameDev: "Геймдев",
    needs: "Общее",
};

//создаём/принимаем значения с localStorage 
let noteTypesDataAll = []
for(nType in noteTypes){
    //!значения noteTypes[nType]
    //!ключи nType

    if (JSON.parse(localStorage.getItem("Notes-"+nType))) {
        noteTypesDataAll.push(JSON.parse(localStorage.getItem("Notes-"+nType)));
    }
    else{
        localStorage.setItem("Notes-"+nType,JSON.stringify([]));
    }
}

// фул дата console.log(noteTypesDataAll);
