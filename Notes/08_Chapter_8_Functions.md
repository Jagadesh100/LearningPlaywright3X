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
function printTestName(name) {
    console.log(name);
}
printTestName("Test Name"); // Test Name
```

### 4. With parameter, with return type
```js
function getName(name) {
    return name;
}
console.log(getName("Get Name")); // Get Name
```

## Four Combinations of a Function

| Parameters | Return      | Example                                 |
|------------|-------------|-----------------------------------------|
| No         | No          | `function printName() { console.log(); }` |
| No         | Yes         | `function test() { return "Test"; }`    |
| Yes        | No          | `function printTestName(name) { console.log(name); }` |
| Yes        | Yes         | `function getName(name) { return name; }` |

## Function Definition

**File:** `08_Chapter_Functions/35_Function_Definition.js`

A function is defined with the `function` keyword, a name, parentheses `()` for parameters, and `{}` for the body.

```js
// Function definition (declaration)
function functionName(parameters) {
    // body
    return value;   // optional
}

// Function call / invocation
functionName(arguments);
```

### Key points
- **Define** the function, then **call** it by name followed by `()`.
- Parameters are the names in the definition; arguments are the values passed when calling.
- `return` sends a value back to the caller; without it, the function returns `undefined`.
- Functions are hoisted - a function declaration can be called before its definition.

## Why Functions Matter for Playwright
- Test steps, reusable assertions, and helpers are written as functions.
- Keeps test code DRY (Don't Repeat Yourself).
- Easy to maintain and scale test suites.

## Quick Summary
- Functions make code reusable and reduce repetition.
- 4 combinations: parameter + return, in all permutations.
- Call with `name()`; return values with `return`.
