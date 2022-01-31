"use strict";
const Util = require("../Utils/Util").default;

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
         this.caption = {
            ID : void 0,
            UserID : void 0,
            text : void 0
        }



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
        this.caption = {
            ID : data.caption.ID,
            UserID : data.caption.UserID,
            text : data.caption.text
        }
    }

    download() {
        //yakında <3

        return false
    }
}

exports.default = Video;    