# Chapter 12 - Callback

## What is a Callback?

> A callback is **passing a function as an argument to another function** which can be used later.

**File:** `12_chapter_Callback/80_Callback.js`

```js
function greeting(greet, callback) {
    console.log("Hello");
    callback();
}

function printName() {
    console.log("Jagadesh");
}

greeting("Good", printName);
```

**Key facts:**
- The function is passed **without parentheses** (`printName`, not `printName()`) - you pass the function **itself** (a reference), not its result.
- Inside the outer function, the parameter (`callback`) is just another name pointing to the same function.
- The outer function decides **when** to call it - that's the "used later" part.

### Callback Flow Diagram

```
  greeting("Good", printName);
  ┌───────────────────────────────────────────────┐
  │ CALL SITE                                     │
  │   "Good"      →  greet       (string by value)│
  │   printName   →  callback    (function by ref)│
  └──────────────────────┬────────────────────────┘
                         │ call begins
                         ▼
  ┌───────────────────────────────────────────────┐
  │ function greeting(greet, callback)            │
  │   1. console.log("Hello")  → Output: "Hello"  │
  │   2. callback()  ◄── invokes the passed fn    │
  └──────────────────────┬────────────────────────┘
                         │ callback is just a label
                         │ pointing to printName
                         ▼
  ┌───────────────────────────────────────────────┐
  │ function printName()                          │
  │   3. console.log("Jagadesh") → Output:        │
  │      "Jagadesh"                               │
  └───────────────────────────────────────────────┘

  Final output:
  1. Hello
  2. Jagadesh
```

### Execution Timeline

| Step | What happens | Output |
|---|---|---|
| 1 | `greeting("Good", printName)` - "Good" binds to `greet`, `printName` binds to `callback` | - |
| 2 | `console.log("Hello")` runs | Hello |
| 3 | `callback()` executes - this is `printName` being called | - |
| 4 | `console.log("Jagadesh")` runs | Jagadesh |

**Mental model:** Think of a callback as a **phone number** - you hand it to `greeting` (without dialing), and `greeting` dials it (`callback()`) whenever it needs that function to run. This is the foundation for `array.map()`, `setTimeout()`, and all async code.

---

## Three Ways to Pass a Callback

**File:** `12_chapter_Callback/81_ThreeWays_To_Pass_Callback.js`

```js
function greeting(greet, callback) {
    console.log("Hello");
    callback();
}

// 1. Traditional named function
function printName() {
    console.log("Named Function call");
}
greeting("Good", printName);

// 2. Anonymous Function
greeting("Wishes", function () {
    console.log("Anonymous");
});

// 3. Arrow Function  ← Playwright tests use this
greeting("Yahhoo", () => {
    console.log("Arrow Function Call");
});
```

| Way | Syntax | Notes |
|---|---|---|
| Named function | `greeting("Good", printName)` | Reusable, easy to debug |
| Anonymous function | `greeting("Wishes", function () {...})` | Defined inline, no name |
| Arrow function | `greeting("Yahhoo", () => {...})` | Concise, used in Playwright |

**Playwright connection:** This is exactly how test frameworks work. When you write
`test('has title', async ({ page }) => { ... })`, the arrow function is a callback that the test function runs for you.

---

## Callback with Parameters

**File:** `12_chapter_Callback/82_Callback_with_parameters.js`

The outer function can **pass data into** the callback - the callback isn't just "called later", it's called **with context**.

```js
function runTest(testName, callback) {
    let status = "PASS";
    callback(testName, status); // pass values INTO the callback
}

runTest("Login Test", function (name, result) {
    console.log(name + " → " + result); // Login Test → PASS
});
```

### Flow Diagram

```
  runTest("Login Test", function (name, result) {...})
  ┌────────────────────────────────────────────────┐
  │ Argument 1: "Login Test"   →  testName         │
  │ Argument 2: the function   →  callback         │
  └───────────────────────┬────────────────────────┘
                          ▼
  ┌────────────────────────────────────────────────┐
  │ function runTest(testName, callback)           │
  │   1. let status = "PASS"  (local variable)     │
  │   2. callback(testName, status)                │
  │        │                          │            │
  │        │ testName = "Login Test"  │ status =   │
  │        ▼                          ▼  "PASS"    │
  └────────┼──────────────────────────┼────────────┘
           │                          │
           ▼                          ▼
  ┌────────────────────────────────────────────────┐
  │ function (name, result) {                      │
  │   console.log(name + " → " + result);          │
  │ }                                              │
  │ Output: "Login Test → PASS"                    │
  └────────────────────────────────────────────────┘
```

**Data flow summary:**

```
runTest("Login Test", function (name, result) {...})
     │                        │
     │  binds to testName     │  binds to callback
     │                        │
     └──► callback(testName, status)
                │        │
                │        └── status ("PASS")  →  result
                └── "Login Test"              →  name
```

**Playwright connection:** `test("name", async () => {...})`, `page.click(() => {...})`, `expect(...).toBe(...)` - all callbacks that receive data from the framework. Playwright calls your callback and passes in things like the `page` fixture, test context, or response objects.

---

## Synchronous Callback

A **synchronous callback** runs **immediately**, right where it was called - before the outer function returns. No waiting, no queue, fully blocking.

**File:** `12_chapter_Callback/85_Synchronous_Callback.js`

```js
function processOrder(order, callback) {
    console.log("Processing order: " + order);
    callback(order); // runs right here - blocks until done
    console.log("Order processed");
}

processOrder("ORD-1001", function (order) {
    console.log("Callback executed for " + order);
});

// Output (in exact order):
// Processing order: ORD-1001
// Callback executed for ORD-1001
// Order processed
```

### Execution Flow

```
processOrder("ORD-1001", cb)
  ┌────────────────────────────┐
  │ 1. "Processing order:..."  │
  │ 2. callback()  ← runs NOW  │
  │ 3. "Order processed"       │
  └────────────────────────────┘
          │ callback is called
          ▼ synchronously
  ┌────────────────────────────┐
  │ cb: "Callback executed..." │
  └────────────────────────────┘
```

| Step | What happens | Output |
|---|---|---|
| 1 | `console.log("Processing order...")` | Processing order: ORD-1001 |
| 2 | `callback(order)` - called immediately | - |
| 3 | Callback logs its message | Callback executed for ORD-1001 |
| 4 | Back in `processOrder`, final log | Order processed |

**Key points:**
- The callback is invoked **inside** the outer function, in the same call stack - no waiting.
- Execution order is fully predictable: outer function code → callback → rest of outer function.
- Common examples: `array.forEach()`, `array.map()`, `array.filter()` - all run callbacks synchronously.

---

## Asynchronous Callback

An **asynchronous callback** runs **later** - after the current code finishes, when the async task completes. `setTimeout`, `setInterval`, event listeners, and API calls all work this way.

**File:** `12_chapter_Callback/86_Asynchronous_Callback.js`

```js
function processOrder(order, callback) {
    console.log("Processing order: " + order);
    setTimeout(function () {
        callback(order); // runs later, after this function returns
    }, 2000);
    console.log("Order processed"); // this line runs FIRST!
}

processOrder("ORD-1001", function (order) {
    console.log("Callback executed for " + order);
});

// Output:
// Processing order: ORD-1001
// Order processed          ← printed immediately
// Callback executed for ORD-1001  ← printed after 2 seconds
```

### Execution Flow

```
processOrder("ORD-1001", cb)
  ┌─────────────────────────────┐
  │ 1. "Processing order:..."   │
  │ 2. setTimeout(cb, 2000)     │
  │    └── timer registered,    │
  │        NOT executed         │
  │ 3. "Order processed"        │
  └─────────────────────────────┘
         │ function returns,
         │ timer keeps counting
         ▼ 2 seconds later
  ┌─────────────────────────────┐
  │ cb: "Callback executed..."  │
  │ ← pushed to the call stack  │
  │   from the callback queue   │
  └─────────────────────────────┘
```

| Step | What happens | Output |
|---|---|---|
| 1 | `console.log("Processing order...")` | Processing order: ORD-1001 |
| 2 | `setTimeout(callback, 2000)` - schedules, does **not** run | - |
| 3 | `console.log("Order processed")` - runs immediately | Order processed |
| 4 | 2 seconds later, callback fires from the **callback queue** | Callback executed for ORD-1001 |

**Key points:**
- The outer function **returns first**; the callback fires only after the async operation completes.
- `setTimeout`'s delay is a minimum - the callback waits in the queue until the call stack is empty.
- Common examples: `setTimeout`, `setInterval`, event listeners (`addEventListener`), API calls (`fetch`), and **every Playwright action** (`page.click()`, `page.fill()`, `page.waitForSelector()`).

---

## Synchronous vs Asynchronous Callback

| | Synchronous Callback | Asynchronous Callback |
|---|---|---|
| **When it runs** | Immediately, inside the outer function | Later, after the outer function returns |
| **Execution order** | Predictable, top to bottom | Depends on when the async task finishes |
| **Call stack** | Same call stack | Moves through the callback queue |
| **Blocking?** | Yes - blocks until done | No - code continues running |
| **Typical uses** | `forEach`, `map`, `filter`, `sort` | `setTimeout`, `fetch`, event listeners, Playwright actions |

### Which one does Playwright use?

Playwright is **asynchronous** - `test()` is given an `async` callback, and every action is awaited:

```js
test('login test', async ({ page }) => {
    await page.goto('https://app.vwo.com');  // async - waits for the page
    await page.fill('#username', 'admin');    // async - waits for the field
    await page.click('#login');               // async - waits for the click
});
```

Without `await`, Playwright actions return immediately and the test breaks - that's the asynchronous callback in action.

---

## Callback Hell (Pyramid of Doom)

**File:** `12_chapter_Callback/82_Pyramid_Of_Doom.js`

Nesting callbacks inside callbacks inside callbacks - each level indents deeper, forming a pyramid shape.

```js
function login(callback) {
    console.log("Login Page");
    callback();
}
function homePage(callback) {
    console.log("Home Page");
    callback();
}
function CheckoutPageTest(callback) {
    console.log("Checkout Page");
    callback();
}
function logout() {
    console.log("Logout Page");
}

login(function () {
    homePage(function () {
        CheckoutPageTest(function () {
            logout();
        });
    });
});
```

### Pyramid of Doom Shape

```
login(function () {                     ← level 1
    homePage(function () {              ← level 2
        CheckoutPageTest(function () {  ← level 3
            logout();                   ← level 4
        });
    });
});
```

**Why it's a problem:**
- Hard to read and maintain.
- Hard to debug (which level failed?).
- Hard to handle errors at each step.
- The indentation grows to the right - hence "pyramid of doom".

**The solution (preview):** Promises (Chapter 13) flatten this into a readable `.then()` chain.

---

## Real QA Scenario: Callback Hell

**File:** `12_chapter_Callback/83_Call_Back_Hell.js`

A real E2E login flow (like app.vwo.com) using `setTimeout` to simulate async steps:

```js
function openBrowser(callback) {
    setTimeout(function () {
        console.log("Step 1 - browser starting...");
        callback();
    }, 500);
}

function goToLoginPage(callback) {
    setTimeout(function () {
        console.log("Step 2: Login page loaded");
        callback();
    }, 500);
}

function enterCredentials(callback) {
    setTimeout(function () {
        console.log("Step 3: Credentials entered");
        callback();
    }, 500);
}

function clickLogin(callback) {
    setTimeout(function () {
        console.log("Step 4: Login button clicked");
        callback();
    }, 500);
}

// THIS IS CALLBACK HELL 👇
openBrowser(function () {
    goToLoginPage(function () {
        enterCredentials(function () {
            clickLogin(function () {
                console.log("Test is Complete!");
            });
        });
    });
});
```

### Execution Flow

```
  t=0ms       openBrowser()          → "Step 1 - browser starting..." (after 500ms)
  t=500ms     goToLoginPage()        → "Step 2: Login page loaded"   (after 500ms)
  t=1000ms    enterCredentials()     → "Step 3: Credentials entered" (after 500ms)
  t=1500ms    clickLogin()           → "Step 4: Login button clicked"
  t=2000ms    "Test is Complete!"

  ┌────────────────────────────────────────────────────────────┐
  │ openBrowser(cb) ──500ms──► goToLoginPage(cb)               │
  │                                   │                        │
  │                                   └─500ms──► enterCreds(cb)│
  │                                                  │         │
  │                                                  └─500ms──►│
  │                                                    clickLogin(cb) ──► Done
  └────────────────────────────────────────────────────────────┘
  Each step waits for the previous one - sequential async flow.
```

**Playwright connection:** This is the classic problem that `async`/`await` solves. Playwright tests are written sequentially (`await page.goto()`, `await page.click()`), which is the modern replacement for this callback-chain style.

---

## Pyramid of Doom - Example 2

**File:** `12_chapter_Callback/84_Pyramid_Of_Doom_Example_2.js`

```js
function step1(callback) {
    console.log("Open browser");
    callback();
}

function step2(callback) {
    console.log("Navigate to page");
    callback();
}

function step3(callback) {
    console.log("Click button");
    callback();
}

function step4(callback) {
    console.log("Click button");
    callback();
}

step1(function () {
    step2(function () {
        step3(function () {
            step4(function () {
                console.log("Done!");
            });
        });
    });
});
```

**Flow:**

```
step1() → "Open browser"
  → step2() → "Navigate to page"
    → step3() → "Click button"
      → step4() → "Click button"
        → "Done!"
```

Each step only starts **after** the previous one's callback fires - strictly sequential execution.

---

## Why Callbacks Matter for Playwright

- Playwright's `test()` takes a callback (the test body).
- Locator actions like `page.click()`, `page.fill()` are callback-driven under the hood.
- Understanding callbacks explains **why async code runs in a specific order**.
- Callback Hell is exactly what Promises (Chapter 13) and `async`/`await` were created to fix.

---

## Quick Summary
- A callback = passing a function as an argument to another function to be used later.
- Pass the function **reference** (no parentheses), let the outer function call it.
- Three ways: named, anonymous, arrow functions.
- Callbacks can receive **data** from the outer function.
- Nesting callbacks too deep = **Callback Hell** / **Pyramid of Doom** - hard to read, hard to debug.
- Promises and `async`/`await` are the modern fix.
