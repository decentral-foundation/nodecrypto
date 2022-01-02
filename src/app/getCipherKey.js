"use strict"; 

const crypto = require('crypto');
function getCipherKey(password) {
  return crypto.createHash('sha256')
    .update(password)
    .digest();
}

function hexWithPrefix(number) {
  return '0x' + number.toString(16);
}

/**
 * @description Transform an integer into its hexadecimal value 
 */
function intToHex(integer) {
  if (integer < 0) {
    throw new Error('Invalid integer as argument, must be unsigned!')
  }
  const hex = integer.toString(16)
  return hex.length % 2 ? `0${hex}` : hex
}


const last = (arr) => {
  return arr[arr.length-1];
}

function ende(arr) {
  return arr.map(function (a) {
    return a;
  }).pop();
}

const initial = function (arr) {
  const copy = arr.slice(0);
  return copy.pop();
}

const range = (start,end) => {
  if (typeof end == 'undefined'){
    end = start;
    start = 0;
  }
  let result = [];
  for (let i = start; i < end; i++){ result.push(i)}
  return result;
};

function range_v1(start,end,content)  {
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

// this needs to be put into a parser
const ENC_KEY = "defba315ababa315ababa315ababafed"; 
const IV = "4747484718171818"; 


/**
 * @description App uses this to encrypt a string
 * @param  {string} val - a value string such as a long paragraph or markdown file
 * @param {Buff} encryption_key - need to double check the type here
 * @return {string}  - a key to use other than default 
 */
const encrypt_v1 = ((val,encryption_key) => {
  let ENCK = encryption_key || ENC_KEY;
  let cipher = crypto.createCipheriv('aes-256-cbc', ENCK, IV);
  let encrypted = cipher.update(val, 'utf-8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});

const decrypt_v1 = ((encrypted,decryption_key) => {
  let DECK = decryption_key || ENC_KEY;
  let decipher = crypto.createDecipheriv('aes-256-cbc', DECK, IV);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return (decrypted + decipher.final('utf-8'));
});



/**
 * @description Flatten nested lists
 * @return {array} flattened array
 */ 
function flatten(arr) {
  return [].concat.apply([], arr);
}


/**
 * @description Creates public keys 
 * @param {object} composed of key named stringBase and byteLength with option to pick
 * @return {string} address of key
 */ 
function genBase64({ stringBase = 'base64', byteLength = 32 } = {}) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(byteLength,  (err, buffer) => {
      if (err) {
        reject(err);
        return;
      }
      return resolve(buffer.toString(stringBase));
    });
  });
}

/**
 * @param {string} Specify utf-8 in decoding
 */
function decodeBase64(strBase64, decoding = 'hex') {
  return Buffer.from(strBase64, 'base64').toString(decoding);
}


/**
 * @description Removes the tail and reattaches the head
 * @param {string}
 * @return 
 */
function dissect(fileStream,options) {
  let { IS_SLASH } = options;
  let delimiter = IS_SLASH ? '/' : '.';
  let split = fileStream.split(delimiter);
  let tail = ende(split);
  let head = `un${tail}`;
  let fileDes = split.unshift(head);
  let fileDescriptor = split.join(delimiter);
  return fileDescriptor;
}
// fileStream such as logins.csv.enc into unenc.logins.csv


/**
 * @description Split slashes first then dots
 * @param dcStore {string} - such as 
 * @return
 */ 
function reassemble(dcStore) {
  let split = dcStore.split("/");
  let file = ende(split);
  let updatedFile = dissect(file,{isSLASH: false});
  return updatedFile;
}




module.exports = {
  flatten,
  genBase64,
  initial,
  last,
  range,
  range_v1,
  getCipherKey,
  reassemble,
  encrypt_v1,
  decrypt_v1,
  decodeBase64
};