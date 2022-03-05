const catodb = require('../main.js')

main();
async function main(){
console.log('connected')
await catodb.update({table: "test",row: 2,data:{
    "name": "meowpur"
    }
},"CatoDB")
}