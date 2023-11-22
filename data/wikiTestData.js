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


//? Создаем БД под них
for(wikiPage in wikiPages){
    if(localStorage.getItem(`Wiki-${wikiPage}`) == "" ||!JSON.parse(localStorage.getItem(`Wiki-${wikiPage}`))){
        localStorage.setItem(`Wiki-${wikiPage}`,JSON.stringify([]));
    }
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

//?



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