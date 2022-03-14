const catodb = require('catodb')

var db = new catodb('ws://localhost:4020', 'CatoDB')
main()
async function main(){
await db.open()
try{
console.log (await db.update({table: "cats", row: 0, data:{name:"cleint",info:"cat"}})) //valid
console.log(await db.fetch({table: "test","row":1,column:"name"})) //valid
}catch(e){
console.log(e)
}
db.close()
}
