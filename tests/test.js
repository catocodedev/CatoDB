const catodb = require('catodb')
const path = require('path')

var db = new catodb('localhost:4020', 'CatoDB')
main()
async function main(){
try{
    await db.open()
console.log(await db.fetch({table: "meow", filters: {column:"name", value:"meow"}}))
}catch(e){
console.log(e)
}
db.close()
}
