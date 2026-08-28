function apiCall() {
  return new Promise(function (resolve) {
    (setTimeout(function () {
      resolve("200 OK");
    }),
      2000);
  });
}

async function sequentialTest() {
  console.log("Starting of the Test");

  let start = Date.now();

  let r1 = await apiCall("Login"); // waits 1s

  console.log(r1);

  let r2 = await apiCall("Dashboard"); // waits another 1s

  console.log(r2);

  let r3 = await apiCall("Report"); // waits another 1s

  console.log(r3);

  console.log("Time: ~" + (Date.now() - start) + "ms"); // ~3000ms
}

sequentialTest();
