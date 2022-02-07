'use strict';
const Util = require("./Utils/Util").default
const İnstagramError = require("./Utils/Error").default;

const synchronizer = new (Util.synchronizer());

//structures larımız
const Image = require("./Structures/Image").default
const Video = require("./Structures/Video").default
const Sidecar = require("./Structures/Sidecar").default

//databasemiz
const Database = require("./Utils/Database/Database").default;

const İnstagramDatabase = new Database()

void Util.prototyper(exports, "__esModule", { val: true });

/**
 * girdiğiniz url nin bilgilerini verir ve indirmenizi sağlar
 * 
 * @param {String} url - bilgilerini istediğiniz instagram urlsi
 */
class İnstagramDownloader  {
    constructor(URL , Options) {
        //super()

        /**
         * @name İnstagramDownloader#url
         * @type {String}
         */
        this.url = URL

        /**
         * @name İnstagramDownloader#options
         * @type {Object}
         */
        this.options = Options || { Path : "./" }

        /**
         * @name İnstagramDownloader#path
         * @type {String}
         */
        this.path = this.options?.Path || "./"

        void Util.checkİnstagramURL(URL);
        //void this._getData(this.VideoID);

        /**
         * @name İnstagramDownloader#databases
         * @type {Database}
         */
        this.databases = İnstagramDatabase
    }

    /**
     * girdiğimiz instagram urlsinin datasını çektiğimiz kısım kendi databasemize kaydediyoeuz ki await kullanmadan datayı internetten deil kendi databasemizden çekiyoruz
     * 
     * @param {String} ID - videomuzun idsi  
     * @returns {Promise<void>}
     */
    _getData(ID = this.VideoID) {
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let url = Util.createNewURL(ID)
            let { data } = yield Util.fetcher.get(url);

            if(!data || !data?.items) throw new İnstagramError(`no data found for "${ID}"` , "HttpError")

            callback.call(void 0 , !data?.items)
            İnstagramDatabase.set(ID , data.data.items[0])
        }))()
    }

    /**
     * @returns {String}
     */
    get Url() {
        let currentUrl = String(this.url.split("?utm")[0]);
        if (currentUrl.slice(-1) != "/") currentUrl += "/";
        currentUrl += "?__a=1";
        
        return currentUrl
    }

    /**
     * girmiş olduğunuz instagram urlsinin Idsini verir
     * 
     * @returns {String}
     */
    get VideoID() {
        let URL = String(this.Url.split("/?__a=1")[0]);
        URL = URL.split("/")[URL.split("/").length - 1]
        
        return URL
    }


    /**
     * girmiş olduğunuz instagram urlsinin bilgilerini verir
     * 
     * @returns {Promise<void>}
     */
    get asyncData() {
        let url = this.Url
        return new Promise((resolveData , reject) => Util.awaiter(this , function* () {
            let { data:{ items } } = yield Util.fetcher.get(Util.FixedUrl(url)).catch(() => { });
            if(!items) return reject("bulunamadı");

            resolveData(items)
        }))
    }

    /**
     * girmiş olduğunuz instagram urlsinin bilgilerini verir
     * 
     * @returns {Object}
     */
    get getData() {
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let ID = this.VideoID
            let url = Util.createNewURL(ID)
            let { data } = yield Util.fetcher.get(url);

            if(!data || !data?.items) throw new İnstagramError(`no data found for "${ID}"` , "HttpError")

            callback.call(void 0 , data?.items[0])
            İnstagramDatabase.delete(ID)
        }))()
    }

    /**
     * girmiş olduğunuz instagram urlsinin medya türünü verir
     * 
     * @returns {<image> | <video> | <sidecar>)}
     */
    get MediaType() {
        let TypeObj = {};

        void Util.prototyper(TypeObj , 1 , { val : "image"})
        void Util.prototyper(TypeObj , 2 , { val : "video"})
        void Util.prototyper(TypeObj , 8 , { val : "sidecar"})
        

        return TypeObj[this.getData.media_type]
    }

    /**
     * girmiş olduğunuz instagram urlsinin sahip olduğunu medyayı verir
     * 
     * @returns {Image | Sidecar | Video)}
     */
    get Media() {
        let data = this.getData;
        let type = this.MediaType;

        switch(type) {
            case "image": {
                return new Image({
                    takenDate : (new Date(data.taken_at)).toLocaleDateString('en-GB'),
                    ID : data.pk,
                    MediaType : type,
                    shortCode : data.code,
                    commentCount : data.like_count,
                    likeCount : data.comment_count,
                    sizes : {
                        width : data.original_width,
                        height : data.original_height
                    },
                    user : {
                        ID : data.user.pk,
                        username : data.user.username,
                        fullname : data.user.full_name,
                        privateAcc : Boolean(data.user.is_private),
                        profilePicture : data.user.profile_pic_url,
                        verified : data.user.is_verified,
                    },
                    caption : {
                        ID : data.caption.pk,
                        UserID : data.caption.user_id,
                        text : String(data.caption.text)
                    }
                })
            };
            case "sidecar": {
                return new Sidecar({
                    takenDate : (new Date(data.taken_at)).toLocaleDateString('en-GB'),
                    ID : data.pk,
                    MediaType : type,
                    shortCode : data.code,
                    commentCount : data.like_count,
                    likeCount : data.comment_count,
                    user : {
                        ID : data.user.pk,
                        username : data.user.username,
                        fullname : data.user.full_name,
                        privateAcc : Boolean(data.user.is_private),
                        profilePicture : data.user.profile_pic_url,
                        verified : data.user.is_verified,
                    },
                    caption : {
                        ID : data.caption.pk,
                        UserID : data.caption.user_id,
                        text : String(data.caption.text)
                    },
                    medias : data.carousel_media.map(data => {
                        return {
                            ID : data.id,
                            type : [0 , "Image" , "Video"][data.media_type],
                            media : data.media_type == 1 ? data.image_versions2.candidates[0].url : data.video_versions[0].url,
                            width: data.original_width,
                            height: data.original_height
                        }
                    }),
                    mediaSize : data.carousel_media.length
                })
            };
            case "video": {
                return new Video({
                    takenDate : (new Date(data.taken_at)).toLocaleDateString('en-GB'),
                    ID : data.pk,
                    MediaType : type,
                    shortCode : data.code,
                    commentCount : data.like_count,
                    likeCount : data.comment_count,
                    sizes : {
                        width : data.original_width,
                        height : data.original_height
                    },
                    user : {
                        ID : data.user.pk,
                        username : data.user.username,
                        fullname : data.user.full_name,
                        privateAcc : Boolean(data.user.is_private),
                        profilePicture : data.user.profile_pic_url,
                        verified : data.user.is_verified,
                    },
                    caption : {
                        ID : data.caption.pk,
                        UserID : data.caption.user_id,
                        text : String(data.caption.text)
                    },
                    Video : {
                        width : data.video_versions[0].width,
                        height : data.video_versions[0].height,
                        url : data.video_versions[0].url,
                    }
                })
            }
        }
    }
}

void Util.prototyper(exports , "default" , {val : İnstagramDownloader});
void Util.prototyper(exports , "Util" , { val : Util })
