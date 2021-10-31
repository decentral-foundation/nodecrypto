"use strict";

const { encrypt, decrypt } = require('./protocol/encryption');

module.exports = (function (){
  let phrase = "Hello World..";
	const ciphertext = encrypt(phrase);
	const decipher = decrypt(ciphertext);
})();
