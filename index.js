



var inputName = document.getElementById("name");
var inputUrl = document.getElementById("url");
var addbtn = document.getElementById("addbtn");
var tableBody = document.getElementById("tablebody");

var nameRegex=/^[a-z|A-Z]{1,}$/
function nameValid(){
    if(nameRegex.test(inputName.value)){
        return true;
    }else{ return false;
    }
}
var urlRegex=/^(http:\/\/)?(www\.)?[a-zA-Z0-9_\.]{1,}\.[a-z]{3}$/
function urlValid(){
    if(urlRegex.test(inputUrl.value)){
        return true;
    }else{
        return false;
    }
}
inputName.onkeyup=function(){
    if(nameValid() && urlValid()){
        addbtn.removeAttribute("disabled");
    } else {
        addbtn.disabled="true"
    }
}
inputUrl.onkeyup=function(){
    if(urlValid ()&& nameValid()){
        addbtn.removeAttribute("disabled")
    }else{
        addbtn.disabled="true"
    }
}

var bookmarks=[];
var mainindex=0;

if(localStorage.getItem("bookmarks")==null){
    bookmarks=[]
}else
{
    bookmarks=JSON.parse(localStorage.getItem("bookmarks"));
    display(bookmarks);
}
 

addbtn.onclick=function(){
    if(addbtn.innerHTML=="ubdate"){
       addbtn.innerHTML="submit";
       var bookmark={
         name:inputName.value,
         url:inputUrl.value,
       }
       bookmarks.splice(mainindex,1,bookmark);
    }else{ 
        var bookmark={
        name:inputName.value,
        url:inputUrl.value,}
        bookmarks.push(bookmark);
    }
   localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
   display(bookmarks);
   clear();

}
 

// console.log(bookmarks);

function display(anyArray){
var marks=``;
for(var i=0 ; i<anyArray.length ; i++){
    marks+=`<tr>
    <td>${anyArray[i].name}</td>
    <td><button class="btn btn-info"><a href=${bookmarks[i].url}>visit</a></button></td>
    <td><button onclick="update(${i})" class="btn btn-primary">update</button></td>
    <td><button onclick="deletedata(${i})"  class="btn btn-danger">delete</button></td>
    </tr>`
}
tableBody.innerHTML=marks;
}

function clear(){
    inputName.value="";
    inputUrl.value="";
}
function deletedata(index){
    bookmarks.splice(index,1);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    display(bookmarks);
}
function update(index){
   inputName.value=bookmarks[index].name;
   inputUrl.value=bookmarks[index].url;
   addbtn.innerHTML="ubdate";
   mainindex=index;
}
function search(term){
    var wantedbook=[];
    for(i=0;i<bookmarks.length;i++){
        if(bookmarks[i].name.toLowerCase().includes(term)){
            wantedbook.push(bookmarks[i])
        }
    }
    display(wantedbook);
}