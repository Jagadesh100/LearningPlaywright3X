// Variables are conatiners used to store data/values
console.log("--------var------");

// var - Oldest Way - Function Scoped
// var can be reassigned , redeclared
var myNum=10;
console.log(myNum);
console.log(typeof(myNum));
myNum=25;
console.log(myNum);
console.log(typeof(myNum));
var myNum = 35;
console.log(myNum);
console.log(typeof(myNum));
myNum="24";
console.log(myNum);
console.log(typeof(myNum));

console.log("--------let------");


// let - Modern , ES6 standard -blocked Scope

let myVal = 4;
console.log(myVal);
console.log(typeof(myVal));
myVal = 6;
console.log(myVal);
console.log(typeof(myVal));
let myVal = 101;
myVal = 102;
console.log(myVal);
console.log(typeof(myVal));

// const - Modern ES6 standard - blocked scope

const pie = 3.14;
pie = 2.23;







