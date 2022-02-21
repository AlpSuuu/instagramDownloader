## [instagramDownloader](https://github.com/AlpSuuu/instagramDownloader/)
basit bir instagram media indirme projesi.

## Lisans
[MIT License](https://github.com/AlpSuuu/instagramDownloader/blob/main/LICENSE)

## İndirme
<div align="center">
    <img src="https://komarev.com/ghpvc/?username=AlpSuuu&color=blue"/>
</div>  

```js
npm install instagram-url-downloader
git clone https://github.com/AlpSuuu/instagramDownloader.git
```
## Tanımlamlar
# Downloader ve Util class'larımızı tanımlıyoruz

```js
const { 
    downloader : Downloader,
} = require("instagram-url-downloader");
```
# Yeni bir downloader oluşturup url mizi giriyoruz
```js
let İnstagram = new Downloader("<instagram url sini girin>")
```
## Tanımlama işlemleri tamam

# Örnekler;

## kodu kullandığınız fonksiyon asenkron fonksiyon değilse await zorunluluğunu kaldırmak için bunu kullanın. await kullanmadığımız halde datayı çekmek için ayrıca bir süre beklemeniz gerekmiyor :)
 
```js
const { 
    downloader : Downloader,
    fetchUser : User,
    fetchStories : Stories,
    Util : Util,
    fetchHighlights : Highlights
} = require("./src/index");

const downloader = new Downloader("https://www.instagram.com/p/CZ99IqhFP80/");

/*
* Girmiş olduğunuz urlnin medyasını bir constructor olarak verir
* 
* @name downloader#Media
* @returns {Constructor}
*/
let media = downloader.Media;
//console.log(media)
//console.log(media.download())
//console.log(media.audioDownload())

/**
* Girmiş olduğunuz urlnin sahip olduğu kullanıcıyı bir constructor olarak verir
* 
* @name downloader#user
* @returns {Constructor}
*/
let user = downloader.getUser;
//console.log(user)
//console.log(user.downloadProfilePhoto())
//console.log(user.getStories)
//console.log(user.getStories.download())
//console.log(user.getHighlights)
//console.log(user.getHighlights.download())

/**
* Girmiş olduğunuz urlnin sahip olduğu kullanıcının hikayelerini constructor olarak verir
* 
* @name downloader#getUserStories
* @returns {Constructor}
*/
let userStories = downloader.getUserStories;
//console.log(userStories)
//console.log(userStories.download())
//console.log(userStories.audioDownload())

/**
* Girmiş olduğunuz isimdeki kullanıcının bilgilerini verir
* 
* @name User
* @returns {Constructor}
*/
let fetchedUser = User("alp.kahyaa")
//console.log(fetchedUser)
//console.log(fetchedUser.downloadProfilePhoto())
//console.log(fetchedUser.getStories)

/**
* Girmiş olduğunuz isimdeki kullanıcının hikaye bilgilerini verir
* 
* @name Stories
* @returns {Constructor}
*/
let stories = Stories("enesbatur")
//console.log(stories)
//console.log(stories.download())
//console.log(stories.audioDownload())

/**
* Girmiş olduğunuz isimdeki kullanıcının öne çıkarılan bilgilerini verir
* 
* @name Highlights
* @returns {Constructor}
*/
let highlights = Highlights("feriddemm")
//console.log(highlights)
//highlights.forEach(hl => console.log(hl.download()))
```

# TEST AŞAMASI

## Eğer projenizi çalıştırdığınız editörün consoluna erişiminiz varsa (okuma ve log tutma gibi) aşağıdaki verdiğim kodu bir dosya açıp içine atın daha sonra dosyayı çalıştırın.
```js
const Logger = Util.logger()

const logger = new Logger(process);


logger.oluştur({yazı : "Bilgilerine bakmak istediğiniz medyanın linkini giriniz...\r\n", ilkMesaj : true} , cevap_1=> {
    logger.oluştur({yazı : "Url nin verisini mi göndermemi istersin medyasını mı? lütfen sadece `veri` ya da `medya` olarak cevap verin!!!\r\n" , ilkMesaj : false}, cevap_2 => {
        if(!["veri" , "medya"].some(x => cevap_2 === x)) return console.log("lütfen sadece `medya` ya da `veri` yazınız!!!")

        let instagram = new Downloader(cevap_1.trim())

        if(cevap_2.toLowerCase() === "veri") console.log("Belirttiğiniz Urlnin bilgileri gönderiliyor...\n") , console.log(instagram.getData)
        if(cevap_2.toLowerCase() === "medya") console.log("Belirttiğiniz Urlnin Mediya bilgileri gönderiliyor...\n") , console.log(instagram.Media);
        
        console.log("Logger'ı kapatarak konsola serbest mesaj iznini açtım")

        logger.kapat()
    });
})
```
## Medya indirme örnek kodu
```js
var links = [
    "https://www.instagram.com/p/CZo8E9ZIGmq/",// ikisi karışık
    "https://www.instagram.com/p/CXGhz24j-jy/", // video 
    "https://www.instagram.com/p/CZklZk7N0yD/" // resim
];

for(var link of links) { // yukarıdaki dizimizi döndü içine sokarak her bir elementi teker teker çekiyoruz
    let İnstagram = new Downloader(link); // url mizi girerek yeni bir downloader oluşturuyoruz
    let media = İnstagram.Media; // url mizin medya verisini çekioruz
    
    console.log(media.download()) // ve bu Medyayı indiriyoruz

    // bu işlem tüm linkler için tekrar edicektir.
}
```
<h3>🌟 Bağlantılar!</h3>
<p align="center">
<a href="https://www.instagram.com/alp.kahyaa/" target"blank_"><img src="https://img.shields.io/badge/INSTAGRAM%20-DC3175.svg?&style=for-the-badge&logo=instagram&logoColor=white"></a>
<a href="https://twitch.tv/AlpSuuu" target"blank_"><img src="https://img.shields.io/badge/Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white"></a>
<a href="https://open.spotify.com/user/5ksbqa8t6kdo38dmfi8nof51z?si=7389677a8b2e44ed" target"blank_"><img src="https://img.shields.io/badge/Spotify%20-1ed760.svg?&style=for-the-badge&logo=spotify&logoColor=white"></a>
<a href="mailto:alpkahya868@gmail.com?body=Merhaba" target"blank_"><img src="https://img.shields.io/badge/Gmail-09ffeb?style=for-the-badge&logo=gmail&logoColor=white"></a>
<a href="https://discord.com/users/721391768255594577" target"blank_"><img src="https://img.shields.io/badge/Discord-ffbb00?style=for-the-badge&logo=discord&logoColor=white"></a>
<a href="https://alpsu-u-teala.glitch.me" target"blank_"><img src="https://img.shields.io/badge/Website-ff0004?style=for-the-badge&logo=google&logoColor=white"></a>
</p>

