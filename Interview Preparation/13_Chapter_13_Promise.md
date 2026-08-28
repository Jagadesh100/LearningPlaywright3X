# Chapter 13 - Promise: Interview Questions

## Basic Questions

1. **What is a Promise in JavaScript?**
   - An **object representing the eventual completion or failure of an asynchronous operation**, with three states: `pending`, `fulfilled` (resolved), and `rejected`.

2. **What are the three states of a Promise?**
   - **pending** - initial state, async work in progress.
   - **fulfilled** - `resolve(value)` was called.
   - **rejected** - `reject(reason)` was called.
   - Once settled (fulfilled/rejected), a promise **cannot change state again**.

3. **How do you create a Promise?**
   - `new Promise(function (resolve, reject) {...})` - the executor calls `resolve(value)` on success or `reject(reason)` on failure.

4. **What is the difference between `then`, `catch`, and `finally`?**
   - `then` - runs when the promise **resolves** (receives the value).
   - `catch` - runs when the promise **rejects** (receives the error).
   - `finally` - runs **always**, for cleanup; receives neither value nor error.

5. **What is an "unhandled promise rejection"?**
   - A rejected promise that has **no `.catch()`** attached - Node/Chrome log an error (and in some environments crash).

6. **How do Promises solve Callback Hell?**
   - `.then()` returns a promise, so chains stay **flat** instead of nesting deeper - each step's `return` hands its result (or a new promise) to the next `.then()`.

7. **What happens if you `return` a value inside `.then()`?**
   - It is wrapped in a promise and passed as the argument to the **next** `.then()` - this is what enables chaining.

8. **What happens if you `return` a Promise inside `.then()`?**
   - The next `.then()` **waits** for that promise to settle before running - this is how async steps run in order.

## Promise Combinators

9. **What does `Promise.all` do?**
   - Takes an array of promises and resolves with an **array of all values** once EVERY promise resolves. If **any** rejects, it rejects immediately (**fail-fast**) with that error - remaining results are lost.

10. **What does `Promise.allSettled` do?**
    - Waits for **all** promises to settle (resolve OR reject) and returns an array of result objects: `{status: "fulfilled", value}` or `{status: "rejected", reason}`. It **never fails**.

11. **What does `Promise.race` do?**
    - Settles with the **first** promise to settle (resolve or reject) - like a real race, only the first finisher matters. The rest are ignored.

12. **When would you use `allSettled` over `all`?**
    - When you need a **full report** (like a test suite result) instead of stopping at the first failure. `all` for "everything must pass", `allSettled` for "show me what happened to everything".

13. **How would you implement a timeout with `race`?**
    - `Promise.race([apiCall, new Promise((_, reject) => setTimeout(() => reject("Timeout"), 5000))])` - if the timeout rejects first, the race rejects.

## Code Output Questions

14. **What is the output?**
    ```js
    let apiCall = new Promise(function (resolve, reject) {
        resolve({ status: 200, body: "User Data" });
    });
    apiCall.then(function (response) {
        console.log(response.status, response.body);
    });
    ```
    **Answer:** `200 User Data`

15. **What is the output?**
    ```js
    let apiCall = new Promise(function (resolve, reject) {
        reject({ status: 500 });
    });
    apiCall.then(function (response) {
        console.log("then ran");
    }).catch(function (error) {
        console.log(error.status);
    });
    ```
    **Answer:** `500` - the `.then()` is skipped entirely on rejection; `.catch()` runs.

16. **What is the output?**
    ```js
    Promise.resolve(5)
        .then(function (val) { return val * 10; })
        .then(function (val) { console.log("Result:", val); });
    ```
    **Answer:** `Result: 50`

17. **What is the output?**
    ```js
    Promise.resolve("start")
        .then(function (val) {
            console.log(val);
            throw new Error("Broke at step 2");
        })
        .then(function () {
            console.log("This will NOT run");
        })
        .catch(function (err) {
            console.log("Caught:", err.message);
        });
    ```
    **Answer:** `start` then `Caught: Broke at step 2`. The error skips all remaining `.then()` calls and jumps straight to `.catch()`.

18. **What is the output?**
    ```js
    Promise.reject("Test failed")
        .then(function (data) { console.log("Data:", data); })
        .catch(function (err) { console.log("Error:", err); })
        .finally(function () { console.log("Cleanup done"); });
    ```
    **Answer:** `Error: Test failed` then `Cleanup done` - `.then` skipped, `.catch` runs, `.finally` always runs.

19. **What is the output?**
    ```js
    Promise.all([
        Promise.resolve("OK"),
        Promise.reject("DB DOWN"),
        Promise.resolve("OK"),
    ])
        .then(function (r) { console.log(r); })
        .catch(function (err) { console.log("Failed:", err); });
    ```
    **Answer:** `Failed: DB DOWN` - one rejection makes the whole `all` reject.

20. **What is the output?**
    ```js
    Promise.allSettled([
        Promise.resolve("API 200"),
        Promise.reject("API 500"),
        Promise.resolve("API 201"),
    ]).then(function (results) {
        results.forEach(function (r) {
            let val = r.status === "fulfilled" ? r.value : r.reason;
            console.log(r.status + " → " + val);
        });
    });
    ```
    **Answer:**
    ```
    fulfilled → API 200
    rejected → API 500
    fulfilled → API 201
    ```

21. **What is the output?**
    ```js
    let fast = new Promise(resolve => setTimeout(() => resolve("Fast 100ms"), 100));
    let slow = new Promise(resolve => setTimeout(() => resolve("Fast 500ms"), 500));
    Promise.race([fast, slow]).then(winner => console.log("Winner:", winner));
    ```
    **Answer:** `Winner: Fast 100ms` (after ~100ms)

22. **What is the output?**
    ```js
    Promise.all([
        Promise.resolve("Auth Ok"),
        Promise.resolve("DB Ok"),
        Promise.resolve("Cache Cleared"),
    ]).then(function (result) {
        console.log(result);
    });
    ```
    **Answer:** `["Auth Ok", "DB Ok", "Cache Cleared"]` - results come back **in order**, matching the input array.

## Scenario Questions

23. **Why does a rejected promise need a `.catch()`?**
    - Without it you get an **unhandled promise rejection** - the error is silently swallowed (or crashes the process in stricter environments), making tests/debugging misleading.

24. **How would you run three API checks in parallel but wait for all results?**
    - `Promise.all([checkAuth, checkDB, checkCache])` - all start together, `.then()` gets the combined result.

25. **In the real E2E login example, why does each step return a promise instead of calling a callback?**
    - Because returning a promise lets the next `.then()` **wait** for the step to finish - you get the same sequential order as the callback version, but with flat, readable code and centralized `.catch()` error handling.

26. **How does Playwright relate to Promises?**
    - Playwright's API is promise-based: `await page.click()`, `await page.goto()`. `Promise.all` powers patterns like click-and-wait-for-navigation; auto-waiting relies on promise resolution internally.

27. **What is the output of a promise that never settles?**
    - It stays `pending` forever - `.then()`/`.catch()` never run, which can cause tests to hang (e.g., a locator waiting on an event that never fires).

28. **Difference between `Promise.race` and `Promise.all`?**
    - `race` settles with the **first** result (fastest wins, success or failure). `all` waits for **every** promise and fails if any fails.

29. **Can you call `resolve` and `reject` both?**
    - The first call wins - a promise settles **once** and later calls are ignored. Whatever was called first (resolve or reject) determines the final state.

## Quick Recap for Interviews
- States: `pending` → `fulfilled` | `rejected` (settle once, forever).
- `resolve` → `.then()`, `reject` → `.catch()`, `.finally()` always runs.
- `.then()` returns a value or promise that flows to the next `.then()`.
- Errors skip all remaining `.then()` calls → jump to `.catch()`.
- `Promise.all` = fail-fast when any rejects.
- `Promise.allSettled` = full report, never fails.
- `Promise.race` = first to settle wins.
- No `.catch()` on a rejection = unhandled promise rejection.
