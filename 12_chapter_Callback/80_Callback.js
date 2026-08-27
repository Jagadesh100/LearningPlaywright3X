// Callback means passing a function as an argument to another function which can be used later

function greeting(greet, callback) {
  console.log("Hello");
  callback();
}

function printName() {
  console.log("Jagadesh");
}

greeting("Good", printName);


/**
 *   Flow Diagram

                      1. CALL SITE
            ┌──────────────────────────────────────┐
            │  greeting("Good", printName);        │
            └──────────────┬───────────────────────┘
                           │  "Good" → greet        (string passed by value)
                           │  printName → callback  (function passed by reference)
                           ▼
            ┌──────────────────────────────────────┐
            │  function greeting(greet, callback)  │
            │  2. console.log("Hello")             │
            │     → Output: "Hello"                │
            │  3. callback()   ◄── INVOKES the     │
            │     │              function that was │
            │     │              passed in         │
            └─────┼────────────────────────────────┘
                  │  "callback" is just a label
                  │  pointing to printName
                  ▼
            ┌──────────────────────────────────────┐
            │  function printName()                │
            │  4. console.log("Jagadesh")          │
            │     → Output: "Jagadesh"             │
            └──────────────────────────────────────┘

    Final output:
      1. "Hello"
      2. "Jagadesh"

  Execution Timeline (what actually runs)

  ┌───────┬───────────────────────────────────────────────────────────────────────────────────────┬────────────┐
  │ Step  │ What happens                                                                          │ Output     │
  ├───────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────┤
  │ 1     │ greeting("Good", printName) is called — "Good" binds to greet, printName binds to     │ —          │
  │       │ callback                                                                              │            │
  ├───────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────┤
  │ 2     │ Inside greeting, console.log("Hello") runs                                            │ Hello      │
  ├───────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────┤
  │ 3     │ callback() executes — this is printName being called                                  │ —          │
  ├───────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────┤
  │ 4     │ console.log("Jagadesh") runs                                                          │ Jagadesh   │
  └───────┴───────────────────────────────────────────────────────────────────────────────────────┴────────────┘

  Why it works — the key idea

  Line 1 says it: "passing a function as an argument to another function which can be used later."

  - printName is passed without parentheses (greeting("Good", printName)) — this passes the function itself (a
  reference), not its result. If you wrote printName() there, it would execute immediately and pass undefined
  instead.
  - Inside greeting, the parameter callback is just a new name pointing to the same function. Calling callback()
  is exactly the same as calling printName().
  - The name greet ("Good") is actually never used inside the body — but it's still a valid parameter showing you
   can pass data and a function together.
  - Control flow: greeting runs first, printName runs only when/if greeting chooses to call callback(). That's
  the "used later" part — the caller decides when to invoke it.
  Mental model: think of the callback as a "phone number" — you hand it to greeting (without dialing), and
  greeting dials it (callback()) whenever it needs that function to run. That's the foundation for everything
  from array.map() to setTimeout() and async code.
 */