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
    Race: "Раса",
    Fraction: "Фракция",
    Story: "История",
    Moment: "Момент"
};


//? дата для select/option в постере
let wikiPostersLocal = {};
for(wikiPage in wikiPages){
    let pictureList = [];
    for(pictureID in allPicturesData){
        let picture = allPicturesData[pictureID];
        if(wikiPage == picture.type){
            pictureList.push(picture);
        }
    }
    wikiPostersLocal[wikiPage] = pictureList;
}
const wikiPostersOptions = wikiPostersLocal;


//? дата для select/option

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
    
    !{wikiGallery:{
        Gallery: [{galleryImg:"",galleryName:"",galleryText:""},], 
        isSpoiler:false}
    },
    
    !{wikiTextChoice:wikiText:"", isSpoiler:false},
    
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
    
    !{wikiCardsChoice:{
        Cards:[{}]
        ,isSpoiler:false}
    },
]


*/