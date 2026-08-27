let checkAuth = Promise.resolve("Auth Ok");
let checkDB = Promise.resolve("DB Ok");
let checkCache = Promise.resolve("Cache Cleared");

Promise.all([checkAuth, checkDB, checkCache])
  .then(function (result) {
    console.log(result);

    console.log(`All promises resolved`);
  })
  .catch(function (error) {
    console.log(error);
  });


Promise.all([
    Promise.resolve("OK"),
    Promise.reject("DB DOWN"),
    Promise.resolve("OK")
])
    .then(function (r) { console.log(r); })
    .catch(function (err) { console.log("Failed:", err); });