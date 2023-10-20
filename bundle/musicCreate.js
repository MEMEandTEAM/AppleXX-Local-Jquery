$(() => {

    let changeMusic = (MusicID) =>{
        let Audio = $('#audio');
        let setPlaylistName = $('.getPlaylistID').text();

        if(randomFlagMusic == 0){
            let playingList;
            for(playlistID in SortedMusic){
                if(SortedMusic[playlistID][0] == setPlaylistName){
                    playingList = SortedMusic[playlistID];
                    break;
                }
            }
            let MusicPlay = playingList[MusicID];
            let path = `./assets/music/${MusicPlay.type[1]}/${MusicPlay.mp3}`;
            Audio.attr({src:path,autoplay:true});
            $('.getMusicId').text(MusicID);
            $('.songName').text(MusicPlay.name);
        }
        else{
            let MusicPlayR = shufflePlaylist[MusicID];
            let pathR = `./assets/music/${MusicPlayR.type[1]}/${MusicPlayR.mp3}`;
            Audio.attr({src:pathR,autoplay:true});
            $('.getMusicId').text(MusicID);
            $('.songName').text(MusicPlayR.name);
        }
    }

    changeMusicPanel = (playlist,musicID) =>{
        if(randomFlagMusic == 1){
            setRandomMusic();
        }
        $('.getPlaylistID').text(playlist);
        changeMusic(musicID);
    }

    let loopMusic = () =>{
        $('.loop-btn').click(() =>{
            let Audio = $('#audio');
            if ($('.loop-btn').hasClass('used') != true){

                if(randomFlagMusic == 1){
                    setRandomMusic();
                }

                Audio.attr({loop:"true"});
                $('.loop-btn').addClass("used");
                $('.loopIcon').addClass("looped");
            }
            else{
                Audio.attr({loop:null});
                $('.loop-btn').removeClass("used");
                $('.loopIcon').removeClass("looped");
            }
        });
    }

    playlistSlider = (event2) => {
		let target = $(event2.target);
		target.siblings('.music-list').slideToggle();
	}

    stepChangeMusic = (path) =>{
        let MusicID = Number($('.getMusicId').text());
        let MusicSet = $('.musicSet').text();

        if(randomFlagMusic == 0){
            let setPlaylistName = $('.getPlaylistID').text();
            let playingList;
            for(playlistID in SortedMusic){
                if(SortedMusic[playlistID][0] == setPlaylistName){
                    playingList = SortedMusic[playlistID];
                    break;
                }
            }
            switch (path) {
                case "+":
                    if (MusicID != playingList.length-1) {
                        changeMusic(MusicID+1)
                    }
                    else{
                        changeMusic("1");
                    }
                    break;
                case "-":
                    if(MusicID >= 2){
                        changeMusic(MusicID-1);
                    }
                    else{
                        changeMusic(playingList.length-1);
                    }
                    break;
            }
        }
        else{
            switch (path) {
                case "+":
                    if (MusicID != shufflePlaylist.length-1) {
                        changeMusic(MusicID+1)
                    }
                    else{
                        changeMusic("0");
                    }
                    break;
                case "-":
                    if(MusicID >= 1){
                        changeMusic(MusicID-1);
                    }
                    else{
                        changeMusic(shufflePlaylist.length-1);
                    }
                    break;
            }
        }
    }

    let autoChangeMusic = () =>{
        let Audio = $('#audio');
        Audio.on("ended",() =>{
            stepChangeMusic("+");
        })
    }

    randomFlagMusic = 0;
    setRandomMusic = () =>{
        if(randomFlagMusic == 0){

            if ($('.loop-btn').hasClass('used') == true){
                let Audio = $('#audio');
                Audio.attr({loop:null});
                $('.loop-btn').removeClass("used");
                $('.loopIcon').removeClass("looped");
            }

            let setPlaylistName = $('.getPlaylistID').text();
            for(playlists in SortedMusic){
                if(setPlaylistName == SortedMusic[playlists][0]){
                    let setPlaylist = copyArr(SortedMusic[playlists]);
                    setPlaylist.shift();
                    shufflePlaylist = shuffle(setPlaylist);
                    break;
                }
            }
            for(shuffledMusic in shufflePlaylist){
                if($('.songName').text() == shufflePlaylist[shuffledMusic]['name']){
                    $('.getMusicId').text(shuffledMusic);
                    break;
                }
            }

            $('.randomMusic').addClass('used');
            $('.loopIconY').addClass("loopedY");
            $('.musicSet').text("r");
            randomFlagMusic = 1;
        }
        else{
            $('.randomMusic').removeClass('used');
            $('.loopIconY').removeClass("loopedY");
            $('.musicSet').text("s");
            
            let playingList;
            let setPlaylistName = $('.getPlaylistID').text();
            for(playlistID in SortedMusic){
                if(SortedMusic[playlistID][0] == setPlaylistName){
                    playingList = SortedMusic[playlistID];
                    break;
                }
            }

            for(ListMusic in playingList){
                if($('.songName').text() == playingList[ListMusic]['name']){
                    $('.getMusicId').text(ListMusic);
                    break;
                }
            }


            randomFlagMusic = 0;
        }
    }

    changePlaylist = (playlist) =>{
        $('.getPlaylistID').text(playlist);
        localStorage.setItem('Music-Playlist',JSON.stringify(playlist));
        let setPlaylistName = $('.getPlaylistID').text();
        let playingList;
        for(playlistID in SortedMusic){
            if(SortedMusic[playlistID][0] == setPlaylistName){
                playingList = SortedMusic[playlistID];
                break;
            }
        }
        changeMusic(randomInt(1,playingList.length));
    }

    //todo компоненты

    let createPlayer = () =>{
        let musicIconList = [
            'headphones',
            'gamepad',
            'a',
            'music'
        ];

        //добавление кнопок плейлиста
        let playlistsArr = [];
        for(j in SortedMusic){
            let playlistName = SortedMusic[j][0];
            let playlistBtn = `
            <button onclick="changePlaylist('${playlistName}');" class="col-md-2 border-${ThemeSet.Primary} borderPrimary border music musicBig link-${ThemeSet.Primary} linkPrimary bgSecond bg-${ThemeSet.SecondBackground}">
                ${playlistName} <i class="fa-solid fa-${musicIconList[j]}"></i>
            </button>
            <button onclick="changePlaylist('${playlistName}');" class="col-4 border-${ThemeSet.Primary} borderPrimary border music musicSmall link-${ThemeSet.Primary} linkPrimary bgSecond bg-${ThemeSet.SecondBackground}">
                <i class="fa-solid fa-${musicIconList[j]}"></i>
            </button>
            `;
            playlistsArr.push(playlistBtn);
        }

        let player = $(`
            <div class="AudioPlayerSys border container bg-${ThemeSet.Background} bgBack border-${ThemeSet.Primary} borderPrimary row">
                <audio id="audio" class="col-md-6" src="" controls></audio>
                <h6 class="col-md-6 songName link-${ThemeSet.Primary} linkPrimary"></h6>
                <p class="link-${ThemeSet.Primary} linkPrimary col-md-2 col-sm-5 music-btns loop-btn"><i class="fa fa-arrows-rotate loopIcon" aria-hidden="true"></i></i></p>
                <p class="link-${ThemeSet.Primary} linkPrimary col-md-3 col-sm-5 music-btns randomMusic" onclick="setRandomMusic();"><i class="fa fa-shuffle loopIconY" aria-hidden="true"></i></i></p>
                <p class="link-${ThemeSet.Primary} linkPrimary col-md-3 col-sm-5 music-btns" onclick="stepChangeMusic('-');"><i class="fa fa-arrow-left" aria-hidden="true"></i></i></p>
                <p class="link-${ThemeSet.Primary} linkPrimary col-md-3 col-sm-5 music-btns" onclick="stepChangeMusic('+');"><i class="fa fa-arrow-right" aria-hidden="true"></i></i></p>
                <p class="getMusicId d-none"></p><p class="musicSet d-none">s</p><p class="getMusicPastID d-none"></p>
                <div class="playlistBlock">
                    ${playlistsArr.join('')}
                </div>
                <h5 class="getPlaylistID categoryName col-12 link-${ThemeSet.Primary} linkPrimary">Всё</h5>
            </div>
        `);
        player.appendTo('.app');
        $('.getPlaylistID').click(()=>{
            $('.playlistBlock').slideToggle();
        });
    }

    let createMusicLists = () =>{

        //добавление плейлисто
        let allPlaylists = [];
        for(let k = 0; k < SortedMusic.length-1;k++){
            let MusicListName = SortedMusic[k][0];
            let MusicList = SortedMusic[k];
            let MusicArr = [];
            for (let m = 1; m < MusicList.length; m++) {
                let MusicId = MusicList[m];
                let Music = `
                    <button class="border-${ThemeSet.Primary} borderPrimary border music linkPrimary bgSecond link-${ThemeSet.Primary} bg-${ThemeSet.SecondBackground}" onclick="changeMusicPanel('${MusicList[0]}','${m}');">${MusicId.name}</button>
                `;
                MusicArr.push(Music);
            }

            let musicListTab = `
                <div class="playlist col-md-4 col-sm-12">
                    <h4 class="music-list-name link-${ThemeSet.Primary} linkPrimary categoryName">${MusicListName}</h4>
                    <div class="music-list border-${ThemeSet.Primary} borderPrimary border" style="display:none;">
                        ${MusicArr.join('')}
                    </div>
                </div>
            `;
            allPlaylists.push(musicListTab)
        }

        let fullPlaylist = $(`
            <div class="playlist-tabs row">
                ${allPlaylists.join('')}
            </div>
        `);
        fullPlaylist.appendTo('.app');

        $('.categoryName').click((event) => {
			playlistSlider(event);
		});
    }

    let startLoadingPlaylist = () =>{
        if(localStorage.getItem('Music-Playlist') == undefined){
            localStorage.setItem('Music-Playlist',JSON.stringify("Всё"));
        }
        changePlaylist(JSON.parse(localStorage.getItem('Music-Playlist')));

    }


    FullMusicStart = () => {
        $('.AudioPlayerSys').remove();
        $('.playlist-tabs').remove();
        createPlayer();
        loopMusic();
        createMusicLists();
        autoChangeMusic();
        startLoadingPlaylist();
    }

});