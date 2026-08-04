# Chapter 4 - Operators

## 1. Arithmetic Operators

> Arithmetic operators are used to perform basic mathematical functions.

**File:** `04_chapter_Operators/06_Arithmetic_Operators.js`

```js
const a = 10, b = 4;
console.log(a + b);  // 14  -> Addition
console.log(a - b);  // 6   -> Subtraction
console.log(a * b);  // 40  -> Multiplication
console.log(a / b);  // 2.5 -> Division (gives quotient)
console.log(a % b);  // 2   -> Modulus (gives remainder)
console.log(a ** b); // 10000 -> Exponentiation (10^4)
```

| Operator | Meaning           | Example   | Result |
|----------|-------------------|-----------|--------|
| `+`      | Addition          | `10 + 4`  | `14`   |
| `-`      | Subtraction       | `10 - 4`  | `6`    |
| `*`      | Multiplication    | `10 * 4`  | `40`   |
| `/`      | Division (quotient) | `10 / 4` | `2.5` |
| `%`      | Modulus (remainder) | `10 % 4` | `2`   |
| `**`     | Exponentiation    | `10 ** 4` | `10000` |

## 2. Assignment Operators

**File:** `04_chapter_Operators/07_Assignment_Operators.js`

- The assignment operator `=` assigns a value to a variable.
- **Compound assignment operators** combine assignment with another operation.

```js
let a = 5;
a += 3;   // a = a + 3  -> 8
a -= 2;   // a = a - 2  -> 6
a *= 2;   // a = a * 2  -> 12
a /= 3;   // a = a / 3  -> 4
a %= 2;   // a = a % 2  -> 0
a **= 2;  // a = a ** 2 -> 0
```

## 3. Comparison Operators

**File:** `04_chapter_Operators/08_Comparison_Operators.js`

> Comparison operators compare two values and return a boolean (`true` / `false`).

### Relational operators: `>`, `<`, `>=`, `<=`

### Loose vs Strict equality

| Operator | Name                  | Checks               |
|----------|-----------------------|----------------------|
| `=`      | Assignment            | (not comparison)     |
| `==`     | Loose equality        | value only           |
| `===`    | Strict equality       | value and data type  |
| `!=`     | Loose not equal       | value only           |
| `!==`    | Strict not equal      | value and data type  |

```js
console.log(7 == "7");   // true   -> loose, value only
console.log(7 === "7");  // false  -> strict, value + type
console.log(5 != "5");   // false  -> 5 == "5" is true, so not-equal is false
console.log(5 !== "5");  // true   -> types differ, strictly not equal
```

## 4. Increment and Decrement Operators

**File:** `04_chapter_Operators/10_Increment_Decrement_Operator.js`

| Operator | Name              | Behavior                                    |
|----------|-------------------|---------------------------------------------|
| `i++`    | Post-increment    | Uses current value, then increments         |
| `++i`    | Pre-increment     | Increments first, then uses new value       |
| `i--`    | Post-decrement    | Uses current value, then decrements         |
| `--i`    | Pre-decrement     | Decrements first, then uses new value       |

```js
// Exercise 1
let a = 100;
console.log(a++ + ++a + a++ + ++a); // 100 + 102 + 102 + 104 = 408
console.log(a);                     // 104

// Exercise 2
let sub = 37;
console.log(--sub + sub--); // 36 + 36 = 72
console.log(sub);           // 35

// Exercise 3
let val = 5;
let b = val-- - --val; // 5 - 3 = 2  (val goes 5 -> 4 -> 3)
console.log(b, val);    // 2 3
```

## 5. Ternary Operator

**File:** `04_chapter_Operators/11_Ternary_Operator.js`

> Shorthand for `if...else` - `condition ? valueIfTrue : valueIfFalse`

```js
let i = 1;
let result = i++ > 1 ? i++ : ++i;
// i++ > 1  -> 1 > 1 -> false, so ++i runs
// i becomes 2 (after post-increment), then ++i -> 3
console.log(result, i); // 3 3
```

## 6. Nullish Coalescing Operator `??`

**File:** `04_chapter_Operators/14_Null_Colaecing_Operator.js`

> If the referenced value is `null` (or `undefined`), `??` replaces it with the value on the right-hand side.

```js
let warehouseValue = null;
let dashboardValue = warehouseValue ?? 3.25;
console.log(dashboardValue); // 3.25
```

- Works only for `null` / `undefined` (unlike `||` which also treats `0`, `""`, `false` as falsy).

## 7. Sample Interview Questions on Operators

**File:** `04_chapter_Operators/09_Sample_Interview_Questions_Part_1.js`

```js
console.log(0 == false);        // true
console.log(0 === false);       // false
console.log(typeof (0) == "number");  // true
console.log(typeof (0) === "number"); // true

console.log(2 + "5"); // "25"  -> string concatenation

let a = 2, b = "5";
console.log(2 - "5"); // -3    -> subtraction coerces "5" to number
console.log(b - a);   // 3
```

### Key Takeaways
- `+` with a string concatenates; `-`, `*`, `/`, `%` coerce strings to numbers.
- Always prefer `===` / `!==` in real code.

## Quick Summary
- Arithmetic: `+ - * / % **`
- Assignment: `= += -= *= /= %= **=`
- Comparison: `> < >= <= == === != !==`
- Increment/Decrement: `++ --` (pre/post)
- Ternary: `? :`
- Nullish Coalescing: `??`
