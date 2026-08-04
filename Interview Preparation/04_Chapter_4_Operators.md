# Chapter 4 - Operators: Interview Questions

## Basic Questions

1. **What are operators in JavaScript?**
   - Operators are symbols that perform operations on operands (values/variables).

2. **What are the types of operators?**
   - Arithmetic (`+ - * / % **`), assignment (`= += -=`), comparison (`> < >= <= == === != !==`), logical (`&& || !`), increment/decrement (`++ --`), ternary (`?:`), nullish coalescing (`??`).

3. **What is the difference between `==` and `===`?**
   - `==` (loose) checks only the value, performing type coercion. `===` (strict) checks value and data type.

4. **What is the difference between `!=` and `!==`?**
   - `!=` compares values only; `!==` compares both value and type.

5. **What does the modulus operator `%` do?**
   - Returns the remainder of division, e.g., `10 % 4` -> `2`.

6. **What does the exponentiation operator `**` do?**
   - Raises the left operand to the power of the right, e.g., `10 ** 4` -> `10000`.

7. **What is the difference between post-increment `i++` and pre-increment `++i`?**
   - `i++` returns the current value, then increments. `++i` increments first, then returns the new value.

8. **What is a compound assignment operator? Give examples.**
   - Combines assignment with an operation: `a += b` means `a = a + b`. Others: `-=`, `*=`, `/=`, `%=`, `**=`.

9. **What is the ternary operator?**
   - A shorthand for `if...else`: `condition ? valueIfTrue : valueIfFalse`.

10. **What is the nullish coalescing operator `??`?**
    - Returns the right-hand value only when the left-hand value is `null` or `undefined`. `null ?? 3.25` -> `3.25`.

11. **Difference between `??` and `||`?**
    - `||` returns RHS for any falsy value (`0`, `""`, `false`, `null`, `undefined`); `??` only for `null`/`undefined`.

## Code Output Questions

12. **Output?**
    ```js
    console.log(7 == "7");
    console.log(7 === "7");
    ```
    **Answer:** `true`, `false`

13. **Output?**
    ```js
    console.log(5 != "5");
    console.log(5 !== "5");
    ```
    **Answer:** `false`, `true`

14. **Output?**
    ```js
    console.log(0 == false);
    console.log(0 === false);
    ```
    **Answer:** `true`, `false`

15. **Output?**
    ```js
    console.log(2 + "5");
    console.log(2 - "5");
    ```
    **Answer:** `"25"` (concatenation), `-3` (numeric coercion)

16. **Output?**
    ```js
    let a = 100;
    console.log(a++ + ++a + a++ + ++a);
    ```
    **Answer:** `408` (100 + 102 + 102 + 104)

17. **Output?**
    ```js
    let sub = 37;
    console.log(--sub + sub--);
    console.log(sub);
    ```
    **Answer:** `72`, `35`

18. **Output?**
    ```js
    let val = 5;
    let b = val-- - --val;
    console.log(b, val);
    ```
    **Answer:** `2 3`

19. **Output?**
    ```js
    let i = 1;
    let result = i++ > 1 ? i++ : ++i;
    console.log(result, i);
    ```
    **Answer:** `3 3`

20. **Output?**
    ```js
    let warehouseValue = null;
    let dashboardValue = warehouseValue ?? 3.25;
    console.log(dashboardValue);
    ```
    **Answer:** `3.25`

## Scenario Questions

21. **Why is `===` preferred over `==` in test automation?**
    - Strict comparison avoids unexpected type coercion bugs, making assertions predictable.

22. **You have a comma-separated string from a dropdown and need numbers. Which operators would you use?**
    - Convert with `Number()` or use arithmetic (e.g., `"5" * 1`) then compare with `===`.

23. **When would you use the `??` operator in real projects?**
    - For default values from API responses or configs where only `null`/`undefined` should trigger the fallback (so `0` or `""` are kept).
