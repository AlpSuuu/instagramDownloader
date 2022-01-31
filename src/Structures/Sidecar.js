"use strict";
const Util = require("../Utils/Util").default;

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
        this.caption = {
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
        this.caption = {
            ID : data.caption.ID,
            UserID : data.caption.UserID,
            text : data.caption.text
        };
        this.mediaSize = data.mediaSize
        this.medias = data.medias
    }

    download() { 
        //yakında <3

        return false
    }
}

exports.default = Sidecar;    