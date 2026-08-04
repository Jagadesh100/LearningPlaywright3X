# Chapter 3 - Identifiers and Literals

## Identifiers

> Identifiers are the names used to identify variables, functions, classes, and other user-defined names.
> In simple words: the name of the container that holds a value.

**File:** `03_chapter_Javascript_Concepts/04_Identifiers.js`

### Valid Identifier Examples

```js
var ABC = 10;    // letters
var abc = 10;    // case sensitive (ABC != abc)
var _abc = 10;   // underscore allowed
var $ = 9;       // dollar sign allowed
var a1s = 4;     // digits allowed after first character
var abc1299_$ = 10;
```

### Invalid Identifier Examples

```js
// var 1ad = 10;      -> cannot start with a digit
// var ab db = 10;    -> spaces not allowed
// var if = 19;       -> reserved keywords not allowed
```

### Unicode Identifiers

JavaScript supports Unicode characters in identifiers.

```js
var தமிழ் = 10;   // Tamil letters are valid identifiers
```

### Identifier Rules Summary
- Must start with a letter, `_`, or `$`.
- Can contain letters, digits, `_`, and `$`.
- Cannot start with a digit.
- Cannot contain spaces.
- Cannot be a reserved keyword (`if`, `var`, `class`, etc.).
- Identifiers are **case sensitive**.
- Unicode characters are allowed.

## Literals

> Literals are values which represent actual data - fixed values written in the code.

**File:** `03_chapter_Javascript_Concepts/05_Literals.js`

### Types of Literals
- **Number literals** - `1`, `2`, `3`, etc.
- **String literals** - `"Jagadesh"`, `"dhoni"`, etc.
- **Boolean literals** - `true`, `false`
- **Null literals** - `null`
- **Undefined literals** - `undefined`

### Example

```js
var myName = "Jagadesh";    // string literal
var myAge = 26;             // number literal
var isGenderMale = true;    // boolean literal
var purchase = null;        // null literal
var rupee = undefined;      // undefined literal
```

### `typeof` of literals

```js
console.log(typeof (myName));       // string
console.log(typeof (myAge));        // number
console.log(typeof (isGenderMale)); // boolean
console.log(typeof (purchase));     // object  <-- Note: typeof null is "object"
console.log(typeof (rupee));        // undefined
```

### Important Notes
- `typeof null` returns `"object"` (a historical JavaScript quirk).
- `typeof undefined` returns `"undefined"`.

## Quick Summary
- **Identifiers** are names (variables, functions, classes) - follow naming rules.
- **Literals** are fixed values: number, string, boolean, null, undefined.
- `typeof` is the operator to check the data type of a value.
