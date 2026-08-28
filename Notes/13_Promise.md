# Chapter 13 - Promise

## What is a Promise?

> A Promise is an **object representing the eventual completion (or failure) of an asynchronous operation**. It has three states: **pending**, **fulfilled** (resolved), and **rejected**.

**File:** `13_Chapter_Promise/85_Promise.js`

```js
let myPromise = new Promise(function (resolve, reject) {
    let promise = false;
    if (promise) {
        resolve("Promise Resolved");
    } else {
        reject("Promise Failed");
    }
});

console.log(myPromise); // if rejected throws unhandled Promise Rejection
```

**Key facts:**
- Created with `new Promise(executor)` where the executor receives two functions: `resolve` and `reject`.
- Call `resolve(value)` → promise becomes **fulfilled**.
- Call `reject(reason)` → promise becomes **rejected**.
- A rejected promise that has **no `.catch()`** throws an "unhandled promise rejection" error.

### Promise Lifecycle

```
  ┌────────────────────────────────────────────────────────────────────┐
  │                         new Promise(executor)                      │
  └──────────────────────────────────┬─────────────────────────────────┘
                                     ▼
  ┌────────────────────────────────────────────────────────────────────┐
  │                     PENDING  (async work in progress)              │
  └──────────────────────────────────┬─────────────────────────────────┘
                          ┌──────────┴──────────┐
                          ▼                     ▼
  ┌────────────────────────────────┐  ┌────────────────────────────────┐
  │  resolve(value)                │  │  reject(reason)                │
  │  → FULFILLED (settled)         │  │  → REJECTED (settled)          │
  │  .then() handlers run          │  │  .catch() handlers run         │
  │  .finally() always runs        │  │  .finally() always runs        │
  └────────────────────────────────┘  └────────────────────────────────┘

  PENDING   → FULFILLED  (resolve called)
  PENDING   → REJECTED   (reject called)
  A promise can change state only ONCE - after settling, it stays settled.
```

---

## Real QA API Example - Success

**File:** `13_Chapter_Promise/86_Real_QA_API_Example_Success.js`

```js
let apiCall = new Promise(function (resolve, reject) {
    resolve({ status: 200, body: "User Data" });
});

apiCall.then(function (response) {
    console.log(response);        // { status: 200, body: "User Data" }
    console.log(response.status); // 200
    console.log(response.body);   // User Data
});
```

**Flow:**

```
  new Promise(...)  →  resolve({status: 200, body: "User Data"})
                              │
                              ▼
                     .then(response => {...})
                              │
                              ▼
                    Output:
                    1. { status: 200, body: "User Data" }
                    2. 200
                    3. User Data
```

The resolved value is passed directly into `.then()` as the `response` parameter - just like an API response object.

---

## Real QA API Example - Failure

**File:** `13_Chapter_Promise/87_Real_QA_API_Example_Failure.js`

```js
let apiCall = new Promise(function (resolve, reject) {
    reject({ status: 500 });
});

apiCall
    .then(function (response) {
        console.log(response);
        console.log(response.status);
        console.log(response.body);
    })
    .catch(function (error) {
        console.log(error); // { status: 500 }
    });
```

**Flow:**

```
  new Promise(...)  →  reject({status: 500})
                              │
                              ▼
  .then(...)  → SKIPPED (promise was rejected, not resolved)
                              │
                              ▼
  .catch(error => {...})  →  Output: { status: 500 }
```

**Rules:**
- `then` - runs when the promise **resolves** (fulfilled).
- `catch` - runs when the promise **rejects** (failed).
- `.then()` is **skipped** entirely when the promise rejects.

### Decision Flowchart

```
  ┌───────────────────────────────┐
  │       apiCall settles         │
  └───────────────┬───────────────┘
        ┌─────────┴─────────┐
        ▼                   ▼
  ┌──────────────┐   ┌──────────────┐
  │  resolved    │   │  rejected    │
  └──────┬───────┘   └──────┬───────┘
         ▼                   ▼
  ┌──────────────┐   ┌──────────────┐
  │  .then()     │   │  .catch()    │
  │  runs        │   │  runs        │
  └──────────────┘   └──────────────┘
```

---

## Promise.finally()

**File:** `13_Chapter_Promise/88_Promise_Finally.js`

```js
let apiCall = new Promise(function (resolve, reject) {
    reject({ status: 500 });
});

apiCall
    .then(function (response) {
        console.log(response);
        console.log(response.status);
        console.log(response.body);
    })
    .catch(function (error) {
        console.log(error); // { status: 500 }
    })
    .finally(function () {
        console.log("Finally Block"); // always runs
    });
```

**Key facts:**
- `finally` runs **regardless** of resolve or reject - like cleanup in a test.
- It doesn't receive the value or the error (it's not meant to handle them).
- Perfect for cleanup: closing browser, clearing state, ending a test run.

```
  resolve ──► .then() ──┐
                        ├──► .finally()  (always runs)
  reject  ──► .catch() ─┘
```

---

## Promise.all()

**File:** `13_Chapter_Promise/89_Promise_All.js`

Runs **multiple promises in parallel** and waits for **ALL** of them. If any one rejects, the whole `.all()` rejects immediately (fail-fast).

```js
let checkAuth = Promise.resolve("Auth Ok");
let checkDB = Promise.resolve("DB Ok");
let checkCache = Promise.resolve("Cache Cleared");

Promise.all([checkAuth, checkDB, checkCache])
    .then(function (result) {
        console.log(result); // ["Auth Ok", "DB Ok", "Cache Cleared"]
        console.log("All promises resolved");
    })
    .catch(function (error) {
        console.log(error);
    });
```

**Fail-fast example:**

```js
Promise.all([
    Promise.resolve("OK"),
    Promise.reject("DB DOWN"),
    Promise.resolve("OK"),
])
    .then(function (r) {
        console.log(r); // never runs
    })
    .catch(function (err) {
        console.log("Failed:", err); // Failed: DB DOWN
    });
```

### Promise.all() Flowchart

```
  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
  │ checkAuth   │   │ checkDB     │   │ checkCache  │
  │ (parallel)  │   │ (parallel)  │   │ (parallel)  │
  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘
         └─────────────────┼─────────────────┘
                           ▼
  ┌────────────────────────────────────────────┐
  │     ALL settled?  (every one resolved?)    │
  └───────────────────┬────────────────────────┘
               ┌──────┴──────┐
               ▼             ▼
     ┌────────────────┐  ┌────────────────┐
     │ YES - all OK   │  │ NO - one failed│
     │ .then() runs   │  │ .catch() runs  │
     │ results array  │  │ (fail-fast)    │
     └────────────────┘  └────────────────┘
```

**Key idea:** All three start at the same time (parallel). `.then()` gets an **array of all results** in order. If ANY promise rejects, `.catch()` fires immediately - remaining results are ignored.

---

## Promise.allSettled()

**File:** `13_Chapter_Promise/90_Promise_Settled.js`

Waits for **ALL** promises to settle (resolve OR reject) and returns the result of every one - it never fails fast.

```js
Promise.allSettled([
    Promise.resolve("Test A Passed!"),
    Promise.reject("Test B failed"),
    Promise.resolve("Test C passed"),
]).then(function (results) {
    results.forEach(function (r, i) {
        console.log("Test " + (i + 1) + ":", r.status, "-", r.value || r.reason);
    });
});
```

**Output:**

```
Test 1: fulfilled - Test A Passed!
Test 2: rejected - Test B failed
Test 3: fulfilled - Test C passed
```

**Key idea:** This is like a **test report** - you want results for ALL tests, not just stop at the first failure. Each result has a `status` (`fulfilled`/`rejected`) plus `value` (on success) or `reason` (on failure).

### Result Shape

```
  { status: "fulfilled", value: "Test A Passed!" }
  { status: "rejected",  reason: "Test B failed"  }
  { status: "fulfilled", value: "Test C passed"   }
```

---

## Promise.race()

**File:** `13_Chapter_Promise/91_Promise_Race.js`

Takes an array of promises and settles with the **first** one to settle (win or lose).

```js
let fastServer = new Promise(function (resolve) {
    setTimeout(function () {
        resolve("Fast 100ms");
    }, 100);
});

let slowServer = new Promise(function (resolve) {
    setTimeout(function () {
        resolve("Fast 500ms");
    }, 500);
});

Promise.race([fastServer, slowServer]).then(function (winner) {
    console.log("Winner:", winner); // Winner: Fast 100ms
});
```

### Promise.race() Flowchart

```
  Start: fastServer (100ms) ──┐
  Start: slowServer (500ms) ──┼──► RACE
                              │
  fastServer wins at 100ms ───┘
                              │
                              ▼
              .then(winner) → "Winner: Fast 100ms"
              (slowServer's result is ignored)
```

**Key idea:** Like a real race - only the **first finisher** matters. Use it for timeouts: `Promise.race([apiCall, timeoutPromise])` - if the timeout resolves first, treat the call as failed.

---

## Promise IQ Examples

**File:** `13_Chapter_Promise/92_Promise_IQ.js`

### 1. Basic resolve → then

```js
let p = new Promise(function (resolve, reject) {
    resolve(42);
});
p.then(function (value) {
    console.log("Answer:", value); // Answer: 42
});
```

### 2. Basic reject → catch

```js
let p = new Promise(function (resolve, reject) {
    reject("Something broke");
});
p.catch(function (err) {
    console.log("Caught:", err); // Caught: Something broke
});
```

### 3. Promise Chaining - returning values

```js
let p = Promise.resolve(5);

p.then(function (val) {
    return val * 10; // 50 - returned value flows into next .then
}).then(function (val) {
    console.log("Result:", val); // Result: 50
});
```

### 4. Chain of increments

```js
Promise.resolve(1)
    .then(function (val) {
        console.log(val); // 1
        return val + 1;
    })
    .then(function (val) {
        console.log(val); // 2
        return val + 1;
    })
    .then(function (val) {
        console.log(val); // 3
    });
```

### 5. Errors skip .then() and go to .catch()

```js
Promise.resolve("start")
    .then(function (val) {
        console.log(val); // start
        throw new Error("Broke at step 2");
    })
    .then(function () {
        console.log("This will NOT run"); // skipped!
    })
    .catch(function (err) {
        console.log("Caught:", err.message); // Caught: Broke at step 2
    });
```

### 6. Full chain with finally

```js
Promise.reject("Test failed")
    .then(function (data) {
        console.log("Data:", data); // skipped (rejected)
    })
    .catch(function (err) {
        console.log("Error:", err); // Error: Test failed
    })
    .finally(function () {
        console.log("Cleanup done"); // always runs
    });
```

### Chaining Flowchart

```
  Promise.resolve("start")
       │
       ▼
  ┌─────────────────────────────┐
  │ .then 1 → log "start"       │
  │           throw Error       │
  └──────────────┬──────────────┘
                 │ error thrown
                 ▼
  ┌─────────────────────────────┐
  │ .then 2 → SKIPPED           │  (errors jump past remaining .then)
  └──────────────┬──────────────┘
                 │
                 ▼
  ┌─────────────────────────────┐
  │ .catch → log "Broke at      │
  │          step 2"            │
  └──────────────┬──────────────┘
                 │
                 ▼
  ┌─────────────────────────────┐
  │ .finally → always runs      │
  └─────────────────────────────┘

  Rule: an error (or rejection) skips ALL remaining .then() calls
  and jumps straight to the nearest .catch().
```

---

## Promise IQ - AllSettled Practice

**File:** `13_Chapter_Promise/93_Promise_IQ2.js`

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

**Output:**

```
fulfilled → API 200
rejected → API 500
fulfilled → API 201
```

Other IQ snippets in the file:
- `Promise.resolve("Quick win").then(...)` - immediately fulfilled.
- `Promise.reject("Quick loss").catch(...)` - immediately rejected.
- `Promise.all([t1, t2, t3])` with all resolved → `.then(results)` with array.
- `Promise.all` with one rejected → `.catch(err)` fires (fail-fast).

---

## Real-World Promise Flow (The E2E Login Fixed)

**File:** `13_Chapter_Promise/94_Promise_Real.js`

This is the **callback hell solution** from Chapter 12 (`83_Call_Back_Hell.js`) rewritten with promises. Each step returns a promise, and `.then()` chains them flatly.

```js
function openBrowser() {
    return new Promise(function (resolve) {
        resolve("Browser has been opened!");
    });
}

function goToLogin() {
    return new Promise(function (resolve) {
        resolve("Login page loaded");
    });
}

function enterCredentials() {
    return new Promise(function (resolve) {
        resolve("Credentials entered");
    });
}

function clickLogin() {
    return new Promise(function (resolve) {
        resolve("Logged in successfully");
    });
}

openBrowser()
    .then(function (msg) {
        console.log("Step 1", msg);
        return goToLogin(); // return a NEW promise → next .then waits for it
    })
    .then(function (msg) {
        console.log("Step 2 :", msg);
        return enterCredentials();
    })
    .then(function (msg) {
        console.log("Step 3 :", msg);
        return clickLogin();
    })
    .then(function (msg) {
        console.log("Step 4 :", msg);
    })
    .catch(function (error) {
        console.log("Error:", error);
    })
    .finally(function () {
        console.log("Done execution!");
    });
```

### Chain Flowchart

```
  openBrowser()
       │
       ▼  resolve → "Browser has been opened!"
  ┌─────────────────────────────────────────┐
  │ .then 1 → "Step 1 Browser has been      │
  │           opened!"                      │
  │           return goToLogin()  ──► new   │
  │           promise (pending)             │
  └──────────────────┬──────────────────────┘
                     ▼  resolves
  ┌─────────────────────────────────────────┐
  │ .then 2 → "Step 2 : Login page loaded"  │
  │           return enterCredentials()     │
  └──────────────────┬──────────────────────┘
                     ▼  resolves
  ┌─────────────────────────────────────────┐
  │ .then 3 → "Step 3 : Credentials         │
  │           entered"                      │
  │           return clickLogin()           │
  └──────────────────┬──────────────────────┘
                     ▼  resolves
  ┌─────────────────────────────────────────┐
  │ .then 4 → "Step 4 : Logged in           │
  │           successfully"                 │
  └──────────────────┬──────────────────────┘
                     ▼
  ┌─────────────────────────────────────────┐
  │ .catch → runs ONLY if any step rejects  │
  └──────────────────┬──────────────────────┘
                     ▼
  ┌─────────────────────────────────────────┐
  │ .finally → "Done execution!"            │
  │           (always runs)                 │
  └─────────────────────────────────────────┘

  Final output:
  Step 1 Browser has been opened!
  Step 2 : Login page loaded
  Step 3 : Credentials entered
  Step 4 : Logged in successfully
  Done execution!
```

**The key trick:** returning a promise from `.then()` makes the next `.then()` wait for it - this is how async steps run **in order**, without nesting.

---

## Promise Combinators Comparison

### Side-by-Side Difference Table

| | `Promise.all` | `Promise.allSettled` | `Promise.race` |
|---|---|---|---|
| **Waits for** | ALL promises | ALL promises | FIRST promise to settle |
| **Runs promises** | Parallel | Parallel | Parallel |
| **Fails when** | ANY rejects (fail-fast) | Never fails | First one to settle rejects |
| **`.then()` receives** | Array of all values (in order) | Array of `{status, value/reason}` for each | Single value/reason of the first finisher |
| **Rejection behavior** | Stops immediately, ignores remaining results | Records the rejection, keeps waiting for the rest | Ignores all other promises |
| **Result shape** | `["v1", "v2", "v3"]` | `[{status: "fulfilled", value}, {status: "rejected", reason}]` | `"v1"` (or reason) |
| **QA analogy** | All pre-test checks must pass | Full test report - collect everything | API timeout - first outcome wins |
| **Memory trick** | All must **pass** | All must **report** | First to **finish** |

### Same Input - Different Output

Given: `P1` resolves, `P2` rejects, `P3` resolves

| Combinator | Output | Why |
|---|---|---|
| `Promise.all` | `.catch()` → `Failed: P2's reason` | One failure = total failure |
| `Promise.allSettled` | 3 results - fulfilled, rejected, fulfilled | Every promise is reported |
| `Promise.race` | `P1`'s value | First to settle wins, rest ignored |

### Quick Reference

| Method | Waits for | Fails when | Result of `.then()` |
|---|---|---|---|
| `Promise.all` | ALL promises | ANY rejects (fail-fast) | Array of all values (in order) |
| `Promise.allSettled` | ALL promises | Never fails | Array of `{status, value/reason}` |
| `Promise.race` | FIRST to settle | First to reject | Value/reason of the first finisher |
| `Promise.any` | FIRST to fulfill | All reject | Value of first success |

**Playwright connection:** `Promise.all` is used to run parallel page actions (`page.waitForNavigation` + `page.click`), `allSettled` mirrors collecting results from a full test suite, and `race` powers timeout patterns.

---

## Why Promises Matter for Playwright

- Playwright's API is promise-based - `page.click()` returns a promise you `await`.
- `.then()` chains = what `async`/`await` desugars into.
- `Promise.all` runs browser actions in parallel.
- Understanding states (pending/fulfilled/rejected) helps debug flaky async tests.
- Playwright auto-waits are built on promise resolution under the hood.

---

## Quick Summary
- Promise = object representing eventual success (`resolve`) or failure (`reject`).
- States: **pending → fulfilled | rejected** (settled once, forever).
- `.then()` for success, `.catch()` for errors, `.finally()` always runs.
- `.then()` can return values OR promises - returned promises chain sequentially.
- `Promise.all` = all must pass (fail-fast), `allSettled` = full report, `race` = first finisher wins.
- A rejected promise without `.catch()` = unhandled promise rejection error.
- Promises are the clean solution to Callback Hell from Chapter 12.
