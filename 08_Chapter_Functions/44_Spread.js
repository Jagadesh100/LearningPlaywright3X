// Spread Operator (...)
/* Spread ... expands an
   iterable (array,
  string, object) into
  individual elements.
  Used for copying,
  combining, and
  passing arguments.
  */

// 1. Copy an array
const arr = [1, 2, 3];
const copy = [...arr];
console.log("Copy:", copy); // [1, 2, 3]

// 2. Combine arrays
const a = [1, 2];
const b = [3, 4];
const combined = [...a, ...b];
console.log("Combined:", combined); // [1, 2, 3, 4]

// 3. Spread in function calls
const nums = [5, 10, 15];
console.log("Max:", Math.max(...nums)); // 15

// 4. Copy / merge objects
const obj1 = { name: "Alice" };
const obj2 = { age: 30 };
const person = { ...obj1, ...obj2 };
console.log("Person:", person); // { name: 'Alice', age: 30 }

// 5. Later keys win when merging
const defaults = { theme: "dark", lang: "en" };
const userPrefs = { lang: "fr" };
const settings = { ...defaults, ...userPrefs };
console.log("Settings:", settings); // { theme: 'dark', lang: 'fr' }

// 6. Strings -> characters
const chars = [..."hello"];
console.log("Chars:", chars); // ['h', 'e', 'l', 'l', 'o']

// Note: spread creates a SHALLOW copy - nested objects are still shared
const nested = { list: [1, 2] };
const nestedCopy = { ...nested };
nestedCopy.list.push(3);
console.log("Nested original:", nested.list); // [1, 2, 3] - shared reference!
