"use strict";
  
let express = require('express');
let app = express();
let exec = require('child_process').exec;


const SCRIPT_HOME_AOUT = __dirname + './a.out';
const SCRIPT_DURATION_ADD = __dirname + './b.out';


const argv = process.argv;
let PORT = 5000;
if (argv.length === 3)
{
  let pNum = new Number(argv.pop());
  PORT = pNum;
}
app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/', express.static(__dirname + '/www'));


app.get('/api/ping', function (request, response) {
  response.json({ 
    updates: ["pong"],
  })
})

app.get('/api/pong', async (request,response) => {
  run_shell_command("./src/target/debug/src",function(err,data) {
    if (err) {
      response.status(500).send(err);
    }
    console.log('data: ',data);
    response.json({curl_data: data, message: "unformatted"});
    return;
  })
})


/**
 * @description sends a curl get with vvv to ondecentral.com 
 */
app.get('/api/test', function (request,response) {
  run_shell_command("./bin/helloworld.sh", function (err,data) {
    if (err) {
      response.status(500).send(err);
      return
    }
    response.json({
      curl_data: data,
      message: "no issues"
    })
  })
})


/**
 * @description sends a notification currently in form of email 
 * @param default will gzip also running curl with -i will imply post
 */
app.get('/api/notify', function (request,response) {
  run_shell_command("./bin/updatejson.sh", function (err,data) {
    if (err) {
      response.status(500).send(err);
      return
    }
    response.json({
      curl_data: data,
      message: "no issues"
    })
    return;
  })
})

/**
 * @description Scope has data such as time and place
 * @method POST hostname:5000/api/open/attachment
 * @param
 */
app.get('/api/open/', function (request,response) {
  run_shell_command("./bin/sendemail.sh", function (err) {
    if (err) {
      response.status(500).send(err);
      return
    }
    response.json({
      curl_data: data,
      message: "no issues"
    });
    return;
  })
})


/**
 * @description
 * @method POST hostname:5000/api/open/attachment
 * @param
 */
app.post('/api/open/attachment', function (request,response) {
  run_shell_command("./bin/sendmail.sh", function (err) {
    if (err) {
      response.status(500).send(err);
      return
    }
    response.json({
      curl_data: data,
      message: "issue list"
    })
  })
})


app.post('/api/save-form-data', function (request,response) {
  console.log("request.body: ",request.body);
  response.json({ 
    updates: ["no new updates"],
  });
  return;
})


app.post('/api/protect/:filename', function (request,response) {

})

let server = app.listen(PORT);


// fact you can't get the return value except you use 
// synchronous version of the exec function. 
function run_shell_command(command,callback) {   
  exec(command, function(err,stdout,stderr){
    if(err) {
      callback(stderr,undefined);
      return;
    } else {
      callback(null,stdout);
      return;
   }
 });
}


function runArgs(scriptPath, callback) {
  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false;
  //var myProcess = childProcess.spawn('ls',['-lh']);
  const myProcess = childProcess.exec(scriptPath);

  myProcess.stdout.on('data',data => {
    if (invoked) return;
    invoked = true;
    callback({data});
  });

  // listen for errors as they may prevent the exit event from firing
  myProcess.on('error', function(err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  myProcess.on('exit', function(code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error('exit code ' + code);
    callback(err);
  });

}


function run(scriptPath, callback) {
  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false;

  const myProcess = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  myProcess.on('error', function(err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  myProcess.on('exit', function(code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error('exit code ' + code);
    callback(err);
  });
}