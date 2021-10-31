"use strict";

let assert = require("assert").strict;
let Publisher = require("./publisher");
let Subscriber = require("../user/subscriber");


const events = require('events');
const ee1 = new events.EventEmitter();
let pub = new Publisher(ee1);
pub.build();


let sub = new Subscriber(8000);
pub.subscribers.push(sub);
assert.deepStrictEqual(pub.subscribers.length,1);
assert.deepStrictEqual(typeof pub.subscribers.pop(),"function");


console.log("pub: ",pub);
