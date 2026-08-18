let dataTypeNumber = 200;
let dataTypeBoolean = true;
let dataTypeNull=null;
let dataTypeUndefined = undefined;
let arrayOfNumbers = [1,2];
let str = String(arrayOfNumbers);

console.log(typeof String(dataTypeNumber));
console.log(typeof String(dataTypeBoolean));
console.log(typeof String(dataTypeNull));
console.log(typeof String(dataTypeBoolean));
console.log(String(arrayOfNumbers));
console.log(typeof String(arrayOfNumbers));

console.log(str); //"1,2"
console.log(str.length); //3


