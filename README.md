## [instagramDownloader 😋](https://www.npmjs.com/package/instagram-url-downloader)
basit bir instagram media indirme projesi.

## Lisans
[MIT License](https://github.com/AlpSuuu/instagramDownloader/blob/main/LICENSE)

## İndirme
<div align="center">
    <img src="https://komarev.com/ghpvc/?username=AlpSuuu&color=blue"/>
    <img src="https://img.shields.io/npm/dt/instagram-url-downloader.svg?maxAge=3600"/>
    <img src="https://img.shields.io/badge/Unpacked%20Size-2.21%20MB-brightgreen"/>
    <img src="https://img.shields.io/npm/v/instagram-url-downloader?label=lasted%20version"/>
    <img src="https://img.shields.io/npm/l/instagram-url-downloader"/>
</div>  

```
npm install instagram-url-downloader
git clone https://github.com/AlpSuuu/instagramDownloader.git
```

## Tanımlamlar
# Downloader ve Util class'larımızı tanımlıyoruz

```js
const Downloader = require("instagram-url-downloader").default;
const Util = require("instagram-url-downloader").Util;
```
# Yeni bir downloader oluşturup url mizi giriyoruz
```js
let İnstagram = new Downloader("https://www.instagram.com/p/CZW4UQQMlBp/")
```
# tanımlama işlemleri tamam 👌

# Örnekler;

## kodu kullandığınız fonksiyon asenkron fonksiyon değilse await zorunluluğunu kaldırmak için bunu kullanın . await kullanmadığımız halde datayı çekmek için ayrıca bir süre beklemeniz gerekmiyor 😋

```js
/**
 * Girmiş olduğunuz urlnin medya tipini verir
 * @example video | image | sidecar;
 * 
 * @name İnstagram#MediaType
 * @returns {String}
 */
let MediaType = İnstagram.MediaType;
/**
 * Girmiş olduğunuz urlnin verilerini çeker ve size getirir
 * 
 * @name İnstagram#getData
 * @returns {Object}
 */
let getData = İnstagram.getData;
/**
 * Girmiş olduğunuz urlnin medyasını bir constructor olarak verir
 * 
 * @name İnstagram#Media
 * @returns {Constructor}
 */
let Media = İnstagram.Media;
/**
 * Girmiş olduğunuz urlnin medyasını indirir
 * 
 * @name İnstagram#Media#download
 * 
 * @returns {Object}
 */
 let downloaded = İnstagram.Media.download();
```

## ya da aynı kodu aşağıdaki gibi kendi "awaiter" ımızı kullanarak yapabiliriz. Fakat awaiter'ımızda yield ettiğimiz değerler sadece jeneratör fonksiyonumuzun içinde tanımlanıyor

```js
Util.awaiter(this, function* () {
    let İnstagram = yield new Downloader("https://www.instagram.com/p/CZW4UQQMlBp/")
    /**
     * Girmiş olduğunuz urlnin verilerini çeker ve size getirir
     * 
     * @name İnstagram#getData
     * @returns {Promise<void>}
     */
    let getData = yield İnstagram.asyncData;
    /**
     * Girmiş olduğunuz urlnin medya tipini verir
     * @example video | image | sidecar;
     * 
     * @name İnstagram#MediaType
     * @returns {String}
     */
    let MediaType = İnstagram.MediaType;
    /**
     * Girmiş olduğunuz urlnin medyasını bir constructor olarak verir
     * 
     * @name İnstagram#Media
     * @returns {Constructor}
     */
    let Media = İnstagram.Media;
    
    /**
    * Girmiş olduğunuz urlnin medyasını indirir
    * 
    * @name İnstagram#Media#download
    * 
    * @returns {Object}
    */
    let downloaded = İnstagram.Media.download();
})
``` 

## Yukaradaki örneğimizde olduğu gibi awaiter'ımızı kullanarak yield ile yakaladığımız Promise çözümleri yalnızca jeneratör fonksiyon bloğu içinde tanımlayabiliyorduk

## Peki ya yakaladığımız Promise çözümlerini, jeneratör fonksiyon bloğunun dışına nasıl çıkaracağız??

## Aşağıda gösterdiğim örnek ile yakaladığımız promise çözümlerini jeneratör fonksiyon bloğunun dışına çıkarıp tanımlayabilirsiniz. ❤️😎
```js
const synchronizer = new (Util.synchronizer());
let instagramData = synchronizer.async(callback => Util.awaiter(this , function*() {
    /**
     * Girmiş olduğunuz urlnin verilerini çeker ve size getirir
     * 
     * @name İnstagram#getData
     * @returns {Promise<void>}
     */
    let Data = yield İnstagram.asyncData;
    callback.call(void 0 , Data);
})).call(void 0)

console.log(instagramData) // output : Object { ... } - İnstagramData
```

# TEST AŞAMASI
## Eğer projenizi çalıştırdığınız editörün consoluna erişiminiz varsa (okuma ve log tutma gibi) aşağıdaki verdiğim kodu bir dosya açıp içine atın daha sonra dosyayı çalıştırın.

### Deneme Kodu;

```js
const Logger = Util.logger()
let logger = new Logger(process);
logger.oluştur({yazı : "Bilgilerine bakmak istediğiniz medyanın linkini giriniz...\r\n", ilkMesaj : true} , cevap_1=> {
    logger.oluştur({yazı : "Url nin verisini mi göndermemi istersin medyasını mı? lütfen sadece `veri` ya da`medya`olarakverin!!!\r\n",ilkMesaj : false}, cevap_2 => {
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

## Tüm işlemler tamam yukarıdaki kodu kullanarak aşağıdaki [Video](https://user-images.githubusercontent.com/67225902/152855939-18552b76-543b-4ff3-8587-ca8e08880df7.mp4)'da olduğu gibi kodunuzu test edebilirsiniz...! Not: "Medya" ve "Veri" bilgilerini çekerken 5 sn kadar beklemelisiniz.
https://user-images.githubusercontent.com/67225902/152855939-18552b76-543b-4ff3-8587-ca8e08880df7.mp4

# Bitti mi Bitmedi!!!!
### Util'imizdeki işinize yarayabilecek fonksiyonları aşağıda örnek kodlarıyla birlikte belirttim <3 inceleyiniz!!;

## Prototyper
```js
const Util = new require("instagram-url-downloader").Util;
let object = new Object({})
console.log(object) /* output : {} - boş object*/
/**
 * Util.prototyper
 * 
 * @param {Object} arguments[0] bu kısma özellik eklemek istediğiniz objeyi giriniz
 * @param {String} arguments[1] - bu kısma objemize eklemek istediğiniz özelliğin adını girin
 * @param {String} arguments[2] - bu kısma özelliğimiz için tanım objesi buraya berlittiğiniz değerleri`val` olarak girin`!
 */
Util.prototyper(object , "alpsu" , {
    val : "adamın dibiiii <3"
}) // burada "object" adlı objemize "alpsu" adında bir özellik ekliyoruz ve bu özellik bize "adamın dibiiii <3" değerini döndürüyor <3
Util.prototyper(object , "alpsu_adam_mı" , {
    val : true
}) // burada "object" adlı objemize "alpsu_adam_mı" adında bir özellik ekliyoruz ve bu özellik bize Boolean(true) değerini döndürüyor <3
console.log(object) // output : { alpsu: 'adamın dibiiii <3', 'alpsu_adam_mı': true }
/**
 * İlla bir obje oluşturup ona özellik eklememize gerek yok bir constructor'ın prototipi arasında da bir özellik ekleyebilirsinix
 * 
 * ayrıca eklediğimiz özellik bir String veya Boolean olmasına gerek yok! bir fonksiyon, sınıf, obje, promise... her şey olabilir <3
 */
Util.prototyper(Array.prototype , "değerSayısı" , {
    val : function değerSayısı() {
        return this.length;
    }
})//burada "Array.prototype" adlı objemize "değerSayısı" adında bir özellik ekliyoruz ve bu özellik bize Fonksiyon döndürüyor <3
console.log(["a" , "l" , "p" , "s" , "u" , "<3"].değerSayısı()) // output : 6 
```
## Awaiter
```js
const Util = new require("instagram-url-downloader").Util;
/**
 * Bir promise fonksiyonu belirtiyoruz ki awaiter'ımız ile await kullanmadan değeri çekebilelim.
 * @returns {Promise<void>}
 */
function promiseFunc() {
    return new Promise((res , rej) => res("alpsu <3"));
}
/**
 * Util.awaiter
 * 
 * @param {Object} arguments[0] - bu kısma kodu çalıştırdığınız dosyanızı yazınız (this yazmanız yeterli)
 * @param {GeneratorFunction} arguments[1] - bu kısma bir generatör fonksiyon giriniz
 * 
 * awaiter'ımızda aşağıda benim kullandığım gibi kullanın başka bir şey eklemeyin!!!
 */
Util.awaiter(this , function* gen() {
    let value = yield promiseFunc.call(void 0);
    console.log(value) // output : "alpsu <3"
})
```
## Logger
```js
const Util = new require("instagram-url-downloader").Util;
const Logger = Util.logger()
let logger = new Logger(process);
/**
 * CAPTCHA için kod oluşturucu
 * @returns {String}
 */
function kodGen(){
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),b = [];  
    for (var i=0; i<6; i++) { var j = (Math.random() * (a.length-1)).toFixed(0); b[i] = a[j]; }
    return b;
}
let kod = kodGen()
let hatalıGiriş = 0;
let cevaplar = [];
/**
 * Util.logger
 * 
 * @param {Object} arguments[0] - bir objenin içinde "yazı" ve "ilkMesaj" değerlerini yazın
 * 
 * @param {String} arguments[0].yazı - consol'a göndermek istediğiniz mesaj 
 * @param {Boolean} arguments[0].ilkMesaj - gönderilen mesajdan sonra manuel olarak gönderilen mesaj(lar)
 * eğer bu değeri true olarak belirtirseniz gönderdiğimiz mesaj'dan sonra yazılan ilk mesajı döndürür
 * eğer false olarak belirtirseniz gönderdiğimiz mesaj'dan sonra yazılan tüm mesajları döndürür
 * 
 * @param {Function} arguments[1] - bu kısma bir fonksiyon giriniz, fonksiyon çağırıldığında değer göndürecek
 * 
 * ÖNEMLİ: aşağıdaki iç içe logger'lar kullanacaksınız en içtekinin "ilkMesaj" değeri `false` diğerleri true olmalıdır!!!
 * > iç içe kullanmanızı tavsite etmem , kullanacaksanız da aşağıdaki gibi kullanmaya özen gösterin! 
 */
logger.oluştur({yazı : "Hoşgeldiniz lütfen isminizi giriniz\r\n", ilkMesaj: true} ,function(cevap) {
    logger.oluştur({yazı : "Hoşgeldiniz : "+`\x1b[32m${cevap}\x1b[0m`+" Bey\n"+`Lütfen şuanda mavi renkle gördüğünüz 6 haneli kodu arasında "-" olmadan konsola yazın!\n\n`+`\x1b[44m${`- KOD : ${kod.join("-")}`}\x1b[0m`+"\n",ilkMesaj : false},cevap_2 => {
        if(cevap_2.toLowerCase() !== kod.join("").toLowerCase()) { 
            if(hatalıGiriş < 3) console.log(`\x1b[41mHatalı giriş yaptınız lütfen kodu tekrar girin..! Kalan hakkınız ${3 - hatalıGiriş}\x1b[0m`)
            if(hatalıGiriş >= 3) console.log(`\x1b[41m3 kere hatalı girdiniz! Kimliğiniz Doğrulanamadı!\x1b[0m`) , logger.kapat()
            hatalıGiriş += 1;
            return;
        }
        if(cevap_2.toLowerCase() == kod.join("").toLowerCase()) console.log(`\x1b[32mDoğrulamayı başarıyla tamamladınız. erişiminiz açıldı. ${cevap} bey\x1b[0m`)
        logger.kapat()
    });
});
```
https://user-images.githubusercontent.com/67225902/153280783-bda064ec-a287-4b4b-a635-a10828ff1b74.mp4

<h3>🌟 Bağlantılar!</h3>
<p align="center">
<a href="https://www.instagram.com/alp.kahyaa/" target"blank_"><img src="https://img.shields.io/badge/INSTAGRAM%20-DC3175.svg?&style=for-the-badge&logo=instagram&logoColor=white"></a>
<a href="https://discord.com/users/721391768255594577" target"blank_"><img src="https://img.shields.io/badge/Discord-ffbb00?style=for-the-badge&logo=discord&logoColor=white"></a>
<a href="https://alpsu-u-teala.glitch.me" target"blank_"><img src="https://img.shields.io/badge/Website-ff0004?style=for-the-badge&logo=google&logoColor=white"></a>
</p>
