# Chapter 2 - Variables and Comments

## Variables

> Variables are containers used to store data/values.

**File:** `02_chapter_Javascript_Concepts/02_Variables.js`

### 1. `var` - Oldest Way (Function Scoped)

- Can be **reassigned** and **redeclared**.
- Function scoped (not block scoped).

```js
var myNum = 10;
console.log(myNum);          // 10
console.log(typeof (myNum)); // number

myNum = 25;                  // reassign
console.log(myNum);          // 25

var myNum = 35;              // redeclare
console.log(myNum);          // 35

myNum = "24";                // value can change type
console.log(typeof (myNum)); // string
```

### 2. `let` - Modern ES6 Standard (Block Scoped)

- Can be **reassigned** but **cannot be redeclared** in the same scope.

```js
let myVal = 4;
console.log(myVal);          // 4
console.log(typeof (myVal)); // number

myVal = 6;                   // reassign allowed
console.log(myVal);          // 6

// let myVal = 101;  -> SyntaxError: redeclaration not allowed
```

### 3. `const` - Modern ES6 Standard (Block Scoped)

- Value **cannot be reassigned** after declaration.
- Must be initialized at declaration.

```js
const pie = 3.14;
// pie = 2.23;  -> TypeError: Assignment to constant variable
```

## `var` vs `let` vs `const`

| Keyword | Reassign | Redeclare | Scope      | ES Version |
|---------|----------|-----------|------------|------------|
| `var`   | Yes      | Yes       | Function   | ES5        |
| `let`   | Yes      | No        | Block `{}` | ES6        |
| `const` | No       | No        | Block `{}` | ES6        |

## Scope of `let`, `var`, and `const`

**File:** `02_chapter_Javascript_Concepts/41_Scope_Of_Variables.js`

Scope decides **where** a variable is visible and accessible. The three keywords differ in their scope:

| Keyword | Scope | Accessible from |
|---------|-------|-----------------|
| `var`   | Function scope | Anywhere inside the function (ignores `{}` blocks) |
| `let`   | Block scope    | Only inside the nearest `{}` block |
| `const` | Block scope    | Only inside the nearest `{}` block |

### 1. `var` — Function Scope (leaks out of blocks)

```js
function varExample() {
    if (true) {
        var city = "Chennai"; // declared inside the block...
    }
    console.log(city); // "Chennai" — var ignores blocks, it leaks out!
}
varExample();
```

`var` is **function scoped** — blocks like `if`/`for` do NOT contain it. This is a common source of bugs, which is why `var` fell out of favour.

### 2. `let` — Block Scope (stays inside the block)

```js
function letExample() {
    if (true) {
        let city = "Chennai";
        console.log(city); // "Chennai" — accessible inside the block
    }
    // console.log(city); // ReferenceError: city is not defined
}
letExample();
```

### 3. `const` — Block Scope with Shadowing (the demo file)

The same variable name can exist at **different levels** — this is called **shadowing**. Each `const num` is a brand-new variable in its own scope; the inner one hides (shadows) the outer one.

```js
const num = 10;                           // ① global scope
console.log("Outside: " + num);           // Outside: 10

function numbers() {
    const num = 20;                       // ② function scope (shadows ①)
    console.log("Inside: " + num);        // Inside: 20

    if (true) {
        const num = 30;                   // ③ block scope (shadows ②)
        console.log("Block: " + num);     // Block: 30
    }

    console.log("Outside block: " + num); // Outside block: 20 — back to ②
}
numbers();

console.log("Outside: " + num);           // Outside: 10 — global ① untouched
```

**Output:**
```
Outside: 10
Inside: 20
Block: 30
Outside block: 20
Outside: 10
```

**Key takeaways:**
- Each scope can have its **own** `num` — inner scopes **shadow** outer ones.
- The global `num` (10) is never touched by the function.
- `const` cannot be *reassigned*, but a new `const` in a deeper block is a completely different variable.

## Comments

**File:** `02_chapter_Javascript_Concepts/03_Comments.js`

Comments are ignored by the JavaScript engine; they are used to explain code.

### Single-line comment
```js
// single line comment
```

### Multi-line comment
```js
/*
 * Multi
 * Line
 * Comment
 */
```

### JSDoc / Documentation comment
```js
/**
 * Multi
 * Line
 * Comment
 **/
```

## Quick Summary
- Use `let` / `const` (ES6) in modern code; avoid `var`.
- `const` when the value should not change, `let` when it will.
- Comments (`//`, `/* */`, `/** */`) make code readable and maintainable.
