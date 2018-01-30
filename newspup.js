const newsRequest = new XMLHttpRequest();
const API_KEY = "576618585d1f440991daaa4520d3219f"

// ABC News
const abc_news = `https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=${ API_KEY }`
// BBC News
const bbc_news = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${ API_KEY }`
// BBC Sport
const bbc_sports = `https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=${ API_KEY }`
// ESPN
const espn = `https://newsapi.org/v2/top-headlines?sources=espn&apiKey=${ API_KEY }`
// Business Insider
const bi = `https://newsapi.org/v2/top-headlines?sources=business-insider&apiKey=${ API_KEY }`
// Buzzfeed
const buzzfeed = `https://newsapi.org/v2/top-headlines?sources=buzzfeed&apiKey=${ API_KEY }`
// CNBC
const cnbc = `https://newsapi.org/v2/top-headlines?sources=cnbc&apiKey=${ API_KEY }`
// CNN
const cnn = `https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=${ API_KEY }`

window.onload = () => {
    puppyCall(`https://newsapi.org/v2/top-headlines?sources=the-hindu&apiKey=${ API_KEY }`)
    choiceNow("Today's headlines")
}


let time = 2000;
const t = setTimeout(function tick(){
      if(window.document.readyState === 'complete'){
        const sp = document.getElementById('sp');
        sp.classList.add('not-visible');
        console.log(sp)
        clearTimeout(t);
    }else{
        time = 1000
        t = setTimeout(tick,time);
    }
    
},time)


var newsGetter = function(newsLink, callback) {
    let newsData = "";
    let unstableData;
    newsRequest.open('GET', newsLink);
    newsRequest.onload = () => {
        unstableData = newsRequest.responseText;
        if (newsRequest.readyState === XMLHttpRequest.DONE) {
            newsData = JSON.parse(unstableData);
            callback(null, newsData);
            // Everything is good, the response was received.
        } else {
            // Not ready yet.
            console.log("// Not ready yet.")
        }
    }
    newsRequest.onerror = (a) => {
        console.log(a,"error occurred")
        callback("Unable To connect to the server");
    }

}
var myheaders = new Headers({
    'X-Mashape-Key': API_KEY
});
const visitor = document.getElementById('visitor');
const newsRender = function(data) {
    visitor.innerHTML = ``;
    let newsCount = data.totalResults - 1;
    let ke = data.articles.length;
    let imgl;
    for (let i = 0; i < ke; i++) {
        // console.log("you have ",data.articles[i])
        if(data.articles[i].description === "") {

        }else {
            visitor.insertAdjacentHTML('beforeend', `
                <div style="background-image: url(${ data.articles[i].urlToImage || 'https://www.w3schools.com/html/pulpitrock.jpg' });" class="card">
                          <a href="${ data.articles[i].url }" target="_blank">
                                    <div class="new-title">
                                        <p>${ ""+(data.articles[i].title+"")  }</p>
                                    </div>
                                    <div class="informer">
                                        <p>${ ""+ data.articles[i].description +"" }</p>
                        
                                    </div>
                                    <span class="news-details">Source: ${ ""+data.articles[i].source.name+"" }, Author: ${ ""+data.articles[i].author+" " }, ${new Date(data.articles[i].publishedAt).getDate()}</span>
                                    </a></div>

                `);

        }
        dropDown.style.height = 0;
    }
}

const puppyCall = (newSource) => {
    newsGetter(newSource, (error, data) => {
        if (error) {
            console.log("oops!, something went wrong")
            alert("Network problem");
        } else {
            if(data.totalResults === 0){
                choiceNow("Search Not Found")
            }
            else{
                newsRender(data);
            }
        }
        // console.log(data);   
    })
    newsRequest.send()
}

function newsClick() {
    let title = window.event.target.innerHTML;
    choiceNow(title);
    switch (window.event.target.value) {
        case 'abc_news':
            puppyCall(abc_news);
            break;
        case 'bbc_news':
            puppyCall(bbc_news);
            break;
        case 'bbc_sports':
            puppyCall(bbc_sports);
            break;
        case 'espn':
            puppyCall(espn);
            break;
        case 'bi':
            puppyCall(bi);
            break;
        case 'buzzfeed':
            puppyCall(buzzfeed);
            break;
        case 'cnbc':
            puppyCall(cnbc);
            break;
        case 'cnn':
            puppyCall(cnn);
            break;
        default:
            break;
    }

}

// query factory

const choiceNow = function(string) {
    const newsDet = document.getElementById('newsDet').children[1];
    newsDet.innerHTML = string.toString();
}


const queryFactory = function(val) {

    const q = `https://newsapi.org/v2/everything?language=en&sources=${ val }&apiKey=${ API_KEY }`;
    puppyCall(q);
}

// query factory

// all menu buttons

const abc_newsButton = document.querySelector("button[value=abc_news]");
const bbc_newsButton = document.querySelector("button[value=bbc_news]");
const bbc_sportsButton = document.querySelector("button[value=bbc_sports]");
const espnButton = document.querySelector("button[value=espn]");
const biButton = document.querySelector("button[value=bi]");
const buzzfeedButton = document.querySelector("button[value=buzzfeed]");
const cnbcButton = document.querySelector("button[value=cnbc]");
const cnnButton = document.querySelector("button[value=cnn]");
const dropDown = document.getElementById('drop-down')
// all menu buttons
// search button logic
// search input
const srbar = document.getElementById('sr-bar');
let srch = document.getElementById('search')
srch.onkeypress = function(e) {
    
    dropDown.style.height = dropDown.scrollHeight + "px";
    let searchQuery = e.target.value
    if (!e) e = window.event;
    let keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        choiceNow(searchQuery)
        if (arr.length == 0) {
            alert("Please!, select a news channel.")
        } else {
            dropDown.style.height = 0;
            const query = `https://newsapi.org/v2/everything?language=en&sources=${arr.toString()}&q=${searchQuery}&apiKey=${ API_KEY }`;
            console.log(query)
            puppyCall(query);
        }
    }
    
}
// search input
// search button logic

// onclick of categories
srch.onmouseover = () => {
    dropDown.style.height = dropDown.scrollHeight + "px";
}
dropDown.onmouseleave = function() {
    dropDown.style.height = 0;
}
// onclick of categories

// dp-list

// const optionsQuery = document.getElementById('dp-list')
function remove(array, element) {
    return array.filter(e => e !== element);
}
let arr = [];
dropDown.onclick = () => {
    
    let sel = window.event.target.value;
    let l = document.querySelector(`option[value=${ sel }]`);
    if (l.classList.contains('isSelected')) {
        l.classList.remove('isSelected')
        if (arr.find((key) => key === sel)) {
            console.log("key s her")
            arr = remove(arr, sel)
        }
    } else {
        l.classList.add('isSelected');
        if (arr.find((key) => key === sel)) {

        } else {
            arr.push(sel)
        }

    }
    console.log(arr.toString())
}


// dp-list



// fizool k kaam

// drop-down

// drop-down




// freshNews Logic
function freshMenu() {
    // console.log(document.activeElement.value);
    // console.log(a);
    let queryUpdate;
    switch (document.activeElement.value) {
        case "all":
            choiceNow("ALL")
            menu.innerHTML = `<div class="menu_icon"></div>
                              <li><button class="" onclick="newsClick()" value="abc_news">ABC News</button></li>
                              <li><button class="" onclick="newsClick()" value="bbc_news">BBC News</button></li>
                              <li><button class="" onclick="newsClick()" value="bbc_sports">BBC Sport</button></li>
                              <li><button class="" onclick="newsClick()" value="espn">ESPN</button></li>
                              <li><button class="" onclick="newsClick()" value="bi">Business Insider</button></li>
                              <li><button class="" onclick="newsClick()" value="buzzfeed">Buzzfeed</button></li>
                              <li><button class="" onclick="newsClick()" value="cnbc">CNBC</button></li>
                              <li><button class="" onclick="newsClick()" value="cnn">CNN</button></li>
            `
            queryUpdate = 'abc-news,bbc-news,espn,bbc-sport,cnn,cnbc,business-insider,buzfeed';
            break;
        case "entert":
            choiceNow("ENTERTAINMENT")
            menu.innerHTML = `<div class="menu_icon"></div>
        <li><button class="" onclick="newsClick()" value="buzzfeed">Buzzfeed</button></li>
        `
            queryUpdate = 'buzfeed';
            break;
        case "sports":
            choiceNow("SPORTS")
            menu.innerHTML = `<div class="menu_icon"></div>
        <li><button class="" onclick="newsClick()" value="bbc_sports">BBC Sport</button></li>
        <li><button class="" onclick="newsClick()" value="espn">ESPN</button></li>
        `
            queryUpdate = 'espn,bbc-sport';
            break;
        case "business":
            choiceNow("BUSINESS")
            menu.innerHTML = `<div class="menu_icon"></div>
                              <li><button class="" onclick="newsClick()" value="bi">Business Insider</button></li>
                              <li><button class="" onclick="newsClick()" value="cnbc">CNBC</button></li>
        `
            queryUpdate = 'cnbc,business-insider';
            break;
        default:
            break;
    }
    queryFactory(queryUpdate);
}
// freshNews Logic


// shifter ka logic
const shifter = document.getElementById('shifter');
const menu = document.getElementById('menne');
menu.onmouseover = function() {
    shifter.style.padding = 50 + "px";
}
menu.onmouseout = function() {
    shifter.style.padding = 10 + "px";
}
// shadow effect
const headerr = document.querySelector("header[class=headerr]");
headerr.onmouseover = function() {
    console.log("working")
    var ef = setInterval(() => {
        let color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
        headerr.style.boxShadow = "-2px 12px 22px " + color;
    }, 500);
    headerr.onmouseout = () => {
        clearInterval(ef);
    }
}

