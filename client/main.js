const { WebSocket } = require('ws')
const tools = require('./internal/tools.js')

const ws = new WebSocket('ws://localhost:4020');

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
exports.insert = async function(query,key){
  await ws.on('open', function open() {
  ws.send(JSON.stringify({act: "insert",key: key,query: query}))
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
exports.update = async function(query,key){
  await ws.on('open', function open() {
  ws.send(JSON.stringify({act: "update",key: key,query: query}))
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