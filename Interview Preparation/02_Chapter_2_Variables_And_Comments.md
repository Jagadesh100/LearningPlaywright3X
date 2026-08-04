# Chapter 2 - Variables and Comments: Interview Questions

## Basic Questions

1. **What are variables in JavaScript?**
   - Variables are named containers used to store data/values in a program.

2. **What are the three ways to declare a variable in JavaScript?**
   - `var`, `let`, and `const`.

3. **What is the difference between `var`, `let`, and `const`?**

   | Keyword | Reassign | Redeclare | Scope      |
   |---------|----------|-----------|------------|
   | `var`   | Yes      | Yes       | Function   |
   | `let`   | Yes      | No        | Block `{}` |
   | `const` | No       | No        | Block `{}` |

4. **What is the scope of `var`?**
   - Function scoped - accessible anywhere inside the function where it is declared, even in nested blocks.

5. **What is block scope?**
   - Variables declared with `let`/`const` are limited to the `{}` block in which they are declared.

6. **What happens if you try to reassign a `const` variable?**
   - It throws a `TypeError: Assignment to constant variable`.

7. **What happens if you try to redeclare a `let` variable in the same scope?**
   - It throws a `SyntaxError`.

8. **Can you declare a variable without a value?**
   - Yes - its value will be `undefined`.

9. **What is hoisting?**
   - JavaScript moves variable and function declarations to the top of their scope. `var` is hoisted with `undefined`; `let`/`const` are hoisted but not initialized (Temporal Dead Zone).

10. **What is the difference between `null` and `undefined`?**
    - `null` is an assigned empty value (type `object`); `undefined` means a variable is declared but has no value.

## Code Output Questions

11. **What is the output?**
    ```js
    var a = 10;
    var a = 20;
    console.log(a);
    ```
    **Answer:** `20` (var can be redeclared)

12. **What is the output?**
    ```js
    let b = 5;
    b = 8;
    console.log(b);
    ```
    **Answer:** `8` (let can be reassigned)

13. **What is the output?**
    ```js
    const c = 3.14;
    console.log(c);
    ```
    **Answer:** `3.14`

14. **What is the output?**
    ```js
    var x = "24";
    console.log(typeof x);
    ```
    **Answer:** `string`

15. **What is the output of `typeof null`?**
    **Answer:** `object` (a famous JavaScript quirk)

## Scenario Questions

16. **Which declaration should you use in modern JavaScript and why?**
    - `let` and `const` (ES6) - they are block scoped, safer, and prevent accidental redeclaration. Use `const` by default and `let` when reassignment is needed.

17. **You declare `let i = 0;` inside a `for` loop. Can you access `i` outside the loop?**
    - No - `let` is block scoped to the loop.

18. **What is the Temporal Dead Zone (TDZ)?**
    - The period between entering a scope and the actual declaration of a `let`/`const` variable where accessing it throws a `ReferenceError`.

19. **How do you write single-line and multi-line comments?**
    ```js
    // single line

    /*
     * multi
     * line
     */
    ```

20. **Should comments be avoided in production code?**
    - Comments should explain the "why", not the obvious "what". Meaningful comments improve maintainability.

## Scope Deep Dive (from `41_Scope_Of_Variables.js`)

21. **What is the output of this code?**
    ```js
    const num = 10;
    function numbers() {
        const num = 20;
        if (true) {
            const num = 30;
            console.log("Block: " + num);
        }
        console.log("Outside block: " + num);
    }
    numbers();
    console.log("Outside: " + num);
    ```
    **Answer:** `Block: 30`, then `Outside block: 20`, then `Outside: 10` — each `const num` shadows the outer one, and the global `num` is untouched.

22. **What is the difference between function scope and block scope?**
    - **Function scope** (`var`): the variable is visible anywhere inside its function, even inside nested `{}` blocks.
    - **Block scope** (`let`/`const`): the variable is visible only inside the nearest `{}` block it was declared in.

23. **What is variable shadowing?**
    - Declaring a variable with the same name in an inner scope. The inner variable takes precedence inside that scope, hiding the outer one — but the outer variable still exists and is untouched.

24. **What is the output?**
    ```js
    if (true) {
        var a = 10;
    }
    console.log(a);
    ```
    **Answer:** `10` — `var` is function scoped, so it leaks out of the `if` block.

25. **What is the output?**
    ```js
    if (true) {
        let b = 10;
    }
    console.log(b);
    ```
    **Answer:** `ReferenceError: b is not defined` — `let` is block scoped, so `b` does not exist outside the `if` block.

26. **In a Playwright test, why should you prefer `let`/`const` over `var`?**
    - Test variables (locators, page objects, expected values) stay contained within their block, avoiding accidental leaks between tests and hard-to-find bugs from `var` escaping loops or conditionals.
