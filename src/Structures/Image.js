"use strict";

const { default: axios } = require("axios");
const { default: Util } = require("../Utils/Util");

const fs = require("fs")

Util.prototyper(exports, "__esModule", { val: true });

class Image {
    /**
     * @name data 
     * @type {constructor}
     */
    constructor(data) {
        /**
         * Resimimizin atılma tarihi
         * @name Image#takenDate
         * @type {Date}
         */
        this.takenDate = void 0

        /**
         * Resimimizin Id'si
         * @name Image#ID
         * @type {Number}
         */
        this.ID = void 0;

        /**
         * @name Image#MediaType
         * @type {String}
         */
        this.MediaType = void 0;

        /**
         * Url mizin id'si 
         * @name Image#shortCode
         * @type {String}
         */
        this.shortCode = void 0;

        /**
         * Resmimize gelen yorum sayısı
         * @name Image#commentCount
         * @type {Number}
         */
        this.commentCount = void 0;

        /**
         * Resmimize gelen beğeni sayısı
         * @name Image#likeCount
         * @type {Number}
         */
        this.likeCount = void 0;

        /**
         * Resmimizin boyutları
         * @name Image#sizes
         * @type {Object}
         * 
         * @name Image#sizes#width - resmimizin genişliğü
         * @type {Number}
         * 
         * @name Image#sizes#height - resmimizin yüksekliği
         * @type {Number}
         */
        this.sizes = {
            width : void 0,
            height : void 0
        };

        /**
         * Resmimizi gönderen kullanıcının basit bilgileri.
         * @name Image#user
         * @type {Object}
         * 
         * <-------User Prototipleri------->
         * @name Image#user#ID - kullanıcı ıd
         * @type {Number}
         * 
         * @name Image#user#username - kullanıcı nickname
         * @type {String}
         * 
         * @name Image#user#fullname - kullanıcı profil ismi
         * @type {String}
         * 
         * @name Image#user#privateAcc - hesabın gizlilik durumu
         * @type {Boolean}
         * 
         * @name Image#user#profilePicture - hesabn pp si
         * @type {String}
         * 
         * @name Image#user#verified - hesabın onaylılık durumu
         * @type {Boolean}
         */
        this.user = {
            ID : void 0,
            username : void 0,
            fullname : void 0,
            privateAcc : void 0,
            profilePicture : void 0,
            verified : void 0,
        };

        /**
         * Resmimizin altyazısı
         * @name Image#caption
         * @type {Object}
         * 
         * @name Image#caption#ID - altyazı id 0
         * @type {String}
         * 
         * @name Image#caption#UserID - Altyazı sahibi kullanıcı id
         * @type {Number}
         * 
         * @name Image#caption#text - altyazı içerği
         * @type {String}
         */
        this.caption = {
            ID : void 0,
            UserID : void 0,
            text : void 0
        }

        /**
         * @name Image#Image - Resim kaynağı
         * @type {String}
         */
        this.Image = void 0

        /**
         * @name Image#synchronizer - Senkronizer
         * @type {Function}
         */


        /**
         * fonksiyonumuzu çağırıyoruz ki datayı kolaylıkla ayrıştıralım ve property leri tanımlayalım 
         */
        void this._create(data);
    }

    /**
     * @param {Function} _create
     * 
     * constructor'ı olluşturduğumuz fonksiyon
     * @param {Object} data 
     */
    _create(data) {
        this.takenDate = data.takenDate
        this.ID = data.ID;
        this.MediaType = "Image";
        this.shortCode = data.shortCode;
        this.commentCount = data.commentCount;
        this.likeCount = data.likeCount;
        this.sizes = {
            width : data.sizes.width,
            height : data.sizes.height
        };
        this.user = {
            ID : data.user.ID,
            username : data.user.username,
            fullname : data.user.fullname,
            privateAcc : data.user.privateAcc,
            profilePicture : data.user.profilePicture,
            verified : data.user.verified,
        };
        if(data.caption) this.caption = {
            ID : data.caption.ID,
            UserID : data.caption.UserID,
            text : data.caption.text
        }
        this.Image = data.Image
    }


    get synchronizer() {
        return new (Util.synchronizer());
    }
    
    /**
     * @name Image#createPath
     * Projeminizin dosyalarını tarar gerekli klasörler mevcut değilse açar mevcutsa ellemez
     * 
     * @param {String} mediaID - indirmek istediğimiz medyanın id'si (url - shortCode) 
     * @param {String | "Medias"} path - indireceğiniz klasör
     * 
     * @returns {Promise<void>}
     */
    createPath(mediaID , path = "Medias") {
        return new Promise((resolve , reject) => Util.awaiter(this , function* () {
            yield fs.access(path , (check) => { 
                if(check) fs.mkdir(path , (error) => {
                    if(error) reject.call(void 0 , error)
                })
            })
            yield fs.access(path+"\\"+mediaID , (check) => {
                if(check) fs.mkdir(path+"\\"+mediaID , (error) => {
                    if(error) reject.call(void 0 , error)
                    else resolve.call(void 0 , [process.cwd() , path ,mediaID, "Image.jpg"].join("\\"))
                }) 

                else resolve.call(void 0 , [process.cwd() , path ,mediaID, "Image.jpg"].join("\\"))
            })
        }))
    }

   /**
    * @name Image#download
    * 0. argümana belirttiğiniz dosyaya ya da default dosyasına (Medias) medyaları indirir
    * 
    * @param {String} $path - indireceğiniz klasör
    * @returns {Object} 
    */
    download($path = "Medias") {
        let { Image , shortCode , synchronizer , createPath } = this 
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath(shortCode , $path).then((path) => Util.awaiter(this , function*() {
                
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : Image , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });
    
                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }

    audioDownload() {
        return function (callback) {
            return callback    
        }.call(void 0 , { statusMessage : `Image media can't have sound!` , File : void 0});
    }
}

exports.default = Image;
