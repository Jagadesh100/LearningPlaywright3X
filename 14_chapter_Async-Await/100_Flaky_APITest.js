let attempt = 0;
function flakyAPI() {
  attempt++;
  if (attempt <= 3) {
    return Promise.resolve("Attempt:" + attempt + " Success");
  } else {
    return Promise.reject("Attempt:" + attempt + " Failed");
  }
}

async function retryTesting(maxRetries) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      let apiTest = await flakyAPI();
      console.log(`Pass ` + apiTest);
    } catch (error) {
      console.log(error);
    }
  }
}

retryTesting(5);
