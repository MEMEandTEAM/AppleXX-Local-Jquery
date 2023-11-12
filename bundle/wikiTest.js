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


/*

<!-- * Отрытая карточка персонажа-->
		<div class="wikiCardOpenPage container d-none">
			<!-- * Меню выбора категории в вики-->
		<div class="wikiMenuCard row container">
			<select onchange="(this.options[this.selectedIndex].value)" class="btn btn-orange btnBtn menuNote menuNoteSelect wikiMenuSelect col-md-3 col-sm-12 mx-2 h2">
				<option value="0" class="link-orange linkPrimary bgBack bg-dark" href="#" selected>Расы</option>  
                
				<option value="0" class="link-orange linkPrimary bgBack bg-dark" href="#">Расы</option>   
			
				<option value="1" class="link-orange linkPrimary bgBack bg-dark" href="#">Персонажи</option>   
			
				<option value="2" class="link-orange linkPrimary bgBack bg-dark" href="#">Лорные факты</option>   
			
				<option value="3" class="link-orange linkPrimary bgBack bg-dark" href="#">Фракции</option>   
			
				<option value="4" class="link-orange linkPrimary bgBack bg-dark" href="#">Сюжетные линии</option>   
			
				<option value="5" class="link-orange linkPrimary bgBack bg-dark" href="#">Заметки</option>   
			
				<option value="6" class="link-orange linkPrimary bgBack bg-dark" href="#">Моменты</option>   
			
				<option value="7" class="link-orange linkPrimary bgBack bg-dark" href="#">Животные и монстры</option>   
			
				<option value="8" class="link-orange linkPrimary bgBack bg-dark" href="#">Растения</option>   
			
				<option value="9" class="link-orange linkPrimary bgBack bg-dark" href="#">Магия</option>   
        
            </select>
            <button onclick="createWikiTab('menu');" class="btn btn-orange btnBtn col-md-3 col-sm-12 mx-2 menuNote">
                <h2>Меню</h2>
            </button>

			<div class="d-none wikiID"></div>
			<div class="d-none wikiCategory"></div>
		</div>

		<!-- * Лист персонажа-->
		<div class="container blockList border rounded border-orange">
			

			<!-- *                      Обложка-->
			<div class="row wikiBlock wikiPoster">
				<div class="col-md-8 col-sm-12 posterName">
					<h2 class="h2 link-orange text-center" contenteditable="false">Элмар Элмар</h2>
				</div>
				<div class="col-md-8 col-sm-12 posterText">
					<p class="link-orange h5"  contenteditable="false">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores consequatur sit ducimus explicabo. Aut possimus, voluptatum magnam deserunt inventore ullam. Error dicta tenetur exercitationem quasi ullam eaque corporis beatae fugiat?
					</p>
				</div>
				<div class="col-md-4 col-sm-12 posterPic">
					<figure class="figure">
					  <img src="/assets/images/chars/Элмар.png" class="figure-img img-fluid rounded" alt="...">
					  <figcaption class="figure-caption link-orange" contenteditable="false">A caption for the above image.</figcaption>
					</figure>

					<div class="editMode border border-orange rounded col-12 container">
						<select class="picSelect link-dark col-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>
						<button class="btn btn-outline-orange rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
					</div>
				</div>
			</div>


			<!-- *                    Картинка с текстом-->
			<div class="row wikiBlock wikiPicText">
				<div class="col-md-8 col-sm-12">
					<p class="link-orange h5" contenteditable="false">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores consequatur sit ducimus explicabo. Aut possimus, voluptatum magnam deserunt inventore ullam. Error dicta tenetur exercitationem quasi ullam eaque corporis beatae fugiat?
					</p>
				</div>
				<div class="col-md-4 col-sm-12">
					<figure class="figure">
					  <img src="/assets/images/chars/Берлина.png" class="figure-img img-fluid rounded" alt="...">
					  <figcaption class="figure-caption link-orange" contenteditable="false">A caption for the above image.</figcaption>
					</figure>

					<div class="editMode border rounded border-orange col-12 container">
						<select class="dirSelect link-dark col-md-5 col-sm-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор категории">Выбор категории</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>

						<select class="picSelect link-dark col-md-5 col-sm-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>
						<button class="btn btn-outline-orange rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
					</div>
				</div>
			</div>


			<!-- *            НАЗВАНИЕ-->
			<div class="row wikiBlock wikiName">
				<div class="col-12">
					<h2 class="h2 link-orange text-center" contenteditable="false">Название</h2>
					<div class="editMode border border-orange rounded col-12 container">
						<button class="btn btn-outline-orange rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
					</div>
				</div>
			</div>


			<!-- *          Карусель картинок-->
			<div class="row wikiBlock wikiGallery">
				
				<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
					<div class="carousel-indicators">
					  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
					  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
					  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
					</div>
					<div class="carousel-inner">

					  <div class="carousel-item active">
						<div class="w-100 carouselPic">
							<img src="/assets/images/chars/Арул.png" class="d-block img-fluid" alt="...">
						</div>
						<div class="carousel-caption carousel-orange d-none d-md-block">
						  <h5>Метка первого слайда</h5>
						  <p>Некоторый репрезентативный заполнитель для первого слайда.</p>
						</div>
					  </div>

					  <div class="carousel-item">
						<div class="w-100 carouselPic">
							<img src="/assets/images/chars/Берлина.png" class="d-block img-fluid" alt="...">
						</div>
						<div class="carousel-caption carousel-orange d-none d-md-block">
						  <h5>Метка второго слайда</h5>
						  <p>Некоторый репрезентативный заполнитель для второго слайда.</p>
						</div>
					  </div>
					  <div class="carousel-item">
						<div class="w-100 carouselPic">
							<img src="/assets/images/chars/Мифолий.png" class="d-block img-fluid" alt="...">
						</div>
						<div class="carousel-caption carousel-orange d-none d-md-block">
						  <h5>Метка третьего слайда</h5>
						  <p>Некоторый репрезентативный заполнитель для третьего слайда.</p>
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

				<div class="editMode border rounded border-orange col-12">

					<div class="pickPictureContainer container row col-12">
						<select class="dirSelect link-dark col-md-5 col-sm-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор категории">Выбор категории</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>
	
						<select class="picSelect link-dark col-md-5 col-sm-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>

						<button class="btn btn-outline-orange rounded col-md-1 col-sm-5 picDelete" onclick=""><i class="fa fa-minus" aria-hidden="true"></i></button>

						<p class="mainPicText col-md-5 col-sm-11 link-orange border rounded border-orange" contenteditable="true">lorem ipsum</p>
						<p class="picText col-md-5 col-sm-11 link-orange border rounded border-orange" contenteditable="true">lorem ipsum</p>
					</div>

					<div class="pickPictureContainer container row col-12">
						<select class="dirSelect link-dark col-md-5 col-sm-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор категории">Выбор категории</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>
	
						<select class="picSelect link-dark col-md-5 col-sm-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>

						<button class="btn btn-outline-orange rounded col-md-1 col-sm-5 picDelete" onclick=""><i class="fa fa-minus" aria-hidden="true"></i></button>

						<p class="mainPicText col-md-5 col-sm-11 link-orange border rounded border-orange" contenteditable="true">lorem ipsum</p>
						<p class="picText col-md-5 col-sm-11 link-orange border rounded border-orange" contenteditable="true">lorem ipsum</p>
					</div>

					<div class="pickPictureContainer container row col-12">
						<select class="dirSelect link-dark col-md-5 col-sm-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор категории">Выбор категории</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>
	
						<select class="picSelect link-dark col-md-5 col-sm-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор картинки">Выбор картинки</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>

						<button class="btn btn-outline-orange rounded col-md-1 col-sm-5 picDelete" onclick=""><i class="fa fa-minus" aria-hidden="true"></i></button>

						<p class="mainPicText col-md-5 col-sm-11 link-orange border rounded border-orange" contenteditable="true">lorem ipsum</p>
						<p class="picText col-md-5 col-sm-11 link-orange border rounded border-orange" contenteditable="true">lorem ipsum</p>
					</div>

					<button class="btn btn-outline-orange rounded col-12 picAdd" onclick=""><i class="fa fa-plus" aria-hidden="true"></i></button>
					<button class="btn btn-outline-orange rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
				</div>


			</div>

			<!-- *               Текст-->
			<div class="row wikiBlock wikiText">
				<p class="link-orange h5" contenteditable="false">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores consequatur sit ducimus explicabo. Aut possimus, voluptatum magnam deserunt inventore ullam. Error dicta tenetur exercitationem quasi ullam eaque corporis beatae fugiat?
				</p>
				<div class="editMode border border-orange rounded col-12 container">
					<button class="btn btn-outline-orange rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
				</div>
			</div>

			<!-- *           Аудио-->
			<div class="row wikiBlock wikiMusic">
				<p class="col-sm-12 col-md-6 link-orange h5 text-center">
					Lorem ipsum dolor, sit amet consectetur
				</p>
				<audio class="col-md-6 col-sm-12" controls src="./assets/music/Аниме/KICK BACK Chainsaw Man OP.mp3"></audio>

				<div class="editMode border rounded border-orange col-12 row container">
					<select class="musicTypeSelect col-md-6 col-sm-12 link-dark bgSecond bg-orange-dark" onchange="">
						<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор жанра музыки">Выбор жанра музыки</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
					</select>

					<select class="musicSongSelect col-md-6 col-sm-12 link-dark bgSecond bg-orange-dark" onchange="">
						<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор музыки">Выбор музыки</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
					</select>
					<button class="btn btn-outline-orange rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
				</div>

			</div>

			<!-- *               Текст (выбор)-->
			<div class="row wikiTextChoice wikiBlock">
				<p class="link-orange text-center h3" >Раса</p>

				<div class="editMode border rounded border-orange col-12">

					<div class="pickPictureContainer container row col-12">
						<select class="baseSelect link-dark col-md-4 col-sm-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор категории (общий)">Выбор категории (общий) (расса)</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>
	
						<select class="subBaseSelect link-dark col-md-4 col-sm-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор Выбор из категории конкретный">Выбор из категории конкретный (эльфы)</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>

						<select class="subOptionSelect link-dark col-md-4 col-sm-11 bgSecond bg-orange-dark" onchange="">
							<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор Выбор из категории конкретный">Выбор из опции (Альты)</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
							<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						</select>
						<button class="btn btn-outline-orange rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
					</div>
				</div>
			</div>

			<!-- *              Видео (локальное)-->
			<div class="row wikiVideo wikiBlock">
				<h2 class="h2 col-12 link-orange text-center localVideoName" contenteditable="false">Локальное видео</h2>
				<video class="localVideo" src="/assets/videos/GANGSTA Opening.mp4" controls></video>

				<div class="editMode border rounded border-orange col-12 container row">
					<select class="videoTypeSelect col-md-6 col-sm-12 link-dark bgSecond bg-orange-dark" onchange="">
						<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор жанра видео">Выбор жанра видео</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
					</select>

					<select class="videoSelect col-md-6 col-sm-12 link-dark bgSecond bg-orange-dark" onchange="">
						<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор видео">Выбор видео</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
					</select>
					<button class="btn btn-outline-orange rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
				</div>
			</div>

			<!-- *               Видео (ютуб)-->
			<div class="row wikiYoutube wikiBlock">
				<h2 class="h2 col-12 link-orange text-center localYoutubeName" contenteditable="false">Ютаб видео</h2>
				<iframe class="youtubeVideo" title="YouTube video player" allowfullscreen="" width="500" height="350" frameborder="0" src="https://www.youtube.com/embed/mai6TtYr4DY"></iframe>
				<div class="editMode border rounded border-orange col-12">
					<p class="youtubeLink col-12 link-orange border rounded border-orange" contenteditable="true">lorem ipsum</p>
					<button class="btn btn-outline-orange rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
				</div>
			</div>

			<!-- *               Карточки (Выбор)-->
			<div class="row wikiCardsChoice wikiBlock">

				<div class="d-flex containter wikiCardsMenuShort border border-orange rounded container">

						<div class="wikiCardFull border border-orange rounded" style="width: 18rem;">
							<p class="d-none cardID">123</p>
							<p class="d-none cardCategory">Chars</p>
							<div class="wikiCard">
								<div class="cardFront">
									<img src="/assets/images/chars/Мифолий.png" class="card-img-top wikiCardImg" alt="...">
									<div class="nameCard w-100 bg-dark2">
										<h5 class="link-orange card-name">Мифолий Ле`Раферандр</h5>
									</div>
								</div>
								<div class="cardBack bg-dark">
									<p class="link-orange h6">
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

						<div class="wikiCardFull border border-orange rounded" style="width: 18rem;">
							<p class="d-none cardID">123</p>
							<p class="d-none cardCategory">Chars</p>
							<div class="wikiCard">
								<div class="cardFront">
									<img src="/assets/images/chars/Мифолий.png" class="card-img-top wikiCardImg" alt="...">
									<div class="nameCard w-100 bg-dark2">
										<h5 class="link-orange card-name">Мифолий Ле`Раферандр</h5>
									</div>
								</div>
								<div class="cardBack bg-dark">
									<p class="link-orange h6">
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

				<div class="editMode border rounded border-orange col-12 container row">
					<select class="cardChoiceSelect1 col-md-6 col-sm-12 link-dark bgSecond bg-orange-dark" onchange="">
						<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор категории 1">Выбор категории 1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
					</select>

					<select class="cardChoiceSelect2 col-md-6 col-sm-12 link-dark bgSecond bg-orange-dark" onchange="">
						<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор категории 2">Выбор категории 2</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
					</select>
					<button class="btn btn-outline-orange rounded col-12 deleteBlock" onclick=""><i class="fa fa-trash" aria-hidden="true"></i></button>
				</div>
			</div>


		</div>

		<!-- !МОБИЛКА Меню добавления блока-->
		<div class="editMode wikiMenu border border-orange rounded container">
			<select onchange="(this.options[this.selectedIndex].value)" class="btn btn-orange btnBtn menuNote menuNoteSelect col-md-3 col-sm-12 mx-2 h2" id="blockAddType"> 
                
				<option value="wikiPoster" class="link-orange linkPrimary bgBack bg-dark" href="#" selected>Постер</option>   
			
				<option value="wikiName" class="link-orange linkPrimary bgBack bg-dark" href="#">Название</option>   
			
				<option value="wikiText" class="link-orange linkPrimary bgBack bg-dark" href="#">Текст</option>   
			
				<option value="wikiPicText" class="link-orange linkPrimary bgBack bg-dark" href="#">Текст с картинкой</option>   
			
				<option value="wikiGallery" class="link-orange linkPrimary bgBack bg-dark" href="#">Галерея</option>   

				<option value="wikiMusic" class="link-orange linkPrimary bgBack bg-dark" href="#">Музыка</option> 
			
				<option value="wikiTextChoice" class="link-orange linkPrimary bgBack bg-dark" href="#">Текст с выбором</option>   
			
				<option value="wikiVideo" class="link-orange linkPrimary bgBack bg-dark" href="#">Локальное видео</option>   
			
				<option value="wikiYoutube" class="link-orange linkPrimary bgBack bg-dark" href="#">Ютуб видео</option>   
			
				<option value="wikiCards" class="link-orange linkPrimary bgBack bg-dark" href="#">Выбор карточек</option>    
        
            </select>
            <button onclick="alert(document.getElementById('blockAddType').value)" class="btn btn-orange btnBtn col-md-3 col-sm-12 mx-2 menuNote">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
		</div>

		</div>














        
		<!-- * Меню карточек-->
		<div class="wikiCardsMenuPage container d-none1">

			<div class="wikiMenuCard row container">
				<select onchange="(this.options[this.selectedIndex].value)" class="btn btn-orange btnBtn menuNote menuNoteSelect wikiMenuSelect col-md-3 col-sm-12 mx-2 h2">
					<option value="0" class="link-orange linkPrimary bgBack bg-dark" href="#" selected>Расы</option>  
					
					<option value="0" class="link-orange linkPrimary bgBack bg-dark" href="#">Расы</option>   
				
					<option value="1" class="link-orange linkPrimary bgBack bg-dark" href="#">Персонажи</option>   
				
					<option value="2" class="link-orange linkPrimary bgBack bg-dark" href="#">Лорные факты</option>   
				
					<option value="3" class="link-orange linkPrimary bgBack bg-dark" href="#">Фракции</option>   
				
					<option value="4" class="link-orange linkPrimary bgBack bg-dark" href="#">Сюжетные линии</option>   
				
					<option value="5" class="link-orange linkPrimary bgBack bg-dark" href="#">Заметки</option>   
				
					<option value="6" class="link-orange linkPrimary bgBack bg-dark" href="#">Моменты</option>   
				
					<option value="7" class="link-orange linkPrimary bgBack bg-dark" href="#">Животные и монстры</option>   
				
					<option value="8" class="link-orange linkPrimary bgBack bg-dark" href="#">Растения</option>   
				
					<option value="9" class="link-orange linkPrimary bgBack bg-dark" href="#">Магия</option>   
			
				</select>

				<h1 class="link-orange wikiCategoryName col-md-4 text-center">Животные и монстры</h1>

				<button onclick="createWikiTab('menu');" class="btn btn-orange btnBtn col-md-3 col-sm-12 mx-2 menuNote">
					<h2>Меню</h2>
				</button>

				<div class="wikiCardsSearch col-12 row">
					<select class="dirCategory link-dark col-md-4 col-sm-11 bgSecond bg-orange-dark" onchange="">
						<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор категории">Выбор категории</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
					</select>

					<select class="cardCategory link-dark col-md-4 col-sm-11 bgSecond bg-orange-dark" onchange="">
						<option class="bg-dark2 bgBody link-orange linkPrimary" selected value="Выбор категории 2">Выбор категории 2</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
						<option class="bg-dark2 bgBody link-orange linkPrimary" value="1">1</option>
					</select>
					<div class="wikiSearch col-md-4 col-sm-12">
						<input type="search" class="w-100 bordered border-orange rounded" placeholder="Поиск..." onblur="">
					</div>

				</div>

			</div>

			<!--! Доска карточек-->
			<div class="d-flex containter wikiCardsMenu border border-orange rounded container">

				<!--? Карточка-->
				<div class="wikiCardFull border border-orange rounded" style="width: 18rem;">
					<div class="wikiCard">
						<div class="cardFront">
							<img src="/assets/images/chars/Мифолий.png" class="card-img-top wikiCardImg" alt="...">
							<div class="nameCard w-100 bg-dark2">
								<h5 class="link-orange card-name">Мифолий Ле`Раферандр</h5>
							</div>
						</div>
						<div class="cardBack bg-dark">
							<p class="link-orange h6">
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

				<div class="wikiCardFull border border-orange rounded" style="width: 18rem;">
					<div class="wikiCard">
						<div class="cardFront">
							<img src="/assets/images/chars/Мифолий.png" class="card-img-top wikiCardImg" alt="...">
							<div class="nameCard w-100 bg-dark2">
								<h5 class="link-orange card-name">Мифолий Ле`Раферандр</h5>
							</div>
						</div>
						<div class="cardBack bg-dark">
							<p class="link-orange h6">
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

				<div class="wikiCardFull border border-orange rounded" style="width: 18rem;">
					<div class="wikiCard">
						<div class="cardFront">
							<img src="/assets/images/chars/Мифолий.png" class="card-img-top wikiCardImg" alt="...">
							<div class="nameCard w-100 bg-dark2">
								<h5 class="link-orange card-name">Мифолий Ле`Раферандр</h5>
							</div>
						</div>
						<div class="cardBack bg-dark">
							<p class="link-orange h6">
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

				<div class="wikiCardFull border border-orange rounded" style="width: 18rem;">
					<div class="wikiCard">
						<div class="cardFront">
							<img src="/assets/images/chars/Мифолий.png" class="card-img-top wikiCardImg" alt="...">
							<div class="nameCard w-100 bg-dark2">
								<h5 class="link-orange card-name">Мифолий Ле`Раферандр</h5>
							</div>
						</div>
						<div class="cardBack bg-dark">
							<p class="link-orange h6">
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

				<div class="wikiCardFull border border-orange rounded" style="width: 18rem;">
					<div class="wikiCard">
						<div class="cardFront">
							<img src="/assets/images/chars/Мифолий.png" class="card-img-top wikiCardImg" alt="...">
							<div class="nameCard w-100 bg-dark2">
								<h5 class="link-orange card-name">Мифолий Ле`Раферандр</h5>
							</div>
						</div>
						<div class="cardBack bg-dark">
							<p class="link-orange h6">
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

				<div class="wikiCardFull border border-orange rounded" style="width: 18rem;">
					<div class="wikiCard">
						<div class="cardFront">
							<img src="/assets/images/fractions/HeroMain.png" class="card-img-top wikiCardImg" alt="...">
							<div class="nameCard w-100 bg-dark2">
								<h5 class="link-orange card-name">Мифолий Ле`Раферандр</h5>
							</div>
						</div>
						<div class="cardBack bg-dark">
							<p class="link-orange h6">
								Светло-зеленая кожа.
								Среднее телосложение,
								Длинные огненные волосы,завитые в небольшую косу.
								Жёлтые глаза.
								Носит жёлтые сережки(от родителей).
								#Пара шрамов на руке
								##Бордовый оттенок кожи
								Жёлтые глаза.
								Носит жёлтые сережки(от родителей).
								#Пара шрамов на руке
								##Бордовый оттенок кожи
								Жёлтые глаза.
								Носит жёлтые сережки(от родителей).
								#Пара шрамов на руке
								##Бордовый оттенок кожи
							</p>
						</div>
					</div>
				</div>





			</div>

		</div>

*/