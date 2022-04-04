"use strict";

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { getCipherKey,reassemble } = require('./getCipherKey');


/**
 * @param {string} - file must be of form utf-8 string
 * @param {options} - FIELD boolean ABSOLUTE_PATH
 */
function decrypt({ dc_file, password, options }) {
  console.log("inner dc_file: ",dc_file)
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

    // 🏔🏔🏔🏔🏔🏔🏔🏔🏔
    let DEBUG_FLAG = true;
    if (options) {
      DEBUG_FLAG = options;  
    }
    
    // 🌋🌋🌋🌋🌋🌋🌋🌋🌋
    console.log("inner dc_file: ",dc_file)
    // 🗻🗻🗻🗻🗻🗻🗻🗻🗻
    const readStream = fs.createReadStream(dc_file, { start: 16 });
    const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect);
    const unzip = zlib.createUnzip();
    // dc_file is   ./static/logins.csv
    console.log("dc_file: ",dc_file);
    let arr = dc_file.split('.');
    console.log("arr: ",arr);
    


    
    // 🏔🏔🏔🏔🏔🏔🏔🏔🏔
    // arr.pop();
    // arr.unshift('unenc');
    // const file_with_extension = arr.join('.');
    // 🌋🌋🌋🌋🌋🌋🌋🌋🌋
    // add un to last and put it back on
    let down = arr.pop();
    let bottomup = arr.pop();
    let topdown = 'un'+down;
    // shift out then get last
    let a = arr.pop();
    let t = a.split('/'); // [Users,ec2-user,VersionControlSystem,nodecrypto,src,app,store]
    let middle = t.pop();
    // then piece it together
    let out = [topdown,middle,bottomup].join('.'); 
    console.log("out: ",out);
    t.push(out);
    let destination = t.join('/');
    console.log("destination: ",destination);
    let actual_file_with_extension = DEBUG_FLAG ? destination : file_with_extension;
    // 🗻🗻🗻🗻🗻🗻🗻🗻🗻
    

    console.log("actual_file_with_extension: ",actual_file_with_extension);
    const writeStream = fs.createWriteStream(actual_file_with_extension);
    
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