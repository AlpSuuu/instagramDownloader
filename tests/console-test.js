const Downloader = require("../src/index").default;
const Util = require("../src/index").Util;
const Logger = Util.logger()


let logger = new Logger(process);


    logger.oluştur({yazı : "Bilgilerine bakmak istediğiniz medyanın linkini giriniz...\r\n", ilkMesaj : true} , cevap_1=> {
    logger.oluştur({yazı : "Url nin verisini mi göndermemi istersin medyasını mı? lütfen sadece `veri` ya da `medya` olarak cevap verin!!!\r\n" , ilkMesaj : false}, cevap_2 => {
        if(!["veri" , "medya"].some(x => cevap_2 === x)) return console.log("lütfen sadece `medya` ya da `veri` yazınız!!!")

        let instagram = new Downloader(cevap_1.trim())

        if(cevap_2.toLowerCase() === "veri") console.log("Belirttiğiniz Urlnin bilgileri gönderiliyor...\n") , console.log(instagram.getData)
        if(cevap_2.toLowerCase() === "medya") console.log("Belirttiğiniz Urlnin Mediya bilgileri gönderiliyor...\n") , console.log(instagram.Media);
        
        console.log("Logger'ı kapatarak konsola serbest mesaj iznini açtım")

        logger.kapat()
    });
})
