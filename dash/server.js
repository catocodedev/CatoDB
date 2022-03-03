// imports
const http = require('http');
const fs = require('fs');
const url = require('url');
const events = require('events');
var os = require('os');

var eventEmitter = new events.EventEmitter();
// declare consts
const port = 4040;
const home = "index";
const infoprefix = "{INFO}";
const reqprefix = "{REQUEST}";
const errprefix = "{ERROR}";
const infopg = "srvinfo";
const ver = "Dev 0.1.0";

// run server
http.createServer(function (req, res) {
  //router
  if (req.url.endsWith("/")) {
    var file = "views/"+ req.url + home +".html"
    if (fs.existsSync(file)) {
    console.log(infoprefix + "Rendering home page")
    }else{
      console.log(errprefix + 'server can not find | ' + file +' |')
       file = "views/404.html"
    }
  }
  else if (req.url == "/" + infopg) {
    console.log(infoprefix + "Rendering info page")
    res.write("<title>Server Info</title>")
    res.write("<h1>Cato Web Server" + ver + "</h1>");
    res.write("<p>Made by CatoCode</p><br/>")
    res.write("<h3>Server Info</h3>")
    var freemem =  parseInt(os.freemem / 1000000)
    var totalmem = parseInt(os.totalmem / 1000000)
    res.write("<p>Hostname: " + os.hostname + " | Platform: " + os.platform +" | Architecture: " + os.arch + " | Memory Free: " + freemem + "MB/" + totalmem + "MB</p><br/>")
    res.write("<p> Uptime: " + os.uptime + " | Reload to update!</p>")
    res.write("<a href='/'>Index page</a>")
    return res.end();
  }
  else if (!req.url.includes('.')) {
    var file = "views"+req.url+".html"
      if (fs.existsSync(file)) {
        console.log(infoprefix + "Rendering " + file)
      }
     else{
      console.log(errprefix + 'server can not find | ' + file +' |')
       file = "views/404.html"   
     }
  }
  else{
    var file = "./assets"+req.url
    if (fs.existsSync(file)) {
      console.log(infoprefix + "| " + file + ' | is a valid file')
    }
   else{
    console.log(errprefix + 'server can not find |' + file +' |')
     file = "views/404.html"
   }
  }
  // render file
  fs.readFile(file, function(err, data) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  if (err) throw err;
  res.write(data);
  return res.end();
  });
  console.log(reqprefix + req.url)

}).listen(port);   
console.log(infoprefix + "Server ready on port:" + port)