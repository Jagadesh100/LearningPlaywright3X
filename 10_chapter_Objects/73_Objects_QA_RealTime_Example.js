const ENV = {
  BASE_URL: "https://staging.myapp.com",

  TIMEOUT: 5000,

  RETRIES: 2,

  BROWSER: "Chrome",
};

const EXPECTED_RESPONSE = {
  status: 200,

  body: {
    user: { role: "admin", active: true },
  },
};

const config = {
  baseUrl: "http://localhost:3000",

  apiBaseUrl: "http://localhost:3000/api",

  testUser: {
    username: "testuser@example.com",

    password: "SecurePass123",
  },

  logLevel: "INFO",

  retryCount: parseInt(process.env.RETRY_COUNT || "3", 10),
};

console.log(`Environment: ${ENV}`);
console.log(`Expected Response: ${EXPECTED_RESPONSE}`);
console.log(`Configurations: ${config}`);
/**
 *  It's string coercion — when you put an object inside a template literal (`${ENV}`), JavaScript is forced to convert it to a string, and an object's
  default string representation is [object Object].

  Why:
  A template literal like `Environment: ${ENV}` always builds a string. So JS must call ENV.toString(), and since ENV is a plain object with no custom
  toString(), it falls back to the default Object.prototype.toString() → which returns "[object Object]". Same for EXPECTED_RESPONSE and config.
 */

console.log("Environment:", ENV);
console.log("Expected Response:", EXPECTED_RESPONSE);
console.log("Configurations:", config);
