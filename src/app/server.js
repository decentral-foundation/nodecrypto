"use strict";

const express = require('express');
const childProcess = require('child_process');
const path = require('path');

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


/**
 * @description Upon app start up we want to collect port along with 2 numbers so that
 * @description we put server start up information each triplet will be different hashes and
 * @param min {number} - is the floor and 
 * @param max {number} - is the ceiling 
 * @param PORT {number} - is the string converted to number value for port
 * 
 */
let app = require('./app');
let proms = Promise.all(
  range(0,3,"debug-")
    .map(function(fn,i) {
      return sendPromise(fn,1+i,"log",crypto)
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





/**
 * @description At the end the function returns an unthened promise 
 * @param filename {string} - form `debug-${[1-3]}_2021-${[1-12]}-${[1-31]}TXX:XX:XX.XXXZ.md`
 * @param index {string} - eventually becomes format 
 * @param crypto {object} - native library to call randomBytes and converting to base64
 * @returns {Promise} - will be called in a Promise.all
 */
function sendPromise(filename,index,subdirectory,crypto) {
  let d = (new Date).toISOString();
  let filestream = filename  + '_' +  d  + '.md';
  let dirpath = '.' + '/'+ subdirectory;
  let location = dirpath + '/' + filestream;
  console.log("dirpath and location: ",dirpath,location);
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