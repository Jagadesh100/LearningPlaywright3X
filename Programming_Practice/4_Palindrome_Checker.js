let myString = "Malayalam";
let reversedString = "";

let splitStringToArray = new Array(myString.length);
for (let i = 0; i < myString.length; i++) {
  splitStringToArray[i] = myString[i];
  //console.log(myString[i]);
}
//console.log(splitStringToArray);

for (let i = splitStringToArray.length - 1; i >= 0; i--) {
  reversedString += splitStringToArray[i];
}
if (myString.toLowerCase() === reversedString.toLowerCase()) {
  console.log(`${myString} is a Palindrom String`);
} else {
  console.log(`${myString} is not a Palindrom String`);
}
