const fs = require('fs');

exports.fetch = async function (query) {
    return new Promise(function (resolve, reject) {
        fs.readFile("././data/"+query.table+".json", function (err, data) {
            if (err) reject(err);
            var results = JSON.parse(data);
            if(query.column == undefined || query.column == "*"){
            resolve(results);
            }else{
                resolve(results);
            }
        });
    });
}