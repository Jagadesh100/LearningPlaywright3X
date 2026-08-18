let string = "etRy=true";

// Uppercase and lowercase
console.log(string.toUpperCase()); //ETRY=TRUE
console.log(string.toLowerCase()); // etry=true

// trim

let wishes = "  happy Birthday !   ";
console.log(`TrimN:${wishes}`);
console.log(`TrimF:${wishes.trim()}`);
console.log(`TrimS:${wishes.trimStart()}`);
console.log(`TrimE:${wishes.trimEnd()}`);

/*
TrimN:  happy Birthday !   
TrimF:happy Birthday !
TrimS:happy Birthday !   
TrimE:  happy Birthday !
*/

// Replace

let results = " PASS, FAIL, F, P,PASS,FFAIL";
console.log(results);
console.log(`Replace: ${results.replace("FAIL","FAILURE")}`); // only replaces 1st instance
console.log(`Replace: ${results.replaceAll("FAIL","FAILURE")}`); // replaces all the instance

// concat
console.log(`+ Operator: ${results+wishes}`);
console.log(`concat function: ${results.concat(wishes)}`);

// Split - string to array
// splits full string to individual strings based on seperator

let browser = "Chrome,Firefox,Edge,InterNetExplorer";
console.log(`Before Split: ${browser}`);
console.log(`Before Split: ${typeof browser}`);
console.log(`After Split: ${browser.split(",")}`);
console.log(`After Split: ${typeof browser.split(",")}`);

/*Before Split: Chrome,Firefox,Edge,InterNetExplorer
Before Split: string
After Split: Chrome,Firefox,Edge,InterNetExplorer
After Split: object */

// Join

// Join array to string

browser = ["Chrome","Firefox","Edge","InterNetExplorer"];
console.log(`Before Join: ${browser}`);
console.log(`Before Join: ${typeof browser}`);
console.log(`After Join: ${browser.join("|")}`);
console.log(`After Join: ${typeof browser.join("|")}`);