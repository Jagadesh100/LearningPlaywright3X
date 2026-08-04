# Hoisting and Temporal Dead Zone (TDZ) - Notes

## What is Hoisting?

> Hoisting is JavaScript's behavior of moving **declarations** to the top of their containing scope during the compile phase, **before** the code is executed.

- Only **declarations** are hoisted, not **initializations** (values).
- It applies to variables (`var`, `let`, `const`) and functions (function declarations).

---

## 1. Hoisting with `var`

- `var` declarations are hoisted and **initialized** with `undefined`.
- You can access the variable before its declaration line, but it will be `undefined`.

```js
console.log(myVar); // undefined (not an error!)
var myVar = 10;
```

### Equivalent to:
```js
var myVar;          // hoisted + initialized with undefined
console.log(myVar); // undefined
myVar = 10;         // assignment stays in place
```

---

## 2. Hoisting with `let` and `const`

- `let` and `const` declarations are hoisted too, but they are **NOT initialized**.
- Accessing them before the declaration line throws a **ReferenceError**.
- The period between the start of the scope and the declaration is called the **Temporal Dead Zone (TDZ)**.

```js
console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 10;
```

```js
console.log(myConst); // ReferenceError: Cannot access 'myConst' before initialization
const myConst = 20;
```

---

## 3. Temporal Dead Zone (TDZ)

> The TDZ is the time between entering a scope (block) and the actual declaration of a `let`/`const` variable, during which the variable **exists** but **cannot be accessed**.

- Accessing a variable in the TDZ throws `ReferenceError`.
- The TDZ ends when the declaration is executed.

```js
{
    // TDZ starts for "name"
    console.log(name); // ReferenceError
    let name = "Jagadesh"; // TDZ ends here
}
```

### TDZ applies to:
- `let` variables
- `const` variables
- `class` declarations
- default function parameters (when referencing earlier parameters)

---

## 4. Hoisting with Functions

### Function Declarations - Fully Hoisted

- The entire function (name + body) is hoisted, so you can **call a function before its definition**.

```js
printName(); // Works! Output: Jagadesh

function printName() {
    console.log("Jagadesh");
}
```

### Function Expressions - Not Hoisted

- `var` function expressions are hoisted as `undefined` (calling them throws `TypeError`).
- `let`/`const` function expressions are in the TDZ (calling them throws `ReferenceError`).

```js
greet(); // TypeError: greet is not a function
var greet = function () {
    console.log("Hi");
};
```

```js
greet2(); // ReferenceError: Cannot access 'greet2' before initialization
let greet2 = function () {
    console.log("Hi");
};
```

---

## 5. Hoisting Order Summary

| Declaration          | Hoisted? | Initialized? | Access before declaration      |
|----------------------|----------|--------------|--------------------------------|
| `var`                | Yes      | `undefined`  | `undefined` (no error)         |
| `let`                | Yes      | No (TDZ)     | `ReferenceError`               |
| `const`              | Yes      | No (TDZ)     | `ReferenceError`               |
| Function declaration | Yes (full)| Yes         | Callable normally              |
| Function expression (`let`/`const`) | Yes (name only) | No (TDZ) | `ReferenceError` |

---

## 6. Code Examples from the Learning Directory

**File:** `08_Chapter_Functions/38_Hoisting_Functions.js`

This file shows the three hoisting scenarios side by side using HTTP status codes:

```js
// 1. Normal Function - name AND body get hoisted
printStatusCode(); // Works! Prints: 200

function printStatusCode() {
    console.log("200");
}

// 2. var Function Expression - only the variable name is hoisted (as undefined)
printfailureStatusCode(); // TypeError: printfailureStatusCode is not a function

var failureStatusCode = function () {
    console.log("500");
};

// 3. let Function Expression - name hoisted but in TDZ
failureStatusCodeClient(); // ReferenceError: Cannot access 'failureStatusCodeClient' before initialization

let failureStatusCodeClient = function () {
    console.log("500");
};
```

**Key takeaways from this example:**
- Function **declarations** are fully hoisted (name + body) → callable before the definition.
- `var` function expressions are hoisted as `undefined` → calling throws `TypeError`.
- `let`/`const` function expressions enter the TDZ → calling throws `ReferenceError`.

**File:** `08_Chapter_Functions/36_Dynamic_Parameter_Function.js`

While this file demonstrates **rest parameters** and the **spread operator**, the related concepts of declarations and scope tie directly into hoisting/TDZ.

```js
function sumOfValues(a, b, c) {
    return a + b + c;
}

// Rest Parameters - collects remaining arguments into an array
// Note: rest parameter must be the LAST parameter
function dynamicSumOfValues(...values) {
    return values.reduce((sum, n) => sum + n, 0);
}

// Example: rest param after a named parameter
function dynamicSumOfValues(a, ...values) {
    return values.reduce((sum, n) => sum + n, 0);
}

let a = [1, 2, 3, 4, 5];
console.log(sumOfValues(...a));                  // 6  (spread - only first 3 used)
console.log(dynamicSumOfValues(10, 2, 334, 568, 346, 325456, 23456, "rets")); // sum + string concat
```

---

## 7. Best Practices

- Always declare variables at the **top of their scope** to avoid TDZ confusion.
- Prefer `const` by default, `let` when reassignment is needed.
- Use function declarations if you want hoisting; use function expressions for control.
- Avoid accessing variables before their declaration line.

---

## Quick Summary
- **Hoisting** = declarations move to the top of scope at compile time.
- `var` -> hoisted, initialized to `undefined`.
- `let`/`const` -> hoisted, but in the **TDZ** until the declaration line (access throws `ReferenceError`).
- Function declarations are fully hoisted; function expressions are not.
