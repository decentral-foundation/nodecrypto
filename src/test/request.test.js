"use strict";

let assert = require("assert").strict;
let Request = require("../app/request")
let request1 = new Request({
  method: 'GET',
  query: {},
  headers: {Authorization: 'Bearer foobar'}
});

let testRequestOptions = { body: 'foo', headers: {}, method: {}, query: {} };
var request2 = new Request(testRequestOptions);

console.log("request1: ",request1);
console.log("request2: ",request2);