# Chapter 6 - Loops and Pattern Programs

## Introduction
Loops execute a block of code repeatedly until a condition becomes false. The three loop types used in JavaScript are `for`, `while`, and `do...while`.

## Loop Types

### `for` loop
```js
for (initialization; condition; increment) {
    // code
}
```

### `while` loop
```js
while (condition) {
    // code
}
```

### `do...while` loop
```js
do {
    // code - runs at least once
} while (condition);
```

## Loop Interview Questions (IQ)

**Files:** `06_chapter_Loops/IQ/iq_Loops_1.js` to `iq_Loops_3.js`

### IQ 1 - Sum of first 5 numbers using `for`
```js
let sum = 0;
for (let i = 1; i <= 5; i++) {
    sum += i;
}
console.log(`Sum:${sum}`); // Sum:15
```

### IQ 2 - `while` loop with `NaN`
```js
let i = 0;
while (i < NaN) {
    i++;
}
console.log(`i:${i}`); // i:0  (NaN comparisons are always false, loop never runs)
```

### IQ 3 - `do...while` with post-decrement
```js
let i = 3, count = 0;
do {
    count++;
} while (i-- > 0);

console.log(count + " " + i); // 4 -1
```
- The `do...while` runs once before checking the condition.
- `i-- > 0` compares `i` (3, 2, 1, 0) then decrements. When `i` is 0, condition is false but it still decrements to `-1`.

## Pattern Programs (Part 1)

**Folder:** `06_chapter_Loops/Pattern Programs Part 1/`

All patterns use **nested `for` loops** - the outer loop controls **rows**, the inner loop controls **columns/stars/spaces**.

### 1. Square Pattern (`14_Square_Pattern.js`, n = 5)
```js
for (let row = 1; row <= n; row++) {
    let squarePattern = "";
    for (let star = 1; star <= n; star++) {
        squarePattern += "*";
    }
    console.log(squarePattern);
}
```
```
*****
*****
*****
*****
*****
```

### 2. Left Triangle (`15_Left_Triangle.js`, n = 6)
Spaces first (`n - row`), then stars (`row`).
```
     *
    **
   ***
  ****
 *****
******
```

### 3. Right Triangle (`16_Right_Triangle.js`, n = 10)
Stars first (`row`), then spaces (`n - row`).
```
*
**
***
****
...
```

### 4. Inverted Right Triangle (`17_Inverted_Right_Triangle.js`, n = 5)
Loop rows from `n` down to `1`; stars (`row`), then spaces (`n - row`).
```
*****
****
***
**
*
```

### 5. Inverted Left Triangle (`18_Inverted_Left_Triangle.js`, n = 4)
Spaces (`n - row`), then stars (`row`), rows from `n` down to `1`.
```
****
 ***
  **
   *
```

### 6. Pyramid Pattern (`19_Pyramid_Pattern.js`, n = 7)
Left spaces = `n - row`, stars = `(2 * row) - 1`.
```
      *
     ***
    *****
   *******
  *********
 ***********
*************
```

### 7. Inverted Pyramid (`20_Inverted_Pyramid_Pattern.js`, n = 6)
Rows from `n` down to `1`; spaces = `n - row`, stars = `(2 * row) - 1`.
```
***********
 *********
  *******
   *****
    ***
     *
```

### 8. Diamond Pattern (`21_Diamond_Pattern.js`, n = 9)
Pyramid (top) + inverted pyramid (bottom), split using `Math.round(n / 2)`.

### 9. Hollow Square (`22_Hollow_Square.js`, n = 5)
Print `*` only on the border: `row === 0 || row === n-1 || col === 0 || col === n-1`.
```
*****
*   *
*   *
*   *
*****
```

## Pattern Cheat Sheet

| Pattern                | Rows loop         | Spaces            | Stars             |
|------------------------|-------------------|-------------------|-------------------|
| Square                 | `1..n`            | -                 | `1..n`            |
| Right Triangle         | `1..n`            | -                 | `1..row`          |
| Left Triangle          | `1..n`            | `n - row`         | `1..row`          |
| Inverted Right         | `n..1`            | -                 | `1..row`          |
| Inverted Left          | `n..1`            | `n - row`         | `1..row`          |
| Pyramid                | `1..n`            | `n - row`         | `2 * row - 1`     |
| Inverted Pyramid       | `n..1`            | `n - row`         | `2 * row - 1`     |
| Diamond                | top + bottom      | `half - row`      | `2 * row - 1`     |
| Hollow Square          | `1..n`            | -                 | border only       |

## Quick Summary
- `for` = known number of iterations, `while` = condition-based, `do...while` = at least once.
- Nested loops build patterns: outer loop = rows, inner loops = spaces and stars.
- Compare with `>` and careful pre/post decrement placement controls loop exits.
