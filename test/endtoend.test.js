"use strict";


const http = require('http');
const assert = require('assert');
const agent = new http.Agent({ keepAlive: true });

function retriableRequest(cb) {
  const req = http
    .get('http://127.0.0.1:3300/', { agent }, (res) => {

      assert(res.statusCode,200);
      cb(null,res.statusCode,req.end())
    })
    .on('end', (res) => {
      if (!res.complete) {
        console.log('The connection was terminated while the message was still being sent');
      }
      cb(null,res,req.end())
    })
    .on('error', (err) => {
      // Check if retry is needed
      console.log('have option to retry')
      if (req.reusedSocket && err.code === 'ECONNRESET') {
        cb(new Error("creating error for now"));
        // retriableRequest();
      }
    });
}


retriableRequest(function (err,data,requestObject){
  if (err) {
    throw new Error("test failed");
  }
  console.log("data: ",data);
  let { path, method, _header } = requestObject;
  console.log("{ path, method, headers }: ",{ path, method, _header });


  return;
})



function doSomething(nom) {
  console.log(nom + "()" + nom + "[")
}

(function loop() {
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    let om = Math.round(Math.random() * (3000 - 500)) + 500;
    setTimeout(function() {
            doSomething(om);
            loop();  
    }, rand);
}());


