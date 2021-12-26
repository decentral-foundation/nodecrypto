"use strict"; 

let assert = require("assert").strict;

function Product(name, price) {
  this.name = name;
  this.price = price;
  this.add = (x,y) => {
    return x + y; 
  };

  this.multiply = (x,y) => {
    return x * y; 
  }
}

Product.prototype.setPrice = function (price) {
  this.price = price; 
}


function Food(name, price) {
  Product.call(this, name, price);
  Product.prototype.setPrice.call(this,400);
  this.category = 'food';
}

assert.deepStrictEqual(new Food('cheese',5).name,"cheese");


let f = new Food('pomelo', 7);
let ff = new Food('clementine',7);


console.log(f.add(323,23));
console.log(ff.add(232,10));
