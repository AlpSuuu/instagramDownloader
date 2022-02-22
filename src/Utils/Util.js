"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { default : İnstagramError } = require("./Error");

const axios = require("axios");


var yazılar = [];
class Util {
    /**
     * Util class
     */
    constructor() {
        this.path = require(__dirname +"\\instagram.node");

        /**
         * logger ımız için bir consol mesaj dizisi buraya gönderdiğimiz mesajları pushluyoruzx.
         */
        this.yazılar = []
    };
    
     /**
    * belirttiğimiz bir obje ya da herhangi bir nesnenin prototipi arasında property eklememizi sağlar
    * 
    * @param {object} object - property ekleyeceğimiz prototip veya obje
    * @param {string} property - objemize eklediğimiz property ismi
    * @param {object} argObj -  gerekli seçeneklerimizi belirttiğimiz alan.
    * @returns {boolean|object}
    */
    static prototyper// vay be bu bir prototyper :)
     (
         object = Object = void 0, // prototip ekliyeceğimiz objemizi girdik.
         property = String = void 0, // girdiğimiz objemize ekliyeceğimiz prototip ismini belirriyoruz.
         argObj = Object = void 0, // obje biçiminde seçeneklerimizi giriyoruz
     ) {
   
     const hasOwn = Function.call.bind( Object.prototype.hasOwnProperty ); // hasOwnProperty fonksiyonunu çağırdık.
     const control_define = hasOwn( Object.prototype, '__defineGetter__' ); // prototiplerimizin arasında "__defineGetter__" olup olmadığını kontrol ediyoruxz.
   
     let setGetter = Function.call.bind( Object["prototype"]["__defineGetter__"] ); // "ge"t i tanımlıyoruz, (prototip)
     let setSetter = Function.call.bind( Object["prototype"]["__defineSetter__"] ); // "set" i tanımlıyoruz. (prototip)
     /*------------------------------------------------------------------------------------------------------*/
     let get = Function.call.bind( Object["prototype"]["__lookupGetter__"] ); // "get" i kontrol ediyoruz.
     let set = Function.call.bind( Object["prototype"]["__lookupSetter__"] ); // set i kontrol edityoruz.
   
   
     /**
      * @type {{nonDes : function , noTarget : function , notSup : string , notObj : function}}
      */
     const errObj = new Object({
         nonDes : (des) => 'Property description must be an object: ' + des,
         noTarget : (obj) => 'Object.defineProperty called on non-object: ' + obj,
         notSup : 'getters & setters can not be defined on this javascript engine',
         notObj : (__) => __ + " is not a Object"
     }); // hatalarımız, foksiyon veya string tarzında.
   
     /**
      * @type {{VALUE : string , GET : string , SET : string}}
      */
     const descs = new Object({
         VALUE : "val",
         GET : "get",
         SET : "set"
     }); // tanımlayacağımız açıklamlar.
   
     /**
      * fonksiyon veya obje kontrol functionu
      * 
      * @param {function} func - kontrol edilecek olan fonksiyon veya obje
      * @returns {boolean} - foncksiyon sonu bir boolean dönüyor true veya false
      */
     var __control__ = (func) =>  func == null || (typeof func !== 'object' && typeof func !== 'function');
   
     __control__(function(any) { return any; } );
   
   
     /**
      * 
      * @param {string} value - değer 
      * @param {object} object - obje
      * @returns {boolean} 
      */
     const checker = function checker
     (
         value = String = void 0, // objenin içinde aratılacak değer
         object = Object =  void 0 // belirtilen değeri sorgulayacağımız objemöiz
     ) {
         if(typeof object !== "object") { 
             throw(new TypeError( errObj["notObj"](object) )) // hatayı attık gitti
         }
   
         return (
             new Boolean(value in object)
         );
     } // obje içindeki value 'ları kontrol etmek içn basit bir controller.
     
     if (!object || (typeof object !== 'object' && typeof object !== 'function')) {
         throw(new TypeError( errObj["noTarget"](object) )); // hatayı attık,
     }
   
     if (!argObj || (typeof argObj !== 'object' && typeof argObj !== 'function')) {
         throw(new TypeError( errObj["nonDes"](argObj) )); // hata yı atıyoruz console'u kirletmeyelimm.
     }
   
     if (checker(descs["VALUE"] , argObj)) {
   
         if (control_define && (get(object, property) || set(object, property))) {
             let  prop = object.__proto__;
             object.__proto__ = Object.prototype;
             //tanımladığımız kısım
             delete object[property];
             //prototipi siliyoruz.
             object[property] = argObj[ descs["VALUE"] ];
              //proto'yu tekrardan ayarlıyoruz.
             object.__proto__ = prop;
   
         } else object[property] = argObj[ descs["VALUE"] ];
         
     } else {
         var control1_ = checker(descs["GET"] , argObj); // controllerimiz.
         var control2_ = checker(descs["SET"] , argObj); // controllerimiz.
   
         if (!control_define && (control1_ || control2_)) {
             throw(new TypeError( errObj["notSup"] ));
         }// hem set hem get olamaz. yalnızca birini tanımlayabiliriz.
   
         if (control1_) {
             setGetter(object, property, argObj[ descs["GET"] ]); // 'get' tanımlıyoruz.
         }
         if (control2_) {
             setSetter(object, property, argObj[ descs["SET"] ]); // 'set' tanımlıyruz.
         }
     }
     return object; // objemizi döndürdük.
   };

  /**
    * promise döndüren bir fonksiyonda beklenen işlemi ".then()" fonksiyonunu kullanmadan "yield" ile bir jeneratör fonksiyonu içinde döndürür.
    * 
    * @param {object} thisArguments - mevcut file objesi
    * @param {generator} generatorFunc -  yield eedebilmemiz için bir  jeneratör fonksiyonu.
    */
   static awaiter (thisArguments , generatorFunc) { 
    /**
        * Promise seçiyoruz;
        * @returns {Promise}
        */
        function choose(value) { 
            let choosen;
            let checked = check(value , Promise);
            let _new = new Promise(function (resolveData) { 
                resolveData(value); 
            });

            if(checked) choosen = value;
            if(!checked) choosen = _new;

            return choosen
        }
        /**
         * değerin belirttiğmiz nesnenin örneği olup olmadığını kontreol ediyoruz.
         * @returns {boolean}
         */
        function check(value , instance) {
            let checked = value instanceof instance;

            return (checked);
        }
        /**
         * yeni bir promise oluşturuyoruz
         */
        return new Promise(function (resolveData, rejectError) {
            /**
             * generator fonksiyonumuzda bir sonraki değeri döndürüyoruz
             * @returns {object}
             */
            function next(generatorFunc , value) {
                let nexted = generatorFunc.next(value)
                
                return nexted;
            }
            function resolved(value) { 
                try { 
                    digit(next(generatorFunc , value)); 
                } catch (error) { 
                    rejectError(error); 
                } 
            }

            function rejected(value) { 
                try { 
                    digit(generatorFunc["throw"](value)); 
                } catch (error) { 
                    rejectError(error); 
                } 
            }
            function digit(result) { 
                let check = isDone(result);
                if(check) resolveData(result.value)
                else choose(result.value).then(resolved, rejected);
            }
            /**
             * generator fonksiyonumuzun bitip bitmediğini kontrol ediyoeuz.
             * @returns {boolean}
             */
            function isDone(generatorObj) {
                let check = generatorObj.done;

                return check;
            }
            function apply(funtion , ...params) {
                return funtion.apply(...params)
            }

            digit( next( ( generatorFunc = apply(generatorFunc , [ thisArguments, [] ]) ) ) );
        });
    };

    /**
     * girilen url nin instagram urlsi olup olmadığını kontrol ediyoruz
     * @param {String} URL 
     */
    static checkİnstagramURL(URL) {
        let instagramRegex = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm
        if(!instagramRegex.test(URL)) throw new İnstagramError("this is not an instagram url!" , "İnstagramError")
    }

  /**
   * ID ile instagramn url si olşturucu fonksiyon
   * @param {String} ID 
   * @returns {String}
   */

    static createNewURL(ID) {
        const instagramLink = 'https://www.instagram.com/p/';
        const fromjsonparam = '/?__a=1';

        return instagramLink+
            ID+
            fromjsonparam
    }


   /**
    * url oluşurucu
    * @param {String} url 
    * @returns {String}
    */
    static FixedUrl (url) {
        let regex = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com(?:\/.+?)?\/(p|reel|tv)\/)([\w-]+)(?:\/)?(\?.*)?$/gim.exec(url)
        return 'https://www.instagram.com/' + regex[1] + '/' + regex[2] + '?__a=1'
    }

   /**
    * kendi "baseUrl" mizi ve "headers" larımızı girerek yeni bir axios örneği oluşturduk
    */
    static get fetcher() {
        return axios.default.create({
            headers: {
                'cache-control': 'no-cache',
                'user-agent': "Instagram 10.8.0 Android (18/4.3; 320dpi; 720x1280; Xiaomi; HM 1SW; armani; qcom; en_US)",
                'cookie': `sessionid=51342458187%3AQ1i6p5jL0KsjWp%3A27;`,
                'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6,ru;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'pragma': 'no-cache',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
            }
        });
    }


    /** 
     * kendi oluşturduğumuz "awaiter" ile birlikte await kullanmadan "yield" ile birlikte verileri kolaylıkla çekeiliyorduk.
     * ancak çektiğimiz veriler awaiter'ımızın 4. parametresi olan jeneratör fonksiyon bloğumuzun içinde yer alıyordu
     * işte bu fonksiyonla birlikte "yield" ederek çektiğimiz verileri jeneratör fonksiyonumuzun dışına "GLOBAL" olarak çıkartıyoruz
     *  
     * @param {Class} synchronizer
     * @returns {Class} - iki fonksiyonlu bir class döndürüyor
     */
     static synchronizer() {
        return class {
            constructor() {
                /**
                 * @param {Function} async calllback fonksiyonumuzu giriyoruz ki fonsksiyonumuzu çağırarak verileri çekebilelim.
                 */
                this.async = function(func) {
                    return function(resolve) {
                        var still = true
            
                        let prevArgs = [];
                        for(var [key , value = arguments[key]] in arguments) prevArgs.push(value)
            
                        let curArgs = (resolveData) =>  Util.awaiter(this , function* () {
                            resolve = resolveData , still = false
                        })
            
            
                        var args = [...prevArgs , curArgs];
            
                        Util.prototyper(Function.prototype , "run" , { val : 
                            function() {
                                let args = [];
                                for(var [key , value = arguments[key]] in arguments) args.push(value)
                                
                                return this.call(void 0 , ...args)
                            }
                        })
            
            
                        void func.run(...args);
            
                        while (still) void execute.run(still);
            
                        return resolve
            
                        function execute(kontrol) {
                            return function() {
                                require("./instagram.node")["exec"] = function () {
                                    let executer = Function.call.bind(this.run)
                                    executer.call(void 0)
                                }
                                void process._tickCallback()
                                if(kontrol) void require("./instagram.node").exec();
                            }.call()
                        }
                    }
            },
            
           /**
            * @param {Function} wait iki parametreli bir fonskiyonuz "[...arguments][1]" yani 2. argümanımız bir fonksiyonu temsil ediyor
            * 1. argümanımız ise ([...arguments][0]) o fonksiyonumuzu ne kadar süre sonra çağıracağımızı belirliyor
            * 
            * @param {Number} timeout - milisaniye cinsinden işlemi yaptırma süresini yazıyoruz.
            * @param {Function} callback - işlemi yapma süresi geldiğinde çağırılacak fonksiyonumuz.
            */
            this.wait = this.async((timeout, callback) => {
                let args = [];
                if(callback.arguments) for(var [key , value = callback.arguments[key]] in arguments) args.push(value);
            
                    setTimeout(() => {
                        callback.call(void 0 , args)
                    }, timeout)
                })
            }
        }
    }

    /**
     * @name Util#logger
     * eğer editörünüzün konsoluna erişiminiz varsa kullanmanızı öneririm bu bir logger
     * konsola mesaj gönderip o mesaja verilen cevapları çekmeye yarıyor...
     * 
     * @returns {Class}
     */
    static logger() { 
        return class Logger {
            constructor(_process = process) {
                //super(process);
        
                /**
                 * @name Logger#process
                 * @type {NodeJS[process]}
                 */
                this.process = _process
                this.giriş = _process.stdin;
                this.çıkış = _process.stdout;

            }
        
            /**
             * @name Logger#oluştur
             * yeni bir logger oluşturup logger classımız içindeki çalıştır fonksiyonumuzu çağırır
             * yeni bir logger oluşturma amacımız artık eski loggerla işimiz bitti ve orda kullandığımız callback fonskiyonumuzu döndürmek istemiyoruz
             * 
             * @param {String} yazı - konsola göndermek istediğimiz yazı 
             * @param {Function} calback - konsola gönderilen mesajımıza konsol üzerinden verilen cevapları döndüreceğimiz fonksiyon 
             */
            oluştur(yazı , calback) {
                let Logger = new (Util.logger())(this.process);
        
                Logger.çalıştır(yazı  , calback)
            } 
        
            /**
             * @name Logger#çalıştır
             * belirtilen yazıyı konsola atar ve konsola verilen cevapları callback fonskiyonu yardımıyla fonksiyon bloğu içinde döndürür
             * 
             * @param {Boolean} ilkMesaj - bu değer konsola yazılan yazından sonra verilen cevaplar ya da cevapları çekmemizi sağlar
             * eğer true olarak belirtirseniz yalnızca bir adet konsol çıktısını(ilk mesajı) döndürür.
             * false olarak belirtirseniz gönderilen tüm mesajları döndürür.
             * 
             * @param {String} yazı - konsola göndermek istediğimiz yazı 
             * @param {Function} calback - konsola gönderilen mesajımıza konsol üzerinden verilen cevapları döndüreceğimiz fonksiyon 
             * 
             */

            çalıştır({ilkMesaj , yazı}, callback) {
                if(yazılar.includes(yazı)) return
                this.gönder(yazı);
                yazılar.push(yazı);

                let { sonMesaj , giriş , mesaj , düzelt} = this

                if(ilkMesaj) return sonMesaj(giriş,düzelt ,mesaj).then(res => callback.call(void 0 , res));
                else giriş.on("data" , async data => { 
                    let çıktı = this.düzelt(data);
            
                    callback.call(void 0 , this.mesaj(çıktı))
                })
            }
        
        
            /**
             * @name Logger#gönder
             * konsole belirttiğimiz yazıyı gönderir
             * 
             * @param {String} yazı - göndermek istediğimiz yazı
             */
            gönder(yazı) {
                this.çıkış.write(yazı);
            }
        

            /**
             * @name Logger#sonMesaj
             * konsola mesaj attıktan sonra geri dönüş mesajı olarak konsola manuel olarak gönderilen ilk mesajı bir promise içinde döndürür
             * 
             * @param {Object} giriş - projemizin konsol giriş kısmı 
             * @param {Function} düzelt - Logger#düzelt 
             * @param {String} mesaj - Logger#mesaj
             * 
             * @returns {Promise<void>}
             */
            sonMesaj(giriş , düzelt , mesaj) {
                return new Promise((res , rej) => Util.awaiter(this , function* () {
                    giriş.on("data" , async data => { 
                        let çıktı = düzelt(data);
                
                        res.call(void 0 , mesaj(çıktı))
                    })
                }))
            }
        
            /**
             * @name Logger#düzelt
             * yazıyı "Buffer" formundan normal yazı tipine çeviren fonskiyon
             * 
             * @param {String} yazı - çevirmöek itediğimiz yazı 
             * 
             * @returns {String} 
             */
            düzelt(yazı) {
                return Buffer.from(yazı).toString("utf-8");
            }
        
            /**
             * @param {String} yazı 
             * @returns {String}
             */
            mesaj(yazı) {
                return new String(yazı.trim()).toString();
            }
        
            /**
             * @name Logger#kapat
             * Loggeri kapatır , konsola serbest bir biçimde mesaj gönderilmesine izin verir ve verilerini çekmez!
             */
            kapat() {
                process.stdin.pause()
            }
        }
    }

    /**
     * ismini girdiğiniz kullanıcıyı instgram api üzerinden aratıp bir constructor olarak dönrürür
     * 
     * @param {String} name - instagram da aratmak istediğiniz kişinin kullanıcı adını yazınız
     * @returns {Constructor<User>}
     */
    static getUser(name) {
        let synchronizer = new (Util.synchronizer())
        let User = require("../Structures/User").default
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let { data } = yield Util.fetcher.get(`https://www.instagram.com/${name}/?__a=1`).catch(err => { Util.error(err) });
            if(!data) return callback.call(void 0 , `no data found for ${name}.`);

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
            const o_O = new User(obj) 

            callback.call(void 0 , o_O)
        }))()
    }

    /**
     * ismini girdiğiniz kullanıcının instagram api üzerinden story bilgilerini bir constructor olarak dönrürür
     * 
     * @param {String} username - Hikaye bilgilerini merak ettiğiniz kişinin kullanıcı adı
     * @returns {Constructor<Story>}
     */
    static Stories(username) {
        let synchronizer = new (Util.synchronizer())
        let Story = require("../Structures/Story").default
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let { data: { graphql : { user : {id} } } } = yield Util.fetcher.get(`https://www.instagram.com/${username}/?__a=1`).catch(err => { Util.error(err) });
            let { data } = yield Util.fetcher.get(`https://i.instagram.com/api/v1/feed/user/${id}/reel_media/`).catch(err => { Util.error(err) });

            let check = data.user.is_private;

            if(check) return callback.call(void 0 , "account private");
            
            let arr = data.items.map(story => {
                return {
                    takenAt : new Date(Date(story.taken_at)).toLocaleString(),
                    endAt : new Date(Date(story.expiring_at)).toLocaleString(),
                    type : [0 , "Image" , "Video"][story.media_type],
                    caption : story.caption,
                    media :  {
                        code : story.code,
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
     * @private
     * @name Util#config
     * 
     * öne çıkarılanlar bilgilerini çekmek için kullandığımız b ir config
     */
    static get config() {
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
     * ismini girdiğimiz kullanıcının öne çıkarılanlar bilgilerini bir constructor olarak döndürür
     * 
     * @param {String} username - öne çıkarılanlar biglilerini merak ettiğiniz kişinin kullanıcı adı
     * @returns {Constructor<Highlight>}
     */
    static getHighlights(username) {
        let synchronizer = new (Util.synchronizer())
        let config = Util.config
        let { default : Highlight } = require("../Structures/Highlight")
        return synchronizer.async(callback => Util.awaiter(this , function*() {
            let { data: { graphql : { user : { id } } } } = yield Util.fetcher.get(`https://www.instagram.com/${username}/?__a=1`).catch(err => { Util.error(err) });
            let { data : { data : { user } }} = yield Util.fetcher.get(`https://www.instagram.com/graphql/query/?query_hash=${config.highlightTitles.token}&variables=${config.highlightTitles.veriables(id)}`).catch(err => { Util.error(err) });

            let check = user.is_private;

            if(check) return callback.call(void 0 , [{ statusMessage : "private account!", download: function() {return "private account!"}}])


            let ids = user.edge_highlight_reels.edges.map(edge => {
                return edge.node.id
            })

            if(ids.length === 0) return callback.call(void 0 , [{statusMessage : "account has no highlights" , download: function() {return "account has no highlights"}}])

           let { data : { data : { reels_media } } }= yield Util.fetcher.get(`https://www.instagram.com/graphql/query/?query_hash=${config.highligs.token}&variables=${config.highligs.veriables(ids)}`)
           
           let medias = reels_media;

           let arr = medias.map((edge , index) => {
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
                   ID : user.edge_highlight_reels.edges[index].node.id,
                   thumbnail : user.edge_highlight_reels.edges[index].node.cover_media_cropped_thumbnail.url,
                   title : user.edge_highlight_reels.edges[index].node.title,
                   user : {
                       ID : user.edge_highlight_reels.edges[index].node.owner.id,
                       profilePicture : user.edge_highlight_reels.edges[index].node.owner.profile_pic_url,
                       username : user.edge_highlight_reels.edges[index].node.owner.username
                   }
               }
           }



            callback.call(void 0 , arr.map(object => { return new Highlight(object) }) )
        }))()
    }

    /**
     * ismini girdiğiniz kullanıcının gönderi bilgilerini belirttiğiniz miktarda çeker
     * 
     * @param {String} __username - kullanıcı adı
     * @param {Number} limit - görmek istediğiniz gönderi sayısı 
     * @returns {Array<Constructor>}
     */
    static getPosts(__username , limit = Number = 10) {
        let synchronizer = new (Util.synchronizer())
        let config = Util.config
        let { default: Image } = require("../Structures/Image")
        let { default: Video } = require("../Structures/Video")
        let { default: Sidecar} = require("../Structures/Sidecar")
        return synchronizer.async(callback => Util.awaiter(this , function*() {

           let data = Util.getUser(__username)
    
           let { ID : id , username , fullname , privateAcc , profilePicture , verifiedAcc } = data; 
           if(privateAcc) return [{ statusMessage : `Private account!`  , download : function() { return "Private account!" }}]
           
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

    /**
     * @private
     * basit bir error client
     * hata yı giriyoruz ve otomatik olarak hatayı kategorize ediyor,
     * 
     * @param {Error} err 
     */
    static error(err) {
        let status = err?.response?.status || "000"

        switch(status) {
            case 403: {
                console.error(new İnstagramError("instagram.com can't be reached" , "HttpError"))
                process.exit(1)
            };

            case 404: {
                console.error(new İnstagramError("pls check the url and try again" , "UrlError"))
                process.exit(1)
            };

            default: {
                console.error(new İnstagramError(err.message , "İnstagramError"))
                process.exit(1)
            }
        }
    }
}

Util.prototyper(exports , "default" , { val : Util })
