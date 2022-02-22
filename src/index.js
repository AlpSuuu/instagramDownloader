'use strict';

const Util = require("./Utils/Util").default
const İnstagramError = require("./Utils/Error").default;

//senkronizer <3
const synchronizer = new (Util.synchronizer());

//structures larımız
const { default: Image } = require("./Structures/Image")
const { default: Video } = require("./Structures/Video")
const { default: Sidecar} = require("./Structures/Sidecar")
const { default: User }= require("./Structures/User")
const { default: Story } = require("./Structures/Story");

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
            let { data } = yield Util.fetcher.get(url).catch(err => { Util.error(err) });

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
        URL = URL.split("/").pop()
        
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
            let { data:{ items } } = yield Util.fetcher.get(Util.FixedUrl(url)).catch(err => { Util.error(err) });
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
        let ID = this.VideoID
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let url = Util.createNewURL(ID)
            let { data } = yield Util.fetcher.get(url).catch(err => { Util.error(err) });

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
                    takenDate : (new Date(Date(data.taken_at))).toLocaleString(),
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

                    caption : data.caption ? {
                        ID : data?.caption?.pk || null,
                        UserID : data?.caption?.user_id || null,
                        text : String(data?.caption?.text || null)
                    } : null,

                    Image : data.image_versions2.candidates[0].url
                })
            };
            case "sidecar": {
                return new Sidecar({
                    takenDate : (new Date(Date(data.taken_at))).toLocaleString(),
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

                    caption : data.caption ? {
                        ID : data?.caption?.pk || null,
                        UserID : data?.caption?.user_id || null,
                        text : String(data?.caption?.text || null)
                    } : null,

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
                    takenDate : (new Date(Date(data.taken_at))).toLocaleString(),
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

                    caption : data.caption ? {
                        ID : data?.caption?.pk || null,
                        UserID : data?.caption?.user_id || null,
                        text : String(data?.caption?.text || null)
                    } : null,

                    Video : {
                        width : data.video_versions[0].width,
                        height : data.video_versions[0].height,
                        url : data.video_versions[0].url,
                    }
                })
            }
        }
    }
    
   /**
    * girmiş olduğunuz instagram urlsinin sahip olduğunu medyayı verir 
    * 
    * @returns {Promise<void>}
    */

    get asyncMedia() {
        let {data} = this
        return new Promise((resolve , reject) => {

            let type = function() {
                let TypeObj = {};
        
                void Util.prototyper(TypeObj , 1 , { val : "image"})
                void Util.prototyper(TypeObj , 2 , { val : "video"})
                void Util.prototyper(TypeObj , 8 , { val : "sidecar"})
                
        
                return TypeObj[data.media_type]
            }()

            if(type === "image") return resolve(new Image({
                takenDate : (new Date(Date(data.taken_at))).toLocaleString(),
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
                caption : data.caption ? {
                    ID : data?.caption?.pk || null,
                    UserID : data?.caption?.user_id || null,
                    text : String(data?.caption?.text || null)
                } : null,

                Image : data.image_versions2.candidates[0].url
            }))

            if(type === "video") return resolve(new Video({
                takenDate : (new Date(Date(data.taken_at))).toLocaleString(),
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

                caption : data.caption ? {
                    ID : data?.caption?.pk || null,
                    UserID : data?.caption?.user_id || null,
                    text : String(data?.caption?.text || null)
                } : null,

                Video : {
                    width : data.video_versions[0].width,
                    height : data.video_versions[0].height,
                    url : data.video_versions[0].url,
                }
            }))
            
            if(type === "sidecar") resolve(new Sidecar({
                takenDate : (new Date(Date(data.taken_at))).toLocaleString(),
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

                caption : data.caption ? {
                    ID : data?.caption?.pk || null,
                    UserID : data?.caption?.user_id || null,
                    text : String(data?.caption?.text || null)
                } : null,

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
            }))
        })
    }  

    /**
     * classımızı oluştururken girdiğimiz instagram url sini yayınlayan kullanıcı  bilgileri 
     * 
     * @returns {User}
     */
    get getUser() {
        let name = this.getData.user.username
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let { data } = yield Util.fetcher.get(`https://www.instagram.com/${name}/?__a=1`).catch(err => { Util.error(err) });

            const user = data.graphql.user;

            let obj = {
                categories : data.seo_category_infos.map(arr => { return arr.pop() }),
                ID : user.id,
                username : user.username,
                fullname : user.full_name,
                profilePicture : user.profile_pic_url_hd,
                privateAcc : user.is_private,
                verifiedAcc : user.is_verified,
                mediaSize : user.edge_owner_to_timeline_media.count,
                followers : user.edge_followed_by.count,
                following : user.edge_follow.count,
                biography : user.biography,
                reels : user.highlight_reel_count,
                address : user.business_address_json,
                mail : user.business_email,
                number : user.business_phone_number,
                category : user.category_name,
                reels : user.highlight_reel_count,
                business : user.is_business_account,
                professional : user.is_professional_account,
                medias : user.is_private ? "X Private Acc X" : user.edge_owner_to_timeline_media.edges.map(({node}) => {
                    return {
                        type : {GraphSidecar : "Sidecar" , GraphVideo : "Video" , GraphImage : "Image"}[node.__typename],
                        url : `https://www.instagram.com/p/${node.shortcode}`,
                        displayUrl : node.display_url,
                        takenAt : new Date(Date(node.taken_at_timestamp)).toLocaleString(),
                        taggedUsers : node.edge_media_to_tagged_user.edges.map(user => { return `https://www.instagram.com/${user.username}`}),
                        likeCount : node.edge_media_preview_like.count,
                        commentCount : node.edge_media_to_comment.count,
                    }
                }),
            }
            const _class = new User(obj) 

            callback.call(void 0 , _class)
        }))()
    }

    /**
     * classımızı oluştururken girdiğimiz instagram url sini yayınlayan kullanıcının story bilgileri 
     * 
     * @returns {Story}
     */
    get getUserStories() {
        let id = this.getData.user.pk
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let { data } = yield Util.fetcher.get(`https://i.instagram.com/api/v1/feed/user/${id}/reel_media/`).catch(err => { Util.error(err) });
            let check = data.user.is_private;

            if(check) throw new İnstagramError("account private");

            let arr = data.items.map(story => {
                return {
                    takenAt : new Date(Date(story.taken_at)).toLocaleString(),
                    endAt : new Date(Date(story.expiring_at)).toLocaleString(),
                    type : [0 , "Image" , "Video"][story.media_type],
                    caption : story.caption,
                    media :  {
                        url : story.media_type === 1 ? story.image_versions2.candidates[0].url : story.video_versions[0].url,
                        width : story.original_width,
                        height : story.original_height
                    }
                }
            })

            let stroies = new Story({
                user : {
                    ID : data.user.pk,
                    username : data.user.username,
                    fullName : data.user.full_name,
                    privateAcc : data.user.is_private,
                    profilePicture : data.user.profile_pic_url,
                },
                stories : arr
            })

            callback.call(void 0 , stroies)
        }))()
    }
}

let map = new Map([
    ['downloader' , İnstagramDownloader],
    ['fetchUser' , Util.getUser],
    ['fetchStories' , Util.Stories],
    ['fetchHighlights' , Util.getHighlights],
    ['fetchPosts', Util.getPosts],
    ['Util' , Util],
    ['default' , İnstagramDownloader]
])

let obj = {};
for(var [key , value] of map) {
    void Util.prototyper(obj , key , { val : value })
}


// exports objemize property ekliyox
for(var [ key , value] of map) {
    void Util.prototyper(exports , key , { val : value })
}