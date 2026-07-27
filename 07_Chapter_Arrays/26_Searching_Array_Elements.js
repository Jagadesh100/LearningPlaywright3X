let testResults = ["Pass","Fail","Skip", "Pass", "Fail"];
let searchElement = "Fail";
console.log(`First Match Occurence:${testResults.indexOf(searchElement)}`);

let searchLastElement = "Pass";
console.log(`Search from Last:${testResults.lastIndexOf(searchLastElement)}`);

console.log(`SearchElement include:${testResults.includes("Skip")}`);

let myNumbers = [10,20,45,23,455];
console.log(`Find Value for Condition:${myNumbers.find(x=>x>20)}`);

console.log(`Find Index for Condition:${myNumbers.findIndex(x=>x>20)}`);

console.log(`Find Value for Condition from Last:${myNumbers.findLast(x=>x>20)}`);

console.log(`Find Value for Condition from Last:${myNumbers.findLastIndex(x=>x>20)}`);



