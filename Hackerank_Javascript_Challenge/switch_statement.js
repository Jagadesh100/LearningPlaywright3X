/*
You are given a variable, . Your task is to print:

- ONE, if num is equal to 1.
- TWO, if num is equal to 2.
- THREE, if num is equal to 3.
- FOUR, if num is equal to 4.
- FIVE, if num is equal to 5.
- SIX, if num is equal to 6.
- SEVEN, if num is equal to 7.
- EIGHT, if num is equal to 8.
- NINE, if num is equal to 9.
- PLEASE TRY AGAIN, if  is none of the above.
*/

console.log("Enter a Number between 1 to 9:");

const num = require('fs').readFileSync(0, 'utf8').trim();
console.log(num);

switch (num) {
    case "1": console.log("ONE");
        break;
    case "2": console.log("TWO");
        break;
    case "3": console.log("THREE");
        break;
    case "4": console.log("FOUR");
        break;
    case "5": console.log("FIVE");
        break;
    case "6": console.log("SIX");
        break;
    case "7": console.log("SEVEN");
        break;
    case "8": console.log("EIGHT");
        break;
    case "9": console.log("NINE");
        break;
    default: console.log("PLEASE TRY AGAIN");
}
