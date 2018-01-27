const newsRequest = new XMLHttpRequest();
var API_KEY = "576618585d1f440991daaa4520d3219f"

// ABC News
var abc_news = `https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=${ API_KEY }`
// BBC News
var bbc_news = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${ API_KEY }`
// BBC Sport
var bbc_sports = `https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=${ API_KEY }`
// ESPN
var espn = `https://newsapi.org/v2/top-headlines?sources=espn&apiKey=${ API_KEY }`
// Business Insider
var bi = `https://newsapi.org/v2/top-headlines?sources=business-insider&apiKey=${ API_KEY }`
// Buzzfeed
var buzzfeed = `https://newsapi.org/v2/top-headlines?sources=buzzfeed&apiKey=${ API_KEY }`
// CNBC
var cnbc = `https://newsapi.org/v2/top-headlines?sources=cnbc&apiKey=${ API_KEY }`
// CNN
var cnn = `https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=${ API_KEY }`


var newsGetter = function(newsLink,callback){
    let newsData = "";
    let unstableData;
    newsRequest.open('GET',newsLink);
    newsRequest.onload = ()=>{
        unstableData = newsRequest.responseText ;
        if (newsRequest.readyState === XMLHttpRequest.DONE) {
            newsData = JSON.parse(unstableData);
            callback(null,newsData);
            // Everything is good, the response was received.
        } else {
            // Not ready yet.
        }
    }
    newsRequest.onerror = ()=>{
        callback("Unable To connect to the server");
    }

}

function newsClick(){
    let 
}
var visitor = document.getElementById('visitor');

newsGetter(cnn, (error,data)=>{
    
    console.log(data);
    visitor.innerHTML = `<p>${ JSON.stringify(data.articles[2])  }</p>`
})

newsRequest.send();


