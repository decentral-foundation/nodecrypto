"use strict";

let express = require("express");
let app = express();
let fs = require('fs');


const bodyParser = require('body-parser');
const encrypt = require("./encrypt");
const decrypt = require("./decrypt");
const { streamReader } = require("./util");
const { 
  encrypt_v1, 
  decrypt_v1,
  range_v1 } = require("./getCipherKey");
const Helper = require('./helper');
const SecureLRU = require("./model/SecureLru.js");
const secureLru = new SecureLRU(20);




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


/**
 * @description the writing business logic for each loop is blocking io
 */
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
    ws.write(line + "\n"); 
  })
  ws.end();
  response.writeHead(201);
  response.end({message: "This file has been created"})
})



/**
 * @description Req param filename must not contain dot extension and req must have separate extension field
 * @param {string} filename  - a utf 8 string
 * @param {string} extension - a utf 8 string
 * @returns a response message
 */
app.post('/v0/protect/', function(request,response) {
  let { filename, extension } = request.body;
  let { password} = request.body;
  let location = __dirname + '/store/' + 
    filename + '.' + extension;
  encrypt({file: location,password});
  response.setHeader('Content-Type', 'text/plain');
  response.writeHead(200);
  response.write("<div>Received File Protection Request</div>");
  response.end();
})


/**
 * @description Refer to Readme Section 8 optional 
 * @returns the data at hand
 */
app.get('/v0/view/:filename', (request,response) => {
  let filename = request.url;
  let split = filename.split('/').pop(); 
  let location = __dirname + '/store/' + split + '.md';
  fs.readFile(location, (err, data) => {
    if (err) {
      response.writeHead(400);
      response.end({message: "Error 400 Bad Request"});
      return;
    } else {
      response.setHeader('Content-Type', 'text/plain');
      response.write(data.toString('utf-8'));
      response.end();
    }
  })
})

/**
 * @description This is more feasible than above
 * @returns the data at hand
 */
 app.put('/v0/view/', function (request,response) {
  let { filename, extension } = request.body;
  let location = __dirname + '/store/' + filename + '.' + extension;
  try {
    fs.readFile(location, function (err, data) {
      if (err) {
        console.log("Unauthorized access. This issue will be reported. err: ",err);
        // Action item: write in log by Nov 22
        return;
      } else {
        response.json(data.toString('utf-8'));
        return;
      }
    })  
  } catch (e) {
    console.log("put error in log: ",e);
    response.end({message: "Error 500"});
  }
 })


/**
 * @description Refer to Readme Section 8 optional 
 * @param {filename} - file must be of form utf-8 string
 * @param {extension} - file must be of form utf-8 string
 * @param {options} - FIELD boolean ABSOLUTE_PATH
 * @returns nothing since you need to call view
 */
app.put('/v0/unlock/', function (request,response) {
  let { filename, extension } = request.body;
  let { password} = request.body;
  let location = __dirname + '/store/' + 
    filename + '.' + extension + '.enc';
  try {
    decrypt({
      dc_file: location,
      password, 
      options: {DEBUG_FLAG: true} 
    });
    response.writeHead(200);
    response.write("<div>Received File Unlock Request</div>");
    response.end();
  }
  catch (e) {
    console.log("put error in log: ",e);
    response.end({message: "Error 500"});
  }
})




/**
 * @description When user makes call to create, they'll protect it right after
 * @param {string} - An ID that will be used to retreive data
 */
app.post('/v1/create/:filename',function (request,response) {
  let filename = request.url;
  console.log("request.data",request.data);
  let split = filename.split('/').pop(); 
  let content = "Lorem ipsum dolores\r";
  let template = ["# Header", "## Subtitle", content,"\n"];
  let location = __dirname + 
    '/store/' +  
    split + 
    '.md';
  let tContent = template.join("\r");
  try {
    let template = fs.writeFileSync(location, tContent);
  } catch (err) {
    throw new Error('Error in create filename v1');
  }
  response.json({
    message: "Queued up this to be written"
  });
})




/**
 * @description Status here is that needs to be redone. First get rid of concept of phrase since that should just be read from file
 * @param request.body {object} - FIELD filename UTF-8
 * @param request.body {object} - FIELD password UTF-8 (Action Req field key name needs to be non obvious not password)
 * @returns TODO currently does not write to file but it needs to
 */
app.post('/v1/protect/', function (request,response) {
  // fixing old line let phrase with new line const phrase
  // let phrase = "A private message for authorization"; // get phrase from request
  let split = 'bob-26252' // hard coded for now get it from decoded post request
  let location = __dirname + '/store/' + split + '.md';
  const phrase = fs.readFileSync(location,{
    encoding: "utf-8"
  }); 



  let userId = Math.round(Math.random() * (3000 - 500)) + 500;
  let { filename, password }  = request.body;
  // this splits each line in the file with slash r then encrypts it
  // NB: Needed to add .join() as crypto.update() expects a string
  let  base64Cipher = encrypt_v1(phrase.toString('utf-8').split("\r").join(' '));
  console.log("This will eventually be written to file... base64Cipher: ",base64Cipher);




  let ws = fs.createWriteStream(location);
  ws.on('error', (err) => { 
    console.error("err: ",err);
    throw new Error("An error has occured: ",err);
  })// ACTION REQ size matters so can we even decrypt this properly? 
  let content = "Lorem ipsum dolores\r";
  let template = ["# Header", "## Subtitle", content,"\n"];
  // NB: Just added above 2 lines for testing; don't know what template is really meant to be
  template.forEach(function (line) {
    ws.write(base64Cipher + "\n");  
  })
  ws.end();

  

  response.json({ 
    userId, // see if its compatible the converse version is  res.writeHead(201);
    message: "Cipher Text stored in Cache" // res.end({message: "This file has been created"})
  });
})
/**
 * @description App uses this to encrypt a string
 * @param  {string} val - a value string such as a long paragraph or markdown file
 * @return {string} encryption_key - a key to use other than default 
 */


app.post('/v1/view/:filename', function (request,response) {
  // generation: copy with dot enc added
  
  console.log("request.body: ",request.body);
  let filename = request.url;
  let split = filename.split('/').pop(); 
  let { id, params } = request.body;
  let boat = split + '-' + id.toString();
  let location = __dirname + '/store/' + boat + '.md.enc';
})


app.post('/v1/unlock/:filename',function(request,response) {
  let {decipherText, userId} = request.data;
  let fileStream = valueKeyStorage.filter(function (item) {
    return item.userId === userId; 
  });
  let myDecipherText = decrypt_v1(tempFileStream,request.data);
  let responseMsg = `Decrypted message for user ${userId} enclosed`;
  response.json({
    myDecipherText, 
    message: responseMsg
  });
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