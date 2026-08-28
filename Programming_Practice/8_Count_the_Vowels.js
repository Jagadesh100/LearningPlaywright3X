let myString = "Banana";
let count = 0;
for (let i = 0; i < myString.length; i++) {
  if (
    myString[i].toLowerCase() === "a" ||
    myString[i].toLowerCase() === "e" ||
    myString[i].toLowerCase() === "i" ||
    myString[i].toLowerCase() === "o" ||
    myString[i].toLowerCase() === "u"
  ) {
    count++;
  }
}

console.log(`Count of Vowels in string ${myString} is ${count}`);
