$(() => { 

	let getSorted = () => {

		//категории
		let TableList = $('#iconCategoryMenu h4');
		let NewHometabData = [];
		for (const k in TableList) {
			let CategoryData = [];
			if (TableList[k].innerText != undefined) {
				CategoryData.push(TableList[k].innerText)
				let tabCards = $(TableList[k]).siblings().children('.iconCard').children('.homeID');
				for (const c in tabCards) {
					if (tabCards[c].innerText != undefined) {
						CategoryData.push(tabCards[c].innerText);
					}
				}
				NewHometabData.push(CategoryData);
			}
		}
		localStorage.setItem('Hometab', JSON.stringify(NewHometabData));
	}

	let CategorySortable = () => {

		//категории
		$('#iconCategoryMenu').sortable(
			{
				stop: () => {
					getSorted();
				}
			}
		);

		//карточки
		$('.iconCategory').sortable(
			{
				stop: () => {
					getSorted();
				}
			}
		);
	}

	let CategorySlider = (event2) => {
		let target = $(event2.target);
		target.siblings('.iconCategory').slideToggle();
	}

	let CategoryTables = () => {

		$('#iconCategoryMenu').remove();
		$('.mainNameText').remove();
		let CategoryTableList = [];

		//категории
		for (let index = 0; index < HometabDataAllSorted.length; index++) {
			const CategoryList = HometabDataAllSorted[index];
			
			// карточки
			let CardsList = [];
			for (let i = 1; i < CategoryList.length; i++) {
				const Table = CategoryList[i];
				let Card = `
					<a href="${Table.link}" class="card iconCard bg-${ThemeSet.SecondBackground} bgSecond borderPrimary border-${ThemeSet.Primary} col-lg-3 col-md-5 col-sm-4 mx-1 my-2 text-decoration-none">
						<img class="card-img-top cardImg" src="${Table.prev}" alt="${Table.name}">
						<div class="card-body">
							<p class="card-text iconText link-${ThemeSet.Primary} linkPrimary">${Table.name}</p>
						</div>
						<p class="d-none homeID">${Table.id}</p>
					</a>
				`;
				CardsList.push(Card);
			}

			//категории
			let Category = `
				<div class="col-md-6 col-sm-12 link-${ThemeSet.Primary} linkPrimary container my-2 iconCategory2" alt="iconCategory">
					<h4 class="h3 categoryName link-${ThemeSet.Primary} linkPrimary">${CategoryList[0]}</h4>
					<div class="link-light border border-${ThemeSet.Primary} borderPrimary rounded iconCategory row" style="display: none;">
						${CardsList.join('')}
					</div>
				</div>
			`; 
			CategoryTableList.push(Category);
		}

		let CategoryTable = $(`
			<h3 class="mainNameText link-${ThemeSet.Primary} linkPrimary">Новая вкладка <a onclick="ResetTabs()" class="resetTabs nav-link"><i class="fa fa-arrows-spin"></i></a></h3>
			<div class="row" id="iconCategoryMenu">
				${CategoryTableList.join('')}
			</div>
		`);
		CategoryTable.appendTo('.app');

		// подключение target
		$('.categoryName').click((event) => {
			CategorySlider(event);
		});
	}

	fixCards = () =>{
		setInterval(() => {
			$('.cardImg').css({"position":"static"})
		}, 1);
	}

	FullHomeTab = () => {
		CategoryTables();
		CategorySortable();
		fixCards();
	}

	ResetTabs = () =>{
		localStorage.removeItem('Hometab');
		setTimeout(() =>{
			changePage();
			CategoryTables();
			updateApp();
		},200);
	}


});