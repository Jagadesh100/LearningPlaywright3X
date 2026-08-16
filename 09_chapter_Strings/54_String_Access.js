// Strings can be accessed by index, at for negative index, charAt, charCodeAt

let str1 = "TVK CM";
//console.log(`Length of ${str1} is ${str1.length}`);

let str2 = `Hello|
Are You ready for interview?
how many years experience do you have?
`; 
//console.log(`Length of ${str2} is ${str2.length}`);

console.log(str1[0]);
console.log(str2.at(-2));
console.log(str2.at(1));
console.log(str1.charAt(2));
console.log(str2.charCodeAt("A"));



