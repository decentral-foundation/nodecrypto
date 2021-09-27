"use strict";

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { getCipherKey } = require('./getCipherKey');

function decrypt({ file, password }) {
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
    arr.unshift('unenc');
    const file_with_extension = arr.join('.');
    const writeStream = fs.createWriteStream(`${file_with_extension}`)
    
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