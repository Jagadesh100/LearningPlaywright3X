# Chapter 12 - Callback: Interview Questions

## Basic Questions

1. **What is a callback function in JavaScript?**
   - A function **passed as an argument** to another function, which the receiving function can **call later**:
     ```js
     function greeting(greet, callback) {
         console.log("Hello");
         callback();
     }
     function printName() {
         console.log("Jagadesh");
     }
     greeting("Good", printName); // Hello → Jagadesh
     ```

2. **Why is a callback passed WITHOUT parentheses?**
   - `greeting("Good", printName)` passes the function **reference** itself. `printName()` would execute it immediately and pass `undefined` instead.

3. **What are the three ways to pass a callback?**
   - **Named function**: `greeting("Good", printName)`
   - **Anonymous function**: `greeting("Wishes", function () {...})`
   - **Arrow function**: `greeting("Yahhoo", () => {...})` (Playwright uses this)

4. **Can an outer function pass data INTO a callback?**
   - Yes - call it with arguments: `callback(testName, status)`. The callback receives context from the outer function.

5. **What is Callback Hell?**
   - Deeply **nested callbacks** (a callback inside a callback inside a callback...) - it forms a **Pyramid of Doom** and is hard to read, debug, and maintain.

6. **What problems does Callback Hell cause?**
   - Readability drops sharply, indentation grows right, debugging is hard, and error handling at each step is painful.

7. **How is Callback Hell solved?**
   - With **Promises** (`.then()` chains flatten it) and **`async`/`await`** (sequential-looking code).

8. **Where do callbacks appear in Playwright?**
   - `test("name", async ({ page }) => {...})` - the test body is a callback the framework runs; locator actions and assertions are callback-driven too.

## Code Output Questions

9. **What is the output?**
   ```js
   function runTest(testName, callback) {
       let status = "PASS";
       callback(testName, status);
   }
   runTest("Login Test", function (name, result) {
       console.log(name + " → " + result);
   });
   ```
   **Answer:** `Login Test → PASS`

10. **What is the output?**
    ```js
    function greeting(greet, callback) {
        console.log("Hello");
        callback();
    }
    greeting("Good", printName);
    function printName() {
        console.log("Jagadesh");
    }
    ```
    **Answer:** `Hello` then `Jagadesh`

11. **What happens here and why?**
    ```js
    function greeting(greet, callback) {
        callback();
    }
    greeting("Good", printName()); // ← note the parentheses
    ```
    **Answer:** `printName()` runs **immediately** before `greeting` is even called, and `undefined` is passed as the callback → `TypeError: callback is not a function`.

12. **What is the order of output?**
    ```js
    function openBrowser(callback) {
        setTimeout(() => { console.log("Step 1"); callback(); }, 500);
    }
    function clickLogin(callback) {
        setTimeout(() => { console.log("Step 2"); callback(); }, 500);
    }
    openBrowser(() => {
        clickLogin(() => console.log("Test Complete!"));
    });
    ```
    **Answer:** after ~500ms `Step 1`, after ~1000ms `Step 2`, then `Test Complete!` - strictly sequential because each step waits for the previous callback.

13. **What is the output?**
    ```js
    step1(function () {
        step2(function () {
            step3(function () {
                console.log("Done!");
            });
        });
    });
    ```
    where each `stepN(cb)` logs its name then calls `cb()`.
    **Answer:** `step1`, `step2`, `step3`, then `Done!` - nested callbacks run in nesting order.

## Scenario Questions

14. **How would you explain a callback to a non-technical person?**
    - Like a **phone number**: you give it to someone (pass the function), and they **dial it later** (call it) when they need it.

15. **Why is arrow-function syntax preferred for callbacks in Playwright tests?**
    - Concise, no separate function name, and it preserves `this` binding - plus it matches Playwright's own examples.

16. **How do you avoid the Pyramid of Doom?**
    - Use **Promises** - replace nested callbacks with a flat `.then()` chain, or use `async`/`await` for sequential steps.

17. **In the E2E login callback-hell example, why does each step need a `setTimeout`?**
    - To simulate **asynchronous real-world delays** (browser startup, page load, network). In real automation, waiting for these steps is handled by Playwright's auto-wait.

18. **How do you handle errors in a callback chain?**
    - Each callback needs its own error handling (try/catch or error-first parameters), which is exactly why callbacks are error-prone and Promises were created.

## Quick Summary
- Callback = function passed as an argument, called later by the receiver.
- Pass the reference (no parentheses) - else it executes immediately.
- Three styles: named, anonymous, arrow.
- Outer functions can feed data into callbacks.
- Nested callbacks = Callback Hell / Pyramid of Doom - solved by Promises and `async`/`await`.
