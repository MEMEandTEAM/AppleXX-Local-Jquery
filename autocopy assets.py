import os
import pyperclip as pcopy

MusicPath = "assets/music"

VideoPath = "assets/videos/"

ArtPath = "assets/images"


def copyMusic():
    MusicList = {
        "music": os.listdir(f"{MusicPath}/Музыка/"),
        "anime": os.listdir(f"{MusicPath}/Аниме/"),
        "games": os.listdir(f"{MusicPath}/Игры/"),
    }

    AllMusicList = []

    for musicType in MusicList:
        MusicDir = MusicList[musicType]
        for musicPath in MusicDir:
            if(musicPath.endswith(".mp3")):
                musicName = musicPath.replace(".mp3","")
                fullMusicStr = '{' + f"""
                type: [MusicType.all,MusicType.{musicType}], 
                name: "{musicName}",
                mp3: "{musicPath}", 
                type2: MusicType.{musicType},
                """ + '},'

                AllMusicList.append(fullMusicStr)

    pcopy.copy("".join(AllMusicList))

def copyVideo():
    VideoDir = os.listdir(VideoPath)

    AllVideoList = []

    for videoPath in VideoDir:
        if(videoPath.endswith(".mp4")):
            videoName = videoPath.replace(".mp4","")
            fullVideoStr = '{'+f"""
                name: "{videoName}",
                path: """ + "`${videoPath}"+ videoPath +"`\n\t},"
            AllVideoList.append(fullVideoStr)
    pcopy.copy("".join(AllVideoList))

def copyArt():
    ArtList = {
        "chars": os.listdir(f"{ArtPath}/chars/"),
        "fractions": os.listdir(f"{ArtPath}/fractions/"),
    }
    AllArtList = []

    for artType in ArtList:
        ArtDir = ArtList[artType]
        for artPath in ArtDir:
            if(artPath.endswith('.png')):
                artName = artPath.replace('.png','')

                fullArtStr = '{' + f"""
                    type: '{artType}',
                    name: '{artName}',
                    png: """ + "`${picPath}/"+ artType + "/" + artPath + "`\n\t},"
                AllArtList.append(fullArtStr)
    pcopy.copy(''.join(AllArtList))

while True:
    print("Меню:\n1.Скопировать музыку\n2.Скопировать видео\n3.Скопировать арты\n4.Выход")
    choice = int(input("Выберите число: "))
    match choice:
        case 1:
            copyMusic()
            print("Скопированно!\n")
        case 2:
            copyVideo()
            print("Скопированно!\n")
        case 3:
            copyArt()
            print("Скопированно!\n")
        case 4:
            print("Выходим...")
            break