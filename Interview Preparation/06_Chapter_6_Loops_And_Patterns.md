# Chapter 6 - Loops and Pattern Programs: Interview Questions

## Basic Questions

1. **What are loops?**
   - Loops repeatedly execute a block of code until a given condition becomes false.

2. **What are the loop types in JavaScript?**
   - `for`, `while`, `do...while`.

3. **What is the difference between `while` and `do...while`?**
   - `do...while` executes the body at least once before checking the condition; `while` checks the condition first and may never execute.

4. **What is the difference between `for` and `while`?**
   - `for` is best when the number of iterations is known (initialization, condition, increment in one place); `while` is best when iterations depend on a condition.

5. **Can you break out of a loop?**
   - Yes - `break` exits the loop; `continue` skips the current iteration.

6. **What is an infinite loop? How do you avoid it?**
   - A loop whose condition never becomes false. Ensure the condition is updated inside the loop (e.g., increment counter).

7. **What is a nested loop?**
   - A loop inside another loop - the outer loop controls rows, inner loop controls columns/stars in pattern programs.

## Code Output Questions

8. **Output?**
    ```js
    let sum = 0;
    for (let i = 1; i <= 5; i++) {
        sum += i;
    }
    console.log(`Sum:${sum}`);
    ```
    **Answer:** `Sum:15`

9. **Output?**
    ```js
    let i = 0;
    while (i < NaN) {
        i++;
    }
    console.log(`i:${i}`);
    ```
    **Answer:** `i:0` (any comparison with NaN is false, loop never runs)

10. **Output?**
    ```js
    let i = 3, count = 0;
    do {
        count++;
    } while (i-- > 0);
    console.log(count + " " + i);
    ```
    **Answer:** `4 -1`
    - Runs for i = 3, 2, 1, 0 (4 iterations); after the last check `i` decrements to `-1`.

11. **How many stars does a pyramid of `n = 7` print in the last row?**
    - `2 * 7 - 1 = 13` stars.

12. **What does `Math.round(n / 2)` do in the diamond pattern?**
    - Splits the diamond into an upper and lower pyramid of roughly equal height.

## Pattern Logic Questions

13. **Write the logic for a square pattern of size 5.**
    ```js
    let n = 5;
    for (let row = 1; row <= n; row++) {
        let pattern = "";
        for (let star = 1; star <= n; star++) {
            pattern += "*";
        }
        console.log(pattern);
    }
    ```

14. **Write the logic for a right triangle of `n` rows.**
    ```js
    let n = 5;
    for (let row = 1; row <= n; row++) {
        let pattern = "";
        for (let star = 1; star <= row; star++) {
            pattern += "*";
        }
        console.log(pattern);
    }
    ```

15. **How do you print a left-aligned (right-angled at left) triangle?**
    - Print `n - row` spaces first, then `row` stars.

16. **How do you print an inverted pattern?**
    - Run the outer loop from `row = n` down to `row = 1`.

17. **How do you print only the border of a square (hollow square)?**
    - Print `*` only when `row === 0 || row === n - 1 || col === 0 || col === n - 1`, else print a space.

18. **How many stars does the `row`-th pyramid row contain?**
    - `2 * row - 1`.

## Scenario Questions

19. **You need to wait for a page element in Playwright. Which loop concept is used?**
    - A `while` loop (or `expect.poll`/retry logic) that checks the condition repeatedly until timeout.

20. **How do you iterate over an array? Which loop is best?**
    - `for`, `for...of`, or `forEach`; `for...of` is clean and direct for values.
