const { default : Downloader } = require("../src/index");

var links = [
    "https://www.instagram.com/p/CZo8E9ZIGmq/",
    "https://www.instagram.com/p/CXGhz24j-jy/", 
    "https://www.instagram.com/p/CZklZk7N0yD/"
];

for(var link of links) {
    let İnstagram = new Downloader(link);
    let media = İnstagram.Media;
    
    console.log(media.download())
}
