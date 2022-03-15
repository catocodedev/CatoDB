const catodb = require('catodb')

var db = new catodb('ws://localhost:4020', 'CatoDB')
main()
async function main(){
await db.open()
try{
console.log(await db.create({table:'meow',schema:['name','type'],data:{'name':'meow','type':'cat'}}))
console.log(await db.remove({row:0,table:'test'}))
console.log(await db.fetch({table: "auth", filters: {column:"user", value:"Admin"}}))
console.log(await db.fetch({table: "auth",column:"pass"}))
}catch(e){
console.log(e)
}
db.close()
}
