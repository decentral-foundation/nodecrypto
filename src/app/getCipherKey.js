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


const last= (arr) => {
  return arr[arr.length-1];
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

const ENC_KEY = "defba315ababa315ababa315ababafed"; 
const IV = "4747484718171818"; 


/**
 * @description App uses this to encrypt a string
 * @param  {string} val - a value string such as a long paragraph or markdown file
 * @return {string} encrypted 
 */
const encrypt_v1 = ((val,encryption_key) => {
  let ENCK = encryption_key || ENC_KEY;
  let cipher = crypto.createCipheriv('aes-256-cbc', ENCK, IV);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});

const decrypt_v1 = ((encrypted,decryption_key) => {
  let DECK = decryption_key || ENC_KEY;
  let decipher = crypto.createDecipheriv('aes-256-cbc', DECK, IV);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return (decrypted + decipher.final('utf8'));
});

function EncryptV1() {
  
}



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




module.exports = {
  flatten,
  genBase64,
  initial,
  last,
  range,
  getCipherKey,
  encrypt_v1,
  decrypt_v1
};