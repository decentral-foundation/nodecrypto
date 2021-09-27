"use strict";

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { getCipherKey } = require('./getCipherKey');
const AppendInitVect = require('./appendInitVect');

function encrypt({ file, password }) {
  const initVect = crypto.randomBytes(16);
  const CIPHER_KEY = getCipherKey(password);
  const readStream = fs.createReadStream(file);
  const gzip = zlib.createGzip();
  const cipher = crypto.createCipheriv('aes256', CIPHER_KEY, initVect);
  const appendInitVect = new AppendInitVect(initVect);
  const writeStream = fs.createWriteStream(path.join(file + ".enc"));
  
  readStream
    .pipe(gzip) 
    .pipe(cipher)
    .pipe(appendInitVect)
    .pipe(writeStream); 
}

module.exports = encrypt;