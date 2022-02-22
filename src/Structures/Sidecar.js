"use strict";
const { default: axios } = require("axios");
const { default: Util } = require("../Utils/Util");

const fs = require("fs")

Util.prototyper(exports, "__esModule", { val: true });

class Sidecar {
    /**
     * @name data 
     * @type {constructor}
     */
    constructor(data) {
        /**
         * Medyamızın atılma tarihi
         * @name Sidecar#takenDate
         * @type {Date}
         */
        this.takenDate = void 0

        /**
         * Medyamızın Id'si
         * @name Sidecar#ID
         * @type {Number}
         */
        this.ID = void 0;

        /**
         * @name Sidecar#MediaType
         * @type {String}
         */
        this.MediaType = void 0;

        /**
         * Url misin id'si
         * @name Sidecar#MediaType
         * @type {String}
         */
        this.shortCode = void 0;

        /**
         * Medyamızın yorum sayısı
         * @name Sidecar#commentCount
         * @type {Number}
         */
        this.commentCount = void 0;

        /**
         * Medyamızın like sayısı
         * @name Sidecar#likeCount
         * @type {Number}
         */
        this.likeCount = void 0;

        /**
         * Medyamızı gönderen kullanıcının basit bilgileri.
         * @name Sidecar#user
         * @type {Object}
         * 
         * <-------User Prototipleri------->
         * @name Sidecar#user#ID - kullanıcı ıd
         * @type {Number}
         * 
         * @name Sidecar#user#username - kullanıcı nickname
         * @type {String}
         * 
         * @name Sidecar#user#fullname - kullanıcı profil ismi
         * @type {String}
         * 
         * @name Sidecar#user#privateAcc - hesabın gizlilik durumu
         * @type {Boolean}
         * 
         * @name Sidecar#user#profilePicture - hesabn pp si
         * @type {String}
         * 
         * @name Sidecar#user#verified - hesabın onaylılık durumu
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
         * Medyamızı altyazısı
         * @name Sidecar#caption
         * @type {Object}
         * 
         * @name Sidecar#caption#ID - altyazı id 0
         * @type {String}
         * 
         * @name Sidecar#caption#UserID - Altyazı sahibi kullanıcı id
         * @type {Number}
         * 
         * @name Sidecar#caption#text - altyazı içerği
         * @type {String}
         */
         if(data.caption) this.caption = {
            ID : void 0,
            UserID : void 0,
            text : void 0
        };

        /**
         * Medyamızın resim,video sayısı
         * @name Sidecar#mediaSize
         * @type {Number}
         */
        this.mediaSize = void 0

        /**
         * Medyamızın resim,video bilgileri
         * @name Sidecar#medias
         * @type {Array<Object>}
         */
        this.medias = []

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
        this.MediaType = "Sidecar";
        this.shortCode = data.shortCode;
        this.commentCount = data.commentCount;
        this.likeCount = data.likeCount;
        this.user = {
            ID : data.user.ID,
            username : data.user.username,
            fullname : data.user.fullname,
            privateAcc : data.user.privateAcc,
            profilePicture : data.user.profilePicture,
            verified : data.user.verified,
        };
        this.caption = data.caption
        this.mediaSize = data.mediaSize
        this.medias = data.medias
    }


    get synchronizer() {
        return new (Util.synchronizer());
    }

    createPath(mediaID , path = "Medias", name) {
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
    * @name Sidecar#download
    * 0. argümana belirttiğiniz dosyaya ya da default dosyasına (Medias) medyaları indirir
    * 
    * @param {String} $path - indireceğiniz klasör
    * @returns {Array<Object>} 
    */
    download($path = "Medias") {
        let { medias , downloadVideo , downloadImage , shortCode , synchronizer , createPath } = this
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let arr = [];
            yield medias.forEach((media , index) => {
                if(media.type == "Video") return arr.push(downloadVideo(index , media , synchronizer , createPath , shortCode , $path));
                if(media.type == "Image") return arr.push(downloadImage(index , media , synchronizer , createPath , shortCode , $path));
            })

            callback.call(void 0 , arr)
        }))()
    }

    /**
     * @name Sidecar#downloadVideo
     * 
     * @param {Number} index - medyaları birbirinden ayırmak için kullandığımız için medyaların pozisyonları 
     * @param {Object} media - medyamızın bilgileri 
     * @param {Function} synchronizer - util de kullandığımız kendi senkronizerimiz 
     * @param {Function} createPath - Sidecar#createPath
     * @param {String} shortCode - Sidecar#shortCode
     * @param {String} $path - indireceğiniz klasör
     * 
     * @returns {Object}
     */
    downloadVideo(index , media , synchronizer , createPath , shortCode , $path) {
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath(shortCode , $path ,`Video(${index+1}).mp4`).then((path) => Util.awaiter(this , function*() {
                        
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : media.media , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });

                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }

   /**
    * @name Sidecar#downloadVideo
    * 
    * @param {Number} index - medyaları birbirinden ayırmak için kullandığımız için medyaların pozisyonları 
    * @param {Object} media - medyamızın bilgileri 
    * @param {Function} synchronizer - util de kullandığımız kendi senkronizerimiz 
    * @param {Function} createPath - Sidecar#createPath
    * @param {String} shortCode - Sidecar#shortCode
    * @param {String} $path - indireceğiniz klasör
    * 
    * @returns {Object}
    */
    downloadImage(index , media , synchronizer , createPath , shortCode , $path) {
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath(shortCode , $path , `Image(${index+1}).jpg`).then((path) => Util.awaiter(this , function*() {
                        
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : media.media , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });

                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }

   /**
    * @name Sidecar#audioDownload
    * 0. argümana belirttiğiniz dosyaya ya da default dosyasına (Medias) medyaların seslerini indirir
    * 
    * @param {String} $path - indireceğiniz klasör
    * @returns {Array<Object>} 
    */
    audioDownload($path = "Medias") {
        let { medias , downloadVideoAudio , shortCode , synchronizer , createPath } = this
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let arr = [];
            yield medias.forEach((media , index) => {
                if(media.type == "Video") return arr.push(downloadVideoAudio(index , media , synchronizer , createPath , shortCode , $path));
            })

            callback.call(void 0 , arr)
        }))()
    }

    /**
     * @name Sidecar#downloadVideoAudio
     * 
     * @param {Number} index - medyaları birbirinden ayırmak için kullandığımız için medyaların pozisyonları 
     * @param {Object} media - medyamızın bilgileri 
     * @param {Function} synchronizer - util de kullandığımız kendi senkronizerimiz 
     * @param {Function} createPath - Sidecar#createPath
     * @param {String} shortCode - Sidecar#shortCode
     * @param {String} $path - indireceğiniz klasör
     * 
     * @returns {Object}
     */
    downloadVideoAudio(index , media , synchronizer , createPath , shortCode , $path) {
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath(shortCode , $path ,`Video(${index+1})-audio.mp3`).then((path) => Util.awaiter(this , function*() {
                        
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : media.media , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });

                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }
}

exports.default = Sidecar;    
