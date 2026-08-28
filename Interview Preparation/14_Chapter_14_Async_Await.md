# Chapter 14 - Async/Await: Interview Questions

## Basic Questions

1. **What is async/await in JavaScript?**
   - Syntactic sugar over Promises that lets you write asynchronous code that reads like synchronous code. `async` marks a function, `await` pauses it until a Promise settles.

2. **What does an `async` function always return?**
   - A **Promise**. Even if you `return` a plain value, it is automatically wrapped in a resolved Promise. If you throw inside it, the returned Promise rejects.

3. **Where can `await` be used?**
   - Only inside an `async` function (or at the top level of a module). Using it outside causes a syntax error.

4. **What happens when you `await` a Promise?**
   - The function is **paused** at that line. When the Promise settles, execution resumes and the expression evaluates to the resolved value. On rejection, the error is thrown at that line.

5. **What happens if you call an async function WITHOUT `await`?**
   - You get back a **pending Promise** immediately - the resolved value is not available yet. You must `await` it (or `.then()` it) to get the value.

6. **What is the difference between Promise chaining and async/await?**
   - Same underlying mechanism. Chaining uses `.then()`/`.catch()`; async/await uses `try/catch/finally` and reads like synchronous code. Async/await is cleaner for long sequential flows.

7. **Does `await` block the whole program?**
   - No. It only pauses the **current async function** and yields control back to the caller/event loop. The rest of the program continues running.

## Waiting for Promises (The Classic Pitfall)

8. **Why does this code print in the wrong order?**
   ```js
   async function openBrowser() {
     setTimeout(() => console.log("Open the browser"), 5000);
   }
   async function enterURL() {
     setTimeout(() => console.log("Enter the URL"), 4000);
   }
   openBrowser();
   enterURL();
   ```
   - Neither async function has an `await` inside, so both resolve **immediately**. The two timers are scheduled at the same time and fire by their own delays - `Enter the URL` (4s) prints before `Open the browser` (5s).

9. **How do you fix the order?**
   - Wrap the timer in a Promise so `await` actually waits for the work:
   ```js
   async function openBrowser() {
     await new Promise((resolve) => setTimeout(resolve, 5000));
     console.log("Open the browser");
   }
   ```
   - Now each call waits its full delay before logging, and awaiting them in sequence prints in call order.

10. **What is the mistake beginners make with `await` and `setTimeout`?**
    - Believing that `await someAsyncFunction()` waits for the `setTimeout` inside it. It only waits for the function's returned Promise - and a function with no `await` returns immediately. The timer must be wrapped: `new Promise(resolve => setTimeout(resolve, ms))`.

## Error Handling

11. **How do you handle errors in async/await?**
    - With `try/catch/finally`:
    ```js
    try {
      let data = await Promise.reject("500 Server Error");
      console.log(data);           // skipped
    } catch (error) {
      console.log("Error:", error); // Error: 500 Server Error
    } finally {
      console.log("Finally Block"); // always runs
    }
    ```

12. **When does `catch` run? When does `finally` run?**
    - `catch` runs only when the awaited Promise **rejects** (or a line inside `try` throws). `finally` runs **always** - after success or failure - and is used for cleanup.

13. **What happens if a rejected Promise is awaited with no try/catch?**
    - The rejection becomes an **unhandled rejection** - the error propagates up and can crash the process (or silently fail in browsers). Playwright tests fail with a clear unhandled rejection error.

## Sequential vs Parallel

14. **What is sequential execution with async/await?**
    - Awaiting one call at a time, each waiting for the previous:
    ```js
    let r1 = await apiCall("Login");
    let r2 = await apiCall("Dashboard");
    let r3 = await apiCall("Report");
    ```
    - Total time = **sum** of all calls (~6s for three 2s calls).

15. **What is parallel execution with async/await?**
    - Starting all independent calls together and awaiting them with `Promise.all`:
    ```js
    let [r1, r2, r3] = await Promise.all([
      apiCall("Auth Service"),
      apiCall("User Service"),
      apiCall("Payment Service"),
    ]);
    ```
    - Total time = **slowest** call (~2s for three 2s calls).

16. **When should you use sequential vs parallel?**
    - Sequential when a step needs the previous step's result (login token → dashboard → report). Parallel when steps are independent (auth check + user check + payment check).

17. **What does `Promise.all` resolve with?**
    - An **array of results in input order**. If any Promise rejects, the whole `Promise.all` rejects (fail-fast) and the `await` throws.

## Retry Pattern (Real QA)

18. **How would you retry a flaky API with async/await?**
    ```js
    async function retryTesting(operation, maxRetries) {
      for (let i = 1; i <= maxRetries; i++) {
        try {
          let result = await operation();
          console.log("PASS:", result);
          return result;                  // success → stop
        } catch (error) {
          console.log("FAIL:", error);
          if (i === maxRetries) {
            throw new Error("Test failed after " + maxRetries + " attempts");
          }
        }
      }
    }
    ```

19. **Why does `return` inside the `try` block matter in the retry loop?**
    - It exits the loop immediately on the first success, so we don't keep retrying an operation that already passed.

20. **What happens when retries are exhausted?**
    - The final `catch` **throws** an error (e.g., "Test failed after 2 attempts") so the caller knows the test failed - the failure is not silently swallowed.

21. **How does this relate to Playwright?**
    - Playwright's auto-waiting and `expect.poll()`/`toPass()` retry logic works on the same principle: try the operation, on failure retry, give up after a timeout or max attempts.

## IQ - Output Ordering (Event Loop)

22. **What is the output of this code?**
    ```js
    console.log("A");
    async function test() {
      console.log("B");
      await Promise.resolve();
      console.log("C");
    }
    test();
    console.log("D");
    ```
    **Answer:**
    ```
    A
    B
    D
    C
    ```

23. **Why does `D` print before `C`?**
    - The async function runs **synchronously up to the first `await`** (so `B` prints immediately). `await Promise.resolve()` then yields control back to the caller, and the main script finishes with `D`. The rest of the function (`C`) is scheduled as a **microtask** and runs only after the current synchronous script is done.

24. **What is the order of the event loop's background iterations?**
    - 1) Run all synchronous code → 2) drain the entire **microtask** queue (promises, `await` continuations) → 3) take one **macrotask** (timers, I/O). That's why `C` (a microtask) beats a `setTimeout` callback even if the timer was scheduled first.

25. **What's the difference between a microtask and a macrotask?**
    - Microtasks (Promise `.then`/`await`, `queueMicrotask`) run right after the current synchronous code, before the next macrotask. Macrotasks (`setTimeout`, `setInterval`, I/O) run one per event-loop iteration. Promises/`await` always beat timers.

26. **In a test, why might `console.log` output look "out of order"?**
    - Because `await` calls continue on the microtask queue. Synchronous logs (`A B D`) print first, then awaited continuations (`C`) print later - even though the code appears in a different order in the file.

## Scenario Questions

27. **Write an async function that opens a browser, logs in, and verifies the dashboard in order.**
    ```js
    async function e2eLogin() {
      try {
        await openBrowser();
        await navigateToLoginPage();
        await enterCredentials();
        await clickLoginButton();
        await verifyDashboard();
        console.log("Test PASSED");
      } catch (error) {
        console.log("Test FAILED:", error);
      } finally {
        await closeBrowser();
      }
    }
    ```

28. **How do you run three independent API checks at the same time and wait for all of them?**
    - `await Promise.all([checkAuth(), checkUser(), checkPayment()])` - all three start together; total time is the slowest one.

29. **Your API call sometimes fails. How do you make the test robust?**
    - Wrap the call in a retry loop: try up to N times, log each failure, return on first success, throw after the last attempt (see the `retryTesting` pattern).

30. **What happens if you forget `await` in Playwright code?**
    - The action is **scheduled but not waited for** - the test can move on before the click/navigation finishes, causing flaky tests, race conditions, or "element not found" errors. Always `await` Playwright API calls.

## Quick Recap for Interviews
- `async` function → always returns a Promise; `await` pauses it until the Promise settles.
- No `await` inside an async function = it resolves immediately (the setTimeout pitfall).
- Wrap timers: `new Promise(resolve => setTimeout(resolve, ms))`.
- Errors: `try/catch/finally` - `catch` on rejection, `finally` always.
- Sequential = time adds up; `Promise.all` parallel = slowest wins.
- Retry pattern: return on success, throw after maxRetries.
- Event loop order: synchronous code → microtasks (promises/await) → one macrotask (timers) → `A B D C`.
