const wikiPages = {
    StoryLines: "Сюжентные линии",
    Storys: "Истории",
    Races: "Расы",
    Chars: "Персонажи",
    Fractions: "Фракции",
    Wild: "Живность",
    Plants: "Растения",
    Lore: "Лор",
    Notes: "Заметки",
    Worlds: "Миры",
    Scenes: "События",
    Magic: "Магия",
    Tech: "Технологии",
}


//* Создаем БД под них
for(wikiPage in wikiPages){
    if(localStorage.getItem(`Wiki-${wikiPage}`) == "" ||!JSON.parse(localStorage.getItem(`Wiki-${wikiPage}`))){
        localStorage.setItem(`Wiki-${wikiPage}`,JSON.stringify([]));
    }
}

//* создание страницы вики (для сохранения)
if(localStorage.getItem(`WikiPage`) == "" ||!JSON.parse(localStorage.getItem(`WikiPage`))){
    localStorage.setItem(`WikiPage`,JSON.stringify("Storys"));
}

//? категории блоков

const cardBlockTypes = {
    Poster: "Постер",
    Name: "Название",
    Text: "Текст",
    PicText: "Текст с картинкой",
    Gallery: "Галерея",
    Music: "Музыка",
    TextChoice: "Выбор текста",
    Video: "Видео",
    Youtube: "Ютуб",
    CardsChoice: "Карточки",
}

//? дата для select/option в меню карточек
const wikiMenuSelectOptions = {
    Name: "Название",
    Char: "Персонаж",
    Race: "Раса",
    Fraction: "Фракция",
    Story: "История",
    Moment: "Момент",
};


//? дата для select/option картинки
let wikiPictureLocal = {};
let fullpicturelist = [];
for(wikiPage in wikiPages){
    let pictureList = [];
    for(pictureID in allPicturesData){
        let picture = allPicturesData[pictureID];
        if(wikiPage == picture.type){
            pictureList.push(picture);
            fullpicturelist.push(picture);
        }
    }
    wikiPictureLocal[wikiPage] = pictureList;
}
wikiPictureLocal.All = fullpicturelist;
const wikiPicturesOptions = wikiPictureLocal;
console.log(wikiPicturesOptions);

//? дата для select/option музыка
let wikiMusicLocal = {};
for(type in MusicType){
    let musicList = [];
    for(i in MusicDataAll){
        if(MusicDataAll[i].type.includes(MusicType[type])){
            musicList.push(MusicDataAll[i]);
        }
    }
    wikiMusicLocal[type] = musicList;
}
const wikiMusicOptions = wikiMusicLocal;
console.log(wikiMusicOptions);


//? дата для select/option выбор текста
let wikiTextChoiceOptionsLocal = {};
for(type in wikiPages){
    let textChoiceListFull = JSON.parse(localStorage.getItem(`Wiki-${type}`));
    let wikiChoiceArr = [];
    for(choiceID in textChoiceListFull){
        let choiceBlockString = textChoiceListFull[choiceID][0].wikiPoster.posterName;
        wikiChoiceArr.push(choiceBlockString);
    }
    wikiTextChoiceOptionsLocal[type] = wikiChoiceArr;
}
const wikiTextChoiceOptions = wikiTextChoiceOptionsLocal;
/*

данные карточки

[
    {wikiPoster: {
        posterName: "пример",
        posterText:"",
        posterImg:"",
        underPosterText:"",}
    },
    
    {wikiName:{
        wikiName: "", 
        isSpoiler:false}
    },
    
    {wikiText:{
        wikiText: "", 
        isSpoiler:false}
    },
    
    {wikiPicText:{
        wikiText: "",
        wikiPic:"",
        wikiTextUnder:"", 
        isSpoiler:false}
    },
    
    {wikiGallery:{
        Gallery: [{galleryImg:"",galleryName:"",galleryText:""},], 
        isSpoiler:false}
    },
    
    {wikiTextChoice:{
        wikiTextArr:[""], 
        isSpoiler:false}
    }
    
    {wikiMusic:{
        musicLink:"",
        musicName:"",
        isSpoiler:false}
    },
    
    {wikiVideo:{
        videoName:"",
        VideoLink:"",
        isSpoiler:false}
    },
    
    {wikiYoutube:{
        youtubeName:"",
        youtubeLink:"https://www.youtube.com/embed/mai6TtYr4DY",
        isSpoiler:false}
    },
    
    {wikiCardsChoice:{
        Cards:[{dataBase:cardName}]
        ,isSpoiler:false}
    },
]


*/