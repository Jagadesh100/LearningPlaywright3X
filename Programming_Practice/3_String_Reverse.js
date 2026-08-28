let myString = "Hello";
let reversedString = "";

// let splitMyString = Array.from(myString);
// console.log(splitMyString);

let splitStringToArray = new Array(myString.length);
for (let i = 0; i < myString.length; i++) {
  splitStringToArray[i] = myString[i];
  //console.log(myString[i]);
}
console.log(splitStringToArray);

for (let i = splitStringToArray.length - 1; i >= 0; i--) {
  reversedString += splitStringToArray[i];
}
console.log(reversedString);
