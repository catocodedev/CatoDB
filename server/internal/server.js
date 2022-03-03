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
            console.log(msg)
            if(msg.key != setting.server.key){
                ws.send(JSON.stringify({error: "INVALID KEY"}))
                return "INVALID KEY"
            }
            if(msg.act == "fetch"){
                if(msg.query == undefined){
                    ws.send(JSON.stringify({error: "NO QUERY"}))
                }else{
                dbman.fetch(msg.query).then(function(data){
                    console.log(data)
                    ws.send(JSON.stringify(data));
                });
            }
            }else if(msg.act == "connect"){
                console.log('Conection!')
            }
        });
    });
}