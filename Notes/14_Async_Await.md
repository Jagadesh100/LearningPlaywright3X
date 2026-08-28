# Chapter 14 - Async/Await

## What is Async/Await?

> Async/Await is **syntactic sugar over Promises** - it lets you write asynchronous code that reads like synchronous code. `async` functions always return a Promise, and `await` pauses the function until that Promise settles.

**File:** `14_chapter_Async-Await/95_Async_Await.js`

```js
async function getStatus() {
  return Promise.resolve({ status: 200 });
}

// async function since it returns promise
console.log("Call get Status");
console.log(await getStatus()); // promise resolves and received status : 200
console.log(getStatus()); // Promise is pending without use of await keyword
```

**Key facts:**
- An `async` function **always returns a Promise**, no matter what you `return` inside it.
- `await` can ONLY be used inside an `async` function (or at the top level of a module).
- `await` **pauses** execution of the function until the promise settles, then resumes with the resolved value.
- Without `await`, calling an async function returns a **pending** promise - you must wait for it to get the value.

### Async Function Flow

```
  async function getStatus()
        │
        ▼
  ┌───────────────────────────────┐
  │ return Promise.resolve(...)   │
  └───────────────┬───────────────┘
                  ▼
  ┌───────────────────────────────┐
  │ Async fn ALWAYS returns a     │
  │ Promise (auto-wrapped)        │
  └───────────────┬───────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
  ┌──────────────┐   ┌──────────────┐
  │ await it     │   │ don't await  │
  │ → resolved   │   │ → PENDING    │
  │   value 200  │   │   Promise    │
  └──────────────┘   └──────────────┘
```

---

## Waiting for Promises - The Fix

**File:** `14_chapter_Async-Await/96_Async_Await_2.js`

**The problem:** an `async` function with NO `await` inside it resolves **immediately**. If you `await` such a function, you get back right away - you haven't actually waited for the `setTimeout`.

```js
// ❌ WRONG - setTimeout is scheduled but never awaited
async function openBrowser() {
  setTimeout(() => {
    console.log(`Open the browser`);
  }, 5000);
}
```

Calling `openBrowser(); enterURL(); ...` fires **all five timers at once** - the logs come out in timer-duration order, not call order:

```
Enter Credentials        (2s)
Navigate to Login Page   (3s)
Click Login Button       (3s)
Enter URL                (4s)
Open Browser             (5s)
```

**The fix:** wrap the timer in a Promise and `await` it:

```js
// ✅ CORRECT - the function now actually waits 5s
async function openBrowser() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Open the browser`);
}
```

### Wrong vs Correct Flow

```
  ❌ WITHOUT await inside
  ┌─────────────────────────────────────────────┐
  │ openBrowser()  → schedules 5s timer,        │
  │                 returns resolved promise    │
  │                 IMMEDIATELY                 │
  │ enterURL()     → schedules 4s timer,        │
  │                 returns immediately         │
  │ ...                                          │
  │ ALL timers start at the SAME time           │
  │ → logs appear in timer-order, NOT call order│
  └─────────────────────────────────────────────┘

  ✅ WITH await new Promise(...)
  ┌─────────────────────────────────────────────┐
  │ openBrowser()  → waits 5s, THEN logs        │
  │ enterURL()     → waits 5s, THEN logs        │
  │ ...                                          │
  │ each step WAITS for the previous one        │
  │ → logs appear in call order                 │
  └─────────────────────────────────────────────┘
```

**Key idea:** `await` only helps when the thing you're awaiting is a promise that resolves **when the work is done**. A bare `setTimeout` doesn't tell the caller when it finished - wrap it in `new Promise(resolve => setTimeout(resolve, ms))`.

---

## Error Handling with try/catch/finally

**File:** `14_chapter_Async-Await/97_Error_Handling.js`

`async`/`await` error handling mirrors synchronous `try/catch/finally` - no `.catch()` chains needed.

```js
try {
  let request = await Promise.reject(`500 Server Error`);
  console.log(`Result:` + request);      // skipped
} catch (error) {
  console.log(`Error: ` + error);        // Error: 500 Server Error
} finally {
  console.log(`Finally Block`);          // always runs
}

try {
  let request = await Promise.resolve(`200 Success`);
  console.log(`Result:` + request);      // Result: 200 Success
} catch (error) {
  console.log(`Error: ` + error);        // skipped
} finally {
  console.log(`Finally Block`);          // always runs
}
```

### try/catch/finally Decision Flow

```
  await somePromise()
        │
        ▼
  ┌───────────────────────────────┐
  │ Did the promise reject?       │
  └───────┬───────────────┬───────┘
          ▼               ▼
      YES (reject)    NO (resolve)
          │               │
          ▼               ▼
  ┌──────────────┐  ┌──────────────┐
  │ catch block  │  │ try body     │
  │ runs - logs  │  │ continues -  │
  │ the error    │  │ logs result  │
  └──────┬───────┘  └──────┬───────┘
         └────────┬────────┘
                  ▼
          ┌──────────────┐
          │ finally      │
          │ ALWAYS runs  │
          └──────────────┘
```

**Key facts:**
- `catch` runs ONLY on rejection - the code after a rejected `await` is skipped.
- `finally` runs **always** - perfect for cleanup (closing browser, clearing test state).
- This is the async/await equivalent of `.then().catch().finally()` from Chapter 13.

---

## Sequential Execution (One After Another)

**File:** `14_chapter_Async-Await/98_Sequential_Execution.js`

When each step depends on the previous one, `await` them **one at a time**. Total time = sum of all steps.

```js
function apiCall() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("200 OK");
    }, 2000);
  });
}

async function sequentialTest() {
  console.log("Starting of the Test");

  let start = Date.now();

  let r1 = await apiCall("Login");      // waits 2s
  console.log(r1);

  let r2 = await apiCall("Dashboard");  // waits another 2s
  console.log(r2);

  let r3 = await apiCall("Report");     // waits another 2s
  console.log(r3);

  console.log("Time: ~" + (Date.now() - start) + "ms"); // ~6000ms
}

sequentialTest();
```

### Sequential Flow

```
  start ──► apiCall("Login")
              │  waits 2s
              ▼
           console.log("200 OK")
              │
              ▼
  ──► apiCall("Dashboard")
              │  waits 2s
              ▼
           console.log("200 OK")
              │
              ▼
  ──► apiCall("Report")
              │  waits 2s
              ▼
           console.log("200 OK")
              │
              ▼
      Total time ≈ 6s (2+2+2)
```

**Key idea:** sequential = **total time adds up**. Use it when step 2 needs step 1's result (e.g., login token before dashboard call).

---

## Parallel Execution (All at Once)

**File:** `14_chapter_Async-Await/99_Parallel_Execution.js`

When steps are **independent**, start them all at once with `Promise.all` and await the combined result. Total time = slowest step.

```js
function apiCall(request) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(request);
    }, 2000);
  });
}

async function parallelTest() {
  console.log("Starting of the Test");

  let start = Date.now();

  let [r1, r2, r3] = await Promise.all([
    apiCall("Auth Service"),
    apiCall("User Service"),
    apiCall("Payment Service"),
  ]);

  console.log(r1);
  console.log(r2);
  console.log(r3);

  console.log("Time: ~" + (Date.now() - start) + "ms"); // ~2000ms
}

parallelTest();
```

### Parallel Flow

```
          ┌─► apiCall("Auth Service")    ─┐
          │      waits 2s                  │
          ├─► apiCall("User Service")   ──┼──► all start at the SAME time
          │      waits 2s                  │
          └─► apiCall("Payment Service") ─┘
                                            │
                                            ▼
                            Promise.all resolves when ALL finish
                                            │
                                            ▼
                    [ "Auth Service", "User Service", "Payment Service" ]
                                            │
                                            ▼
                              Total time ≈ 2s (slowest, not 6s)
```

**Key idea:** parallel = **slowest step wins**. All three run concurrently; `Promise.all` resolves with an **array in input order**. Total time ~2s, not 6s.

### Sequential vs Parallel Comparison

| | Sequential | Parallel |
|---|---|---|
| **How** | `await` one at a time | `Promise.all([...])` |
| **Time (3 × 2s calls)** | ~6s | ~2s |
| **Use when** | Step needs previous result | Steps are independent |
| **QA example** | Login → Dashboard → Report | Auth + User + Payment checks |

---

## Flaky API Retry Pattern (Real QA)

**Files:** `14_chapter_Async-Await/100_Flaky_APITest.js`, `14_chapter_Async-Await/101_Real_QA.js`

A flaky API fails sometimes. Real QA code retries the operation a set number of times before giving up.

### 100 - Simple retry loop

```js
let attempt = 0;
function flakyAPI() {
  attempt++;
  if (attempt <= 3) {
    return Promise.resolve("Attempt:" + attempt + " Success");
  } else {
    return Promise.reject("Attempt:" + attempt + " Failed");
  }
}

async function retryTesting(maxRetries) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      let apiTest = await flakyAPI();
      console.log(`Pass ` + apiTest);
    } catch (error) {
      console.log(error);
    }
  }
}

retryTesting(5);
```

### 101 - Retry with pass/fail decision

```js
function createFlakyAPI(successAttempt) {
  let attempt = 0;

  return function () {
    attempt++;
    if (attempt < successAttempt) {
      return Promise.reject("Attempt " + attempt + ": failed");
    }
    return Promise.resolve("Attempt " + attempt + ": success!");
  };
}

async function retryTesting(operation, maxRetries) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      let result = await operation();
      console.log('PASS:', result);
      return result;                       // success → stop retrying
    } catch (error) {
      console.log('FAIL:', error);
      if (i === maxRetries) {
        throw new Error("Test failed after " + maxRetries + " attempts");
      }
    }
  }
}

async function runRetryExamples() {
  console.log("Example 1: succeeds within the retry limit");
  await retryTesting(createFlakyAPI(3), 5);  // PASS on attempt 3

  console.log("Example 2: exhausts the retry limit");
  try {
    await retryTesting(createFlakyAPI(4), 2); // FAILS - only 2 retries given
  } catch (error) {
    console.log(error.message);
  }
}

runRetryExamples();
```

### Retry Loop Flow

```
  start retryTesting(operation, maxRetries)
        │
        ▼
  for attempt i = 1 to maxRetries
        │
        ▼
  ┌─────────────────────────────┐
  │ try:  await operation()     │
  └──────────────┬──────────────┘
                 │
      ┌──────────┴──────────┐
      ▼                     ▼
  resolved              rejected
      │                     │
      ▼                     ▼
  ┌──────────┐        ┌───────────────────────┐
  │ PASS:    │        │ FAIL: log error       │
  │ log +    │        │ i == maxRetries?      │
  │ return   │        └───────────┬───────────┘
  │ (done)   │              ┌─────┴─────┐
  └──────────┘              ▼           ▼
                        YES          NO
                          │           │
                          ▼           ▼
                   throw Error   loop again
                   "Test failed  (next attempt)
                   after N
                   attempts"
```

**Key ideas:**
- `return` inside the `try` on success **stops the retry loop** immediately.
- `catch` decides: if we've hit `maxRetries`, **throw** so the caller knows the test failed; otherwise **retry**.
- This is exactly how Playwright's built-in auto-retry/`expect.poll()` style patterns work under the hood.

---

## IQ - Output Ordering (The Event Loop / Background Iteration)

**File:** `14_chapter_Async-Await/102_IQ.js`

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

### Expected Output

```
A
B
D
C
```

### Why? - Background Iteration Step by Step

```
  ┌────────────────────────────────────────────────────────────┐
  │ 1. console.log("A")        → synchronous → prints "A"      │
  │                                                           │
  │ 2. test() is CALLED:                                      │
  │    • runs SYNCHRONOUSLY up to the first await             │
  │    • console.log("B")      → prints "B"                   │
  │    • await Promise.resolve() → yields control back!       │
  │    • the rest ("C") is scheduled for the microtask queue  │
  │                                                           │
  │ 3. test() yields → main script continues                  │
  │    • console.log("D")      → prints "D"                   │
  │                                                           │
  │ 4. main script done → event loop drains the microtask     │
  │    queue (background iteration):                          │
  │    • resumes test() after await                           │
  │    • console.log("C")      → prints "C"                   │
  └────────────────────────────────────────────────────────────┘

  Output:  A → B → D → C
```

### Visual - Where each line executes

```
  ┌─ Synchronous (call stack) ──────────────┐
  │  A            main script               │
  │  B            inside test() before await│
  │  D            main script continues     │
  └─────────────────────────────────────────┘
  ┌─ Microtask queue (background iteration) ┐
  │  C            test() resumes after await│
  └─────────────────────────────────────────┘
```

**Key ideas (this is THE classic async interview question):**
- An `async` function starts executing **synchronously** until it hits the first `await`.
- `await` **suspends** the function and returns control to the caller (the main script).
- The rest of the function runs later, on the **microtask queue** - which is processed only after the current synchronous script finishes.
- That's why `D` prints before `C`: `await` hands control back, and `C` only runs in the next event-loop iteration (background iteration).

### Microtask vs Macrotask Background Iteration

```
  Event Loop iteration:

  ┌─────────────────────────────────────┐
  │ 1. Run ALL synchronous code         │  → A, B, D
  ├─────────────────────────────────────┤
  │ 2. Drain the ENTIRE microtask queue │  → C (promise .then/await)
  │    (promises, queueMicrotask,       │
  │     MutationObserver)               │
  ├─────────────────────────────────────┤
  │ 3. Take ONE macrotask               │  → setTimeout/setInterval
  │    (timers, I/O, events)            │
  └─────────────────────────────────────┘
```

**Why it matters for QA:** Playwright `await` calls resolve on the microtask queue. Knowing this order - sync code → microtasks → one macrotask - explains why `console.log` output can look "out of order" in flaky-looking tests.

---

## Async/Await vs Promise Chaining

**File:** `14_chapter_Async-Await/95_Async_Await.js`, `14_chapter_Async-Await/96_Async_Await_2.js`

| | Promise chaining (Ch. 13) | Async/Await (Ch. 14) |
|---|---|---|
| **Readability** | `.then().catch()` chains | Looks like synchronous code |
| **Error handling** | `.catch()` at the end | `try/catch/finally` |
| **Sequential steps** | `return promise` from `.then()` | `await` each step |
| **Parallel steps** | `Promise.all([...])` | `await Promise.all([...])` |
| **Under the hood** | The native API | Sugar ON TOP of the same API |

```js
// Promise version
openBrowser()
  .then(function () { return enterURL(); })
  .then(function () { return navigateToLoginPage(); })
  .catch(function (err) { console.log(err); });

// async/await version - same flow, cleaner code
async function run() {
  try {
    await openBrowser();
    await enterURL();
    await navigateToLoginPage();
  } catch (err) {
    console.log(err);
  }
}
```

---

## Why Async/Await Matters for Playwright

- Every Playwright API (`page.goto()`, `page.click()`, `expect()`) returns a Promise - you `await` them all.
- `await` keeps test steps in order: open browser → navigate → login → verify.
- `Promise.all` + `await` runs independent checks (status + UI + DB) in parallel to cut test time.
- `try/catch` around awaits = clean test failure reporting instead of unhandled rejections.
- Auto-retry patterns mirror the flaky API retry loop from `101_Real_QA.js`.

---

## Quick Summary
- `async` functions **always return a Promise**; `await` pauses until it settles.
- `await` only works on real Promises - a bare `setTimeout` needs `new Promise(resolve => setTimeout(resolve, ms))`.
- `try/catch/finally` handles errors like synchronous code; `finally` always runs.
- **Sequential** (`await` one by one) = time adds up; **parallel** (`Promise.all`) = slowest step wins.
- Retry pattern: `try { return on success } catch { throw after maxRetries }`.
- Event loop: sync code first → then microtasks (promises/await) → then macrotasks (timers) - hence `A B D C`.
