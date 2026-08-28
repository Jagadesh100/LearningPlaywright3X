async function getStatus() {
  return Promise.resolve({ status: 200 });
}

// async function since it returns promise

console.log("Call get Status");

console.log(await getStatus()); // promise resolves and received status : 200
console.log(getStatus()); // Promise is pending without use of await keyword
