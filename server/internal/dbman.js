const { count } = require('console');
const fs = require('fs');

exports.fetch = async function (query) {
    return new Promise(function (resolve, reject) {
        if(fs.existsSync("././data/"+query.table+".json")){
        fs.readFile("././data/"+query.table+".json", function (err, data) {
            if (err) reject(err);
            var results = JSON.parse(data);
            var filtered = results
            if(query.row == undefined || query.row == "*"){
                // no effect
            }else{
                if(query.row > -1 && query.row < filtered.rows.length){
                    filtered = results.rows[query.row]
                }else{
                    resolve({error: "INVALID ROW QUERY"})
                }
            }
            // if(query.column == undefined || query.column == "*"){
            // resolve(results);
            // }else{
            //     for (key in results.rows) {
            //         if(results.rows.hasOwnProperty(key)) {
            //             console.log(key + " = " + results.rows[key]);
            //         }
            //       }
            //     resolve(results);
            // }
            resolve(filtered)
        });
    }else{
        resolve({error: "INVALID TABLE"})    
    }
    });
}