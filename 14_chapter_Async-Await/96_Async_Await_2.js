async function openBrowser() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("Open the browser");
}

async function enterURL() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Enter the URL`);
}

async function navigateToLoginPage() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Navigate to Login Page`);
}

async function enterCredentials() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Enter Credentials`);
}

async function clickLoginButton() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Click Login Button`);
}

openBrowser();
enterURL();
navigateToLoginPage();
enterCredentials();
clickLoginButton();

// The above function call doesn't wait for specifice task to complete , instanly executes all the lines of code

console.log(`------------After Await--------------`);

