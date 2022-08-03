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
 * @param {string} - password supplied by command line
 */
function Encryptpdf(file, password) {

  const initVect = crypto.randomBytes(16);
  const CIPHER_KEY = getCipherKey(password);

  const encryptedPdfFd = fs.createReadStream(file);
  // Above line Returns: <fs.ReadStream> class from Node doc
  // Confirmed that it also implements interface Readable

  const gzip = zlib.createGzip();
  const cipher = crypto.createCipheriv('aes256', CIPHER_KEY, initVect);
  const appendInitVect = new AppendInitVect(initVect);
  const writeStream = fs.createWriteStream(path.join("enc-" + file));
  
  encryptedPdfFd
    .pipe(gzip)
    .pipe(cipher)
    .pipe(appendInitVect)
    .pipe(writeStream); 
}

module.exports.Encryptpdf = Encryptpdf;