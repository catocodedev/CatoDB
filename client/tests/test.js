const catodb = require('../main.js')

main();
async function main(){
console.log('connected')
await catodb.insert({table: "test",data:{
    "name": "meowmeow"
    }
},"CatoDB")
}