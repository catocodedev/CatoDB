const fs = require('fs');
const { resolve } = require('path');

exports.fetch = async function (query,settings) {
    console.log("././"+settings.server.path+"/"+query.table+".json")
    return new Promise(function (resolve, reject) {
        if(fs.existsSync("././"+settings.server.path+"/"+query.table+".json")){
        fs.readFile("././"+settings.server.path+"/"+query.table+".json", function (err, data) {
            if (err) resolve(err);
            var results = JSON.parse(data);
            // console.log(results.schema)
            var filtered = results.rows
            if(!query.filters){
            if(query.row == undefined || query.row == "*"){
            // filter by column name
            let list = [];
            if(query.column){
                filtered = results.rows.filter(function(row){
                    list += row[query.column]+",";
                })
                list = list.split(",")
                // get rid of last comma
                list.pop()
                filtered = list
                }   
                resolve(filtered)
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
        }else{
           // filter by column name
           let list = [];
           if(query.filters.column){
               filtered = results.rows.filter(function(row){
                   list += row[query.filters.column]+",";
               })
               list = list.split(",")
               // get rid of last comma
               list.pop()
               filtered = list
               console.log(query.filters.value)
               if(query.filters.value != undefined || query.filters.value != "*"){
                console.log("FILTERING")
               // filter by value
               let i = -1;
               let list2 = [];
                filtered = list.filter(function(row){
                    i++;
                    if(row == query.filters.value){
                        list2 += i+",";
                        return i;
                    }
                })
                if(list2.length == 0 || list2 == undefined){
                    filtered = {error: "NO ROWS FOUND"}
                }else{
                list2 = list2.split(",")
                // get rid of last comma
                list2.pop()
                let list3 = []
                list2.forEach(element => {
                    list3.push(JSON.stringify({row:i,data:results.rows[element]}))
                });
                filtered = list3
            }
        }else{
            console.log("NOT FILTERING")
        }
                resolve(filtered) 
        }else{
            resolve({error: "INVALID FILTER QUERY"})
        }
    }
    });
}else{
    resolve({error: "INVALID TABLE"})    
}
});
}
exports.insert = async function(table,row,settings){
    return new Promise(function (resolve, reject) {
    if(fs.existsSync("././"+settings.server.path+"/"+table+".json")){
    fs.readFile("././"+settings.server.path+"/"+table+".json", function (err, data) {
        if (err){
            resolve({error: "CAN'T EDIT TABLE"})
        }
        let old = JSON.parse(data)
        console.log('--------------------')
        console.log(old)
        old['rows'].push(row);
        fs.writeFile("././"+settings.server.path+"/"+table+".json", JSON.stringify(old), 'utf-8', function (err){
            if (err){
                resolve(err)
            }else{
                resolve({result: 'ROW INSERTED'})
            }
        })
    })
    }else{
        resolve({error: "TABLE DOESN'T EXSIT"})
    }
})
}
exports.update = async function(row,table,dataa,settings){
    return new Promise(function (resolve, reject) {
    if(fs.existsSync("././"+settings.server.path+"/"+table+".json")){
    fs.readFile("././"+settings.server.path+"/"+table+".json", function (err, data) {
        if (err){
            resolve({error: "CAN'T EDIT TABLE"})
        }
        let old = JSON.parse(data)
        if(row > -1 && row < old.length){
            resolve({error: "INVALID ROW QUERY"})
        }
        console.log('--------------------')
        console.log(old)
        old.rows[row] = dataa
        fs.writeFile("././data/"+table+".json", JSON.stringify(old), 'utf-8', function (err){
            if (err) return resolve(err);
        })
    })
    }else{
        resolve({error: "TABLE DOESN'T EXSIT"})
    }
    resolve({result: 'TABLE UPDATED'})
})
}
exports.remove = async function(row,table,settings){
    return new Promise(function (resolve, reject) {
    if(fs.existsSync("././data/"+table+".json")){
    fs.readFile("././data/"+table+".json", function (err, data) {
        if (err){
            resolve({error: "CAN'T EDIT TABLE"})
        }
        let old = JSON.parse(data)
        if(row > -1 && row < old.length){
            resolve({error: "INVALID ROW QUERY"})
        }
        console.log('--------------------')
        console.log(old)
        // remove row
        old.rows.splice(row,1);
        fs.writeFile("././data/"+table+".json", JSON.stringify(old), 'utf-8', function (err){
            if (err) return resolve(err);
        })
    })
    }else{
        resolve({error: "TABLE DOESN'T EXSIT"})
    }
    resolve({result: 'ROW REMOVED'})
})
}
exports.create = async function(table,schema,dataa,settings){
    if(dataa == undefined){
        resolve({error: "NO DATA"})
    }
    return new Promise(function (resolve, reject) {
    if(fs.existsSync("././"+settings.server.path+"/"+table+".json")){
        resolve({error: "TABLE ALREADY EXSITS"})
    }else{
        fs.writeFile("././"+settings.server.path+"/"+table+".json", JSON.stringify({schema: schema,rows:[dataa]}), 'utf-8', function (err){
            if (err) resolve({error: "CAN'T CREATE TABLE"})
        })
    }
    resolve({result: 'TABLE CREATED'})
})
}
