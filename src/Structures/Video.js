"use strict";
const { default: Util } = require("../Utils/Util");
const { default: axios } = require("axios");

const fs = require("fs")

Util.prototyper(exports, "__esModule", { val: true });

class Video {
    /**
     */
    constructor(data) {
        /**
         * Videdomuzun atılma tarihi
         * @name Video#takenDate
         * @type {Date}
         */
        this.takenDate = void 0

        /**
         * videomuzun Id'si
         * @name Video#ID
         * @type {Number}
         */
        this.ID = void 0;

        /**
         * @name Video#MediaType
         * @type {String}
         */
        this.MediaType = void 0;

        /**
         * Url mizin id'si
         * @name Video#shortCode
         * @type {String}
         */
        this.shortCode = void 0;

        /**
         * Videomuzun yorum sayısı
         * @name Video#commentCount
         * @type {Number}
         */
        this.commentCount = void 0;

        /**
         * Videomuzun bepğeni sayısı
         * @name Video#likeCount
         * @type {Number}
         */
        this.likeCount = void 0;

        /**
         * Videomuzun boyutları
         * @name Video#sizes
         * @type {Object}
         * 
         * @name Video#sizes#width - Videomuzun genişliğü
         * @type {Number}
         * 
         * @name Video#sizes#height - Videomuzun yüksekliği
         * @type {Number}
         */
         this.sizes = {
            width : void 0,
            height : void 0
        };
        
        /**
         * Videomuzu gönderen kullanıcının basit bilgileri.
         * @name Video#user
         * @type {Object}
         * 
         * <-------User Prototipleri------->
         * @name Video#user#ID - kullanıcı ıd
         * @type {Number}
         * 
         * @name Video#user#username - kullanıcı nickname
         * @type {String}
         * 
         * @name Video#user#fullname - kullanıcı profil ismi
         * @type {String}
         * 
         * @name Video#user#privateAcc - hesabın gizlilik durumu
         * @type {Boolean}
         * 
         * @name Video#user#profilePicture - hesabn pp si
         * @type {String}
         * 
         * @name Video#user#verified - hesabın onaylılık durumu
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
         * Videomuzu altyazısı
         * @name Video#caption
         * @type {Object}
         * 
         * @name Video#caption#ID - altyazı id
         * @type {String}
         * 
         * @name Video#caption#UserID - Altyazı sahibi kullanıcı id
         * @type {Number}
         * 
         * @name Video#caption#text - altyazı içerği
         * @type {String}
         */
         if(data.caption) this.caption = {
            ID : void 0,
            UserID : void 0,
            text : void 0
        }

        /**
         * Videomuzun kaynağı
         * @name Video#Video
         * @type {Object}
         * 
         * @name Video#Video#width - veideomuzun genişliği
         * @type {Object}
         * 
         * @name Video#Video#height - videomuzun yüksekliği 
         * @type {String}
         * 
         * @name Video#Video#url - veideomuzun url si
         * @type {Number}
         */
        this.Video = {
            width : void 0,
            height : void 0,
            url : void 0,
        }

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
        this.MediaType = "Video";
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
        this.caption = data.caption
        this.Video = {
            width : data.Video.width,
            height : data.Video.height,
            url : data.Video.url,
        }
    }

    get synchronizer() {
        return new (Util.synchronizer());
    }
    
    /**
     * @name Video#createPath
     * Projeminizin dosyalarını tarar gerekli klasörler mevcut değilse açar mevcutsa ellemez
     * 
     * @param {String} mediaID - indirmek istediğimiz medyanın id'si (url - shortCode) 
     * @param {String | "Medias"} path - indireceğiniz klasör
     * 
     * @returns {Promise<void>}
     */
    createPath(mediaID , path = "Medias" , name) {
        return new Promise((resolve , reject) => Util.awaiter(this , function* () {
            yield fs.access(path , (check) => { 
                if(check) fs.mkdir(path , (error) => {
                    if(error) reject.call(void 0 , error)
                })
            })
            yield fs.access(path+"\\"+mediaID , (check) => {
                if(check) fs.mkdir(path+"\\"+mediaID , (error) => {
                    if(error) reject.call(void 0 , error)
                    else resolve.call(void 0 , [process.cwd() , path ,mediaID, name].join("\\"))
                }) 

                else resolve.call(void 0 , [process.cwd() , path ,mediaID, name].join("\\"))
            })
        }))
    }

    /**
     * 0. argümana belirttiğiniz dosyaya ya da default dosyasına (Medias) medyaları indirir
     * 
     * @param {String} $path - indireceğiniz klasör
     * @returns {Object} 
     */
    download($path = "Medias") {
        let { Video , shortCode , synchronizer , createPath } = this 
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath(shortCode , $path , "Video.mp4").then((path) => Util.awaiter(this , function*() {
                
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : Video.url , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });
    
                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }

    /**
     * 0. argümana belirttiğiniz dosyaya ya da default dosyasına (Medias) medyanın sesini indirir
     * 
     * @param {String} $path - indireceğiniz klasör
     * @returns {Object} 
     */
    audioDownload($path = "Medias") {
        let { Video , shortCode , synchronizer , createPath } = this 
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath(shortCode , $path, "Audio.mp3").then((path) => Util.awaiter(this , function*() {
                
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : Video.url , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });

                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }
}

exports.default = Video;    
