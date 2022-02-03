## instagramDownloader
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
Util.awaiter(this , void 0 , void 0 , function* () {
    let İnstagram = yield new Downloader("https://www.instagram.com/p/CZW4UQQMlBp/")

    /**
     * Girmiş olduğunuz urlnin verilerini çeker ve size getirir
     * 
     * @name İnstagram#getData
     * @returns {Object}
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
