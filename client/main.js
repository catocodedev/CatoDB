const { WebSocket } = require('ws')
const tools = require('./internal/tools.js')

const ws = new WebSocket('ws://localhost:4020');

exports.fetch = async function(key,query){
    await ws.on('open', async function open() {
    await ws.send(JSON.stringify({act: "fetch",key: key,query: query}))
    await ws.on('message', async function message(msg) {
      let data = JSON.parse(msg)
      if(data.error != undefined){
        data = "ERROR: "+data.error
      }
      console.log("From server:")
      console.log(data)
      data = null
    });
    ws.close()
  });
}
exports.insert = async function(query,key){
  await ws.on('open', async function open() {
    awaitws.send(JSON.stringify({act: "insert",key: key,query: query}))
    awaitws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    if(data.error != undefined){
      data = "ERROR: "+data.error
      console.log("ERROR: "+data.error)
    }
    console.log(data)
  });
  ws.close()
});
}
exports.update = async function(query,key){
  await ws.on('open', async function open() {
  await ws.send(JSON.stringify({act: "update",key: key,query: query}))
  await ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    if(data.error == undefined){
        console.log(data)
    }else{
    data = "ERROR: "+data.error
    }
  });
  ws.close()
});
}