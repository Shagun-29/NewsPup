const newsRequest = new XMLHttpRequest();
var API_KEY = "576618585d1f440991daaa4520d3219f";
const visitor = document.getElementById('visitor');
const dropDown = document.getElementById('drop-down')
let newsContent=[];
window.onload = ()=>{
    puppyCall(`https://newsapi.org/v2/top-headlines?sources=the-hindu&apiKey=${ API_KEY }`)
    choiceNow("Today's headlines")
}

 
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
            console.log("// Not ready yet.")
        }
    }
    newsRequest.onerror = ()=>{
        callback("Unable To connect to the server");
    }

}



const newsRender = function(data){
    //console.log("type of data", typeof data)
    visitor.innerHTML=``;
    var newsCount = data.totalResults;
    
    for(var i = 0; i < newsCount; i++)
    {
        if(data.articles[i].description == null){

        }else{
            console.log(data.articles[i].url )

            visitor.insertAdjacentHTML('beforeend', `
                <div style="background-image: url(
                     ${ 
                          data.articles[i].urlToImage || "https://www.w3schools.com/html/pulpitrock.jpg" } );" class="card ${i + "Item"}">
                          <a href="${ data.articles[i].url }" target="_blank">
                                    <div class="new-title">
                                        <p>${ ""+(data.articles[i].title+"")  }</p>
                                    </div>
                                    <div class="informer">
                                        <p>${ ""+ data.articles[i].description +"" }</p>
                        
                                    </div>
                                    <span class="news-details">Source: ${ ""+data.articles[i].source.name+"" }, Author: ${ ""+data.articles[i].author+" " }, ${new Date(data.articles[i].publishedAt).getDate()}</span>
                                    </a></div>

            `
        );

        }
        console.log(data.articles[i].description)
        dropDown.style.height = 0;
    }
}

const puppyCall = (newSource)=>{
    newsGetter(newSource, (error,data)=>{
        if(error){
            console.log("oops!, something went wrong")
            alert("Network problem");
        }else{
            
        //newsRender(data);
            paginationConcept(data);        }
        // console.log(data);   
    })
    newsRequest.send()
}

function newsClick(value){
    let title = window.event.target.innerHTML;
    puppyCall(`https://newsapi.org/v2/top-headlines?sources=${value}&apiKey=${ API_KEY }`);
    choiceNow(title);
}

// query factory

const choiceNow = function(string){
    const newsDet = document.getElementById('newsDet').children[1];
    newsDet.innerHTML = string.toString();
}


const queryFactory = function(val){
    
    const q = `https://newsapi.org/v2/everything?language=en&sources=${ val }&apiKey=${ API_KEY }`;
    puppyCall(q);
}

// query factory

// all menu buttons
// all menu buttons
// search button logic
    // search input
    let srch = document.getElementById('search')
    srch.onkeypress =function(e){
        dropDown.style.height = dropDown.scrollHeight + "px";
        let searchQuery = e.target.value
        if (!e) e = window.event;
        let keyCode = e.keyCode || e.which;
        console.log(e)
            if(arr.length == 0 || keyCode == 8 || keyCode == 46){
                //alert("Please!, select a news channel.")
                filterFunction(searchQuery.toLowerCase());
            }else if(keyCode == 13){
                console.log("youksdn")
                if(arr.length > 0){
                    console.log("skxklnsbjckxnb")
                    choiceNow(searchQuery)
                    dropDown.style.height = 0;
                    const query = `https://newsapi.org/v2/everything?language=en&sources=${arr.toString()}&q=${searchQuery}&apiKey=${ API_KEY }`;
                    console.log(query)
                    arr = [];
                    puppyCall(query);
                    console.log("dromm  ::  ",dropDown, typeof dropDown, Array.from(dropDown.querySelectorAll("ul option")))
                    Array.from(dropDown.querySelectorAll("ul option")).forEach(el => {
                        console.log(el)
                        el.classList.remove('isSelected')
                    })
                    
                }
                
        }
        dropDown.style.height = 0 + "px";
    }
    // search input
// search button logic

// onclick of categories
srch.onmouseover = ()=>{
    dropDown.style.height = dropDown.scrollHeight + "px";
}
dropDown.onmouseleave = function(){
    dropDown.style.height = 0;
}
// onclick of categories

// dp-list

    // const optionsQuery = document.getElementById('dp-list'
    let arr = [];
    dropDown.onclick = ()=>{
        let sel = window.event.target.value;
            let l = document.querySelector(`option[value=${ sel }]`);
            if(l.classList.contains('isSelected')){
                l.classList.remove('isSelected')
                if(arr.find((key)=>key===sel)){
                    console.log("key s her")
                    arr = remove(arr,sel)
                }else{
                }    
            }else{
                l.classList.add('isSelected');
                if(arr.find((key)=>key===sel)){

                }else{
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
function freshMenu(){
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
menu.onmouseover = function(){
    shifter.style.padding = 50 + "px";
}
menu.onmouseout = function(){
    shifter.style.padding = 10 + "px";
}
// shadow effect
const headerr = document.querySelector("header[class=headerr]");
headerr.onmouseover = function(){
    console.log("working")
    var ef = setInterval(()=>{
        let color = "#"+((1<<24)*Math.random()|0).toString(16);
        headerr.style.boxShadow =  "-2px 12px 22px "+color;
    },500);
    headerr.onmouseout = ()=>{
        clearInterval(ef);
    }
}


//Searching part

const filterFunction = function(searchItem){
    
    // console.log("Yet to call setTimeout::")
    let visitorDiv = visitor.children;
    const numberOfDiv = visitorDiv.length
    // console.log("Divisions = "  ,Array.from(Object.values(visitorDiv)) , visitorDiv.length);
    let arrv = Array.from(Object.values(visitorDiv))
    arrv.forEach((element,i) => {
         //console.log(i,visitorDiv[i].innerText)
         let filteredData = element.innerText.toLowerCase();
         console.log(i, " :: We have :: " , searchItem)
         if(!filteredData.includes(searchItem)){
            //  console.log( " :: We got :: " , filteredData.slice(filteredData.indexOf(searchItem),5))
            //  element.remove()
             element.classList.add("is-collapse");
         }
         else{
            element.classList.remove("is-collapse");
         }
    }) 
     }

     //Pagination
     const paginationConcept = function(data2){
        newsRender(data2);
        newsContent.push( Array.from(Object.values(data2)))
        console.log("News Content" , newsContent)
       
     } 