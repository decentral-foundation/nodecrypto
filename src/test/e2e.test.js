"use strict";

let assert = require("assert").strict;
let { 
  encrypt_v1, 
  decrypt_v1,
  reassemble,
  decodeBase64,
  genBase64
} = require("../app/getCipherKey");


let testPhrase = "A private message for authorization";
let testPassword = "bffaa415abebe415bffaf415ababeeee";
let cipherOne = encrypt_v1(testPhrase,testPassword);
let cipherTwo = encrypt_v1(testPhrase,testPassword);
assert.deepStrictEqual(cipherOne,cipherTwo);


let testFile = ["# Header\r", "## Subtitle\r", "Lorem ipsum dolores\r\n"];
let testEntry = testFile.join("\n");
let cipherFd = encrypt_v1(testEntry,testPassword);
let decipher = decrypt_v1(cipherFd,testPassword);
assert.deepStrictEqual(decipher,testEntry);


// let testFileStream = "./static/logins.csv.enc"; 
// let ourFile = reassemble(testFileStream);
// assert.deepStrictEqual(ourFile,"./static/unenc.logins.csv");


let testBase64Str = "YXBwbGljYXRpb246c2VjcmV0";
let stringFile = decodeBase64(testBase64Str,'utf-8');
let hexFile = decodeBase64(testBase64Str);
assert.deepStrictEqual("6170706c69636174696f6e3a736563726574",hexFile);
assert.deepStrictEqual("application:secret",stringFile);