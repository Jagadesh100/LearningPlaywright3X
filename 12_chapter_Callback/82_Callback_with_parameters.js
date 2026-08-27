function runTest(testName, callback) {

    let status = "PASS";

    callback(testName, status); // pass values into the callback

}

runTest("Login Test", function (name, result) {

    console.log(name + " → " + result); // Login Test → PASS

});

/**
 * ⠶ Here's the full flow with a diagram.

  Flowchart

                      ┌──────────────────────────────────────────────┐
                        │  runTest("Login Test", function(name, result)│
                        │      { ... } )                               │
                        │                                              │
                        │  Argument 1: "Login Test"  ──► testName      │
                        │  Argument 2: the anonymous  ──► callback     │
                        │              function itself                 │
                        └───────────────────┬──────────────────────────┘
                                            │  call begins
                                            ▼
                        ┌──────────────────────────────────────────────┐
                        │  function runTest(testName, callback)        │
                        │                                              │
                        │  step 1: let status = "PASS"                 │
                        │           (create a local variable)          │
                        │                                              │
                        │  step 2: callback(testName, status)          │
                        │           ▲                    │             │
                        │           │   passes 2 values  │             │
                        └───────────┼────────────────────┼─────────────┘
                                    │                    │
                                    │   testName =       │  status =
                                    │   "Login Test"     │  "PASS"
                                    ▼                    ▼
                        ┌──────────────────────────────────────────────┐
                        │  function (name, result) {                   │
                        │      console.log(name + " → " + result);     │
                        │  }                                           │
                        │                                              │
                        │  Output: "Login Test → PASS"                 │
                        └──────────────────────────────────────────────┘

  Step-by-step execution timeline

  ┌───────┬────────────────────────────────────────────────┬───────────────────────────────────────────────────┐
  │ Step  │ What happens                                   │ Detail                                            │
  ├───────┼────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
  │ 1     │ runTest("Login Test", function...) is called   │ Two arguments passed: a string and a function     │
  ├───────┼────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
  │ 2     │ Parameters bind                                │ testName = "Login Test", callback = the anonymous │
  │       │                                                │ function                                          │
  ├───────┼────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
  │ 3     │ let status = "PASS"                            │ A local variable is created inside runTest        │
  ├───────┼────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
  │ 4     │ callback(testName, status)                     │ Here's the key — the callback is invoked with     │
  │       │                                                │ arguments: callback("Login Test", "PASS")         │
  ├───────┼────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
  │ 5     │ Parameters bind inside callback                │ name = "Login Test", result = "PASS"              │
  ├───────┼────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
  │ 6     │ console.log(name + " → " + result)             │ Prints Login Test → PASS                          │
  ├───────┼────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
  │ 7     │ Callback finishes → runTest finishes           │ Control returns                                   │
  └───────┴────────────────────────────────────────────────┴───────────────────────────────────────────────────┘
  Why this matters — the key ideas

  1. Callbacks receive data from the outer function.
  The whole point of this example vs. the previous one (80_Callback.js) is that runTest passes values into the
  callback. The callback isn't just "called later" — it's called with context. The outer function decides what
  data the callback sees:

  callback(testName, status);  // outer function feeds data IN

  2. Parameters flow like this:

  runTest("Login Test", function (name, result) {...})
             │                   │
             │                   └── binds to `callback`
             └── binds to `testName`
                                  │
        callback(testName, status)│
                 │        │       │
                 │        └───────┘  status ("PASS") → `result`
                 │
                 └── "Login Test" → `name`

  3. The callback is written inline (anonymous).
  Instead of defining printName separately like the previous example, the function is passed directly at the call
   site. It has no name — it only exists to be passed into runTest.

  4. This is exactly how Playwright works.
  test("name", async () => {...}), page.click(() => {...}), expect(...).toBe(...) — all callbacks that receive
  data from the framework. Playwright calls your callback and passes in things like the page fixture, test
  context, or response objects. Same pattern as runTest passing testName and status.
 */