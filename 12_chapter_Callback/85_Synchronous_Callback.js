// Synchronous Callback - runs immediately, right where it was called
// The outer function does NOT return until the callback finishes - fully blocking.

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


/**
 *  Execution Flow

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

  Key points
  - The callback is invoked inside the outer function, in the same call stack - no waiting.
  - Execution order is fully predictable: outer function code → callback → rest of outer function.
  - Common examples: array.forEach(), array.map(), array.filter() - all run callbacks synchronously.
 */
