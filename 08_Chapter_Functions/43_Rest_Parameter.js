// Rest parameter accepts multiple argument in a array of paramters

function sum(testName, ...val) {
  console.log(`Test Name: ${testName}`);
  let res = val.reduce((a, b) => a + b);
  return res;
}

let res = sum("Test 1", 1, 2, 3, 4, 3);
console.log("Result:" + res);

res = sum("Test 2", 1, 2, 3, 4, 3,63,637);
console.log("Result:" + res);

res = sum("Test 3", 1, 2);
console.log("Result:" + res);
