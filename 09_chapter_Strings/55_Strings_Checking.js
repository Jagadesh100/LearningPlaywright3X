// includes, startswith,endswith
// included() => checks whether the argument passed in the includes function is present or not returns boolean// case sensitive


let url="https://staging.vwo.com/api/login?retry=true";

console.log(url.includes("staging")); // true
console.log(url.includes("Staging")); // false
console.log(url.includes("Prod")); // false

console.log(url.startsWith("http")); // true
console.log(url.startsWith("Hello")); // false
console.log(url.startsWith("http",5)); // false
console.log(url.startsWith(":",5)); // true

console.log(url.endsWith("true")); // true
console.log(url.endsWith("e")); // true
console.log(url.startsWith("g",11)); // false
console.log(url.endsWith(":",5)); // false

// indexOf

console.log(url.indexOf("g"));

// lastIndex Of
console.log(url.lastIndexOf("g"));

