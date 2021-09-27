"use strict";

let assert = require("assert").strict;
let { encrypt_v1, decrypt_v1 } = require("../app/getCipherKey");


let testPhrase = "A private message for authorization";
let testPassword = "bffaa415abebe415bffaf415ababeeee";
let cipherOne = encrypt_v1(testPhrase,testPassword);
let cipherTwo = encrypt_v1(testPhrase,testPassword);
assert.deepStrictEqual(cipherOne,cipherTwo);


let testFile = ["# Header\r", "## Subtitle\r", "Lorem ipsum dolores\r\n"];
let testPower = testFile.join("\n");
let cipherFd = encrypt_v1(testPower,testPassword);
let decipher = decrypt_v1(cipherFd,testPassword);
assert.deepStrictEqual(decipher,testPower);
