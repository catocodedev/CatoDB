const catodb = require('../main.js')

main();
async function main(){
console.log('connected')
await catodb.fetch({table: "cats",row: 1, column: "name"},"CatoDB")
}