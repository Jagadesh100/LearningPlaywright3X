# Chapter 8 - Functions

## What is a Function?
> Reusable methods to perform repetitive tasks - reducing code duplication.

Functions are blocks of code that can be defined once and called (invoked) many times.

## Function Basics

**File:** `08_Chapter_Functions/34_Function_Basics.js`

### 1. No parameter, No return type
```js
function printName() {
    console.log(`Name:`);
}
printName(); // Name:
```

### 2. No parameter, with return type
```js
function test() {
    return "Test";
}
console.log(test()); // Test
```

### 3. With parameter, No return type
```js
function printTestName(name) {  // parameter
    console.log(name);
}
printTestName("Test Name");     // argument
```

### 4. With parameter, with return type
```js
function getName(name) {
    return name;
}
console.log(getName("Get Name")); // Get Name
```

### Four Combinations of a Function

| Parameters | Return      | Example                                 |
|------------|-------------|-----------------------------------------|
| No         | No          | `function printName() { console.log(); }` |
| No         | Yes         | `function test() { return "Test"; }`    |
| Yes        | No          | `function printTestName(name) { console.log(name); }` |
| Yes        | Yes         | `function getName(name) { return name; }` |

---

## Function Definition - 3 Ways

**File:** `08_Chapter_Functions/35_Function_Definition.js`

```js
// 1. Traditional declaration (function statement)
function getBrowserName(browserName) {
    console.log(`BrowserName: ${browserName}`);
}
getBrowserName("Chrome");

// 2. Function expression (anonymous function assigned to a variable)
const getBrowserNameExp = function (browserName) {
    console.log(`BrowserName Exp : ${browserName}`);
};
getBrowserNameExp("FireFox");

// 3. Arrow function (ES6)
const getArrowBrowser = (browserName) => {
    console.log(`Arrow Browser name: ${browserName}`);
};
getArrowBrowser("Edge");
```

### Key points
- **Define** the function, then **call** it by name followed by `()`.
- Parameters are the names in the definition; arguments are the values passed when calling.
- `return` sends a value back to the caller; without it, the function returns `undefined`.
- Function declarations are hoisted; function expressions and arrow functions are not.

---

## Function Expression

**File:** `08_Chapter_Functions/39_Function_Expression.js`

A function stored in a variable. The variable holds a reference to the function.

```js
const printStatus = function (status) {
    console.log(status);
};
printStatus("Pass");
```

- Anonymous (no name after `function`).
- Not hoisted - must be defined before calling.

---

## Arrow Functions

**File:** `08_Chapter_Functions/40_Arrow_Function.js`

Concise ES6 syntax with `=>`.

```js
// Single line - implicit return
const printStatus = (status) => console.log(`Status is ${status}`);
printStatus("400");

// No parameter - parentheses still needed
const getEnv = () => `Pre-Prod`;
console.log(getEnv()); // Pre-Prod

// Multi line requires curly braces { }
const oddOrEven = (number) => {
    if (number % 2 === 0 && number !== 0) {
        console.log(`${number} is Even`);
    } else if (number % 2 !== 0 && number !== 0) {
        console.log(`${number} is Odd`);
    } else {
        console.log(`${number} is Zero`);
    }
};
oddOrEven(5);    // 5 is Odd
oddOrEven(1034); // 1034 is Even
oddOrEven(0);    // 0 is Zero
```

### Arrow function rules
- One expression → implicit return, no `{}` needed.
- Multiple statements → need `{}` and explicit `return`.
- No own `this`, not hoisted, cannot be a constructor.

---

## IIFE (Immediately Invoked Function Expression)

**File:** `08_Chapter_Functions/41_IIFE.js`

> A function that **calls itself the moment it is defined** - useful for one-time setup code.

```js
// Anonymous IIFE
(function () {
    console.log(`Hello Tester`);
})();

// Arrow IIFE (note: this one is missing () to invoke - just defined)
(() => {
    console.log("IIFE Arrow Function");
});

// Named IIFE
const name = (function () {
    console.log("IIFE Named Function");
})();
```

**Why use IIFE:**
- Runs immediately, creating a private scope (variables don't leak to global).
- Common for one-time initialization / setup in test configs.

---

## Default Parameters

**File:** `08_Chapter_Functions/42_Default_Parameter.js`

> If an argument is not passed, the parameter takes its **default value**.

```js
function printScore(playerName, score = 75, status = "Not Out") {
    console.log(`Player name: ${playerName}`);
    console.log(`Score: ${score}`);
    console.log(`Status: ${status}`);
}

printScore("Jagadesh");            // score=75, status="Not Out" (defaults used)
printScore("Ragavan", 72, "Out");  // all arguments provided
printScore();                      // playerName = undefined (no default)
```

---

## Rest Parameters (`...`)

**File:** `08_Chapter_Functions/43_Rest_Parameter.js`, `08_Chapter_Functions/36_Dynamic_Parameter_Function.js`

> Rest parameter collects **multiple arguments into an array**. Must be the **LAST** parameter.

```js
function sum(testName, ...val) {
    console.log(`Test Name: ${testName}`);
    return val.reduce((a, b) => a + b);
}

sum("Test 1", 1, 2, 3, 4, 3);          // 13
sum("Test 2", 1, 2, 3, 4, 3, 63, 637); // 713
sum("Test 3", 1, 2);                    // 3
```

```js
// Dynamic number of parameters - any count works
function dynamicSumOfValues(...values) {
    return values.reduce((sum, n) => sum + n, 0);
}
```

---

## Spread Operator (`...`)

**File:** `08_Chapter_Functions/44_Spread.js`, `08_Chapter_Functions/45_Spread_in_Functions.js`

> Spread **expands an iterable** (array, string, object) into individual elements. The opposite of rest.

### 1. Copy an array
```js
const arr = [1, 2, 3];
const copy = [...arr]; // [1, 2, 3]
```

### 2. Combine arrays
```js
const a = [1, 2];
const b = [3, 4];
const combined = [...a, ...b]; // [1, 2, 3, 4]
```

### 3. Spread in function calls
```js
const nums = [5, 10, 15];
Math.max(...nums); // 15 (spreads to Math.max(5, 10, 15))
```

### 4. Copy / merge objects
```js
const obj1 = { name: "Alice" };
const obj2 = { age: 30 };
const person = { ...obj1, ...obj2 }; // { name: 'Alice', age: 30 }
```

### 5. Later keys win when merging
```js
const defaults = { theme: "dark", lang: "en" };
const userPrefs = { lang: "fr" };
const settings = { ...defaults, ...userPrefs }; // { theme: 'dark', lang: 'fr' }
```

### 6. Strings → characters
```js
const chars = [..."hello"]; // ['h', 'e', 'l', 'l', 'o']
```

### 7. In function calls (splits into arguments)
```js
function sum(a, b, c) {
    console.log(a + b + c);
}
let a = [1, 2, 3];
sum(...a);       // 6

let b = [1, 2, 5, 6, 7];
sum(...b);       // 8 - only first 3 used, extras ignored
```

### ⚠️ Shallow copy gotcha
```js
const nested = { list: [1, 2] };
const nestedCopy = { ...nested };
nestedCopy.list.push(3);
console.log(nested.list); // [1, 2, 3] - shared reference!
```
Spread copies top-level properties only; nested objects are still shared.

---

## Rest vs Spread

| | Rest (`...`) | Spread (`...`) |
|---|---|---|
| Purpose | **Collects** multiple values into an array | **Expands** an iterable into individual values |
| Used in | Function parameters (must be last) | Arrays, objects, function calls |
| Example | `function f(...args)` | `Math.max(...arr)` |

---

## Function Scope

**File:** `08_Chapter_Functions/49_Function_Scope.js`

> Variables declared inside a function are **local** to it - not accessible outside.

```js
let message = "Global";

function localScope() {
    let name = "local";
    console.log(`From local : ${message}`); // Global - can read outer scope
    console.log(`From local : ${name}`);    // local
}

localScope();

console.log(`From Global : ${message}`); // Global
console.log(`From Global : ${name}`);    // ReferenceError - local variable, not defined
```

- Inner functions can **read** outer scope variables.
- Outer code **cannot** access variables declared inside a function.

---

## Closures

**File:** `08_Chapter_Functions/50_Function_Closure.js`, `08_Chapter_Functions/51_Function_Closure_Counter.js`

> A closure is when an inner function **remembers** the variables of its outer function, even after the outer function has finished executing.

```js
function outer(name) {
    let message = "Hello";
    function inner() {
        console.log(`${message} ${name}`); // inner still remembers message & name
    }
    return inner;
}

let greet = outer("Username");
greet(); // Hello Username - outer already returned, but inner remembers
```

### Closure counter (private state)
```js
function makeCounter(start = 0) {
    let count = start; // this variable is "closed over" (private)

    return {
        increment() { count++; },
        decrement() { count--; },
        get() { return count; },
    };
}

let counter = makeCounter(0);
counter.increment();
counter.increment();
counter.increment();
console.log(counter.get()); // 3
counter.decrement();
console.log(counter.get()); // 2
```

- `count` is **private** - no code outside `makeCounter` can touch it directly.
- The returned object methods "close over" `count` and keep it alive.
- Great for encapsulating state in test utilities.

---

## Hoisting (Functions)

**File:** `08_Chapter_Functions/37_Hoisting.js`, `38_Hoisting_Functions.js`, `46_Hoisting_Examples.js`, `47_Hoisting_Function_Expression.js`, `48_Hoisting_Arrow_Function.js`

> Hoisting moves **declarations** to the top of their scope during the compile phase.

### Function declarations - fully hoisted (name + body)
```js
getStatusCode(); // Works! prints 200
function getStatusCode() {
    console.log("200");
}
```

### `var` function expressions - name hoisted as `undefined`
```js
printFailureStatusCode(); // TypeError: printFailureStatusCode is not a function
var failureStatusCode = function () {
    console.log("500");
};
```

### `let`/`const` function expressions - TDZ ReferenceError
```js
getResult(); // ReferenceError: Cannot access 'getResult' before initialization
const getResult = function () {
    console.log("Pass");
};
```

### Arrow functions - same hoisting behavior as function expressions
```js
getStatusCode(); // TypeError (var) or ReferenceError (let/const)
var getStatusCode = () => {
    console.log("200");
};
```

### Hoisting summary table

| Declaration type | Hoisted? | Access before declaration |
|---|---|---|
| Function declaration | Yes (name + body) | Callable normally |
| `var` function expression | Name only (as `undefined`) | `TypeError: not a function` |
| `let`/`const` function expression | Yes, but in TDZ | `ReferenceError` |
| Arrow function (`var`) | Name only (as `undefined`) | `TypeError: not a function` |
| Arrow function (`let`/`const`) | Yes, but in TDZ | `ReferenceError` |

---

## Why Functions Matter for Playwright
- Test steps, reusable assertions, and helpers are written as functions.
- Keeps test code DRY (Don't Repeat Yourself).
- Arrow functions are used everywhere in Playwright for concise callbacks (`page.click(() => ...)`, `expect.poll`).
- Default/rest parameters make test helpers flexible.
- Spread is used to build config objects and pass data to helpers.
- Closures create stateful utilities (counters, session data) with encapsulated state.

---

## Quick Summary
- Functions make code reusable and reduce repetition.
- 4 combinations: parameter + return, in all permutations.
- 3 ways to define: declaration, expression, arrow.
- Arrow: implicit return for single expression; needs `{}` for multiple lines.
- IIFE runs immediately - one-time setup in a private scope.
- Default params fill missing arguments; rest collects extras into an array.
- Spread expands iterables; rest collects; they are opposites.
- Function scope: inner reads outer, outer can't read inner.
- Closures remember outer variables after the outer function returns.
- Function declarations hoist fully; expressions/arrows don't.
