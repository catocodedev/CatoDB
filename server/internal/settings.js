const fs = require('fs');

async function testSettings(settings){
    return new Promise(function(resolve, reject) {
  try{
    JSON.stringify(settings);
  }catch(err){
      reject("Parse Error:"+err);
  }
    if(settings == undefined){
        reject("No settings ); Error");
    }
    if(settings.server.port < 0 || settings.server.port > 65535){
      reject("Port Error");
    }else{
        resolve(settings);
    }
    });
}

async function getSettings(){
    return new Promise(function(resolve, reject) {
      fs.readFile("settings.json", function(err, data) {
        if (err) reject(err);
        console.log(data.toString());
        var settings = JSON.parse(data);
        resolve(settings);
      });
    });
  }

exports.get = async function (){
return new Promise(async function(resolve, reject) {
var settings = await getSettings();
try{
    settings = await testSettings(settings);
}catch(err){
    reject(err);
}
resolve(settings);
      });
  }