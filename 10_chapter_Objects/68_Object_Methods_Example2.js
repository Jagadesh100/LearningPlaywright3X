const calculator = {
  value: 0,
  add(n) {
    this.value += n;
    return this; // returning this allows chaining
  },
  subtract(n) {
    this.value -= n;
    return this;
  },
  multiply(n) {
    this.value *= n;
    return this;
  },
};

let result = calculator.add(5).subtract(3).multiply(10);
console.log(`Result: ${result.value}`);
console.log(result.value);
