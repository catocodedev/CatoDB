# CatoDB Client
## Usage
### Step 1
`npm i catodb`
### Step 2
create a new js file and requrie the module
```
const catodb = require('catodb')
```
### Step 3
Add your DB connection the fisrt peram being the DB connection and the second one being the key
```
var db = new catodb('ws://localhost:4020', 'CatoDB')
```
### Step 4
Create a main async funtion and connect to your DB
```
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
### Done!