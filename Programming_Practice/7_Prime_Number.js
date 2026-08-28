function isPrime(n) {
  if (n <= 1) {
    return false; // 0 and 1 either Prime or Composite
  }
  if (n === 2) {
    return true; // 2 is a prime number
  } else {
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }
}

let n = 113;
let check = isPrime(n);
if (check) {
  console.log(`${n} is a Prime Number`);
} else {
  console.log(`${n} is not a Prime Number`);
}
