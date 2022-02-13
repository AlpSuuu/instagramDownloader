const Downloader = require("./src/index").default;

var links = [
    "https://www.instagram.com/p/CZo8E9ZIGmq/",// ikisi karışık
    "https://www.instagram.com/p/CXGhz24j-jy/", // video 
    "https://www.instagram.com/p/CZklZk7N0yD/" // resim
];

for(var link of links) { // yukarıdaki dizimizi döndü içine sokarak her bir elementi teker teker çekiyoruz
    let İnstagram = new Downloader(link); // url mizi girerek yeni bir downloader oluşturuyoruz
    let media = İnstagram.media; // url mizin medya verisini çekioruz
    
    console.log(media.download()) // ve bu Medyayı indiriyoruz

    // bu işlem tüm linkler için tekrar edicektir.
}
