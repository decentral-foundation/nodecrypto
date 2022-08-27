"use strict";

const crypto = require('crypto');
const LRUCache = require("./lru");  


/**
 * @param {array|int} input - can only support ints and array
 * @returns returns buffer of encoded data
 **/
function encode(input) {
  if (Array.isArray(input)) {
    var output = [];
    for (var i = 0; i < input.length; i++) {
      output.push(encode(input[i]));
    }
    var buf = Buffer.concat(output);
    return Buffer.concat([encodeLength(buf.length, 192), buf]);
  }
  else {
    var inputBuf = intToBuffer(input);
    return inputBuf.length === 1 && inputBuf[0] < 128
        ? inputBuf
        : Buffer.concat([encodeLength(inputBuf.length, 128), inputBuf]);
  }
}

function bufToStr(buffer) {
  return buffer.toString('base64');
}


function intToHex(integer) {
  if (integer < 0) {
    throw new Error('Invalid integer as argument, must be unsigned!')
  }
  const hex = integer.toString(16)
  return hex.length % 2 ? `0${hex}` : hex
}


function intToBuffer(integer) {
  const hex = intToHex(integer)
  return Buffer.from(hex, 'hex')
}


/**
 * @param {number} len
 * @param {number} offset
 */
function encodeLength(len, offset) {
  if (len < 56) {
    return Buffer.from([len + offset])
  } else {
    const hexLength = intToHex(len)
    const lLength = hexLength.length / 2
    const firstByte = intToHex(offset + 55 + lLength)
    return Buffer.from(firstByte + hexLength, 'hex')
  }
}

/**
 * @description usage is to promisify a function
 */
const promisify = (inner) => {
  return new Promise((resolve, reject) => {
    inner((err, res) => {
      if (err) { return reject(err); }
      return resolve(res);
    })
  })
};

module.exports = {
  LRUCache,
  encode,
  bufToStr
}
