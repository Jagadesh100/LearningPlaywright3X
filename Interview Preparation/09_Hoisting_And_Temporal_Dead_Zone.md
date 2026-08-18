# Hoisting and Temporal Dead Zone (TDZ) - Interview Questions

## Basic Questions

1. **What is hoisting in JavaScript?**
   - Hoisting is a JavaScript mechanism where variable and function **declarations** are moved to the top of their containing scope during the compile phase, before code execution.

2. **What gets hoisted - declarations or initializations?**
   - Only declarations are hoisted, not initializations (the value assignment stays in place).

3. **What is the Temporal Dead Zone (TDZ)?**
   - The period between entering a scope and the actual declaration of a `let`/`const` variable, during which the variable exists but cannot be accessed - accessing it throws a `ReferenceError`.

4. **What is the difference between how `var` and `let`/`const` are hoisted?**
   - `var` is hoisted and initialized to `undefined`. `let`/`const` are hoisted but **not initialized** - they enter the TDZ until the declaration executes.

5. **Are function declarations hoisted?**
   - Yes - the entire function (name and body) is hoisted, so it can be called before its definition in the code.

6. **Are function expressions hoisted?**
   - No - only the variable name is hoisted (`var` gives `undefined`; `let`/`const` remain in the TDZ). Calling them before definition throws an error.

7. **Are arrow functions hoisted?**
   - No - they follow the **same rules as function expressions**. A `var` arrow hoists only the name (as `undefined`, → `TypeError` when called); a `let`/`const` arrow is in the TDZ (→ `ReferenceError`). The function itself is never hoisted.

8. **Which declarations are affected by the TDZ?**
   - `let`, `const`, `class` declarations, and default parameter references to earlier parameters.

9. **What is the difference between `undefined` and a TDZ `ReferenceError`?**
   - `var` gives `undefined` (accessible, just not initialized). `let`/`const` in the TDZ throw `ReferenceError` when accessed.

## Code Output Questions

10. **What is the output?**
    ```js
    console.log(myVar);
    var myVar = 10;
    ```
    **Answer:** `undefined` (var is hoisted and initialized to undefined)

11. **What is the output?**
    ```js
    console.log(myLet);
    let myLet = 10;
    ```
    **Answer:** `ReferenceError: Cannot access 'myLet' before initialization`

12. **What is the output?**
    ```js
    printName();
    function printName() {
        console.log("Jagadesh");
    }
    ```
    **Answer:** `Jagadesh` (function declarations are fully hoisted)

13. **What is the output?**
    ```js
    greet();
    var greet = function () {
        console.log("Hi");
    };
    ```
    **Answer:** `TypeError: greet is not a function` (hoisted as undefined)

14. **What is the output?**
    ```js
    greet2();
    let greet2 = function () {
        console.log("Hi");
    };
    ```
    **Answer:** `ReferenceError: Cannot access 'greet2' before initialization`

15. **What is the output?**
    ```js
    {
        console.log(name);
        let name = "Jagadesh";
    }
    ```
    **Answer:** `ReferenceError` (name is in the TDZ)

16. **What is the output?**
    ```js
    var x = 1;
    function foo() {
        console.log(x);
        var x = 2;
    }
    foo();
    ```
    **Answer:** `undefined` (the inner `var x` is hoisted to the top of `foo`, shadowing the outer `x`)

17. **What is the output?**
    ```js
    function foo() {
        console.log(typeof y);
        let y = 5;
    }
    foo();
    ```
    **Answer:** `ReferenceError` (accessing `y` in the TDZ throws, even with `typeof`)

18. **What is the output?**
    ```js
    getStatusCode();
    var getStatusCode = () => {
        console.log("200");
    };
    ```
    **Answer:** `TypeError: getStatusCode is not a function` (var arrow hoists only the name as `undefined`)

19. **What is the output?**
    ```js
    getResult();
    const getResult = () => {
        console.log("Pass");
    };
    ```
    **Answer:** `ReferenceError: Cannot access 'getResult' before initialization` (const arrow is in the TDZ)

## Interview Questions from the Learning Directory

**File:** `08_Chapter_Functions/37_Hoisting.js`

20. **What is the core difference between `var` and `let` hoisting?**
    ```js
    console.log(num); // undefined - var hoisted + initialized to undefined
    var num = 10;

    console.log(data); // ReferenceError - let in the TDZ
    let data = "ENgage";
    ```

**File:** `08_Chapter_Functions/38_Hoisting_Functions.js`

21. **What are the three hoisting scenarios demonstrated by function expressions?**
    - Function **declarations** → fully hoisted (name + body), callable before definition.
    - `var` function **expressions** → only the variable name hoisted as `undefined`; calling throws `TypeError`.
    - `let`/`const` function **expressions** → name hoisted but in the TDZ; calling throws `ReferenceError`.

22. **What is the output?**
    ```js
    printStatusCode();
    function printStatusCode() {
        console.log("200");
    }
    ```
    **Answer:** `200` (function declarations are fully hoisted)

23. **What is the output?**
    ```js
    printfailureStatusCode();
    var failureStatusCode = function () {
        console.log("500");
    };
    ```
    **Answer:** `TypeError: printfailureStatusCode is not a function` (the `var` name is hoisted as `undefined`, so calling it fails)

24. **What is the output?**
    ```js
    failureStatusCodeClient();
    let failureStatusCodeClient = function () {
        console.log("500");
    };
    ```
    **Answer:** `ReferenceError: Cannot access 'failureStatusCodeClient' before initialization` (it is in the TDZ)

**File:** `08_Chapter_Functions/46_Hoisting_Examples.js`

25. **What does normal function hoisting look like?**
    ```js
    getStatusCode(); // Works! Prints: 200
    function getStatusCode() {
        console.log("200");
    }
    ```

**File:** `08_Chapter_Functions/47_Hoisting_Function_Expression.js` and `48_Hoisting_Arrow_Function.js`

26. **What errors do function expressions and arrow functions produce when called early?**
    - `var` + function expression / arrow → `TypeError: ... is not a function` (name hoisted as `undefined`).
    - `let`/`const` + function expression / arrow → `ReferenceError: Cannot access '...' before initialization` (TDZ).
    - Both confirm the function itself is **never hoisted** - only the variable name is.

## Scenario Questions

27. **Why does `const` need an initial value?**
    - `const` cannot be reassigned, and leaving it uninitialized would keep it in the TDZ forever - so it must be initialized at declaration.

28. **In a Playwright test, where might TDZ issues appear?**
    - Using a `let`/`const` test variable (e.g., a locator or fixture) before its declaration, or referencing a helper variable before initialization inside a test block.

29. **How do you avoid TDZ errors in your code?**
    - Declare variables at the top of their scope, always initialize `const`, and never access a variable before its declaration line.

30. **What is the difference between hoisting and the TDZ?**
    - Hoisting is the compile-time movement of declarations. The TDZ is the runtime state where a hoisted `let`/`const` variable is inaccessible until its declaration executes.

31. **Are `class` declarations hoisted?**
    - Yes, but like `let`/`const`, they are not initialized - accessing a class before its declaration throws a `ReferenceError`.

32. **What happens with default parameters and the TDZ?**
    - Default parameters are evaluated in their own scope. Referencing an earlier parameter in a later parameter's default value works, but referencing a `let`/`const` before its declaration in that scope throws a TDZ error.

33. **Why do arrow functions behave differently from function declarations at call time?**
    - Arrow functions are assigned to variables, so only the variable name can be hoisted - never the function itself. With `var` that means `undefined` (→ `TypeError`), with `let`/`const` it means TDZ (→ `ReferenceError`). Function declarations hoist the whole function, so they're callable anywhere in scope.

## Quick Recap for Interviews
- `var` -> hoisted + `undefined`
- `let`/`const` -> hoisted + TDZ (`ReferenceError` until declaration)
- Function declarations -> fully hoisted
- Function expressions -> name only, not callable early
- Arrow functions -> same as function expressions (`TypeError` with `var`, `ReferenceError` with `let`/`const`)
