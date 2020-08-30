'use strict'

const { account } = require('./state/user/account');
const { encrypt, decrypt } = require('./protocol/encryption');

// jest testing 
// https://www.robinwieruch.de/node-js-jest


let phrase = "marshall mathers";
const ciphertext = encrypt(phrase);
console.log('ciphertext: ',ciphertext);
const decipher = decrypt(ciphertext);
console.log('decipher: ',decipher);
