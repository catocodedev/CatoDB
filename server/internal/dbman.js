const fs = require('fs');

exports.fetch = async function (query) {
    return new Promise(function (resolve, reject) {
        if(fs.existsSync("././data/"+query.table+".json")){
        fs.readFile("././data/"+query.table+".json", function (err, data) {
            if (err) reject(err);
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
                list2 = list2.split(",")
                // get rid of last comma
                list2.pop()
                console.log(list2)
                let list3 = []
                list2.forEach(element => {
                    list3.push(results.rows[element])
                });
                console.log(list3)
                filtered = list3
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
exports.insert = async function(table,row){
    return new Promise(function (resolve, reject) {
    if(fs.existsSync("././data/"+table+".json")){
    fs.readFile("././data/"+table+".json", function (err, data) {
        if (err){
            reject({error: "CAN'T EDIT TABLE"})
        }
        let old = JSON.parse(data)
        console.log('--------------------')
        console.log(old)
        old['rows'].push(row);
        fs.writeFile("././data/"+table+".json", JSON.stringify(old), 'utf-8', function (err){
            if (err){
                reject(err)
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
exports.update = async function(row,table,dataa){
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
        old.rows[row] = dataa
        fs.writeFile("././data/"+table+".json", JSON.stringify(old), 'utf-8', function (err){
            if (err) return reject(err);
        })
    })
    }else{
        resolve({error: "TABLE DOESN'T EXSIT"})
    }
    resolve({result: 'TABLE UPDATED'})
})
}
exports.create = async function(table,dataa){
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
        old.rows[row] = dataa
        fs.writeFile("././data/"+table+".json", JSON.stringify(old), 'utf-8', function (err){
            if (err) return resolve(err);
        })
    })
    }
    resolve({result: 'TABLE UPDATED'})
})
}