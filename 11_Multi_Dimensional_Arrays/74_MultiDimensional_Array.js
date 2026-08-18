// Multidimensional Array => Array of Arrays
// Row*Column Form (2D Array)

let scores = [
  [20, 78, 90],
  [64, 74, 83],
  [89, 98, 78],
];

console.log(`Multi-Dimensional Array: ${scores}`);

/**
 * A 2D array is a grid, an array of arrays
Access a cell with grid[row][col], both start at 0
grid.length is rows, grid[0].length is columns
Use a nested loop (loop inside a loop) to visit every cell
Star patterns are just nested loops printing spaces and stars

 */
