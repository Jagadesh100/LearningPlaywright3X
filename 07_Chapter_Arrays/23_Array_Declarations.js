// Array literal

let browsers = ["Chrome", "Firefox", "Edge"];
console.log(`Browsers:${browsers}`);


// Array Constructor
let test = new Array(3);
console.log(test.length);

test = [1, 2, 3, 4]; // Note: while assigning values, length changes dynamically
console.log(`Test Numbers = ${test}`);
console.log(test.length);


// Array of constructor
let testResults = Array.of(3);
testResults = ["Pass", "Fail", "Skip"];
console.log(`Test Results = ${testResults}`);

let testResults2 = Array.of("Pass", "Fail", "Skip");
console.log(`Test Results = ${testResults2}`);

// Array from constructor - Breaks a string value to individual characters

let fromArray = Array.from(testResults[0]);
console.log(`From Array:${fromArray}`);
