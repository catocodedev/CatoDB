const { WebSocket } = require('ws')

const ws = new WebSocket('ws://localhost:4020');
exports.connect = async function(){
await ws.on('open', function open() {
  ws.send(JSON.stringify({act: "connect"}))
  console.log("connected")
});
 return true;
}
exports.fetch = async function(query,key){
  await ws.on('open', function open() {
    ws.send(JSON.stringify({act: "fetch",key: key,query: query}))
ws.on('message', function message(msg) {
    var data = JSON.parse(msg)
    if(data.error == undefined){
        console.log(data)
    }else{
    data = "ERROR: "+data.error
    }
  });
});
}