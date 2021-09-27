const assert = require('assert').strict;
const { LRUCache } = require('./index.js');

let lru = new LRUCache();
lru.setSize(3);

lru.put(0,4);
let four = lru.get(0);
assert.deepEqual(four,4);

let valueKeyStorage = new LRUCache();
valueKeyStorage.setSize(2);

let a = valueKeyStorage.put(1,1)
assert.deepEqual(a,undefined);

let b = valueKeyStorage.put(2,2);
assert.deepStrictEqual(b,undefined);

let c = valueKeyStorage.get(1)
assert.deepStrictEqual(c,1);

let d = valueKeyStorage.put(3,3)
assert.deepEqual(d,undefined);

let e = valueKeyStorage.get(2);
assert.deepEqual(e,-1);

let f = valueKeyStorage.put(4,4)
assert.deepStrictEqual(f,undefined);

let g = valueKeyStorage.get(1)
assert.deepEqual(-1,g);

let h = valueKeyStorage.get(3);
assert.deepEqual(h,3);

let i = valueKeyStorage.get(4);
assert.deepStrictEqual(i,4);
	
