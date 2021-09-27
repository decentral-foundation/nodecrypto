"use strict";

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { 
  getCipherKey, 
  initial,
  last 
} = require('./getCipherKey');

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



module.exports = decrypt;