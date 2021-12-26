"use strict";

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const readline = require('n-readlines')
const zlib = require('zlib');
const { 
  getCipherKey, 
  initial,
  last 
} = require('./getCipherKey');


/**
 * @description
 * @returns {Promise} - an object which one can invoke then on
 */
function streamReader(filename) {
  console.log("readline: ",readline);
  let contentAsJson = [];
  let rd = readline.createInterface({
    input: fs.createReadStream(filename),
    console: false
  });

  return new Promise(function(resolve,reject) {
    rd.on('line', function(line) {
      var arr = line.split(" ");
      contentAsJson.push({name:arr[0], title:arr[1]});
    });

    rd.on('close', function() {
      var json = JSON.stringify(contentAsJson);
      resolve(contentAsJson);
    });

    rd.on('error', function(error) {
      reject(error);
    });
  });
};


function decrypt({ file, password, options }) {
  const readInitVect = fs.createReadStream(file, { end: 15 });

  let initVect;
  readInitVect.on('data', (chunk) => {
    initVect = chunk;
  });

  readInitVect.on('error', function(err) {
    console.error("err in transform: ",err);
  });

  readInitVect.on('close', function() {
    const cipherKey = getCipherKey(password);
    const readStream = fs.createReadStream(file, { start: 16 });
    const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect);
    const unzip = zlib.createUnzip();

    let arr = file.split('.');
    arr.pop();
    
    let first = initial(arr.reverse()).split("/");
    let tail = last(first);
    let appended = 'unenc.'+tail;
    arr.unshift(appended);
    let popped = arr.pop();
    const file_with_extension = arr.join('.');

    const fp_file_with_extension = popped + "/" + file_with_extension;
    const writeStream = fs.createWriteStream(`${fp_file_with_extension}`)
    
    writeStream.on('error', function(err) { 
      console.error("err in write stream: ",err);
    });

    readStream
      .pipe(decipher)
      .pipe(unzip)
      .pipe(writeStream);
  });
}

// take note on Oct 5th 2021 this file was formerly known as decrypt2.js
module.exports = { streamReader, decrypt};