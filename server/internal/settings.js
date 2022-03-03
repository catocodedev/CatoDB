const fs = require('fs');

async function testSettings(settings){
    if(settings == undefined){
        return undefined;
    }
    if(settings.server.port < 0 || settings.server.port > 65535){
        return "Error";
    }else{
        return settings;
    }
}

async function getSettings(){
    return new Promise(function(resolve, reject) {
      fs.readFile("././settings.json", function(err, data) {
        if (err) reject(err);
        var settings = JSON.parse(data);
        resolve(settings);
      });
    });
  }

exports.get = async function (){
var settings = await getSettings();
      var setting = await testSettings(settings);
        if(setting == "Error"){
            return "Error"
        }else{
            return settings;
        }

  }