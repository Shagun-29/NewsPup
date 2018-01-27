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

const newsRender = function(data){
    var visitor = document.getElementById('visitor');
    visitor.innerHTML=""
    var newsCount = data.totalResults;
    for(var i = 0; i< newsCount; i++)
    {
        if(data.articles[i].description == null){

        }else{

            visitor.insertAdjacentHTML('beforeend', `
                <div style="background-image: url( ${ data.articles[i].urlToImage } );" class="card">
                                    <div class="new-title">
                                        <p>${ ""+(data.articles[i].title+"")  }</p>
                                    </div>
                                    <div class="informer">
                                        <p>${ ""+ data.articles[i].description +"" }</p>
                        
                                    </div>
                                    <span class="news-details">Source: ${ ""+data.articles[i].source.name+"" }, Author: ${ ""+data.articles[i].author+" " }, ${new Date(data.articles[i].publishedAt).getDate()}</span>
                            </div>

            `
        );

        }
        console.log(data.articles[i].description)
        
    }
}

function newsClick(){
    console.log(window.event.target.value);
    //console.log(this.value);
    // newsGetter(this.ele);
    
    switch (window.event.target.value) {
        case 'abc_news':
                newsGetter(abc_news, (error,data)=>{
                newsRender(data);
                // console.log(data);   
            })
            break;
        case 'bbc_news':
                newsGetter(bbc_news, (error,data)=>{
                newsRender(data);
                // console.log(data);
                
            })
            break;
        case 'bbc_sports':
                newsGetter(bbc_sports, (error,data)=>{
                newsRender(data);
                // console.log(data);
                
            })
            break;
        case 'espn':
                newsGetter(espn, (error,data)=>{
                newsRender(data);
                // console.log(data);
                
            })
            break;
        case 'bi':
                newsGetter(bi, (error,data)=>{
                newsRender(data);
                // console.log(data);
                
            })
            break;
        case 'buzzfeed':
                newsGetter(buzzfeed, (error,data)=>{
                newsRender(data);
                // console.log(data);
                
            })
            break;
        case 'cnbc':
                newsGetter(cnbc, (error,data)=>{
                newsRender(data);
                // console.log(data);
                
            })
            break;
        case 'cnn':
                newsGetter(cnn, (error,data)=>{
                newsRender(data);
                // console.log(data);
                
            })
            break;
        default:
            break;
    }
    newsRequest.send()
}


// `<div class="flashes" style="background-image: url( ${ data.articles[i].urlToImage })"><p>${ ""+(data.articles[i].title+"")  }</p>
// <p>${ ""+ data.articles[i].description +"" }</p>
// <hr/>
// <br/>
// </div>`





