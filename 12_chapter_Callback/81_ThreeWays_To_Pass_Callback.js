function greeting(greet, callback) {
  console.log("Hello");
  callback();
}

// 1. Traditional named function
function printName() {
  console.log("Named Function call");
}

greeting("Good", printName);

// 2. Anonymous Function
greeting("Wishes", function () {
  console.log("Anonymous");
});

// 3. Arrow Function
// Playwright test uses Arrow function callback
greeting("Yahhoo", () => {
  console.log(`Arrow Function Call`);
});

/**
 * This is exactly how test frameworks work. When you write test('has title', async ({ page }) => { ... }), the arrow function is a callback that the test function runs for you.

function test(text, callback) {

    console.log("Hi, this is test");

    callback();

}

test("Verify that the login page is working", async (page) => {

    console.log("Running TC1");

});

 */
