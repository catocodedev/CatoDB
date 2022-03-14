const catodb = require('catodb')

var db = new catodb('ws://localhost:4020', 'CatoDB')
main()
async function main(){
await db.open()
console.log (await db.update({table: "cats", row: 2, data:{"name":"space","color":"blue","animal":"cat"}})) //valid
console.log(await db.fetch({table: "test","row":0,column:"name"})) //valid
db.close()
}
