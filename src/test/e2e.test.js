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
  getCipherKey,
  getCipherKeyAsync,
  intToHex
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



// tests decodeBase64 logic
let testBase64StrArr = [116, 24, 223, 180, 151, 153, 224, 37, 79, 250, 96, 125, 216, 173,
      187, 186, 22, 212, 37, 77, 105, 214, 191, 240, 91, 88, 5, 88, 83,
      132, 141, 121]
let decodedArr = decodeBase64('dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk','hex'); //after this do hex to decimal
let accumulation = [];
for (let i = 0; i <= decodedArr.length; i+=2){
  let a = decodedArr.charAt(i);
  let b = decodedArr.charAt(i+1);
  accumulation.push(String(a)+String(b));
}
accumulation.pop();
assert.deepStrictEqual(testBase64StrArr.map(function (r) { return intToHex(r); }),accumulation);



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

let generatorPromise = genBase64({
  string: "hex",
  byteLength: 55
})

let observablePromise = genBase64({
  string: "hex",
  byteLength: 56
})

generatorPromise.then(res => {
  assert.deepStrictEqual(res.length,76);
})

observablePromise.then(res => {
  assert.deepStrictEqual(res.length,76);
})




// test string to sha256 works as intended
let testOctetString = 'confidentialApplication:topSecret';
let s256buffer = getCipherKey(testOctetString);
let s256 = getCipherKey(testOctetString);
assert.deepStrictEqual(s256,s256buffer);


/*
let testHeaderString = "confidentialApplication:topSecret"

*/

/*
let testOctetString = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';
expected results 2
[116, 24, 223, 180, 151, 153, 224, 37, 79, 250, 96, 125, 216, 173,
      187, 186, 22, 212, 37, 77, 105, 214, 191, 240, 91, 88, 5, 88, 83,
      132, 141, 121]
*/