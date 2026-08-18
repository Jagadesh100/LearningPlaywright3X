// Multidimensional Array => Array of Arrays
// Row*Column Form (2D Array)

let scores = [
  [20, 78, 90],
  [64, 74, 83, 34],
  [89, 98, 78],
];

console.log(`Multi-Dimensional Array: ${scores}`);

// Access the array with row and column index

console.log(scores[2][1]); // Access the 3rd row 2nd column value
console.log(scores[1][1]); // Access the 2nd row 2nd column value
console.log(scores[0][2]); // Access the 1st row 3rd column value
console.log(scores[2][2]); // Access the 3rd row 3rd column value

console.log(`length: ${scores.length}`); // Length of rows
console.log(`length: ${scores[1].length}`); // Length of columns in 2nd row
