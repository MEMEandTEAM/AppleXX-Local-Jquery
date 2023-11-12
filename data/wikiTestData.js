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