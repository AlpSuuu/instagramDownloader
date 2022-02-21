"use strict";

const { default: axios } = require("axios");
const { default: Util } = require("../Utils/Util");

const fs = require("fs")

Util.prototyper(exports, "__esModule", { val: true });

class Stories {
    /**
     * @name data 
     * @type {constructor}
     */
    constructor(data) {
        /**
         * Story'i gönderen kullanıcının basit bilgileri.
         * @name Stories#user
         * @type {Object}
         * 
         * <-------User Prototipleri------->
         * @name Stories#user#ID - kullanıcı ıd
         * @type {Number}
         * 
         * @name Stories#user#username - kullanıcı nickname
         * @type {String}
         * 
         * @name Stories#user#fullname - kullanıcı profil ismi
         * @type {String}
         * 
         * @name Stories#user#privateAcc - hesabın gizlilik durumu
         * @type {Boolean}
         * 
         * @name Stories#user#profilePicture - hesabn pp si
         * @type {String}
         */
        this.user = {
            ID : void 0,
            username : void 0,
            fullName : void 0,
            privateAcc : void 0,
            profilePicture : void 0,
        }

        /**
         * @name Stories#stories - story medyaları
         * @type {Array<Object>}
         */
        this.stories = void 0 

        /**
         * fonksiyonumuzu çağırdık
         */
        void this._create(data);
    }

    get synchronizer() {
        return new (Util.synchronizer());
    }

    /**
     * @param {Function} _create
     * 
     * constructor'ı olluşturduğumuz fonksiyon
     * @param {Object} data 
     */
    _create(data) {
        this.user = {
            ID : data.user.ID,
            username : data.user.username,
            fullName : data.user.fullName,
            privateAcc : data.user.privateAcc,
            profilePicture : data.user.profilePicture,
        }

        this.stories = data.stories
    }

    /**
     * @name Story#createPath
     * Projeminizin dosyalarını tarar gerekli klasörler mevcut değilse açar mevcutsa ellemez
     * 
     * @param {String} media - indirmek istediğimiz hikayenin id'si (url - shortCode) 
     * @param {String | "Medias"} path - indireceğiniz klasör
     * 
     * @returns {Promise<void>}
     */
    createPath(media , path = "Medias" , name) {
        return new Promise((resolve , reject) => Util.awaiter(this , function* () {
            yield fs.access(path , (check) => { 
                if(check) fs.mkdir(path , (error) => {
                    if(error) reject.call(void 0 , error)
                })
            })
            yield fs.access(path+"\\"+media , (check) => {
                if(check) fs.mkdir(path+"\\"+media , (error) => {
                    if(error) reject.call(void 0 , error)
                    else resolve.call(void 0 , [process.cwd() , path ,media, name].join("\\"))
                }) 

                else resolve.call(void 0 , [process.cwd() , path ,media, name].join("\\"))
            })
        }))
    }

   /**
    * @name Story#download
    * 0. argümana belirttiğiniz dosyaya ya da default dosyasına (Medias) Hikayeleri indirir
    * 
    * @param {String} $path - indireceğiniz klasör
    * @returns {Object} 
    */
    download($path = "Medias") {
        let { stories , downloadVideoStory , downloadImageStory , user : {username} , synchronizer , createPath } = this
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            if(!stories || stories.length === 0) return callback.call(void 0 , { statusMessage : `story not available!` , File : void 0})
            let arr = [];
            yield stories.forEach((media , index) => {
                if(media.type == "Video") return arr.push(downloadVideoStory(index , media , synchronizer , createPath , username , $path));
                if(media.type == "Image") return arr.push(downloadImageStory(index , media , synchronizer , createPath , username , $path));
            })

            callback.call(void 0 , arr)
        }))()
    }
    
    /**
     * @name Story#downloadVideoStory
     * 
     * @param {Number} index - hikayeleri birbirinden ayırmak için kullandığımız için hikayelerin pozisyonları 
     * @param {Object} media - hikayemizin bilgileri 
     * @param {Function} synchronizer - util de kullandığımız kendi senkronizerimiz 
     * @param {Function} createPath - Story#createPath
     * @param {String} username - Story#user#username
     * @param {String} $path - indireceğiniz klasör
     * 
     * @returns {Object}
     */
    downloadVideoStory(index , media , synchronizer , createPath , username , $path) {
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath(username , $path ,`Story-${media.media.code}.mp4`).then((path) => Util.awaiter(this , function*() {
                        
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : media.media.url , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });

                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }

    /**
     * @name Story#downloadImageStory
     * 
     * @param {Number} index - hikayeleri birbirinden ayırmak için kullandığımız için hikaye pozisyonları 
     * @param {Object} media - hikayanin bilgileri 
     * @param {Function} synchronizer - util de kullandığımız kendi senkronizerimiz 
     * @param {Function} createPath - Story#createPath
     * @param {String} username - Story#user#username
     * @param {String} $path - indireceğiniz klasör
     * 
     * @returns {Object}
     */
    downloadImageStory(index , media , synchronizer , createPath , username , $path) {
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath(username , $path ,`Story-${media.media.code}.jpg`).then((path) => Util.awaiter(this , function*() {
                        
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : media.media.url , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });

                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }

   /**
    * @name Story#audioDownload
    * 0. argümana belirttiğiniz dosyaya ya da default dosyasına (Medias) hikayelerin seslerini indirir
    * 
    * @param {String} $path - indireceğiniz klasör
    * @returns {Object} 
    */
    audioDownload($path = "Medias") {
        let { stories , downloadVideoStoryAudio , user : {username} , synchronizer , createPath } = this
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            if(!stories || stories.length === 0) return callback.call(void 0 , { statusMessage : `story not available!` , File : void 0})
            let arr = [];
            yield stories.forEach((media , index) => {
                if(media.type == "Video") return arr.push(downloadVideoStoryAudio(index , media , synchronizer , createPath , username , $path));
            })

            callback.call(void 0 , arr)
        }))()
    }

    /**
     * @name Story#downloadVideoStoryAudio
     * 
     * @param {Number} index - hikayeleri birbirinden ayırmak için kullandığımız için hikayelerin pozisyonları 
     * @param {Object} media - hikayemizin bilgileri 
     * @param {Function} synchronizer - util de kullandığımız kendi senkronizerimiz 
     * @param {Function} createPath - Story#createPath
     * @param {String} username - Story#user#username
     * @param {String} $path - indireceğiniz klasör
     * 
     * @returns {Object}
     */
     downloadVideoStoryAudio(index , media , synchronizer , createPath , username , $path) {
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath(username , $path ,`Audio-${media.media.code}.mp3`).then((path) => Util.awaiter(this , function*() {
                        
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : media.media.url , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });

                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }
}

exports.default = Stories;
