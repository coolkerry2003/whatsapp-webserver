var fs = require('fs');
var http = require('http');
var https = require('https');
const express = require('express')
const utf8 = require('utf8');
const bodyParser = require('body-parser');

const app = express();
const test_port = 3000
const http_port = 8080
const https_port = 443;

var credentials = {
  //Self Certificate
  // key: fs.readFileSync('pillaAuth-key.pem', utf8),
  // cert: fs.readFileSync('pillaAuth-cert.pem', utf8),
  
  //Let's Encrypt Certificate
  key: fs.readFileSync('/etc/letsencrypt/live/vigor3r.servehttp.com/privkey.pem', utf8),
  cert: fs.readFileSync('/etc/letsencrypt/live/vigor3r.servehttp.com/cert.pem', utf8),
  ca: fs.readFileSync('/etc/letsencrypt/live/vigor3r.servehttp.com/chain.pem', utf8)
};

//添加路由
app.use(bodyParser.json());
app.use("/api",require("./api"));

http.createServer(app).listen(test_port, ()=>{
  console.log(`Server listening on port ${test_port}`);
})
http.createServer(app).listen(http_port, ()=>{
  console.log(`Server listening on port ${http_port}`);
})
https.createServer(credentials, app).listen(https_port, ()=>{
  console.log(`Server listening on port ${https_port}`);
});