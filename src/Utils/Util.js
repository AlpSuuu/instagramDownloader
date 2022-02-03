"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const İnstagramError = require("./Error").default;

const axios = require("axios");

class Util {
    /**
     * Util class
     */
    constructor() {
        this.path = require(__dirname +"\\instagram.node");
    }
    
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
            baseURL: "https://www.instagram.com",
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
                    return function(error , resolve) {
                        var still = true
            
                        let prevArgs = [];
                        for(var [key , value = arguments[key]] in arguments) prevArgs.push(value)
            
                        let curArgs = (rejectData , resolveData) =>  Util.awaiter(this , function* () {
                            error = rejectData , resolve = resolveData , still = false
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
            
                        if (error) throw new İnstagramError(error , "İnstagramError") 
            
                        return resolve
            
                        function execute(kontrol) {
                            return function() {
                                require(__dirname +"\\instagram.node")["exec"] = function () {
                                    let executer = Function.call.bind(this.run)
                                    executer.call(void 0)
                                }
                                void process._tickCallback()
                                if(kontrol) void require(__dirname +"\\instagram.node").exec();
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
            this.wait = this.async(function (timeout, callback) {
                let args = [];
                if(callback.arguments) for(var [key , value = callback.arguments[key]] in arguments) args.push(value);
            
                    setTimeout(() => {
                        callback.call(void 0 , args)
                    }, timeout)
                })
            }
        }
    }
}

Util.prototyper(exports , "default" , {val : Util})
