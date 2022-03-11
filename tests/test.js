const catodb = require('catodb')

main()
async function main(){
await catodb.open()
console.log (await catodb.update('CatoDB',{table: "cats", row: 2, data:{"name":"space","color":"blue","animal":"cat"}})) //valid
console.log(await catodb.fetch('CatoDB',{table: "test","row":0,column:"name"})) //valid
catodb.close()
}
