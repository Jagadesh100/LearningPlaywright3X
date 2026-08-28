// Asynchronous Callback - runs later, after the current code finishes
// setTimeout registers the callback and returns immediately - the callback fires
// only after the timer completes, from the callback queue.

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
// Order processed                    ← printed immediately
// Callback executed for ORD-1001     ← printed after 2 seconds


/**
 *  Execution Flow

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

  Key points
  - The outer function returns first; the callback fires only after the async operation completes.
  - setTimeout's delay is a minimum - the callback waits in the queue until the call stack is empty.
  - Common examples: setTimeout, setInterval, event listeners (addEventListener), API calls (fetch),
    and every Playwright action (page.click(), page.fill(), page.waitForSelector()).
 */
