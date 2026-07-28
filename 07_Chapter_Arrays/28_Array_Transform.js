let scores = [46, 45, 65, 99, 78, 79];
// map => reads the entire array and transform the array based on condition and returns new array with same number of elements
let grades = scores.map((s) => (s > 60 ? "Pass" : "Fail"));
console.log(`Scores:${scores}`);
console.log(`Grades:${grades}`);

// filter() => filters an array based on the condition
// if condition true filters the value in a newly createrd array

let filterGrades = scores.filter((s) => (s > 60 ? true : false));
console.log(`Filter Grades:${filterGrades}`);
console.log(`Original Scores:${scores}`);

// reduce() => reduces an array to single value result

let highestScore = scores.reduce((acc, val) => (acc > val ? acc : val), 0);
console.log(`Highest Score : ${highestScore}`);

let lowsetScore = scores.reduce(
  (acc, val) => (acc < val ? acc : val),
  scores[0],
);
console.log(`Lowest Score : ${lowsetScore}`);

console.log(`Original Scores:${scores}`);
