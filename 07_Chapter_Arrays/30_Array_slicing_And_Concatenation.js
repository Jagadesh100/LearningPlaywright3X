let myNumbers = [10, 43, 23, 56, 22, 78, 36, 2, 89];
// slice(startIndex, end) end-1

console.log(myNumbers.slice(2));
//console.log(myNumbers);

console.log(myNumbers.slice(2, 2));

console.log(myNumbers.slice(-6, -2));

// concat()

let myNumbers2 = [94, 28, 28, 47, 56, 77, 25];

console.log(myNumbers.concat(myNumbers2));

console.log(myNumbers.concat(myNumbers2).sort((a, b) => a - b));

let spreadConcat = [...myNumbers, ...myNumbers2];
console.log(spreadConcat);

let a = myNumbers.join();

console.log(a);

console.log(Array.isArray(a));

// Destructring
let [first, second, third, ...rest] = spreadConcat;
console.log(first);
console.log(second);
console.log(rest);
