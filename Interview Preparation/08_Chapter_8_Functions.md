# Chapter 8 - Functions: Interview Questions

## Basic Questions

1. **What is a function in JavaScript?**
   - A function is a reusable block of code designed to perform a specific task, reducing code repetition.

2. **What are the different ways to define a function?**
   - Function declaration:
     ```js
     function add(a, b) { return a + b; }
     ```
   - Function expression:
     ```js
     const add = function (a, b) { return a + b; };
     ```
   - Arrow function (ES6):
     ```js
     const add = (a, b) => a + b;
     ```

3. **What is the difference between a function declaration and a function expression?**
   - Function declarations are hoisted (can be called before definition); function expressions are not hoisted.

4. **What are parameters and arguments?**
   - Parameters are the names in the function definition; arguments are the values passed when calling the function.

5. **What does the `return` statement do?**
   - Returns a value to the caller and stops execution of the function. Without it, a function returns `undefined`.

6. **What are the four combinations of a function?**
   - No parameter / no return, no parameter / with return, with parameter / no return, with parameter / with return.

7. **What is an arrow function?**
   - A shorter ES6 syntax:
     ```js
     const square = (x) => x * x;
     ```
   - Implicit return when the body is a single expression.

8. **What is the difference between arrow functions and regular functions?**
   - Arrow functions do not have their own `this`, are not hoisted, and cannot be used as constructors.

9. **What is a callback function?**
   - A function passed as an argument to another function and executed later, e.g., `arr.forEach(callback)`.

10. **What is function hoisting?**
    - Function declarations are moved to the top of their scope, so they can be called before they appear in the code.

## Code Output Questions

11. **Output?**
    ```js
    function test() {
        return "Test";
    }
    console.log(test());
    ```
    **Answer:** `Test`

12. **Output?**
    ```js
    function printTestName(name) {
        console.log(name);
    }
    printTestName("Test Name");
    ```
    **Answer:** `Test Name`

13. **Output?**
    ```js
    function getName(name) {
        return name;
    }
    console.log(getName("Get Name"));
    ```
    **Answer:** `Get Name`

14. **Output?**
    ```js
    function printName() {
        console.log("Name:");
    }
    console.log(printName());
    ```
    **Answer:** prints `Name:` then `undefined` (no return value).

15. **Output?**
    ```js
    function add(a, b) {
        return a + b;
    }
    console.log(add(2, 3));
    ```
    **Answer:** `5`

## Scenario Questions

16. **Why are functions important in Playwright test automation?**
    - They make test steps reusable, keep tests DRY, and improve maintainability.

17. **When should you use arrow functions vs regular functions?**
    - Arrow functions for short, concise callbacks; regular functions when you need `this`, hoisting, or the function keyword syntax.

18. **What happens if you call a function with fewer arguments than parameters?**
    - Missing parameters become `undefined`.

19. **What happens if you call a function with more arguments than parameters?**
    - Extra arguments are ignored (accessible via the `arguments` object or rest parameters).

20. **What is a pure function?**
    - A function that always returns the same output for the same input and has no side effects.
