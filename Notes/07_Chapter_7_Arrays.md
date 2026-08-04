# Chapter 7 - Arrays

## What is an Array?
An array is a special variable that can store **multiple values** in a single variable. Each value has an **index** starting from `0`.

```js
let browsers = ["Chrome", "Firefox", "Edge"];
console.log(`Browsers:${browsers}`); // Chrome,Firefox,Edge
```

## 1. Array Declarations

**File:** `07_Chapter_Arrays/23_Array_Declarations.js`

### Array Literal (preferred)
```js
let browsers = ["Chrome", "Firefox", "Edge"];
```

### Array Constructor `new Array(n)`
```js
let test = new Array(3);          // creates array of length 3 (empty slots)
console.log(test.length);         // 3

test = [1, 2, 3, 4];              // length changes dynamically when values assigned
console.log(test.length);         // 4
```

### `Array.of()` - array of values
```js
let testResults2 = Array.of("Pass", "Fail", "Skip");
```

### `Array.from()` - breaks a string into characters
```js
let fromArray = Array.from(testResults[0]); // "Pass" -> ['P','a','s','s']
```

## 2. Accessing and Modifying Elements

**File:** `07_Chapter_Arrays/24_Array_Accessing_and_Modifying.js`

```js
let testResults = ["Pass", "Fail", "Skip"];

console.log(testResults[1]);   // Fail  -> index access (0 to length-1)
console.log(testResults.at(-1)); // Skip -> negative index, -1 is last

testResults[2] = "Blocked";    // modify
console.log(testResults);      // [ 'Pass', 'Fail', 'Blocked' ]
```

## 3. Add and Remove Elements

**File:** `07_Chapter_Arrays/25_Arrays_Add_And_Remove_Elements.js`

```js
let browsers = ["Chrome", "FireFox", "Edge"];

browsers.push("Safari");      // add to end
browsers.pop();               // remove from end
browsers.unshift("DuckDuckGo"); // add to beginning
browsers.shift();             // remove from beginning

// splice(startIndex, deleteCount, addValue1?, addValue2?, ...)
// accepts negative index
browsers.splice(-1, 1, "Webkit", "Chromium");
```

| Method     | Action                          | Modifies original |
|------------|---------------------------------|-------------------|
| `push()`   | Add element to the end          | Yes               |
| `pop()`    | Remove element from the end     | Yes               |
| `unshift()`| Add element to the beginning    | Yes               |
| `shift()`  | Remove element from beginning   | Yes               |
| `splice()` | Add/remove from any position    | Yes               |

## 4. Searching Array Elements

**File:** `07_Chapter_Arrays/26_Searching_Array_Elements.js`

```js
let testResults = ["Pass", "Fail", "Skip", "Pass", "Fail"];

testResults.indexOf("Fail");         // 1  -> first match
testResults.lastIndexOf("Pass");     // 3  -> search from last
testResults.includes("Skip");        // true

let myNumbers = [10, 20, 45, 23, 455];
myNumbers.find(x => x > 20);         // 45   -> first value matching condition
myNumbers.findIndex(x => x > 20);    // 2    -> first index matching condition
myNumbers.findLast(x => x > 20);     // 455  -> from last
myNumbers.findLastIndex(x => x > 20);// 4    -> index from last
```

| Method          | Returns             | Direction |
|-----------------|---------------------|-----------|
| `indexOf(v)`    | index or `-1`       | first     |
| `lastIndexOf(v)`| index or `-1`       | last      |
| `includes(v)`   | boolean             | -         |
| `find(cb)`      | first matching value | first    |
| `findIndex(cb)` | first matching index| first     |
| `findLast(cb)`  | first matching value| last      |
| `findLastIndex(cb)` | first matching index | last   |

## 5. Array Iteration

**File:** `07_Chapter_Arrays/27_Array_Iteration.js`

```js
let testResults = ["Pass", "Fail", "Skip", "Pass", "Fail"];

// 1. Classic for loop
for (let index = 0; index < testResults.length; index++) {
    console.log(testResults[index]);
}

// 2. for...of (values)
for (let test of testResults) {
    console.log(`Test Result:${test}`);
}

// 3. for...of with index and value (entries)
for (let [i, test] of testResults.entries()) {
    console.log(`Test Result at ${i}:${test}`);
}

// 4. forEach (value, index)
testResults.forEach((result, index) => {
    console.log(`Test Results in ${index}:${result}`);
});
```

## 6. Array Transform - `map`, `filter`, `reduce`

**File:** `07_Chapter_Arrays/28_Array_Transform.js`

```js
let scores = [46, 45, 65, 99, 78, 79];

// map -> transforms each element, returns NEW array of same length
let grades = scores.map((s) => (s > 60 ? "Pass" : "Fail"));

// filter -> keeps elements that pass the condition, returns NEW array
let filterGrades = scores.filter((s) => s > 60);

// reduce -> reduces array to a single value
let highestScore = scores.reduce((acc, val) => (acc > val ? acc : val), 0);
let lowestScore = scores.reduce((acc, val) => (acc < val ? acc : val), scores[0]);
```

| Method   | Purpose                       | Returns      | Length |
|----------|-------------------------------|--------------|--------|
| `map()`  | Transform every element       | new array    | same   |
| `filter()`| Keep elements matching condition | new array | <= original |
| `reduce()`| Reduce to a single value     | single value | -      |

## 7. Array Sorting

**File:** `07_Chapter_Arrays/29_Array_Sorting.js`

```js
let browsers = ["Safari", "chrome", "firefox", "Edge"];
browsers.sort(); // sorts alphabetically (uppercase first)

// Natural sorting problem: [1, 34, 2, 20, 10].sort() -> 1, 10, 2, 20, 34
// (numbers sorted as strings!)

// Ascending (numeric)
myNumbers.sort((a, b) => a - b);

// Descending (numeric)
myNumbers.sort((a, b) => b - a);
```

> **Important:** `sort()` converts values to strings first, so numeric arrays need a compare function `(a, b) => a - b`.

## 8. Slicing and Concatenation

**File:** `07_Chapter_Arrays/30_Array_slicing_And_Concatenation.js`

```js
let myNumbers = [10, 43, 23, 56, 22, 78, 36, 2, 89];

// slice(start, end) -> end is exclusive, returns a copy, original unchanged
myNumbers.slice(2);         // from index 2 to end
myNumbers.slice(-6, -2);    // negative indices supported

// concat -> joins arrays, returns new array
myNumbers.concat(myNumbers2);
myNumbers.concat(myNumbers2).sort((a, b) => a - b);

// Spread operator [...]
let spreadConcat = [...myNumbers, ...myNumbers2];

// join -> array to string
let a = myNumbers.join();
console.log(Array.isArray(a)); // false

// Destructuring with rest
let [first, second, third, ...rest] = spreadConcat;
```

## 9. Array Validation

**File:** `07_Chapter_Arrays/31_Array_Validation.js`

```js
Array.isArray(name);               // false -> name is a string
Array.isArray(arrayValues);        // true
Array.from(name);                  // 'test' -> ['t','e','s','t']

// every -> ALL values must satisfy condition
let isEven = evenNumbers.every(x => x % 2 === 0);

// some -> AT LEAST ONE value satisfies condition
arrayValues.some(x => x % 2 === 0);
```

## 10. Coding Problems

### Distinct Values in Array (`32_Distinct_Value_in_Array.js`)
```js
let arr = [1,2,1,2,1,2,3,4,2,1,4,3];
let distincArray = arr.filter((value, index) => arr.indexOf(value) === index);
console.log(`Distinct Array: ${distincArray}`); // 1,2,3,4
```

### Maximum Value in Array (`33_Maximum_Value_in_Array.js`)
```js
// Method 1 - reduce
let maximumNumber = arr.reduce((acc, val) => (acc > val ? acc : val));

// Method 2 - bubble sort (descending), max is arr[0]
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[j] > arr[i]) {
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }
}
console.log(`Maximum Number: ${arr[0]}`);
```

## Quick Summary
- Arrays are 0-indexed collections of values.
- Add/remove: `push` `pop` `unshift` `shift` `splice`.
- Search: `indexOf` `includes` `find` `findLast`.
- Iterate: `for`, `for...of`, `forEach`.
- Transform: `map` `filter` `reduce`.
- Sort with compare function for numbers.
- `slice` copies, `splice` modifies.
