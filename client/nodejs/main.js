const { WebSocket } = require('ws')

class db{
  constructor (con,key){
    this.con = con
    this.ws = new WebSocket("ws://"+con);
    this.key = key
  }
open = async function() {
  var ws = this.ws
  return new Promise((resolve, reject) => {
    ws.on('open', () => {
      resolve('READY!')
    })
    ws.on('error', () => {
      reject('err')
    })
  })  
}
fetch = async function(query){
  var ws = this.ws
  var key = this.key
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
create = async function(query){
  var ws = this.ws
  var key = this.key
  return new Promise(function (resolve, reject) {
    ws.send(JSON.stringify({act: "create",key: key,query: query}))
    ws.on('message', async function message(msg) {
      let data = JSON.parse(msg)
      if(data.error != undefined){
        reject("ERROR: "+data.error)
      }
      resolve(data)
    });
  })
}
insert = async function(query){
  var ws = this.ws
  var key = this.key
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
remove = async function(query){
  var ws = this.ws
  var key = this.key
  return new Promise(function (resolve, reject) {
    ws.send(JSON.stringify({act: "remove",key: key,query: query}))
    ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    if(data.error != undefined){
      reject(data = "ERROR: "+data.error)
    }
    resolve(data)
  });
})
}
update = async function(query){
  var ws = this.ws
  var key = this.key
  return new Promise (function (resolve, reject) {
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
close = function (){
  this.ws.close()
}
}
module.exports = db;