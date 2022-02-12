const Downloader = require("../src/index").default;

var links = [
    "https://www.instagram.com/p/CZo8E9ZIGmq/", // video 
    "https://www.instagram.com/p/CYTwjrFppRZ/", // resim
    "https://www.instagram.com/p/CZklZk7N0yD/" // ikisi karışık
];

for(var link of links) { // yukarıdaki dizimizi döndü içine sokarak her bir elementi teker teker çekiyoruz
    let İnstagram = new Downloader(link); // url mizi girerek yeni bir downloader oluşturuyoruz
    let media = İnstagram.Media; // url mizin medya verisini çekioruz
    
    console.log(media.download()) // ve bu Medyayı indiriyoruz

    // bu işlem tüm linkler için tekrar edicektir.
}
