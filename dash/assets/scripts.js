var ws = new WebSocket("ws://localhost:4020");
ws.onerror = function (err){
console.log("ERROR:" + err)
document.getElementById("status").style = 'color: red';
document.getElementById("status").innerHTML = "Offline/connection refused!";
}
ws.onopen = function (con) {
console.log("READY!")
document.getElementById("status").style = 'color: limegreen';
document.getElementById("status").innerHTML = "Online!";
ws.send(JSON.stringify({act: "connect",key: "CatoDB"}))
}
function que(){
let quey = document.forms["form"]["quey"].value;
try{
quey = JSON.parse(quey)
}catch{
    document.getElementById("data").innerHTML = "BAD JSON!";
    return false
}
ws.send(JSON.stringify({act: "fetch",key: "CatoDB",query: quey}));
ws.onmessage = function (msg){
    var data = JSON.parse(msg.data);
    console.log(data)
    document.getElementById("data").innerHTML = JSON.stringify(data);
}
}
ws.onmessage = function (msg){
var data = JSON.parse(msg.data);
if(data.error == undefined){
console.log(data);
}else{
console.log("CATODB ERROR: "+data.error)
}
}