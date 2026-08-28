# Chapter 11 - Multi-Dimensional Arrays: Interview Questions

## Basic Questions

1. **What is a multi-dimensional array?**
   - An **array of arrays** - a grid of data organized in **rows × columns** (2D array):
     ```js
     let scores = [
         [20, 78, 90],
         [64, 74, 83],
         [89, 98, 78],
     ];
     ```

2. **How do you access a specific element in a 2D array?**
   - `grid[row][col]` - both indices are **0-based**. `grid[row]` gives the inner array, `[col]` picks the element.

3. **How do you get the number of rows and columns?**
   - Rows: `grid.length`
   - Columns: `grid[row].length` (rows can have **different lengths** - ragged arrays)

4. **What happens if you access an out-of-bounds index?**
   - You get `undefined` (arrays don't throw on out-of-bounds reads).

5. **How do you loop through every element of a 2D array?**
   - With a **nested loop** - outer loop for rows, inner loop for columns:
     ```js
     for (let row = 0; row < scores.length; row++) {
         for (let col = 0; col < scores[row].length; col++) {
             console.log(scores[row][col]);
         }
     }
     ```

6. **What is a "ragged" (jagged) 2D array?**
   - One where inner arrays have different lengths - still valid in JavaScript:
     ```js
     let arr = [
         [1, 2],
         [1, 2, 3, 4],
         [1],
     ];
     ```

7. **How do star patterns relate to 2D arrays?**
   - Both use **nested loops**. Star patterns print spaces and stars with formulas instead of array values.

8. **What is the formula for a pyramid's stars per row?**
   - `2 * i - 1` stars on row `i` (row 1 → 1, row 2 → 3, row 3 → 5...).

9. **What is the formula for spaces in a pyramid?**
   - `n - i` spaces before the stars on row `i`.

## Code Output Questions

10. **Output?**
    ```js
    let scores = [
        [20, 78, 90],
        [64, 74, 83],
        [89, 98, 78],
    ];
    console.log(scores[2][1]);
    console.log(scores[0][2]);
    ```
    **Answer:** `98` then `90`

11. **Output?**
    ```js
    let scores = [
        [20, 78, 90],
        [64, 74, 83, 34],
        [89, 98, 78],
    ];
    console.log(scores.length);
    console.log(scores[1].length);
    ```
    **Answer:** `3` (rows) then `4` (columns in row 1)

12. **Output?**
    ```js
    let arr = [[1, 2], [3, 4]];
    console.log(arr[0][0] + arr[1][1]);
    ```
    **Answer:** `5` (1 + 4)

13. **Output?**
    ```js
    let matrix = [
        [1, 2, 3],
        [4, 5, 6],
    ];
    let sum = 0;
    for (let row of matrix) {
        for (let col of row) {
            sum += col;
        }
    }
    console.log(sum);
    ```
    **Answer:** `21` (1+2+3+4+5+6)

14. **What does this print?**
    ```js
    let n = 4;
    for (let i = 1; i <= n; i++) {
        let pattern = "";
        for (let star = 1; star <= i; star++) pattern += "*";
        console.log(pattern);
    }
    ```
    **Answer:**
    ```
    *
    **
    ***
    ****
    ```

15. **What does this print?**
    ```js
    let n = 3;
    for (let i = 1; i <= n; i++) {
        let pattern = "";
        for (let space = 1; space <= n - i; space++) pattern += " ";
        for (let star = 1; star <= 2 * i - 1; star++) pattern += "*";
        console.log(pattern);
    }
    ```
    **Answer:**
    ```
      *
     ***
    *****
    ```

## Scenario Questions

16. **How do you find the maximum value in a 2D array?**
    ```js
    let max = -Infinity;
    for (let row of matrix) {
        for (let val of row) {
            if (val > max) max = val;
        }
    }
    ```

17. **How would you print a web table's data in Playwright?**
    - Tables are the real-world 2D array. Use nested loops:
      ```js
      for (let row = 0; row < rows.length; row++) {
          for (let col = 0; col < cells.length; col++) {
              console.log(rows[row].cells[col].innerText);
          }
      }
      ```

18. **How do you transpose a matrix?**
    ```js
    // rows become columns
    let transposed = matrix[0].map((_, col) => matrix.map(row => row[col]));
    ```

19. **How would you use a 2D array for data-driven tests?**
    ```js
    const testData = [
        ["Chrome", "https://example.com", "Login"],
        ["Edge", "https://example.com", "Login"],
    ];
    // each row drives one test iteration
    ```

20. **What is the time complexity of nested loop traversal?**
    - O(rows × cols) - every cell is visited exactly once.

21. **How do you check if a 2D array is a square matrix?**
    - Check `grid.length === grid[0].length` and every row has the same length.

## Quick Summary
- 2D array = array of arrays; access with `grid[row][col]` (0-based).
- `grid.length` = rows; `grid[row].length` = columns.
- Nested loops = the standard traversal; outer rows, inner columns.
- Star patterns are nested-loop formulas: triangle `i`, descending `n-i`, pyramid `2*i-1`.
- Tables in automation are 2D arrays in disguise.
