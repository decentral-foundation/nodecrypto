"use strict";

module.exports = (function() {

  let maxSize;
  /**
   * @description A LRUCache class with set
   */
  const LRUCache = function() {
    this.cache = new Map();
    this.capacitySet = false;
  };

  /**
   * @param {number} capacity 
   */
  LRUCache.prototype.setSize = function (capacity) {
    if (this.capacitySet) {
      throw new Error("Capacity already sets");
      return;
    }
    maxSize = capacity;
    this.capacitySet = true;
    return;
  }

  /** 
   * @description Store the value, remove the key, reset key with stored value and return value
   * @description If the cache does not have the key, return -1;
   * @param {number} key
   * @return {number}
   */
  LRUCache.prototype.get = function(key) {
    if (!this.cache.has(key)) {
        return -1;
    }
    
    var value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  };

  /** 
   * @description If the cache already has the value, delete, then insert value into cache
   * @description If the cache capaicty is greater than allowed, remove the first element in cache
   * @description First element is the least recently used by definition
   * @param {number} key 
   * @param {number} value
   * @return {void}
   */
  LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        this.cache.delete(key);
    }
    
    this.cache.set(key, value);
    if (this.cache.size > maxSize) {
        var keys = this.cache.keys();
        var first = keys.next().value;
        this.cache.delete(first);
    }
  };

  return LRUCache;

})();

