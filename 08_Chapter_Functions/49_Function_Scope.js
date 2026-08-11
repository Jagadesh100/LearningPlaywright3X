let message = "Global";
console.log(message);

function localScope() {
  let name = "local";
  console.log(`From local : ${message}`);
  console.log(`From local : ${name}`);
}

localScope();

console.log(`From Global : ${message}`);
console.log(`From Global : ${name}`); // Local scope variable, not defined
