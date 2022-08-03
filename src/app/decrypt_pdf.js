"use strict";

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { getCipherKey,reassemble } = require('./getCipherKey');

/**
 * @param {string} - file must be of form utf-8 string
 * @param {string} - password supplied by command line
 */
function DecryptPDF(dc_file, password) {
  let combined = __dirname + '/' + dc_file;
  console.log("inner dc_file: ",combined)
  const readInitVect = fs.createReadStream(dc_file, { end: 15 });
  let tempCWD = process.cwd();
    console.log("tempCWD: ",tempCWD);
  let initVect;

  readInitVect.on('data', (chunk) => {
    initVect = chunk;
  });

  readInitVect.on('error', function(err) {
    console.error("err in transform: ",err);
  });

  /**
   * @description 
   * 
   * 
   */
  readInitVect.on('close', function() {

    const cipherKey = getCipherKey(password);

    console.log("inner dc_file: ",dc_file)

    const decryptedPdfFd = fs.createReadStream(dc_file, { start: 16 });
    const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect);
    const unzip = zlib.createUnzip();

    console.log("dc_file: ",combined);
    
    let destination = `${Date.now()}-decrypted.pdf`;
    console.log("destination: ",destination);

    const writeStream = fs.createWriteStream(destination);
    
    writeStream.on('error', function(err) { 
      console.error("err in write stream: ",err);
    });

    decryptedPdfFd
      .pipe(decipher)
      .pipe(unzip)
      .pipe(writeStream);
  });
}

module.exports.DecryptPDF = DecryptPDF;