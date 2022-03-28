const { WebSocketServer } = require('ws');
const dbman = require('./dbman');
const clients = new Map();

var key = undefined

exports.run = async function (setting) {
    const wss = new WebSocketServer({port:setting.server.port});
    key = setting.server.key
    wss.on('connection', async function connection(ws) {
       ws.on('message', async function incoming(message) {
            try{
            let msg = JSON.parse(message);
            console.log('------------------------------------------------------')
            console.log("INCOMMING =>")
            console.log(msg)
            if(msg.key.toString() != key){
                ws.send(JSON.stringify({error: "INVALID KEY"}))
                console.log("INVALID KEY")
                console.log(" => OUTGOING")
            }else{
            if(msg.act == "fetch"){
                if(msg.query == undefined){
                    ws.send(JSON.stringify({error: "NO QUERY"}))
                }
                else if(msg.query.table == undefined){
                    ws.send(JSON.stringify({error: "NO TABLE"}))
                }
                else{
                    console.log(`----------sending---------`)
                    await dbman.fetch(msg.query,setting).then(data => {
                    console.log(data)
                    ws.send(JSON.stringify(data));
                });
            }
            }else if(msg.act == "connect"){
                console.log('INCOMMING => Conection!')
            }else if(msg.act == "insert"){
                await dbman.insert(msg.query.table,msg.query.data,setting).then(data => {
                    console.log(data)
                    ws.send(JSON.stringify(data));
                });
            }else if(msg.act == "update"){
                await dbman.update(msg.query.row,msg.query.table,msg.query.data,setting).then(data => {
                    console.log(data)
                    ws.send(JSON.stringify(data));
                });
            }
            else if(msg.act == "create"){
                await dbman.create(msg.query.table,msg.query.schema,msg.query.data,setting).then(data => {
                    console.log(data)
                    ws.send(JSON.stringify(data));
                });
            }else if(msg.act == "remove"){
                await dbman.remove(msg.query.row,msg.query.table,setting).then(data => {
                    console.log(data)
                    ws.send(JSON.stringify(data));
                });
            }
            else if(msg.act == "insert"){
                console.log('INCOMMING => insert!')
                await dbman.insert(msg.query.table,msg.query.data,setting).then(data => {
                    console.log(data)
                    ws.send(JSON.stringify(data));
                });
            }else{
                ws.send(JSON.stringify({error: "NO/INVALID ACT"}))
            }
            console.log(" => OUTGOING")
        }
    }catch(e){
        return "invalid json"
    }
        });
        
    });
}