"use strict";

module.exports = (function () {
  /**
   * @description Implements methods for Publisher#subscribe
   * @param {EventEmitter} eventEmitterInstance - must be of type node event emitter
   */
  function Publisher(eventEmitterInstance) {
    this.eventEmitter = eventEmitterInstance; //intended and conduct further testing
    this.subscribers = []; // deprecate this by nov 5th 2021 by removing the line
  }


  /**
   * @description Loop through each prospective subscriber 
   */
  Publisher.prototype.deliver = function (data) {
    this.subscribers.forEach(function (fn) {
      fn(data);
    });
    return this;
  }


  Publisher.prototype.build = function () {
    this.eventEmitter.on('event', function() {
      console.log("an event occured");
    })
  }

  return Publisher;
})()