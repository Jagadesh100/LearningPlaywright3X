# Chapter 3 - Identifiers and Literals: Interview Questions

## Basic Questions

1. **What is an identifier in JavaScript?**
   - An identifier is a name given to variables, functions, classes, and other user-defined entities. It is the name of the container that holds a value.

2. **What are the rules for naming identifiers?**
   - Must start with a letter, `_`, or `$`.
   - Can contain letters, digits, `_`, and `$`.
   - Cannot start with a digit.
   - Cannot contain spaces.
   - Cannot be a reserved keyword (`if`, `for`, `class`, etc.).
   - Case sensitive - `ABC` and `abc` are different.

3. **Are identifiers case sensitive?**
   - Yes.

4. **Can you use reserved keywords as identifiers?**
   - No.

5. **What is a literal?**
   - A literal is a fixed value written directly in the code that represents actual data.

6. **What are the types of literals in JavaScript?**
   - Number literals (`1`, `2.5`), string literals (`"abc"`), boolean literals (`true`/`false`), null literal (`null`), undefined literal (`undefined`).

7. **Can JavaScript identifiers use Unicode characters?**
   - Yes, JavaScript supports Unicode identifiers (e.g., Tamil characters).

## Code Output Questions

8. **Which of these are valid identifiers?**
   ```js
   var ABC = 10;    // valid
   var 1ad = 10;    // invalid - starts with digit
   var _abc = 10;   // valid
   var $ = 9;       // valid
   var ab db = 10;  // invalid - space
   var if = 19;     // invalid - reserved keyword
   ```
   **Answer:** `ABC`, `_abc`, `$` are valid; `1ad`, `ab db`, `if` are invalid.

9. **What is the output?**
   ```js
   console.log(typeof null);
   ```
   **Answer:** `object`

10. **What is the output?**
    ```js
    console.log(typeof undefined);
    ```
    **Answer:** `undefined`

11. **What is the output?**
    ```js
    var rupee = undefined;
    console.log(typeof rupee);
    ```
    **Answer:** `undefined`

12. **What is the output?**
    ```js
    var purchase = null;
    console.log(typeof purchase);
    ```
    **Answer:** `object`

## Scenario Questions

13. **Why does `typeof null` return `"object"`?**
    - A historical bug in the original JavaScript implementation that has been kept for backward compatibility.

14. **In your test automation code, why use meaningful identifiers?**
    - Descriptive names like `loginButton`, `userNameField` make test scripts readable and maintainable.

15. **What is the difference between a literal and a variable?**
    - A literal is a fixed value (e.g., `10`, `"test"`); a variable is a named container that stores a value and can change.
