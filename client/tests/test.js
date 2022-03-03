const catodb = require('../main.js')

main();
async function main(){
console.log(await catodb.connect())
console.log(await catodb.fetch({table: "test",row: "*"},"CatoDB"))
console.log(await catodb.fetch({table: "test",row: 1},"CatoDB"))
}