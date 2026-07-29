let arr = [75, 29, 498, 59, 3548];

let maximumNumber = arr.reduce((acc, val) => (acc > val ? acc : val));
console.log(maximumNumber);

// method 2
let temp = 0;
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[j] > arr[i]) {
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}
console.log(`Array Sorted: ${arr}`);

console.log(`Maximum Number: ${arr[0]}`);
