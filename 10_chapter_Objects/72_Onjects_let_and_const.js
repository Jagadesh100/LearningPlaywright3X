const config = {
  browser: "Chrome",
  timeout: 3000,
  retries: 2,
};

console.log(config);

// const object => we can't redcalre and reassign config  where as we can change the properties of config

config.browser = "Edge";
config.timeout = 2000;
config.retries = 1;
console.log(config);

// const config ={
//     browser: "firefox", Throws error already declared
// }

// let objects allows user to reassign

let onj = {
  browser: "Chrome",
};

console.log(onj);

onj = {
  browser: "firefox",
}; // reassign is possible but redeclare is not possible
console.log(onj);
