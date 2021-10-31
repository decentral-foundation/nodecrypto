"use strict";

let Publisher = require("./publisher");
let Subscriber = require("./subscriber");
module.exports = (function () {
  let BALANCE = {};

  function Firm(util) {
    this.publisher = new Publisher();
    this.subscriber = new Subscriber(8000);
    BALANCE.util = util || {};
    BALANCE.util.Observer = function () {
      this.fns = [];
    }
  }

  BALANCE.util.Observer.prototype = {
    subscribe: function(fn) {
      this.fns.push(fn);
    },
    unsubscribe: function (fn) {
      function(el) {
        if (el !== fn) {
          return el;
        }
      }
    },
    fire: function (o) {
      this.fns.forEach(function (el) {
        el(o);
      })
    }
  }


  return Firm;
	
})