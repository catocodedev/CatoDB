const { count } = require('console');
const fs = require('fs');

exports.fetch = async function (query) {
    return new Promise(function (resolve, reject) {
        if(fs.existsSync("././data/"+query.table+".json")){
        fs.readFile("././data/"+query.table+".json", function (err, data) {
            if (err) reject(err);
            var results = JSON.parse(data);
            // console.log(results.schema)
            var filtered = results.rows
            if(query.row == undefined || query.row == "*"){
                // no effect
            }else{
                if(query.row > -1 && query.row < filtered.length){
                    filtered = results.rows[query.row]
                    if(query.column == undefined || query.column == "*"){
                    }else{
                        let colfil = [];
                        for(var i in filtered) {
                            colfil.push(filtered[i]);
                        }
                            if(colfil.hasOwnProperty(results.schema.indexOf(query.column))) {
                                filtered = {"result": colfil[results.schema.indexOf(query.column)]}
                        }else{
                            resolve({error: "INVALID COLUMN QUERY"})
                        }
                    }
                }else{
                    resolve({error: "INVALID ROW QUERY"})
                }
            }
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
exports.update = async function(row,table,dataa){
    if(fs.existsSync("././data/"+table+".json")){
    fs.readFile("././data/"+table+".json", function (err, data) {
        if (err){
            return {error: "CAN'T EDIT TABLE"}
        }
        let old = JSON.parse(data)
        if(row > -1 && row < old.length){
            return {error: "INVALID ROW QUERY"}
        }
        console.log('--------------------')
        console.log(old)
        old.rows[row] = dataa
        fs.writeFile("././data/"+table+".json", JSON.stringify(old), 'utf-8', function (err){
            if (err) return console.log(err);
        })
    })
    }
    return {result: 'TABLE UPDATED'}
}