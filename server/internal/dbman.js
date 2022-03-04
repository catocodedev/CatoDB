const { count } = require('console');
const fs = require('fs');

exports.fetch = async function (query) {
    return new Promise(function (resolve, reject) {
        if(fs.existsSync("././data/"+query.table+".json")){
        fs.readFile("././data/"+query.table+".json", function (err, data) {
            if (err) reject(err);
            var results = JSON.parse(data);
            console.log(results.schema)
            var filtered = results.rows
            if(query.row == undefined || query.row == "*"){
                // no effect
            }else{
                if(query.row > -1 && query.row < filtered.length){
                    filtered = results.rows[query.row]
                    console.log(filtered)
                    if(query.column == undefined || query.column == "*"){
                        console.log('NO COLUMN')
                    }else{
                        let colfil = [];
                        for(var i in filtered) {
                            colfil.push(filtered[i]);
                        }
                        console.log('------column data-------')
                        console.log(query.column)
                        console.log(results.schema.indexOf(query.column))
                        console.log('------columns-------')
                            if(colfil.hasOwnProperty(results.schema.indexOf(query.column))) {
                        console.log(colfil[results.schema.indexOf(query.column)]);
                        filtered = {"result": colfil[results.schema.indexOf(query.column)]}
                        }else{
                            resolve({error: "INVALID COLUMN QUERY"})
                        }
                    }
                }else{
                    resolve({error: "INVALID ROW QUERY"})
                }
            }
            console.log(`----------filtered---------`)
            console.log(filtered)
            resolve(filtered)
        });
    }else{
        resolve({error: "INVALID TABLE"})    
    }
    });
}
exports.insert = async function(table,row){
    if(fs.existsSync("././data/"+table+".json")){
    fs.readFile("././data/"+table+".json", function (err, data) {
        if (err){
            return {error: "CAN'T EDIT TABLE"}
        }
        let old = JSON.parse(data)
        console.log('--------------------')
        console.log(old)
        old['rows'].push(row);
        fs.writeFile("././data/"+table+".json", JSON.stringify(old), 'utf-8', function (err){
            if (err) return console.log(err);
        })
    })
    }
    return {result: 'TABLE INSERTED'}
}