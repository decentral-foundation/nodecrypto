"use strict";

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { getCipherKey } = require('./getCipherKey');
const AppendInitVect = require('./appendInitVect');


/**
 * @description This is going to be connected to certified 3rd party modules
 * @param {string} - file must be of form utf-8 string
 * @paramp {string} password - password supplied by command line
 * @param {options} - FIELD boolean ABSOLUTE_PATH
 */
function encrypt({ file, password, options }) {
  // console.log("in encrypt file: ",file);

  let metadata = path.parse(file);
  // console.log("path.parse(file): ",metadata);
  // console.log("in password: ",password);
  // action required convert to string else throw
  const initVect = crypto.randomBytes(16);
  const CIPHER_KEY = getCipherKey(password);

  const readStream = fs.createReadStream(file);
  // Above line Returns: <fs.ReadStream> class from Node doc
  // Confirmed that it also implements interface Readable

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