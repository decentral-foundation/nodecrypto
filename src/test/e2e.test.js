"use strict";

let assert = require("assert").strict;
// let Buffer = require("buffer");
// console.log("Buffer",Buffer);

let { 
  encrypt_v1, 
  decrypt_v1,
  reassemble,
  decodeBase64,
  genBase64,
  getCipherKeyAsync
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


// has to be ran with node src/test/e2e.test.js while in source folder for now
let testFileStream = "./static/logins.csv.enc"; 
let ourFile = reassemble(testFileStream);
assert.deepStrictEqual(ourFile,"unenc.logins.csv.enc");


let testBase64Str = "YXBwbGljYXRpb246c2VjcmV0";
let stringFile = decodeBase64(testBase64Str,'utf-8');
let hexFile = decodeBase64(testBase64Str);
assert.deepStrictEqual("6170706c69636174696f6e3a736563726574",hexFile);
assert.deepStrictEqual("application:secret",stringFile);



// we generate random passwords then pass them in asynchronously into S256
let testPromises = [genBase64(),genBase64(),genBase64(),genBase64()];
Promise.all(testPromises).then(function (res) {
  let resList = res.map(r => new String(r));
  assert.notDeepStrictEqual(resList[0],resList[1]);
  assert.notDeepStrictEqual(resList[0],resList[2]);
  assert.notDeepStrictEqual(resList[0],resList[3]);
  assert.notDeepStrictEqual(resList[1],resList[4]);
  assert.notDeepStrictEqual(resList[1],resList[3]);
  assert.notDeepStrictEqual(resList[1],resList[2]);

  for (let i = 0; i < res.length; i++) {
    assert.deepStrictEqual(res[i].length,44);
  }

  return res;
}).then(function (res) {
  return Promise.all(res.map(function (prom) {
    return getCipherKeyAsync(prom);
  }));
}).then(function (digestResponse) {
  for (let i = 0; i < digestResponse.length; i++) {
    assert.deepStrictEqual(true,Buffer.isBuffer(digestResponse[i]));
  }
  
})
