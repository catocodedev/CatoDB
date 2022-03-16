const catodb = require('catodb')

var db = new catodb('ws://localhost:4020', 'CatoDB')
main()
async function main(){
await db.open()
try{
console.log(await db.fetch({table: "meow", filters: {column:"name", value:"pp"}}))
}catch(e){
console.log(e)
}
db.close()
}
