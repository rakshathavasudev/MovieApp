
var currentPage = 1;
var numberPerPage = 3;
var numberOfPages = 0;  
var result1=[];
document.getElementById('search_btn').addEventListener('click', function(){
	var title = document.getElementById('title_text').value;
	var request = new Request('https://www.omdbapi.com/?apikey=9ce23488&s='+title);
	fetch(request).then(function(result){
		return result.json();
	}).then(function (data){
        var len = data.Search.length;
         numberOfPages= getNumberOfPages(len);
         makelist(data);
         
});
});

function getNumberOfPages(len) {
    return Math.ceil(len / numberPerPage);
}
function nextPage() {
    currentPage += 1;
    loadList(result1);
}
function previousPage() {
    currentPage -= 1;
    loadList(result1);
}
function loadList(result1) {
    
    //console.log(result1);
        //console.log(result1[0]["Title"]);
    var begin = ((currentPage - 1) * numberPerPage);
    var end = (begin + numberPerPage);

    pageList = result1.slice(begin,end)
    //console.log(pageList);
    drawList(pageList);    // draws out our data
    check();         // determines the states of the pagination buttons
}

function makelist(data){
    var result=[];
    for(var i in data){ 
        result.push([i,data[i]]);
        }
        // console.log(result);
    
    for( var i in result[0][1]){
        result1.push(result[0][1][i]);
    }
    loadList(result1);

}

function drawList(pageList) {
    document.getElementById("search_result").innerHTML = "";
    for (let i = 0; i < pageList.length; i++) {
        var searchEl = document.getElementById('search_result');
        var movieContainer = document.createElement('div');
        movieContainer.className = 'search-result--item';
        var titleEl = document.createElement('div');
        titleEl.className = 'search-result-title';
        titleEl.innerText = pageList[i]["Title"];
        var yearEl = document.createElement('div');
        yearEl.className = 'search-result-year';
        yearEl.innerText = pageList[i]["Year"];
        //var typeEl = document.createElement('div');
        //typeEl.innerText = pageList.Search[i].Type;
        var posterEl = document.createElement('img');
        posterEl.src = pageList[i]["Poster"];
        movieContainer.appendChild(titleEl);
        movieContainer.appendChild(posterEl);
        movieContainer.appendChild(yearEl);
        searchEl.appendChild(movieContainer);

    }
}
function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
   
}
window.onload = load;