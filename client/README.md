# CatoDB Client
## NODE JS
### Step 1
`npm i catodb`<br/>
Create a main async funtion and connect to your DB
```
const catodb = require('catodb')
var db = new catodb('localhost:4020', 'CatoDB')
main()
async function main(){
    try{
await db.open()
    }catch(error){
        console.log(error)
    }
db.close
}
```
## more langs soon