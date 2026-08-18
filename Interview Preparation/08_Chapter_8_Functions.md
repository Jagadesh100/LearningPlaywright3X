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
   - Single-line arrows have implicit return; multi-line arrows need `{}` and explicit `return`.
   - Zero parameters still need parentheses: `const getEnv = () => "Pre-Prod";`

9. **What is a callback function?**
   - A function passed as an argument to another function and executed later, e.g., `arr.forEach(callback)`.

10. **What is function hoisting?**
    - Function declarations are moved to the top of their scope, so they can be called before they appear in the code.

11. **What is a function expression?**
    - A function stored in a variable (anonymous):
      ```js
      const printStatus = function (status) {
          console.log(status);
      };
      ```
    - Not hoisted - must be defined before calling.

12. **What is an IIFE (Immediately Invoked Function Expression)?**
    - A function that calls itself the moment it is defined:
      ```js
      (function () {
          console.log("Hello Tester");
      })();
      ```
    - Useful for one-time setup code in a private scope (variables don't leak to global).

13. **What are default parameters?**
    - Parameters that take a default value if no argument is passed:
      ```js
      function printScore(playerName, score = 75, status = "Not Out") { ... }
      printScore("Jagadesh"); // score=75, status="Not Out"
      ```

14. **What are rest parameters?**
    - Collect multiple arguments into an array with `...` - must be the **last** parameter:
      ```js
      function sum(testName, ...val) {
          return val.reduce((a, b) => a + b);
      }
      sum("Test 1", 1, 2, 3, 4, 3); // 13
      ```

15. **What is the spread operator?**
    - Expands an iterable (array, string, object) into individual elements - the opposite of rest:
      ```js
      const copy = [...arr];                 // copy array
      const combined = [...a, ...b];         // merge arrays
      Math.max(...nums);                     // spread into function call
      const person = { ...obj1, ...obj2 };   // merge objects
      const chars = [..."hello"];            // ['h','e','l','l','o']
      ```

16. **What is the difference between rest and spread?**
    - Rest **collects** values into an array (function parameters). Spread **expands** an iterable into values (arrays, objects, calls).

17. **What is function scope?**
    - Variables declared inside a function are local to it. Inner functions can read outer scope; outer code cannot access inner local variables.

18. **What is a closure?**
    - An inner function that **remembers** its outer function's variables even after the outer function has returned:
      ```js
      function outer(name) {
          let message = "Hello";
          function inner() {
              console.log(`${message} ${name}`);
          }
          return inner;
      }
      let greet = outer("Username");
      greet(); // "Hello Username"
      ```

19. **How do closures create private state?**
    - The `makeCounter` pattern - `count` is closed over and only accessible via returned methods:
      ```js
      function makeCounter(start = 0) {
          let count = start;
          return {
              increment() { count++; },
              decrement() { count--; },
              get() { return count; },
          };
      }
      ```

20. **What is the shallow copy gotcha with spread?**
    - Spread copies top-level properties only. Nested objects are still **shared by reference**:
      ```js
      const nested = { list: [1, 2] };
      const nestedCopy = { ...nested };
      nestedCopy.list.push(3);
      console.log(nested.list); // [1, 2, 3] - shared!
      ```

21. **How does hoisting differ for the three function types?**
    - Function declarations: fully hoisted (name + body).
    - `var` function expressions/arrows: name hoisted as `undefined` → `TypeError` when called early.
    - `let`/`const` function expressions/arrows: in the TDZ → `ReferenceError` when called early.

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

16. **Output?**
    ```js
    const getEnv = () => `Pre-Prod`;
    console.log(getEnv());
    ```
    **Answer:** `Pre-Prod` (single-line arrow with implicit return)

17. **Output?**
    ```js
    const calculator = (n) => n * 2;
    console.log(calculator(5));
    ```
    **Answer:** `10`

18. **Output?**
    ```js
    function printScore(playerName, score = 75, status = "Not Out") {
        console.log(`${playerName}: ${score} ${status}`);
    }
    printScore("Jagadesh");
    printScore("Ragavan", 72, "Out");
    ```
    **Answer:** `Jagadesh: 75 Not Out` then `Ragavan: 72 Out` (defaults fill missing args)

19. **Output?**
    ```js
    function sum(...val) {
        return val.reduce((a, b) => a + b);
    }
    console.log(sum(1, 2, 3, 4));
    ```
    **Answer:** `10` (rest collects all args into an array)

20. **Output?**
    ```js
    const a = [1, 2, 3];
    const copy = [...a];
    copy.push(4);
    console.log(a.length);
    ```
    **Answer:** `3` (spread made an independent copy; pushing to copy doesn't affect original)

21. **Output?**
    ```js
    function outer(name) {
        let message = "Hello";
        function inner() {
            console.log(`${message} ${name}`);
        }
        return inner;
    }
    let greet = outer("Username");
    greet();
    ```
    **Answer:** `Hello Username` (closure remembers `message` and `name` after `outer` returns)

22. **Output?**
    ```js
    function makeCounter() {
        let count = 0;
        return {
            increment() { count++; },
            get() { return count; },
        };
    }
    let counter = makeCounter();
    counter.increment();
    counter.increment();
    console.log(counter.get());
    ```
    **Answer:** `2` (private `count` persists across calls via closure)

23. **Output?**
    ```js
    (function () {
        console.log("IIFE ran");
    })();
    console.log("After");
    ```
    **Answer:** `IIFE ran` then `After` (IIFE executes immediately at definition)

24. **Output?**
    ```js
    let message = "Global";
    function localScope() {
        let name = "local";
        console.log(message);
    }
    localScope();
    console.log(name);
    ```
    **Answer:** `Global` then `ReferenceError` (`name` is local to the function)

25. **Output?**
    ```js
    const nums = [5, 10, 15];
    console.log(Math.max(...nums));
    ```
    **Answer:** `15` (spread expands array into arguments)

## Scenario Questions

26. **Why are functions important in Playwright test automation?**
    - They make test steps reusable, keep tests DRY, and improve maintainability.

27. **When should you use arrow functions vs regular functions?**
    - Arrow functions for short, concise callbacks; regular functions when you need `this`, hoisting, or the function keyword syntax.

28. **What happens if you call a function with fewer arguments than parameters?**
    - Missing parameters become `undefined`.

29. **What happens if you call a function with more arguments than parameters?**
    - Extra arguments are ignored (accessible via the `arguments` object or rest parameters).

30. **What is a pure function?**
    - A function that always returns the same output for the same input and has no side effects.

31. **When would you use an IIFE in a test setup?**
    - For one-time initialization that shouldn't pollute the global scope - e.g., seeding test data or setting up environment config at load time.

32. **How would you use rest parameters in a test helper?**
    - To accept a variable number of arguments, e.g., a helper that logs any number of values or a function that sums an arbitrary list of test scores.

33. **Why is the shallow copy gotcha important when building test configs?**
    - Spreading a config object copies top-level settings, but nested objects (like a `testUser` or `headers` object) are still shared - mutating a nested value in the copy changes the original, causing cross-test contamination.

34. **Where do closures appear in real test automation?**
    - Stateful helpers (counters, retry trackers), fixtures that capture values, and page-object methods that remember instance state between calls.

35. **How does spread help build environment-specific Playwright configs?**
    - Merge base config with per-environment overrides - later keys win:
      ```js
      const base = { browser: "Chrome", timeout: 3000 };
      const staging = { ...base, baseURL: "https://staging.example.com" };
      ```
