function apiCall(request) {
  return new Promise(function (resolve) {
    (setTimeout(function () {
      resolve(request);
    }),
      2000);
  });
}

async function parallelTest() {
  console.log("Starting of the Test");

  let start = Date.now();

  let [r1, r2, r3] = await Promise.all([
    apiCall("Auth Service"),

    apiCall("User Service"),

    apiCall("Payment Service"),
  ]);

  console.log(r1);

  console.log(r2);

  console.log(r3);

  console.log("Time: ~" + (Date.now() - start) + "ms"); // ~1000ms
}

parallelTest();
