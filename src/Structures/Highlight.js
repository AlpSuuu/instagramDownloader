"use strict";

const { default: axios } = require("axios");
const { default: Util } = require("../Utils/Util");

const fs = require("fs")

Util.prototyper(exports, "__esModule", { val: true });

class Highlight {
    /**
     * @name data 
     * @type {constructor}
     */
    constructor(data) {

       /**
        * @name Highlight#medias - Highlight ıd'si
        * @type {Number}
        */
        this.ID = void 0 

       /**
        * @name Highlight#title - Highlight başlığı
        * @type {String}
        */
        this.title = void 0 

       /**
        * @name Highlight#thumbnail - Highlight thumbnail
        * @type {String}
        */
        this.thumbnail = void 0 


       /**
        * @name Highlight#user - Highlight sahibi
        * @type {Object}
        */
        this.user = void 0 

       /**
         * @name Highlight#medias - Highlight medyaları
         * @type {Array<Object>}
         */
        this.medias = void 0 

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
        this.thumbnail = data.thumbnail 
        this.medias = data.medias
        this.title = data.title
        this.user = data.user
        this.ID = data.user
    }

    /**
     * @name Highlight#createPath
     * Projeminizin dosyalarını tarar gerekli klasörler mevcut değilse açar mevcutsa ellemez
     * 
     * @param {String} media - indirmek istediğimiz hikayenin id'si (url - shortCode) 
     * @param {String | "Medias"} path - indireceğiniz klasör
     * 
     * @returns {Promise<void>}
     */
    createPath(path = "Medias" , username , title , name) {
        return new Promise((resolve , reject) => Util.awaiter(this , function* () {
            yield fs.access(path+"\\"+username , (check) => {
                if(check) fs.mkdir(path ,(error) => {
                    if(error) fs.mkdir(path , (error) => {
                        if(error) fs.mkdir(path , () => {
                        })
                    })
                }) 
            })
            yield fs.access(path+"\\"+username , (check) => {
                if(check) fs.mkdir(path+"\\"+username, (error) => {
                    if(error) fs.mkdir(path+"\\"+username , (error) => {
                        if(error) fs.mkdir(path+"\\"+username , () => {
                        })
                    })
                }) 
            })
            yield fs.access(path+"\\"+username+"\\"+"Highlights" , (check) => {
                if(check) fs.mkdir(path+"\\"+username+"\\"+"Highlights" , (error) => {
                    if(error) fs.mkdir(path+"\\"+username+"\\"+"Highlights" , (error) => {
                        if(error) fs.mkdir(path+"\\"+username+"\\"+"Highlights" , () => {
                        })
                    })
                }) 
            })
            yield fs.access(path+"\\"+username+"\\"+"Highlights"+"\\"+title , (check) => {
                if(check) fs.mkdir(path+"\\"+username+"\\"+"Highlights"+"\\"+title , (error) => {
                    if(error) fs.mkdir(path+"\\"+username+"\\"+"Highlights"+"\\"+title , (error) => {
                        if(error) fs.mkdir(path+"\\"+username+"\\"+"Highlights"+"\\"+title , () => {
                            resolve.call(void 0 , [process.cwd() , path ,username,"Highlights",title,name].join("\\"))
                        })
                        else resolve.call(void 0 , [process.cwd() , path ,username,"Highlights",title,name].join("\\"))
                    })
                    else resolve.call(void 0 , [process.cwd() , path ,username,"Highlights",title,name].join("\\"))
                }) 
                else resolve.call(void 0 , [process.cwd() , path ,username,"Highlights",title,name].join("\\"))
            })
        }))
    }

   /**
    * @name Highlight#download
    * 0. argümana belirttiğiniz dosyaya ya da default dosyasına (Medias) Hikayeleri indirir
    * 
    * @param {String} $path - indireceğiniz klasör
    * @returns {Object} 
    */
    download($path = "Medias") {
        let { title , medias , downloadVideoHighlight , downloadImageHighlight , user : {username} , synchronizer , createPath } = this
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            if(!medias || !medias.length || !medias.length === 0) return callback.call(void 0 , { statusMessage : `account has no highlights!` , File : void 0})
            
            let arr = [];
            yield medias.forEach((media , index) => {
                if(media.type == "Video") return arr.push(downloadVideoHighlight($path , username , title , media.id , media.media , synchronizer , createPath));
                if(media.type == "Image") return arr.push(downloadImageHighlight($path , username , title , media.id , media.media , synchronizer , createPath));
            })

            callback.call(void 0 , arr)
        }))()
    }

    /**
     * @name Highlight#downloadVideoHighlight
     * 
     * @param {Number} index - hikayeleri birbirinden ayırmak için kullandığımız için hikayelerin pozisyonları 
     * @param {Object} media - hikayemizin bilgileri 
     * @param {Function} synchronizer - util de kullandığımız kendi senkronizerimiz 
     * @param {Function} createPath - Highlight#createPath
     * @param {String} username - Highlight#user#username
     * @param {String} $path - indireceğiniz klasör
     * 
     * @returns {Object}
     */
    downloadVideoHighlight($path , username , title , id , url , synchronizer , createPath) {
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath($path , username , title , `${id}.mp4`).then((path) => Util.awaiter(this , function*() {
                        
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : url , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });

                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }

    /**
     * @name Highlight#downloadImageHighlight
     * 
     * @param {Number} index - hikayeleri birbirinden ayırmak için kullandığımız için hikaye pozisyonları 
     * @param {Object} media - hikayanin bilgileri 
     * @param {Function} synchronizer - util de kullandığımız kendi senkronizerimiz 
     * @param {Function} createPath - Highlight#createPath
     * @param {String} username - Highlight#user#username
     * @param {String} $path - indireceğiniz klasör
     * 
     * @returns {Object}
     */
     downloadImageHighlight($path , username , title , id , url , synchronizer , createPath) {
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath($path , username , title , `${id}.jpg`).then((path) => Util.awaiter(this , function*() {
                        
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : url , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });

                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }
}

exports.default = Highlight;
