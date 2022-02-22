"use strict";

const { default: axios } = require("axios");
const { default: Story } = require("./Story");
const { default: Util} = require("../Utils/Util");

const fs = require("fs")

Util.prototyper(exports, "__esModule", { val: true });

class User {
    /**
     * @name data 
     * @type {constructor}
     */
    constructor(data) {
        
        /**
         * @name User#categories - kullanıcı kategori
         * @type {Array<String>}
         */
        this.categories = void 0

        /**
         * @name User#ID - Kullanıcı id'si
         * @type {Number}
         */
        this.ID = void 0 
        
        /**
         * @name User#username - Kullaıncı adı
         * @type {String}
         */
        this.username = void 0
        
        /**
         * @name User#fullname - kullanıcı ismi
         * @type {String}
         */
        this.fullname = void 0

        /**
         * @name User#profilePicture - kullanıcı fotoğraf bilgileri
         * @type {Object}
         */
        this.profilePicture = void 0
        
        /**
         * @name User#privateAcc - kullanıcı hesabın g,zlilik durumu
         * @type {Boolean}
         */
        this.privateAcc = void 0 
        
        /**
         * @name User#verifiedAcc - kullanıcı hesabın doğrulanma durumu
         * @type {Boolean}
         */
        this.verifiedAcc = void 0 
        
        /**
         * @name User#mediaSize - kullanıcı medya bilgileri
         * @type {Array<Object>}
         */
        this.mediaSize = void 0

        /**
         * @name User#followers - kullanıcı takipçi sayısı
         * @type {Number}
         */
        this.followers = void 0 
        
        /**
         * @name User#following - Kullanıcı takip edilen sayısı
         * @type {Number}
         */
        this.following = void 0 
        
        /**
         * @name User#biography - Kullanıcı biygrafi yazısı
         * @type {String}
         */
        this.biography = void 0 

        /**
         * @name User#reels - kullanıcı reels medyaları
         * @type {Array<Object>}
         */
        this.reels = void 0 
        
        /**
         * @name User#address - kullanıcı address'si
         * @type {Object}
         */
        this.address = void 0 
        
        /**
         * @name User#mail - kullanıcı mail bilgisi
         * @type {String}
         */
        this.mail = void 0 
        
        /**
         * @name User#number - kullanıcı telefın numarası
         * @type {Number}
         */
        this.number = void 0
        
        /**
         * @name User#category - kullanıcı hesap kategorisi
         * @type {String}
         */
        this.category = void 0 
        
        /**
         * @name User#reels - kullanıcı reels medyaları
         * @type {Array<Object>}
         */
        this.reels = void 0 
        
        /**
         * @name User#business - hesap durumu
         * @type {boolean}
         */
        this.business = void 0 
        
        /**
         * @name User#professional - hesap durumu
         * @type {boolean}
         */
        this.professional = void 0
        
        /**
         * @name User#medias - hesap medyaları
         * @type {Array<Object>}
         */
        this.medias = void 0 

        void this._create(data);
    }

    /**
     * @param {Function} _create
     * 
     * constructor'ı olluşturduğumuz fonksiyon
     * @param {Object} data 
     */
    _create(data) {
        this.categories = data.categories,
        this.ID = data.ID,
        this.username = data.username,
        this.fullname = data.fullname,
        this.profilePicture = data.profilePicture,
        this.privateAcc = data.privateAcc,
        this.verifiedAcc = data.verifiedAcc,
        this.mediaSize = data.mediaSize,
        this.followers = data.followers,
        this.following = data.following,
        this.biography = data.biography,
        this.reels = data.reels,
        this.address = data.address,
        this.mail = data.mail,
        this.number = data.number,
        this.category = data.category,
        this.reels = data.reels,
        this.business = data.business,
        this.professional = data.professional,
        this.medias = data.medias
    }

    get synchronizer() {
        return new (Util.synchronizer());
    }
    /**
     * @name User#createPath
     * Projeminizin dosyalarını tarar gerekli klasörler mevcut değilse açar mevcutsa ellemez
     * 
     * @param {String} media - indirmek istediğimiz medyanın id'si (url - shortCode) 
     * @param {String | "Medias"} path - indireceğiniz klasör
     * 
     * @returns {Promise<void>}
     */
    createPath(media , path = "Medias") {
        return new Promise((resolve , reject) => Util.awaiter(this , function* () {
            yield fs.access(path , (check) => { 
                if(check) fs.mkdir(path , (error) => {
                    if(error) reject.call(void 0 , error)
                })
            })
            yield fs.access(path+"\\"+media , (check) => {
                if(check) fs.mkdir(path+"\\"+media , (error) => {
                    if(error) reject.call(void 0 , error)
                    else resolve.call(void 0 , [process.cwd() , path ,media, "ProfilePhoto.jpg"].join("\\"))
                }) 

                else resolve.call(void 0 , [process.cwd() , path ,media, "ProfilePhoto.jpg"].join("\\"))
            })
        }))
    }

   /**
    * @name User#downloadProfilePhoto
    * 0. argümana belirttiğiniz dosyaya ya da default dosyasına (Medias) medyaları indirir
    * 
    * @param {String} $path - indireceğiniz klasör
    * @returns {Object} 
    */
    downloadProfilePhoto($path = "Medias") {
        let { profilePicture , fullname , createPath , synchronizer } = this 
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            createPath(fullname , $path).then((path) => Util.awaiter(this , function*() {
                
                const writer = fs.createWriteStream(path)

                let executer = yield axios({url : profilePicture , method : 'get' , responseType: 'stream'}).catch(err => { Util.error(err) });
    
                executer.data.pipe(writer)
        
                writer.on('finish', () => callback.call(void 0 , { statusMessage : `Download is sucsess!` , File : path}));
                writer.on('error', () => callback.call(void 0 , { statusMessage : `Download is unsucsess!` , File : void 0}));    
            }))
        }))()
    }

   /**
    * @name User#getStories
    * kullanıcımızın story bilgilerini çeker
    * 
    * @returns {Object} 
    */
    get getStories() {
        let {  synchronizer , ID } = this 
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let { data } = yield Util.fetcher.get(`https://i.instagram.com/api/v1/feed/user/${ID}/reel_media/`).catch(err => { Util.error(err) });

            let check = data.user.is_private;
            if(check) return callback.call(void 0 , [{ statusMessage : `Private account!`  , download : function() { return "Private account!" }}])
            
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

    /**
     * any
     */
    get #config() {
        return {
            highlightTitles : {
                token : "aec5501414615eca36a9acf075655b1e",
                veriables : function veriables(userID) {
                    return String(`{ "user_id" : "${userID}" , "include_highlight_reels" : true}`)
                }
            },
            
            highligs : {
                token : "c9c56db64beb4c9dea2d17740d0259d9",
                veriables : function veriables(highlightID) {
                    return `{ "highlight_reel_ids":[${highlightID}],"precomposed_overlay":false}`
                }
            },

            posts : {
                token : "e769aa130647d2354c40ea6a439bfc08",
                veriables : function(userID , limit) {
                    return `{"id": ${userID} , "first" : ${limit}}`
                }
            }
        }
    }

   /**
    * @name User#getHighlights
    * kullanıcımızın highlight bilgilerini çeker
    * 
    * @returns {Object} 
    */
    get getHighlights() {
        if(this.privateAcc) return [{ statusMessage : `Private account!`  , download : function() { return "Private account!" }}]
        
        let synchronizer = new (Util.synchronizer())
        let config = this.#config
        let { ID : id } = this 
        let { default : Highlight } = require("../Structures/Highlight")
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let { data : { data : { user : { edge_highlight_reels } } }} = yield Util.fetcher.get(`https://www.instagram.com/graphql/query/?query_hash=${config.highlightTitles.token}&variables=${config.highlightTitles.veriables(id)}`).catch(err => { Util.error(err) });

            let ids = edge_highlight_reels.edges.map(edge => {
                return edge.node.id
           })

           let { data : { data : { reels_media } } }= yield Util.fetcher.get(`https://www.instagram.com/graphql/query/?query_hash=${config.highligs.token}&variables=${config.highligs.veriables(ids)}`)
           
           let medias = reels_media;

           let obj = medias.map((edge , index) => {
               return {
                   ID : getHighlightsMetaData(index).ID,
                   thumbnail : getHighlightsMetaData(index).thumbnail,
                   title : getHighlightsMetaData(index).title,
                   user : getHighlightsMetaData(index).user,
                   medias : edge.items.map(item => {
                       return {
                           type : {"GraphStoryVideo" : "Video" , "GraphStoryImage" : "Image"}[item.__typename],
                           id : item.id,
                           media : item[item.__typename === "GraphStoryVideo" ? "video_resources" : "display_resources"].pop().src
                       }
                   })
               }
           })

           function getHighlightsMetaData(index) {
               return {
                   ID : edge_highlight_reels.edges[index].node.id,
                   thumbnail : edge_highlight_reels.edges[index].node.cover_media_cropped_thumbnail.url,
                   title : edge_highlight_reels.edges[index].node.title,
                   user : {
                       ID : edge_highlight_reels.edges[index].node.owner.id,
                       profilePicture : edge_highlight_reels.edges[index].node.owner.profile_pic_url,
                       username : edge_highlight_reels.edges[index].node.owner.username
                   }
               }
           }

           callback.call(void 0 , obj.map(object => { return new Highlight(object) } ))
        }))()
    }

    getPosts(limit = Number = 10) {
        if(this.privateAcc) return { statusMessage : `Private account!` }
        
        let synchronizer = new (Util.synchronizer())
        let config = this.#config
        let { ID : id , username , fullname , privateAcc , profilePicture , verifiedAcc } = this 
        let { default: Image } = require("../Structures/Image")
        let { default: Video } = require("../Structures/Video")
        let { default: Sidecar} = require("../Structures/Sidecar")
        return synchronizer.async(callback => Util.awaiter(this , function*() {
           let { data : { data : { user : { edge_owner_to_timeline_media: { edges : medias }}} } }= yield Util.fetcher.get(`https://www.instagram.com/graphql/query/?query_hash=${config.posts.token}&variables=${config.posts.veriables(id , limit)}`);

            let constructorArray = medias.map(({node : data}) => {
                let type = {GraphVideo : "video" , GraphImage : "image" , GraphSidecar : "sidecar"}[data.__typename]

                switch(type) {
                    case "image": {
                        return new Image({
                            takenDate : (new Date(Date(data.taken_at))).toLocaleString(),
                            ID : data.id,
                            MediaType : type,
                            shortCode : data.shortcode,
                            commentCount : data.edge_media_to_comment.count,
                            likeCount : data.edge_media_preview_like.count,
                            sizes : {
                                width : data.dimensions.width,
                                height : data.dimensions.height
                            },
        
                            user : {
                                ID : id,
                                username : username,
                                fullname : fullname,
                                privateAcc : Boolean(privateAcc),
                                profilePicture : profilePicture,
                                verified : verifiedAcc,
                            },
        
                            caption : data?.edge_media_to_caption ? {
                                ID : id || null,
                                UserID : id || null,
                                text : String(data?.edge_media_to_caption?.edges[0]?.node.text || null)
                            } : null,
        
                            Image : data.display_resources.pop().src
                        })
                    };
                    case "sidecar": {
                        return new Sidecar({
                            takenDate : (new Date(Date(data.taken_at))).toLocaleString(),
                            ID : data.id,
                            MediaType : type,
                            shortCode : data.shortcode,
                            commentCount : data.edge_media_to_comment.count,
                            likeCount : data.edge_media_preview_like.count,
                            sizes : {
                                width : data.dimensions.width,
                                height : data.dimensions.height
                            },
        
                            user : {
                                ID : id,
                                username : username,
                                fullname : fullname,
                                privateAcc : Boolean(privateAcc),
                                profilePicture : profilePicture,
                                verified : verifiedAcc,
                            },
        
                            caption : data?.edge_media_to_caption ? {
                                ID : id || null,
                                UserID : id || null,
                                text : String(data?.edge_media_to_caption?.edges[0]?.node.text || null)
                            } : null,
        
                            medias : data.edge_sidecar_to_children?.edges?.map(({node : data}) => {
                                return {
                                    ID : data.id,
                                    type : {GraphImage : "Image" , GraphVideo : "Video"}[data.__typename],
                                    media : data.__typename === "GraphImage" ? data. display_resources.pop().src : data. video_url,
                                    width: data.dimensions.width,
                                    height: data.dimensions.height
                                }
                            }),
                            mediaSize : data.edge_sidecar_to_children?.edges?.length
                        })
                    };
                    case "video": {
                        return new Video({
                            takenDate : (new Date(Date(data.taken_at))).toLocaleString(),
                            ID : data.id,
                            MediaType : type,
                            shortCode : data.shortcode,
                            commentCount : data.edge_media_to_comment.count,
                            likeCount : data.edge_media_preview_like.count,
                            sizes : {
                                width : data.dimensions.width,
                                height : data.dimensions.height
                            },
        
                            user : {
                                ID : id,
                                username : username,
                                fullname : fullname,
                                privateAcc : Boolean(privateAcc),
                                profilePicture : profilePicture,
                                verified : verifiedAcc,
                            },
        
                            caption : data?.edge_media_to_caption ? {
                                ID : id || null,
                                UserID : id || null,
                                text : String(data?.edge_media_to_caption?.edges[0]?.node.text || null)
                            } : null,
        
                            Video : {
                                width : data.dimensions.width,
                                height : data.dimensions.height,
                                url : data.video_url,
                            }
                        })
                    }
                }
            });
           return callback.call(void 0 , constructorArray);
        }))()
    }
}

exports.default = User;
