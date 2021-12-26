"use strict";

let { LRUCache, encode } = require("../../lru/index.js");
console.log("LRUCache123: ",LRUCache);

module.exports = (function (){
  
  /**
   * @description The require imports for LRUCache can be within the closure and outside currently
   * 
   */
  function SecureLRU(size) {
    LRUCache.call(this);
    LRUCache.prototype.setSize.call(this,size);
    // this.encrypt_v1 = encrypt_v1; 
    // this.decrypt_v1 = decrypt_v1;
  }

  /**
   * @description - Calls SuperClass#put method
   */
  SecureLRU.prototype.put = function (key,value) {
    LRUCache.prototype.put.call(this,key,value);
  }

  /**
   * @description - Calls SuperClass#get method
   */
  SecureLRU.prototype.get = function (key) {
    LRUCache.prototype.get.call(this,key);
  }


  return SecureLRU;
})()

