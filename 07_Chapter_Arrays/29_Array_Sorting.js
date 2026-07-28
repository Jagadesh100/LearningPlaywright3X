let browsers = ["Safari", "chrome", "firefox", "Edge"];
console.log(`Sort Browser Names: ${browsers.sort()}`);
console.log(`Original Browser Names: ${browsers}`);

// Natural Sorting
let myNumbers = [1, 34, 2, 20, 10];
let ns = myNumbers.sort();
console.log(`Natural Sorting: ${ns}`); // sort as 1,10,2,20,34
console.log(`Original Array: ${myNumbers}`);

//Ascending sort
let ascSort = myNumbers.sort((a, b) => a - b);
console.log(`Ascending Sort: ${ascSort}`);
console.log(`Original Array: ${myNumbers}`);

// Descending sort

let dscSort = myNumbers.sort((a, b) => b - a);
console.log(`Descending Sort: ${dscSort}`);
console.log(`Original Array: ${myNumbers}`);
