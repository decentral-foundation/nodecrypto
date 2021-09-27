"use strict";

const express = require('express');
const childProcess = require('child_process');

const fs = require("fs");
const fsPromises = fs.promises;
const crypto = require("crypto");
const { LRUCache, encode } = require("../lru/index.js");
const { Parser } = require("./parser/index");



let parser = new Parser(process.argv);
const PORT = parser.getPort();
const [max,min] = parser.argsList.reverse().slice(0,2);
const lrucache = new LRUCache();
lrucache.setSize(64);



let app = require('./app');
let proms = Promise.all(
  range(0,3,"server_info-")
    .map(function(fn,i) {
      return sendPromise(fn,1+i,"logs",crypto)
    })
    .map(function(prom,j) {
      let valueKeyStorage = Buffer.concat([
        encode(Math.floor(Math.random() * j)),
        encode(prom.makeSalt()),
        encode(Math.floor(Math.random() * (max - min + 1)))
      ]);
      lrucache.put(valueKeyStorage.toString('base64'),prom);
      return { [j]: valueKeyStorage.toString('base64')}
    })
).then(function (res) {
  console.log("All done!",res);
})


app.listen(PORT, function () {
  console.log(`App is running on port ${PORT}.`);
})






function sendPromise(filename,index,subdirectory,crypto) {
  let d = (new Date).toISOString();
  let filestream = filename  + '_' +  d  + '.md';
  let dirpath = __dirname + '/'+ subdirectory;
  let location = dirpath + '/' + filestream;
  let indexData = index + " on " + "\n" 
    + Math.floor(Math.random() * (9000000000000004 - min + 1)) + "\n"
    + crypto.randomBytes(16).toString('base64') 
    + "\n" + d;
  Promise.prototype.makeSalt = function () {
    return crypto.randomBytes(16).toString('base64');
  }
  return new Promise(function(resolve,reject){
    if (!fs.existsSync(dirpath)){
      fs.mkdirSync(dirpath);
    }
    fs.writeFile(location,indexData,'utf-8',function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      return resolve(indexData);
    })
  })
}



function range(start,end,content)  {
  if (typeof end == 'undefined'){
    end = start;
    start = 0;
  }
  let result = [];
  for (let i = start; i < end; i++){ 
    result.push(content + i.toString())
  }
  return result;
};