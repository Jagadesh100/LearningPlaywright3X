function makeCounter(start = 0) {
  let count = start; // this variable is "closed over" (private)

  return {
    increment() {
      count++;
    },

    decrement() {
      count--;
    },

    get() {
      return count;
    },
  };
}

let counter = makeCounter(0);

counter.increment();

counter.increment();

counter.increment();

console.log(counter.get()); // 3

counter.decrement();

console.log(counter.get()); // 2
