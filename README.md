## [instagramDownloader 😋](https://github.com/AlpSuuu/instagramDownloader/)
basit bir instagram media indirme projesi.

## Lisans
[MIT License](https://github.com/AlpSuuu/instagramDownloader/blob/main/LICENSE)

## Tanımlamlar
# Downloader ve Util class'larımızı tanımlıyoruz

```js
const Downloader = require("./src/index").default;
const Util = require("./src/index").Util;
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
})
``` 

## Yukaradaki örneğimizde olduğu gibi awaiter'ımızı kullanarak yield ile yakaladığımız Promise çözümleri yalnızca jeneratör fonksiyon bloğu içinde tanımlayabiliyorduk

## Peki ya yakaladığımız Promise çözümlerini nasıl jeneratör fonksiyon bloğunun dışına nasıl çıkaracağız??

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
const Downloader = require("./src/index").default;
const Util = new require("./src/index").Util;
const Logger = Util.logger()


let logger = new Logger(process);


logger.oluştur("Bilgilerine bakmak istediğiniz medyanın linkini giriniz...\r\n" , cevap_1=> {
    logger.oluştur("Url nin verisini mi göndermemi istersin medyasını mı? lütfen sadece `veri` ya da `medya` olarak cevap verin!!!\r\n" , cevap_2 => {
        if(!["veri" , "medya"].some(x => cevap_2 === x)) return console.log("lütfen sadece `medya` ya da `veri` yazınız!!!")

        let instagram = new Downloader(cevap_1.trim())

        if(cevap_2.toLowerCase() === "veri") console.log("Belirttiğiniz Urlnin bilgileri gönderiliyor...\n") , console.log(instagram.getData);
        if(cevap_2.toLowerCase() === "medya") console.log("Belirttiğiniz Urlnin Mediya bilgileri gönderiliyor...\n") , console.log(instagram.Media);

        logger.kapat()
    });
})
```

## Tüm işlemler tamam yukarıdaki kodu kullanarak aşağıdaki [Video](https://user-images.githubusercontent.com/67225902/152855939-18552b76-543b-4ff3-8587-ca8e08880df7.mp4)'da olduğu gibi kodunuzu test edebilirsiniz...! Not: "Medya" ve "Veri" bilgilerini çekerken 5 sn kadar beklemelisiniz.
https://user-images.githubusercontent.com/67225902/152855939-18552b76-543b-4ff3-8587-ca8e08880df7.mp4

# Bitti mi Bitmedi!!!!
### Util'imizdeki işinize yarayabilecek fonksiyonları aşağıda örnek kodlarıyla birlikte belirttim <3 inceleyiniz!!;

## Prototyper
```js
const Util = new require("./src/index").Util;

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
const Util = new require("./src/index").Util;

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



