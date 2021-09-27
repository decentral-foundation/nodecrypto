"use strict";

let express = require("express");
let app = express();
let fs = require('fs');


const bodyParser = require('body-parser');
const encrypt = require("./encrypt");
const decrypt = require("./decrypt");
const { encrypt_v1 } = require("./getCipherKey");
const { decrypt_v1 } = require("./getCipherKey");
const Helper = require('./helper');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Signer Node API' })
})

app.get('/helper', function (request,response) {
  let helper = new Helper(123456);
  helper.setChildProcess(childProcess);
})


// API V0
app.get('/v0/updates', (request,response) => {
  response.json({ updates: ["no new updates"]});
})

app.post('/v0/updates', function (request,response) {
  let data = "my updates";
  let reqBody = request.body;
  response.json({ 
    updates: ["no new updates",data],
    info: reqBody
  })
})

app.put('/v0/updates', function (request,response) {

})

app.post('/v0/create/:filename', (request,response) => {
  let filename = request.url;
  let split = filename.split('/').pop(); 
  let template = ["# Header\r", "## Subtitle\r", "Lorem ipsum\r"];
  let location = __dirname + '/store/' + split + '.md';
  let ws = fs.createWriteStream(location);

  ws.on('error', (err) => { 
    throw new Error("An error has occured: ",err);
  })
  template.forEach(function (line) {
    ws.write(line + "\n"); // note: blocking
  })
  ws.end();
  response.writeHead(201);
  response.end({message: "This file has been created"})
})

app.post('/v0/protect/:filename', (request,response) => {
  let filename = request.url;
  let split = filename.split('/').pop(); 
  let location = __dirname + '/store/' + split + '.md';
  let { password } = request.body;
  encrypt({file: location,password});
  response.setHeader('Content-Type', 'text/plain');
  response.writeHead(200);
  response.write("<div>Received File Protection Request</div>");
  response.end();
})

app.get('/v0/view/:filename', (request,response) => {
  let filename = request.url;
  let split = filename.split('/').pop(); 
  let location = __dirname + '/store/' + split + '.md';
  fs.readFile(location, (err, data) => {
    if (err) {
      response.writeHead(400);
      response.end({message: "Error 400 Bad Request"});
    } else {
      response.setHeader('Content-Type', 'text/plain');
      response.write(data.toString('utf-8'));
      response.end();
    }
  })
})

app.put('/v0/unlock/:filename', (request,response) => {
  let filename = request.url;
  let split = filename.split('/').pop(); 
  let location = __dirname + '/store/' + split + '.md'+'.enc';
  let { password} = request.body;
  decrypt({file: location,password});
  response.writeHead(200);
  response.write("<div>Received File Protection Request</div>");
  response.end();
})


// API V1
app.post('/v1/create/:filename',function (request,response) {
  let filename = request.url;
  let split = filename.split('/').pop(); 
  let content = "Lorem ipsum dolores\r";
  let template = ["# Header\r", "## Subtitle\r", content];
  let location = __dirname + 
    '/store/' +  
    split + 
    '.md' +
    'enc'
  ;
  try {
    let template = fs.writeFileSync(location, content);
  } catch (err) {
    throw new Error('BROKEN error in create filename v1');
  }
  response.json({
    message: "Queued up this to be written" + content
  });
})


app.post('/v1/protect/:filename', function (request,response) {
  let phrase = "A private message for authorization"; // get phrase from request
  let cipherText = encrypt_v1(phrase,request.data);
  response.json({
    cipherText
  });
})


app.post('/v1/unlock/:filename',function(request,response) {
  let tempFileStream = "bE5sbTePdTwlyXlPD0sIvdOSwKnroHAMth371eOlOJU3i0odsSt6x2Qv9+GbFjmQ";
  let decipherText = decrypt_v1(tempFileStream,request.data);
  response.json({
    decipherText
  });
})



app.get('/home/:resource', (request,response) => {
  let fsObject = fs; 
  let req = request;
  let res = response;
  let my_env_buffer = {a: [0,1,0,1], b: fsObject};
  let responseHandler = new ResponseHandler(
    req,
    res,
    my_env_buffer,
    function myCallback (err,data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      } 
      res.writeHead(200);
      res.end(data);
      return;
    }
  );
  responseHandler.helper("this is a generic message");
})

function ResponseHandler(req,res,env_data,cb) {
  this.req = req;
  this.res = res;
  this.env_data = env_data;
  this.cb = cb;
}

ResponseHandler.prototype.helper = function (phrase) {
  if (phrase === "error-check"){
    return this.cb(new Error("Throw error from check"));
  }
  return this.env_data.b.readFile(__dirname + this.req.url,this.cb) 
}


module.exports = app;