let num = 2;
if (num !== 0 && num % 2 === 0) {
  console.log(`${num} is evEvenen Number`);
} else if (num === 0) {
  console.log(`${num} is Zero`);
} else if (typeof num === "number") {
  console.log(`${num} is Odd Number`);
} else {
  console.log(`${num} is not a Number`);
}
