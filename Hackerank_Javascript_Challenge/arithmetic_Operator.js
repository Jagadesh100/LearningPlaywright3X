/*
Task

Given two numeric variables, a and b, write the following:

Create a variable,add , and assign it the sum of a and b.
Create a variable,sub , and assign it result of a subtracted from b.
Create a variable,mul , and assign it the product of a and b.
Create a variable,div , and assign it the result a divided by b.
Create a variable,inc , and assign it the preincremented value of a.
Create a variable,dec , and assign it the predecremented value of b.
*/

console.log("Enter Value for a");
let a = require('fs').readFileSync(0,'utf8').trim();

console.log("Enter Value for b");
let b = require('fs').readFileSync(0,'utf8').trim();

var add = Number(a) + Number(b);
var sub = Number(a) - Number(b);
var mul = Number(a) * Number(b);
var div = Number(a) / Number(b);
var inc = ++a;
var dec = --b;

console.log(add);
console.log(sub);
console.log(mul);
console.log(div);
console.log(inc);
console.log(dec);

