function login(callback) {
  console.log(`Login Page`);
  callback();
}

function homePage(callback) {
  console.log(`Home Page`);
  callback();
}

function CheckoutPageTest(callback) {
  console.log(`Checkout Page`);
  callback();
}

function logout() {
  console.log(`Logout Page`);
  //callback();
}

login(function () {
  homePage(function () {
    CheckoutPageTest(function () {
      logout(function () {
        console.log(`Action Completed`);
      });
    });
  });
});
