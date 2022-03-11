const { WebSocket } = require('ws')

const ws = new WebSocket('ws://localhost:4020')

exports.open = async function(con){
  return new Promise(function (resolve, reject) {
  ws.on('open', async function open() {
    resolve('READY!')
  })
  ws.on('error', async function err(){
    reject('err')
  })
})
}
exports.fetch = async function(key,query){
  return new Promise(function (resolve, reject) {
    ws.send(JSON.stringify({act: "fetch",key: key,query: query}))
    ws.on('message', async function message(msg) {
      let data = JSON.parse(msg)
      if(data.error != undefined){
        reject("ERROR: "+data.error)
      }
      resolve(data)
    });
  })
}
exports.insert = async function(key,query){
  return new Promise(function (resolve, reject) {
  ws.send(JSON.stringify({act: "insert",key: key,query: query}))
  ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    if(data.error != undefined){
      reject(data = "ERROR: "+data.error)
    }
    resolve(data)
  });
})
}
exports.update = async function(key,query){
  return new Promise(function (resolve, reject) {
  ws.send(JSON.stringify({act: "update",key: key,query: query}))
  ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    if(data.error == undefined){
        resolve(data)
    }else{
      reject("ERROR: "+data.error)
    }
  });
})
}
exports.close = function (){
  ws.close()
}
