"use strict";

let assert = require("assert").strict;
let { genBase64, byteToHex } = require("../app/getCipherKey");


let testPromise = genBase64({
  stringBase: "base64",
  byteLength: 16
});

let asyncPromise = genBase64({
  stringBase: "hex",
  byteLength: 16
})

let awaitPromise = genBase64({
  stringBase: "hex",
  byteLength: 16
})



testPromise.then(res => {
  assert.deepStrictEqual(res.length,24);
})

asyncPromise.then(res => {
  let response = res.slice(0,16);
  assert.deepStrictEqual(response.length,16);
})

awaitPromise.then(res => {
  let response = res.slice(0,32);
  assert.deepStrictEqual(response.length,32);
})


let FF = byteToHex(255);
let FE = byteToHex(254);

assert.deepStrictEqual(FF,"FF");
assert.deepStrictEqual(FE,"FE");