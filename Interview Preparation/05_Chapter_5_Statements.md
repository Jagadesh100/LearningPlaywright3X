# Chapter 5 - Statements: Interview Questions

## Basic Questions

1. **What are conditional statements?**
   - Statements that execute different blocks of code based on whether a condition is `true` or `false`.

2. **What conditional statements does JavaScript provide?**
   - `if`, `else if`, `else`, and `switch`.

3. **What is the difference between `if...else` and `switch`?**
   - `if...else` is good for ranges/complex conditions; `switch` compares a value against multiple `case` values and is cleaner for many discrete values.

4. **What are logical operators used in conditions?**
   - `&&` (AND - both must be true), `||` (OR - at least one true), `!` (NOT - inverts).

5. **What happens if no `else` is provided and the condition is false?**
   - Nothing executes; program continues to the next statement.

6. **What is a truthy/falsy value?**
   - Falsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy.

## Code Output / Logic Questions

7. **Triangle sides are 5, 5, 5. What is the type?**
   - Equilateral (all sides equal).

8. **Triangle sides are 5, 5, 3. What is the type?**
   - Isosceles (two sides equal).

9. **Triangle sides are 5, 6, 7. What is the type?**
   - Scalene (no sides equal).

10. **Is 2024 a leap year?**
    ```js
    let data = 2024;
    if (data % 4 === 0 && data % 100 !== 0) {
        console.log("YES");
    } else {
        console.log("NO");
    }
    ```
    **Answer:** `YES` (2024 % 4 == 0 and 2024 % 100 != 0).

11. **What is the output?**
    ```js
    let a = 10, b = 5;
    if (a > b && b > 0) {
        console.log("Both true");
    } else {
        console.log("At least one false");
    }
    ```
    **Answer:** `Both true`

12. **What is the output?**
    ```js
    let x = 0;
    if (x) {
        console.log("Truthy");
    } else {
        console.log("Falsy");
    }
    ```
    **Answer:** `Falsy` (0 is falsy)

## Scenario Questions

13. **Write logic to check if a number is divisible by both 3 and 5.**
    ```js
    if (num % 3 === 0 && num % 5 === 0) {
        console.log("Divisible by both");
    }
    ```

14. **Why is `else if` used instead of multiple `if` statements?**
    - `else if` ensures only one branch runs; multiple `if`s could execute more than one block.

15. **In Playwright tests, where would you use conditionals?**
    - Element visibility checks, handling optional dialogs, environment-specific test data, conditional assertions.
