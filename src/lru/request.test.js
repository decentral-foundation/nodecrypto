"use strict";

const assert = require('assert').strict;
const Request = require('./request');

const animals = [
  {species: 'Lion', name: 'King'},
  {species: 'Whale', name: 'Fail'},
  {species: 'Tiger', name: 'Cheer'}
];


Array.prototype.forAll = function (fn, thisObj) {
  let scope = thisObj || this;
  let len = scope.length;
  for (let i = 0; i < len; ++i) {
    fn.call(scope[i], this[i],i,this);
  }
}

Array.prototype.strain = function (fn, thisObj) {
  let scope = thisObj || this;
  let a = [];
  let len = this.length;
  for (let i = 0; i < len; ++i) {
    if (!fn.call(scope,this[i],i,this)) {
      continue;
    }
    a.push(this[i]);
  }
  return a; 
}

let testArray = [
  {species: 'V. komodoensis', name: 'Komodo Dragon'},
  {species: 'Varanus varius', name: 'Monitor Lizard'},
  {species: 'A. sinensis', name: 'Chinese Alligator'}
];

let bucket1 = [];
let bucket2 = [];
testArray.forAll(function(item) {
  this.print = function () {
    let nameString = this.species + ': ' + this.name;
    bucket1.push(nameString);
  }
  this.print();
},animals);

testArray.forAll(function(item) {
  this.print = function () {
    let nameString = this.species + ': ' + this.name;
    bucket2.push(nameString);
  }
  this.print();
});



assert.deepEqual(bucket1,[ 'Lion: King', 'Whale: Fail', 'Tiger: Cheer' ]);
assert.deepEqual(bucket2,[
  'V. komodoensis: Komodo Dragon',
  'Varanus varius: Monitor Lizard',
  'A. sinensis: Chinese Alligator'
]);

let testList = [1,2,3,4,5,5,6,7,8,9,10];
let testEntries = [1,2,8,4,5,4,3,8,8,9,10];

let filtered = testList.strain(function (item) { return item >= 5;});
let strained = testEntries.strain(function (item) { return item >= 5;});
assert.deepEqual(filtered,[5,5,6,7,8,9,10]);
assert.deepEqual(strained,[ 8, 5, 8, 8, 9, 10 ]);




