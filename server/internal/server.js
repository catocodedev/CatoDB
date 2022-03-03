const { WebSocketServer } = require('ws');
const dbman = require('./dbman');

exports.run = async function (setting) {
    const wss = new WebSocketServer({port:setting.server.port});

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            try{
            var msg = JSON.parse(message);
            }catch(e){
                return "invalid json"
            }
            console.log('------------------------------------------------------')
            console.log("INCOMMING =>")
            console.log(msg)
            if(msg.key != setting.server.key){
                ws.send(JSON.stringify({error: "INVALID KEY"}))
                console.log(" => OUTGOING")
            }
            if(msg.act == "fetch"){
                if(msg.query == undefined){
                    ws.send(JSON.stringify({error: "NO QUERY"}))
                }
                else if(msg.query.table == undefined){
                    ws.send(JSON.stringify({error: "NO TABLE"}))
                }
                else{
                dbman.fetch(msg.query).then(function(data){
                    console.log(data)
                    console.log(" => OUTGOING")
                    ws.send(JSON.stringify(data));
                });
            }
            }else if(msg.act == "connect"){
                console.log('INCOMMING => Conection!')
            }
        });
    });
}