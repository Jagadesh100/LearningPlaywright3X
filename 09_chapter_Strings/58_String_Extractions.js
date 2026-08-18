let url="https://staging.vwo.com/api/login?retry=true";

// slice and substring

// slice allows negaative index whereas substring doesn't
// Negative index starts indexing from last to the end folows left to right

console.log(url.slice(0,16));
console.log(url.slice(-9)); //etry=true
console.log(url.slice(-9,-2)); //etry=tr

// substring
console.log(url.substring(0,16));
console.log(url.substring(-9)); // Negative index doesn't works prints full value

