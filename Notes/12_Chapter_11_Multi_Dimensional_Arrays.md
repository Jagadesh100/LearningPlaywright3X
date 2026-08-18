# Chapter 11 - Multi-Dimensional Arrays

## What is a Multi-Dimensional Array?
> A multi-dimensional array is an **array of arrays** - a grid laid out in **rows × columns** (2D array).

```js
let scores = [
    [20, 78, 90],   // row 0
    [64, 74, 83],   // row 1
    [89, 98, 78],   // row 2
];
```

**File:** `11_chapter_Multi_Dimensional_Arrays/74_MultiDimensional_Array.js`

**Key facts:**
- A 2D array is a grid, an array of arrays.
- Access a cell with `grid[row][col]` - **both indices start at 0**.
- `grid.length` = number of rows; `grid[row].length` = number of columns in that row.

---

## Accessing Cells

**File:** `11_chapter_Multi_Dimensional_Arrays/75_MultiDimensional_Array_Accessing.js`

```js
let scores = [
    [20, 78, 90],
    [64, 74, 83, 34],   // note: rows can have different lengths
    [89, 98, 78],
];

scores[2][1];   // 3rd row, 2nd column → 98
scores[1][1];   // 2nd row, 2nd column → 74
scores[0][2];   // 1st row, 3rd column → 90

scores.length;      // 3 (rows)
scores[1].length;   // 4 (columns in row 1)
```

**Mental model:** `scores[row]` gives you the inner array; `[col]` picks the element inside it. `scores[2]` → `[89, 98, 78]`, then `[1]` → `98`.

---

## Looping Through a 2D Array

**File:** `11_chapter_Multi_Dimensional_Arrays/76_MultiDimensional_Array_Looping.js`

> Use a **nested loop** (a loop inside a loop) to visit every cell: outer loop = rows, inner loop = columns.

### 1. Classic `for` loop with indices
```js
for (let row = 0; row < scores.length; row++) {
    for (let col = 0; col < scores[row].length; col++) {
        console.log(scores[row][col]);
    }
}
```
- Outer loop picks each row.
- Inner loop walks every column **in that row** (uses `scores[row].length` so ragged rows work).

### 2. `for...of` loop
```js
for (let row of scores) {
    for (let col of row) {
        console.log(`Value: ${col}`);
    }
}
```
- `row` is each inner array; `col` is each value inside it.

---

## Star Pattern IQ Questions (Nested Loops in Action)

These are classic interview patterns - all built from nested loops printing stars and spaces.

### 1. Right-Angled Triangle (Left-aligned, increasing)
**File:** `77_Right_Angled_Triangle_Star_Pattern_IQ.js`

```js
let n = 4;
for (let i = 1; i <= n; i++) {
    let pattern = "";
    for (let star = 1; star <= i; star++) {
        pattern += "*";       // i stars on row i
    }
    for (let space = 1; space <= n - i; space++) {
        pattern += " ";       // trailing spaces
    }
    console.log(pattern);
}
```
Output:
```
*
**
***
****
```

### 2. Left-Side Descending Triangle
**File:** `78_LeftSide_Descending_Triangle_Star_Pattern__IQ.js`

```js
let n = 4;
for (let i = n; i > -1; i--) {   // stars decrease each row
    let pattern = "";
    for (let star = 1; star <= i; star++) {
        pattern += "*";           // i stars on row i
    }
    for (let space = 1; space <= n - i; space++) {
        pattern += " ";
    }
    console.log(pattern);
}
```
Output:
```
****
***
**
*
```

### 3. Pyramid (Centered)
**File:** `79_Pyramid_Star_Pattern_IQ.js`

```js
let n = 4;
for (let i = 1; i <= n; i++) {
    let pattern = "";
    for (let leftSpace = 1; leftSpace <= n - i; leftSpace++) {
        pattern += " ";           // spaces shrink
    }
    for (let star = 1; star <= 2 * i - 1; star++) {
        pattern += "*";           // 2i-1 stars: 1, 3, 5, 7
    }
    console.log(pattern);
}
```
Output:
```
   *
  ***
 *****
*******
```

**Pattern logic cheat sheet:**

| Pattern | Stars per row | Spaces per row |
|---|---|---|
| Right triangle | `i` | `n - i` |
| Descending triangle | `n - i` (or `i` counting down) | `i` |
| Pyramid | `2*i - 1` | `n - i` |

---

## Why Multi-Dimensional Arrays Matter for Playwright
- **Web tables** are the classic real-world 2D array - rows × columns of cell data.
- Looping rows/columns with nested loops mirrors table traversal in tests.
- Data-driven tests often use 2D arrays: `[browser, url, expectedText]` rows.
- The same nested-loop thinking powers grid/calendar UI automation.

---

## Quick Summary
- 2D array = array of arrays; `grid[row][col]` with 0-based indices.
- `grid.length` = rows; `grid[row].length` = columns in that row.
- Nested loops visit every cell - outer for rows, inner for columns.
- Star patterns are just nested loops with the right star/space formulas.
- Pyramid = `2*i - 1` stars; triangles = `i` or `n - i` stars.
