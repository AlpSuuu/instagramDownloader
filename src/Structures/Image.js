"use strict";
const Util = require("../Utils/Util").default;

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

exports.default = Image;