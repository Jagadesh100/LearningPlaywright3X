let testResults = ["Pass", "Fail", "Skip"];

// Array elements accessed by its index => starts from o to length-1
console.log(`Log 2nd Element:${testResults[1]}`);

// At() provides users to access negative index starts from -1 at last to first
console.log(`Log last element using Negative Index:${testResults.at(-1)}`);

// Modify
testResults[2] = "Blocked";
console.log(`Test Results:${testResults}`);
